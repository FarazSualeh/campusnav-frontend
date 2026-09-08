// components/FloorMap.jsx
"use client";

import React, { useState } from "react";
import { rooms, nodes, edges, roomToNode, FLOOR_WIDTH, FLOOR_HEIGHT } from "@/lib/floorData";

// Architectural palette tailored for KTC campus map
const CATEGORY_COLORS = {
  Lab: { fill: "#EAF3EC", stroke: "#7FA88B", text: "#243E2C", badge: "#3B7A57" },
  Classroom: { fill: "#F5F3EC", stroke: "#C2BCAB", text: "#484335", badge: "#7A735E" },
  Washroom: { fill: "#EAF2F8", stroke: "#9BB7CD", text: "#2C4355", badge: "#467294" },
  Admin: { fill: "#F5EBE6", stroke: "#CCA890", text: "#523B2B", badge: "#8A5838" },
};

const ROUTE_COLOR = "#C1571F";
const ROUTE_GLOW_COLOR = "#F4A261";
const START_COLOR = "#2A9D8F";
const END_COLOR = "#E76F51";

/**
 * Enhanced interactive SVG floor map for 3rd Floor Engineering Building.
 * 
 * @param {Object} props
 * @param {string[]} [props.routeNodeIds] - Array of node IDs along the active path
 * @param {string|null} [props.selectedRoomId] - Currently highlighted room ID
 * @param {string|null} [props.startRoomId] - Room or location ID of start point
 * @param {string|null} [props.destinationRoomId] - Room or location ID of destination point
 * @param {string|null} [props.startNodeId] - Node ID of the start point
 * @param {string|null} [props.destinationNodeId] - Node ID of the destination point
 * @param {(roomId: string) => void} [props.onRoomClick] - Callback when room is clicked
 */
export default function FloorMap({
  routeNodeIds = [],
  selectedRoomId = null,
  startRoomId = null,
  destinationRoomId = null,
  startNodeId = null,
  destinationNodeId = null,
  onRoomClick,
}) {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Build route line segments
  const routeSegments = [];
  for (let i = 0; i < routeNodeIds.length - 1; i++) {
    const a = nodeById[routeNodeIds[i]];
    const b = nodeById[routeNodeIds[i + 1]];
    if (a && b) routeSegments.push([a, b]);
  }
  const routeSet = new Set(routeNodeIds);

  // Determine effective start and destination node coordinates for markers
  const effectiveStartNodeId = startNodeId || (startRoomId ? (startRoomId.startsWith("LOC-STAIRCASE") ? "N0" : roomToNode[startRoomId]) : null);
  const effectiveEndNodeId = destinationNodeId || (destinationRoomId ? (destinationRoomId.startsWith("LOC-STAIRCASE") ? "N0" : roomToNode[destinationRoomId]) : null);

  const startCoord = effectiveStartNodeId ? nodeById[effectiveStartNodeId] : null;
  const endCoord = effectiveEndNodeId ? nodeById[effectiveEndNodeId] : null;

  return (
    <div className="relative w-full max-w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${FLOOR_WIDTH} ${FLOOR_HEIGHT}`}
        role="img"
        aria-label="Interactive map of 3rd Floor, Engineering Building, Kalsekar Technical Campus"
        className="w-full h-auto drop-shadow-sm transition-all duration-300"
        style={{ fontFamily: "var(--font-sans, system-ui, -apple-system, sans-serif)" }}
      >
        <title>Engineering Building - 3rd Floor Floorplan</title>

        {/* Filters and Marker Definitions */}
        <defs>
          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Animated dash pattern for active route */}
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E76F51" />
            <stop offset="100%" stopColor="#C1571F" />
          </linearGradient>

          {/* Pattern for background floor texture */}
          <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#101b34" opacity="0.04" />
          </pattern>
        </defs>

        {/* Floor Canvas Background */}
        <rect x="0" y="0" width={FLOOR_WIDTH} height={FLOOR_HEIGHT} fill="#FAF8F5" rx="12" />
        <rect x="0" y="0" width={FLOOR_WIDTH} height={FLOOR_HEIGHT} fill="url(#grid-dots)" rx="12" />
        <rect
          x="1"
          y="1"
          width={FLOOR_WIDTH - 2}
          height={FLOOR_HEIGHT - 2}
          fill="none"
          stroke="#E5E0D5"
          strokeWidth="1.5"
          rx="12"
        />

        {/* Corridor Base Network */}
        <g stroke="#DDD8CB" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          {edges.map(([a, b], i) => {
            const na = nodeById[a];
            const nb = nodeById[b];
            if (!na || !nb) return null;
            return <line key={`corridor-${i}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} />;
          })}
        </g>

        {/* Corridor Walkable Path Centerline */}
        <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 7" opacity="0.7">
          {edges.map(([a, b], i) => {
            const na = nodeById[a];
            const nb = nodeById[b];
            if (!na || !nb) return null;
            return <line key={`centerline-${i}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} />;
          })}
        </g>

        {/* Active Route Highlight (Glow underlay + Bold path line) */}
        {routeSegments.length > 0 && (
          <g>
            {/* Route Glow Underlay */}
            <g stroke={ROUTE_GLOW_COLOR} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" filter="url(#route-glow)">
              {routeSegments.map(([a, b], i) => (
                <line key={`glow-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              ))}
            </g>

            {/* Solid Route Line */}
            <g stroke="url(#route-gradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {routeSegments.map(([a, b], i) => (
                <line key={`route-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              ))}
            </g>

            {/* Route waypoint dots */}
            <g fill="#FFFFFF" stroke={ROUTE_COLOR} strokeWidth="2">
              {routeNodeIds.map((nodeId, idx) => {
                const n = nodeById[nodeId];
                if (!n || idx === 0 || idx === routeNodeIds.length - 1) return null;
                return <circle key={`node-dot-${nodeId}`} cx={n.x} cy={n.y} r="3" />;
              })}
            </g>
          </g>
        )}

        {/* Room Boxes and Labels */}
        {rooms.map((room) => {
          const colors = CATEGORY_COLORS[room.category] || CATEGORY_COLORS.Admin;
          const isSelected = room.id === selectedRoomId;
          const isStart = room.id === startRoomId;
          const isDest = room.id === destinationRoomId;
          const isHovered = hoveredRoom === room.id;
          const doorNode = roomToNode[room.id];
          const isOnRoute = doorNode && routeSet.has(doorNode);

          let strokeColor = colors.stroke;
          let strokeWidth = 1.2;
          let roomFill = colors.fill;

          if (isDest) {
            strokeColor = END_COLOR;
            strokeWidth = 3;
            roomFill = "#FDF0EC";
          } else if (isStart) {
            strokeColor = START_COLOR;
            strokeWidth = 3;
            roomFill = "#E6F5F3";
          } else if (isSelected || isOnRoute) {
            strokeColor = ROUTE_COLOR;
            strokeWidth = 2.5;
          } else if (isHovered) {
            strokeColor = "#334155";
            strokeWidth = 2;
          }

          return (
            <g
              key={room.id}
              onClick={() => onRoomClick && onRoomClick(room.id)}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              style={{ cursor: "pointer" }}
              className="transition-opacity duration-150"
            >
              {/* Room Rectangle */}
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={roomFill}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                rx={4}
                className="transition-all duration-200"
              />

              {/* Category indicator pill on top-left of room */}
              <rect
                x={room.x + 4}
                y={room.y + 4}
                width={6}
                height={6}
                rx={3}
                fill={colors.badge}
                opacity={0.8}
              />

              {/* Room Label */}
              <text
                x={room.x + room.w / 2}
                y={room.y + room.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight={isStart || isDest || isSelected ? "700" : "500"}
                fill={isStart ? "#134E48" : isDest ? "#7C2D12" : colors.text}
                style={{ pointerEvents: "none", letterSpacing: "-0.01em" }}
              >
                {wrapLabel(room.label, room.x + room.w / 2)}
              </text>
            </g>
          );
        })}

        {/* Staircase / Floor Entry Marker */}
        {nodeById["N0"] && (
          <g
            onClick={() => onRoomClick && onRoomClick("LOC-STAIRCASE-3")}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredRoom("LOC-STAIRCASE-3")}
            onMouseLeave={() => setHoveredRoom(null)}
          >
            {/* Outer ring */}
            <circle
              cx={nodeById["N0"].x}
              cy={nodeById["N0"].y}
              r="14"
              fill="#FFFFFF"
              stroke={startRoomId === "LOC-STAIRCASE-3" ? START_COLOR : destinationRoomId === "LOC-STAIRCASE-3" ? END_COLOR : "#4A5568"}
              strokeWidth="2.5"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            />
            {/* Staircase icon lines */}
            <path
              d={`M ${nodeById["N0"].x - 6} ${nodeById["N0"].y + 4} 
                 L ${nodeById["N0"].x - 2} ${nodeById["N0"].y + 4} 
                 L ${nodeById["N0"].x - 2} ${nodeById["N0"].y} 
                 L ${nodeById["N0"].x + 2} ${nodeById["N0"].y} 
                 L ${nodeById["N0"].x + 2} ${nodeById["N0"].y - 4} 
                 L ${nodeById["N0"].x + 6} ${nodeById["N0"].y - 4}`}
              fill="none"
              stroke="#2D3748"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x={nodeById["N0"].x - 44}
              y={nodeById["N0"].y + 20}
              width="88"
              height="18"
              rx="4"
              fill="#2D3748"
            />
            <text
              x={nodeById["N0"].x}
              y={nodeById["N0"].y + 32}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="#FFFFFF"
            >
              Staircase (Entrance)
            </text>
          </g>
        )}

        {/* Start Point Pin Marker */}
        {startCoord && (
          <g transform={`translate(${startCoord.x}, ${startCoord.y})`} className="animate-bounce-subtle">
            <circle r="12" fill={START_COLOR} opacity="0.25">
              <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill={START_COLOR} stroke="#FFFFFF" strokeWidth="2" />
            <text y="3" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
              A
            </text>
          </g>
        )}

        {/* Destination Point Pin Marker */}
        {endCoord && (
          <g transform={`translate(${endCoord.x}, ${endCoord.y})`}>
            <circle r="12" fill={END_COLOR} opacity="0.25">
              <animate attributeName="r" values="10;17;10" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill={END_COLOR} stroke="#FFFFFF" strokeWidth="2" />
            <text y="3" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">
              B
            </text>
          </g>
        )}

        {/* North Arrow and Floor Tag */}
        <g transform="translate(640, 40)">
          <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M 0 -8 L 4 4 L 0 2 L -4 4 Z" fill="#C1571F" />
          <text x="0" y="11" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#64748B">
            N
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Intelligent room label wrapper: breaks long names evenly across tspan lines.
 */
function wrapLabel(label, centerX) {
  const words = label.split(" ");
  if (words.length <= 2) return label;

  // Smart splitting based on length
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <>
      <tspan x={centerX} dy="-6">
        {line1}
      </tspan>
      <tspan x={centerX} dy="12">
        {line2}
      </tspan>
    </>
  );
}
