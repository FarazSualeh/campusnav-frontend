"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { getLocations, searchLocations, findLocation, NavLocation } from "@/lib/locations";
import { findShortestPath } from "@/lib/dijkstra";

interface NavigationPanelProps {
  onRouteCalculated: (route: {
    path: string[];
    totalDistance: number;
    startLoc: NavLocation | null;
    destLoc: NavLocation | null;
  } | null) => void;
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string | null) => void;
  initialStart?: NavLocation | null;
  initialDest?: NavLocation | null;
  onOpenQrModal?: (location: NavLocation) => void;
}

const CATEGORIES = [
  { id: "All", label: "All Spaces" },
  { id: "Lab", label: "Labs", icon: "🔬" },
  { id: "Classroom", label: "Classrooms", icon: "🎓" },
  { id: "Washroom", label: "Toilets", icon: "🚻" },
  { id: "Admin", label: "Admin & Faculty", icon: "💼" },
];

const POPULAR_DESTINATIONS = [
  "R-SERVER",
  "R-SYS",
  "R-SE",
  "R-AI",
  "R-LOUNGE",
  "R-BOYS",
  "R-GIRLS",
];

export default function NavigationPanel({
  onRouteCalculated,
  selectedRoomId,
  onSelectRoom,
  initialStart,
  initialDest,
  onOpenQrModal,
}: NavigationPanelProps) {
  const allLocations = useMemo(() => getLocations(), []);

  // Default start is Staircase (Floor entry point)
  const defaultStart = useMemo(() => allLocations.find((l) => l.nodeId === "N0") || allLocations[0], [allLocations]);
  const effectiveInitialStart = initialStart !== undefined ? initialStart : defaultStart;

  const [startQuery, setStartQuery] = useState(effectiveInitialStart?.name || "");
  const [startLocation, setStartLocation] = useState<NavLocation | null>(effectiveInitialStart || null);
  const [isStartOpen, setIsStartOpen] = useState(false);

  const [destQuery, setDestQuery] = useState(initialDest?.name || "");
  const [destLocation, setDestLocation] = useState<NavLocation | null>(initialDest || null);
  const [isDestOpen, setIsDestOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    path: string[];
    totalDistance: number;
    estimatedSeconds: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  const startRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Sync when initialStart prop updates during render
  const [prevInitialStart, setPrevInitialStart] = useState(initialStart);
  if (initialStart !== prevInitialStart) {
    setPrevInitialStart(initialStart);
    if (initialStart) {
      setStartLocation(initialStart);
      setStartQuery(initialStart.name);
    }
  }

  // Sync when initialDest prop updates during render
  const [prevInitialDest, setPrevInitialDest] = useState(initialDest);
  if (initialDest !== prevInitialDest) {
    setPrevInitialDest(initialDest);
    if (initialDest) {
      setDestLocation(initialDest);
      setDestQuery(initialDest.name);
    }
  }

  // Sync when user clicks a room on the floor map during render
  const [prevSelectedRoomId, setPrevSelectedRoomId] = useState(selectedRoomId);
  if (selectedRoomId !== prevSelectedRoomId) {
    setPrevSelectedRoomId(selectedRoomId);
    if (selectedRoomId) {
      const loc = findLocation(selectedRoomId);
      if (loc) {
        setDestLocation(loc);
        setDestQuery(loc.name);
        setIsDestOpen(false);
        setErrorMessage(null);
      }
    }
  }



  const openStartDropdown = () => {
    setIsStartOpen(true);
    setIsDestOpen(false);
  };

  const openDestDropdown = () => {
    setIsDestOpen(true);
    setIsStartOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (startRef.current && !startRef.current.contains(e.target as Node)) {
        setIsStartOpen(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setIsDestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered lists
  const filteredStartList = useMemo(() => {
    return searchLocations(startQuery, activeCategory);
  }, [startQuery, activeCategory]);

  const filteredDestList = useMemo(() => {
    return searchLocations(destQuery, activeCategory);
  }, [destQuery, activeCategory]);

  // Handle swapping start & destination
  const handleSwap = () => {
    const tempLoc = startLocation;
    const tempQ = startQuery;

    setStartLocation(destLocation);
    setStartQuery(destQuery);

    setDestLocation(tempLoc);
    setDestQuery(tempQ);

    setIsStartOpen(false);
    setIsDestOpen(false);

    setRouteInfo(null);
    onRouteCalculated(null);
    setErrorMessage(null);
  };

  // Calculate Route via API with local fallback
  const handleGetDirections = async () => {
    if (!startLocation || !destLocation) {
      setErrorMessage("Please select both a start point and destination.");
      return;
    }

    if (startLocation.nodeId === destLocation.nodeId) {
      setErrorMessage("Start point and destination are already at the same location.");
      return;
    }

    setIsLoadingRoute(true);
    setErrorMessage(null);

    const startNode = startLocation.nodeId;
    const endNode = destLocation.nodeId;

    try {
      // First attempt Next.js API route /api/route?start=...&end=...
      let data: { path: string[]; totalDistance: number };
      try {
        const response = await fetch(`/api/route?start=${encodeURIComponent(startNode)}&end=${encodeURIComponent(endNode)}`);
        if (response.ok) {
          data = await response.json();
        } else {
          // Fallback to local Dijkstra calculation
          data = findShortestPath(startNode, endNode);
        }
      } catch {
        // Fallback to local Dijkstra calculation if network error
        data = findShortestPath(startNode, endNode);
      }

      if (!data.path || data.path.length === 0) {
        setErrorMessage("Could not find a walkable path between selected points.");
        onRouteCalculated(null);
        setRouteInfo(null);
      } else {
        // Estimate approx walking time: approx 1.2 meters per sec, scaled from SVG units (~60 units = 10m)
        const meters = Math.max(5, Math.round(data.totalDistance * 0.16));
        const seconds = Math.max(10, Math.round(meters / 1.1));

        setRouteInfo({
          path: data.path,
          totalDistance: meters,
          estimatedSeconds: seconds,
        });

        onRouteCalculated({
          path: data.path,
          totalDistance: meters,
          startLoc: startLocation,
          destLoc: destLocation,
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred while routing.");
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const handleClearRoute = () => {
    setRouteInfo(null);
    setDestLocation(null);
    setDestQuery("");
    setErrorMessage(null);
    onSelectRoom(null);
    onRouteCalculated(null);
  };

  const handleQuickSelectDest = (roomId: string) => {
    const loc = findLocation(roomId);
    if (loc) {
      setDestLocation(loc);
      setDestQuery(loc.name);
      onSelectRoom(loc.id);
      setIsDestOpen(false);
      setIsStartOpen(false);
      setErrorMessage(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 md:p-6 backdrop-blur-sm flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Indoor Navigation</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Engineering Building • Floor 3</p>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200/60">
          KTC Campus
        </span>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Origin & Destination Inputs with Swap button */}
      <div className="relative flex flex-col gap-3">
        {/* Visual connecting line between A and B */}
        <div className="absolute left-[19px] top-[26px] bottom-[26px] w-0.5 bg-dashed bg-slate-200 pointer-events-none z-0 border-l border-dashed border-slate-300" />

        {/* START INPUT */}
        <div ref={startRef} className={`relative ${isStartOpen ? "z-30" : "z-10"}`}>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Start Location
            </label>
            {startLocation && onOpenQrModal && (
              <button
                type="button"
                onClick={() => onOpenQrModal(startLocation)}
                className="text-[10.5px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100/80 px-2 py-0.5 rounded-md border border-orange-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                title="Generate 'You Are Here' QR Code"
              >
                <span>📱</span>
                <span>Get QR Code</span>
              </button>
            )}
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold shadow-sm pointer-events-none z-10">
              A
            </div>
            <input
              type="text"
              value={startQuery}
              onChange={(e) => {
                setStartQuery(e.target.value);
                openStartDropdown();
                setStartLocation(null);
              }}
              onFocus={openStartDropdown}
              placeholder="Search start point (e.g. Staircase, Lab)..."
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium text-slate-800 transition-all placeholder:text-slate-400"
            />
            {startQuery && (
              <button
                type="button"
                onClick={() => {
                  setStartQuery("");
                  setStartLocation(null);
                  openStartDropdown();
                }}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Start Dropdown */}
          {isStartOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 sm:max-h-60 overflow-y-auto overscroll-contain bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1">
              {filteredStartList.length === 0 ? (
                <div className="px-4 py-3 text-xs text-slate-500 text-center">No locations found</div>
              ) : (
                filteredStartList.map((loc) => (
                  <button
                    key={`start-${loc.id}`}
                    type="button"
                    onClick={() => {
                      setStartLocation(loc);
                      setStartQuery(loc.name);
                      setIsStartOpen(false);
                      setErrorMessage(null);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-teal-50/70 flex items-center justify-between text-xs transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        {loc.name}
                        {loc.roomCode && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                            {loc.roomCode}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{loc.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-medium text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      {loc.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* SWAP BUTTON */}
        <div className="flex justify-end -my-1 pr-3 z-15">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Start and Destination"
            className="w-7 h-7 rounded-full bg-white border border-slate-300 shadow-sm text-slate-600 hover:text-slate-900 hover:border-slate-400 flex items-center justify-center text-xs transition-all hover:rotate-180 duration-200 cursor-pointer"
          >
            ⇅
          </button>
        </div>

        {/* DESTINATION INPUT */}
        <div ref={destRef} className={`relative ${isDestOpen ? "z-30" : "z-10"}`}>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Destination
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[9px] font-bold shadow-sm pointer-events-none z-10">
              B
            </div>
            <input
              type="text"
              value={destQuery}
              onChange={(e) => {
                setDestQuery(e.target.value);
                openDestDropdown();
                setDestLocation(null);
              }}
              onFocus={openDestDropdown}
              placeholder="Where do you want to go? (e.g. Server Room, AI Lab)..."
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium text-slate-800 transition-all placeholder:text-slate-400"
            />
            {destQuery && (
              <button
                type="button"
                onClick={() => {
                  setDestQuery("");
                  setDestLocation(null);
                  openDestDropdown();
                  onSelectRoom(null);
                }}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Destination Dropdown */}
          {isDestOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 sm:max-h-60 overflow-y-auto overscroll-contain bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1">
              {filteredDestList.length === 0 ? (
                <div className="px-4 py-3 text-xs text-slate-500 text-center">No locations found</div>
              ) : (
                filteredDestList.map((loc) => (
                  <button
                    key={`dest-${loc.id}`}
                    type="button"
                    onClick={() => {
                      setDestLocation(loc);
                      setDestQuery(loc.name);
                      onSelectRoom(loc.id);
                      setIsDestOpen(false);
                      setErrorMessage(null);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-orange-50/70 flex items-center justify-between text-xs transition-colors cursor-pointer border-b border-slate-50 last:border-0"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                        {loc.name}
                        {loc.roomCode && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                            {loc.roomCode}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{loc.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-medium text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      {loc.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Picks for fast destination selection */}
      {!routeInfo && (
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Popular Spots
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_DESTINATIONS.map((roomId) => {
              const loc = findLocation(roomId);
              if (!loc) return null;
              return (
                <button
                  key={`quick-${roomId}`}
                  type="button"
                  onClick={() => handleQuickSelectDest(roomId)}
                  className="text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-slate-200/60"
                >
                  {loc.name.replace(" Classroom", "").replace(" Lab", "")}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleGetDirections}
          disabled={isLoadingRoute || !startLocation || !destLocation}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoadingRoute ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Calculating Optimal Route...</span>
            </>
          ) : (
            <>
              <span>🧭</span>
              <span>Get Directions</span>
            </>
          )}
        </button>

        {routeInfo && (
          <button
            type="button"
            onClick={handleClearRoute}
            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Clear Active Route
          </button>
        )}
      </div>

      {/* Route Summary Card */}
      {routeInfo && (
        <div className="p-4 bg-gradient-to-br from-orange-50/80 to-amber-50/50 border border-orange-200/70 rounded-xl flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-950 uppercase tracking-wider">
              Route Summary
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 bg-orange-600 text-white rounded-full">
              {routeInfo.estimatedSeconds}s walk
            </span>
          </div>

          <div className="flex items-baseline justify-between text-slate-800">
            <div className="text-sm font-bold">
              ~{routeInfo.totalDistance} meters
            </div>
            <div className="text-xs text-slate-500">
              {routeInfo.path.length} corridor points
            </div>
          </div>

          <div className="text-xs text-slate-600 border-t border-orange-200/40 pt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-teal-700 font-bold truncate">{startLocation?.name}</span>
              <span>➔</span>
              <span className="text-orange-700 font-bold truncate">{destLocation?.name}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && startLocation && destLocation) {
                  const url = `${window.location.origin}/map?start=${encodeURIComponent(startLocation.id)}&to=${encodeURIComponent(destLocation.id)}`;
                  navigator.clipboard.writeText(url);
                  setShareCopied(true);
                  setTimeout(() => setShareCopied(false), 2000);
                }
              }}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shrink-0 ${
                shareCopied
                  ? "bg-teal-600 text-white"
                  : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-xs"
              }`}
            >
              <span>🔗</span>
              <span>{shareCopied ? "Link Copied!" : "Share Route"}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
