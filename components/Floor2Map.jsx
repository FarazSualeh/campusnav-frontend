"use client";

import React, { useState } from "react";
import { FLOOR_2_WIDTH, FLOOR_2_HEIGHT, floor2Rooms, floor2Nodes, floor2Edges, floor2RoomToNode } from "@/lib/floor2Data";

const COLORS = {
  Lab: { fill: "#EAF3EC", stroke: "#7FA88B", text: "#243E2C" },
  Classroom: { fill: "#F5F3EC", stroke: "#C2BCAB", text: "#484335" },
  Washroom: { fill: "#EAF2F8", stroke: "#9BB7CD", text: "#2C4355" },
  Admin: { fill: "#F5EBE6", stroke: "#CCA890", text: "#523B2B" },
};
const STAIRCASE_IDS = { "LOC-F2-FRONT-STAIRCASE": "F2-N0", "LOC-F2-BACK-STAIRCASE": "F2-S1" };

/**
 * @param {{
 *   routeNodeIds?: string[], selectedRoomId?: string|null, startRoomId?: string|null,
 *   destinationRoomId?: string|null, startNodeId?: string|null, destinationNodeId?: string|null,
 *   onRoomClick?: (roomId: string) => void
 * }} props
 */
export default function Floor2Map({ routeNodeIds = [], selectedRoomId = null, startRoomId = null, destinationRoomId = null, startNodeId = null, destinationNodeId = null, onRoomClick }) {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const byId = Object.fromEntries(floor2Nodes.map((node) => [node.id, node]));
  const startId = startNodeId || STAIRCASE_IDS[startRoomId] || floor2RoomToNode[startRoomId];
  const endId = destinationNodeId || STAIRCASE_IDS[destinationRoomId] || floor2RoomToNode[destinationRoomId];
  const routeSegments = routeNodeIds.slice(1).map((id, index) => [byId[routeNodeIds[index]], byId[id]]).filter(([a, b]) => a && b);

  const staircase = (id, x, y, label) => (
    <g key={id} onClick={() => onRoomClick?.(id)} style={{ cursor: "pointer" }}>
      <rect x={x - 24} y={y - 36} width="48" height="31" rx="5" fill="#FFF" stroke="#4A5568" strokeWidth="2" />
      <path d={`M ${x - 12} ${y - 10} H ${x - 5} V ${y - 16} H ${x + 2} V ${y - 22} H ${x + 9} V ${y - 28}`} fill="none" stroke="#2D3748" strokeWidth="2" />
      <text x={x} y={y - 40} textAnchor="middle" fontSize="7" fontWeight="700" fill="#334155">{label}</text>
    </g>
  );

  return (
    <div className="relative w-full max-w-full overflow-hidden select-none">
      <svg viewBox={`0 0 ${FLOOR_2_WIDTH} ${FLOOR_2_HEIGHT}`} role="img" aria-label="Interactive map of 2nd Floor, Engineering Building" className="w-full h-auto drop-shadow-sm">
        <rect width={FLOOR_2_WIDTH} height={FLOOR_2_HEIGHT} rx="12" fill="#FAF8F5" stroke="#E5E0D5" strokeWidth="2" />
        <g stroke="#DDD8CB" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
          {floor2Edges.map(([a, b]) => byId[a] && byId[b] && <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
        </g>
        <g stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 7" opacity=".7">
          {floor2Edges.map(([a, b]) => byId[a] && byId[b] && <line key={`center-${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
        </g>
        <g stroke="#C1571F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          {routeSegments.map(([a, b], index) => <line key={`route-${index}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />)}
        </g>

        {/* The two atriums remain voids: their dotted outlines are not interactive rooms. */}
        <g fill="#F1EEE5" stroke="#C9C2B4" strokeWidth="1.5" strokeDasharray="5 4">
          <rect x="135" y="145" width="150" height="250" rx="3" />
          <rect x="445" y="145" width="140" height="250" rx="3" />
        </g>
        <g fill="#7A735E" fontSize="8" fontWeight="700" textAnchor="middle"><text x="210" y="270">CUT OUT</text><text x="515" y="270">CUT OUT</text></g>

        {floor2Rooms.map((room) => {
          const colors = COLORS[room.category] || COLORS.Admin;
          const active = room.id === selectedRoomId || room.id === startRoomId || room.id === destinationRoomId || hoveredRoom === room.id;
          return <g key={room.id} onClick={() => onRoomClick?.(room.id)} onMouseEnter={() => setHoveredRoom(room.id)} onMouseLeave={() => setHoveredRoom(null)} style={{ cursor: "pointer" }}>
            <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="5" fill={colors.fill} stroke={active ? "#C1571F" : colors.stroke} strokeWidth={active ? "2.5" : "1.2"} />
            <text x={room.x + room.w / 2} y={room.y + room.h / 2} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fontWeight="600" fill={colors.text}>{label(room.label, room.x + room.w / 2)}</text>
          </g>;
        })}

        {staircase("LOC-F2-BACK-STAIRCASE", byId["F2-S1"].x, byId["F2-S1"].y, "Back Staircase")}
        {staircase("LOC-F2-FRONT-STAIRCASE", byId["F2-N0"].x, byId["F2-N0"].y, "Front Staircase")}
        {[[startId, "A", "#2A9D8F"], [endId, "B", "#EF4444"]].map(([id, mark, color]) => byId[id] && <g key={mark} transform={`translate(${byId[id].x}, ${byId[id].y})`}><circle r="8" fill={color} stroke="#FFF" strokeWidth="2" /><text y="2.5" textAnchor="middle" fill="#FFF" fontSize="7" fontWeight="700">{mark}</text></g>)}
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
