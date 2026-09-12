"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FloorMap from "@/components/FloorMap";
import Floor2Map from "@/components/Floor2Map";
import NavigationPanel from "@/components/NavigationPanel";
import QRCodeModal from "@/components/QRCodeModal";
import { NavLocation, findLocation, findLocationByCodeOrId } from "@/lib/locations";

const FLOORS = [
  { id: "G", label: "Ground", status: "Coming Soon" },
  { id: "1", label: "Floor 1", status: "Coming Soon" },
  { id: "2", label: "Floor 2", status: "Live", active: true },
  { id: "3", label: "Floor 3", status: "Live", active: true },
];

function MapPageContent() {
  const searchParams = useSearchParams();

  const [routeData, setRouteData] = useState<{
    path: string[];
    totalDistance: number;
    floorTransitions?: { fromNode: string; toNode: string; fromFloor: string; toFloor: string }[];
    startLoc: NavLocation | null;
    destLoc: NavLocation | null;
  } | null>(null);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState<NavLocation | null>(null);
  const [mobileTab, setMobileTab] = useState<"map" | "search">("map");

  const startParam = searchParams.get("start") || searchParams.get("from");
  const destParam = searchParams.get("to") || searchParams.get("dest") || searchParams.get("destination");
  const floorParam = searchParams.get("floor");

  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const activeFloor = selectedFloor || (floorParam && FLOORS.some((f) => f.id === floorParam) ? floorParam : "3");
  const floorNotice =
    activeFloor !== "3" && activeFloor !== "2"
      ? `Floor ${activeFloor} blueprint is coming soon! Routing via Staircase (N0) for inter-floor transition.`
      : null;

  // Modal for QR Code generation
  const [qrLocation, setQrLocation] = useState<NavLocation | null>(null);
  const [isQrOpen, setIsQrOpen] = useState(false);

  // Initial locations parsed from URL search params
  const initialStart = React.useMemo(() => (startParam ? findLocationByCodeOrId(startParam) || null : null), [startParam]);
  const initialDest = React.useMemo(() => (destParam ? findLocationByCodeOrId(destParam) || null : null), [destParam]);

  const handleRoomClick = (roomId: string) => {
    setSelectedRoomId(roomId);
    const loc = findLocation(roomId);
    setSelectedRoomInfo(loc || null);
  };

  const handleFloorSelect = (floorId: string) => {
    setSelectedFloor(floorId);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold">
              CN
            </span>
            <span>
              Campus<span className="text-orange-600">Nav</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 pl-3 border-l border-slate-200">
            <span className="font-semibold text-slate-800">Engineering Building</span>
            <span>•</span>
            <span className="bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-md text-[11px]">
              Floor {activeFloor} {activeFloor === "3" || activeFloor === "2" ? "(Live)" : "(Transition Mode)"}
            </span>
          </div>
        </div>

        {/* Floor Switcher & Action buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {FLOORS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFloorSelect(f.id)}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-bold cursor-pointer ${
                  activeFloor === f.id
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Multi-floor transition notification banner */}
      {floorNotice && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs border-b border-amber-600/30">
          <span>ℹ️</span>
          <span>{floorNotice}</span>
          <button
            type="button"
            onClick={() => setSelectedFloor("3")}
            className="underline ml-2 hover:text-white"
          >
            Return to Floor 3
          </button>
        </div>
      )}


      {/* Mobile Switcher Tab Bar */}
      <div className="md:hidden flex border-b border-slate-200 bg-white sticky top-[57px] z-20">
        <button
          type="button"
          onClick={() => setMobileTab("map")}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
            mobileTab === "map"
              ? "border-orange-600 text-orange-600 bg-orange-50/40"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          🗺️ View Map
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("search")}
          className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors relative ${
            mobileTab === "search"
              ? "border-orange-600 text-orange-600 bg-orange-50/40"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          🔍 Directions & Search
          {routeData && (
            <span className="absolute top-2 right-6 w-2 h-2 bg-orange-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Navigation Search Panel */}
        <section
          className={`lg:col-span-4 flex flex-col gap-4 ${
            mobileTab === "search" ? "block" : "hidden lg:flex"
          }`}
        >
          <NavigationPanel
            initialStart={initialStart}
            initialDest={initialDest}
            onRouteCalculated={(data) => {
              setRouteData(data);
              if (data && window.innerWidth < 1024) {
                setMobileTab("map");
              }
            }}
            selectedRoomId={selectedRoomId}
            onSelectRoom={(roomId) => {
              setSelectedRoomId(roomId);
              setSelectedRoomInfo(roomId ? findLocation(roomId) || null : null);
            }}
            onOpenQrModal={(loc) => {
              setQrLocation(loc);
              setIsQrOpen(true);
            }}
          />

          {/* Room Details Preview Card */}
          {selectedRoomInfo && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Selected Room
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-mono">
                  Node: {selectedRoomInfo.nodeId}
                </span>
              </div>
              <div className="text-base font-bold text-slate-900">{selectedRoomInfo.name}</div>
              <div className="text-xs text-slate-500">{selectedRoomInfo.subtitle}</div>
              <button
                type="button"
                onClick={() => {
                  setQrLocation(selectedRoomInfo);
                  setIsQrOpen(true);
                }}
                className="mt-1 w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>📱</span>
                <span>Generate &quot;You Are Here&quot; QR Code</span>
              </button>
            </div>
          )}

          {/* Interactive Navigation Tips */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 text-xs text-slate-600 flex flex-col gap-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>💡</span>
              <span>Interactive Navigation Tips</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px] leading-relaxed">
              <li>Click directly on any room in the floor plan to set it as destination.</li>
              <li>Use the <strong>&quot;Get QR Code&quot;</strong> button to generate scannable location links.</li>
              <li>Main staircase (N0) and back staircase (N30) connect the 3rd floor corridor to other building floors.</li>
            </ul>
          </div>
        </section>

        {/* Right Side: Floor Map View */}
        <section
          className={`lg:col-span-8 flex flex-col gap-3 ${
            mobileTab === "map" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Map Container Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-5 shadow-sm relative flex flex-col items-center">
            {/* Map Top Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Floor {activeFloor} Layout
                </span>
                {routeData && (
                  <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    <span>Active Route</span>
                    <span>•</span>
                    <span>{routeData.totalDistance}m</span>
                  </span>
                )}
              </div>

              {/* Quick switch to search button on mobile map view */}
              <button
                type="button"
                onClick={() => setMobileTab("search")}
                className="lg:hidden text-xs bg-slate-900 text-white font-semibold px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <span>🔍</span>
                <span>Change Route</span>
              </button>
            </div>

            {/* SVG Floor Map Component */}
            <div className="w-full max-w-3xl overflow-x-auto">
              {activeFloor === "2" ? (
                <Floor2Map
                  routeNodeIds={routeData?.path || []}
                  selectedRoomId={selectedRoomId}
                  startRoomId={routeData?.startLoc?.id || null}
                  destinationRoomId={routeData?.destLoc?.id || null}
                  startNodeId={routeData?.startLoc?.nodeId || null}
                  destinationNodeId={routeData?.destLoc?.nodeId || null}
                  onRoomClick={handleRoomClick}
                />
              ) : (
                <FloorMap
                  routeNodeIds={routeData?.path || []}
                  selectedRoomId={selectedRoomId}
                  startRoomId={routeData?.startLoc?.id || null}
                  destinationRoomId={routeData?.destLoc?.id || null}
                  startNodeId={routeData?.startLoc?.nodeId || null}
                  destinationNodeId={routeData?.destLoc?.nodeId || null}
                  onRoomClick={handleRoomClick}
                />
              )}
            </div>

            {/* Color Legend */}
            <div className="w-full mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Legend:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-[#7FA88B] bg-[#EAF3EC]" />
                  <span>Labs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-[#C2BCAB] bg-[#F5F3EC]" />
                  <span>Classrooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-[#9BB7CD] bg-[#EAF2F8]" />
                  <span>Male Washrooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-[#9174D] bg-[#be185d]" />
                  <span>Female Washrooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-[#CCA890] bg-[#F5EBE6]" />
                  <span>Admin / Lounge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 bg-white" />
                  <span>Staircase</span>
                </div>
              </div>

              {routeData && (
                <div className="flex items-center gap-1.5 text-orange-700 font-bold">
                  <span className="w-4 h-1.5 rounded-full bg-orange-600" />
                  <span>Shortest Corridor Route</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Scannable Location QR Code Modal */}
      <QRCodeModal
        location={qrLocation}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
            <span className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
            Loading CampusNav Map...
          </div>
        </div>
      }
    >
      <MapPageContent />
    </Suspense>
  );
}
