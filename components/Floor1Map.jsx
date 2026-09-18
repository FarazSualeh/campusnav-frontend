"use client";

import React, { useState } from "react";
import { useRouteViewBox } from "@/lib/useRouteViewBox";
import {
  FLOOR_1_HEIGHT,
  FLOOR_1_WIDTH,
  floor1Edges,
  floor1Nodes,
  floor1RoomToNode,
  floor1Rooms,
} from "@/lib/floor1Data";

const COLORS = {
  Lab: { fill: "#EAF3EC", stroke: "#7FA88B", text: "#243E2C" },
  Classroom: { fill: "#F5F3EC", stroke: "#C2BCAB", text: "#484335" },
  Washroom: { fill: "#EAF2F8", stroke: "#9BB7CD", text: "#2C4355" },
  Admin: { fill: "#F5EBE6", stroke: "#CCA890", text: "#523B2B" },
};
const FEMALE_WASHROOM_COLORS = { fill: "#FCE4EC", stroke: "#C2185B", text: "#880E4F" };

const STAIRCASE_IDS = {
  "LOC-F1-FRONT-STAIRCASE": "F1-N0",
  "LOC-F1-BACK-STAIRCASE": "F1-N12",
};

/**
 * @param {{
 *   routeNodeIds?: string[], selectedRoomId?: string|null, startRoomId?: string|null,
 *   destinationRoomId?: string|null, startNodeId?: string|null, destinationNodeId?: string|null,
 *   onRoomClick?: (roomId: string) => void
 * }} props
 */
export default function Floor1Map({
  routeNodeIds = [],
  selectedRoomId = null,
  startRoomId = null,
  destinationRoomId = null,
  startNodeId = null,
  destinationNodeId = null,
  onRoomClick,
}) {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const byId = Object.fromEntries(floor1Nodes.map((node) => [node.id, node]));
  const { viewBox, showFullFloor, focusRoute, isFramed, pointerHandlers } = useRouteViewBox({
    routeNodeIds,
    nodes: floor1Nodes,
    width: FLOOR_1_WIDTH,
    height: FLOOR_1_HEIGHT,
  });
  const startId = startNodeId || STAIRCASE_IDS[startRoomId] || floor1RoomToNode[startRoomId];
  const endId = destinationNodeId || STAIRCASE_IDS[destinationRoomId] || floor1RoomToNode[destinationRoomId];
  const routeSegments = routeNodeIds
    .slice(1)
    .map((id, index) => [byId[routeNodeIds[index]], byId[id]])
    .filter(([a, b]) => a && b);

  const staircase = (id, x, y, label) => (
    <g key={id} onClick={() => onRoomClick?.(id)} style={{ cursor: "pointer" }}>
      <rect x={x - 14} y={y - 36} width="28" height="31" rx="4" fill="#FFF" stroke="#4A5568" strokeWidth="2" />
      <path d={`M ${x - 8} ${y - 10} H ${x - 3} V ${y - 16} H ${x + 2} V ${y - 22} H ${x + 7} V ${y - 28}`} fill="none" stroke="#2D3748" strokeWidth="1.6" />
      <text x={x} y={y - 40} textAnchor="middle" fontSize="8" fontWeight="700" fill="#334155">{label}</text>
    </g>
  );

  return (
    <div className="relative w-full max-w-full overflow-hidden select-none">
      {routeNodeIds.length > 0 && (
        <button type="button" onClick={isFramed ? showFullFloor : focusRoute} className="absolute right-3 top-3 z-10 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs font-bold text-slate-700 shadow-md backdrop-blur transition-colors hover:bg-slate-50">
          {isFramed ? "Show full floor" : "Focus route"}
        </button>
      )}
      <svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} {...pointerHandlers} role="img" aria-label="Interactive map of 1st Floor, Engineering Building" className="w-full h-auto drop-shadow-sm touch-none">
        <rect width={FLOOR_1_WIDTH} height={FLOOR_1_HEIGHT} rx="12" fill="#FAF8F5" stroke="#E5E0D5" strokeWidth="2" />

        <g stroke="#DDD8CB" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          {floor1Edges.map(([a, b]) => byId[a] && byId[b] && <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
        </g>
        <g stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 7" opacity=".7">
          {floor1Edges.map(([a, b]) => byId[a] && byId[b] && <line key={`center-${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
        </g>
        <g stroke="#C1571F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {routeSegments.map(([a, b], index) => <line key={`route-${index}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />)}
        </g>

        <g fill="#F1EEE5" stroke="#C9C2B4" strokeWidth="1.5" strokeDasharray="5 4">
          <rect x="100" y="111" width="252" height="355" rx="3" />
          <rect x="500" y="111" width="110" height="355" rx="3" />
        </g>
        <g fill="#7A735E" fontSize="11" fontWeight="700" textAnchor="middle">
          <text x="226" y="280">CUT OUT AREA</text>
          <text x="550" y="280">CUT OUT AREA</text>
        </g>

        {floor1Rooms.map((room) => {
          const colors = room.id === "F1-FEMALE-STAFF"
            ? FEMALE_WASHROOM_COLORS
            : COLORS[room.category] || COLORS.Admin;
          const active = room.id === selectedRoomId || room.id === startRoomId || room.id === destinationRoomId || hoveredRoom === room.id;
          return (
            <g
              key={room.id}
              onClick={() => onRoomClick?.(room.id)}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              style={{ cursor: "pointer" }}
            >
              <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="5" fill={colors.fill} stroke={active ? "#C1571F" : colors.stroke} strokeWidth={active ? "2.5" : "1.2"} />
              {room.id === "F1-MIDDLE-CLUSTER" ? (
                <text x={room.x + room.w / 2} textAnchor="middle" fontSize="12" fontWeight="600" fill={colors.text}>
                  <tspan x={room.x + room.w / 2} y={room.y + 36}>Civil HOD</tspan>
                  <tspan x={room.x + room.w / 2} y={room.y + room.h - 30}>B-218 Staffroom</tspan>
                </text>
              ) : room.id === "F1-CONFERENCE" ? (
                <text
                  x={room.x + room.w / 2 - 26}
                  y={room.y + room.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={colors.text}
                  transform={`rotate(270 ${room.x + room.w / 2 - 26} ${room.y + room.h / 2})`}
                >
                  Conference Room
                </text>
              ) : (
                <text x={room.x + room.w / 2} y={room.y + room.h / 2} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fontWeight="600" fill={colors.text}>
                  {label(room.label, room.x + room.w / 2)}
                </text>
              )}
            </g>
          );
        })}

        {staircase("LOC-F1-BACK-STAIRCASE", byId["F1-N12"].x, byId["F1-N12"].y, "Back Staircase")}
        {staircase("LOC-F1-FRONT-STAIRCASE", byId["F1-N0"].x, byId["F1-N0"].y, "Front Staircase")}
        {[[startId, "A", "#2A9D8F"], [endId, "B", "#EF4444"]].map(([id, mark, color]) => byId[id] && (
          <g key={mark} transform={`translate(${byId[id].x}, ${byId[id].y})`}>
            <circle r="8" fill={color} stroke="#FFF" strokeWidth="2" />
            <text y="2.5" textAnchor="middle" fill="#FFF" fontSize="7" fontWeight="700">{mark}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function label(value, centerX) {
  const words = value.split(" ");
  if (words.length < 3) return value;
  const midpoint = Math.ceil(words.length / 2);
  return <><tspan x={centerX} dy="-4">{words.slice(0, midpoint).join(" ")}</tspan><tspan x={centerX} dy="10">{words.slice(midpoint).join(" ")}</tspan></>;
}
