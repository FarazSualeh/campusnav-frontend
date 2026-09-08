// lib/locations.js
import { rooms, roomToNode } from "./floorData";

/**
 * Represents a searchable navigation location on the 3rd floor.
 * @typedef {Object} NavLocation
 * @property {string} id - Unique identifier (e.g. "R-SERVER" or "LOC-STAIRCASE")
 * @property {string} name - Display label (e.g. "Server Room")
 * @property {string} category - "Lab" | "Classroom" | "Washroom" | "Admin" | "Entrance"
 * @property {string} nodeId - Associated corridor node id (e.g. "N1", "N0")
 * @property {string} [roomCode] - Room code if applicable (e.g. "B-406")
 * @property {string} [subtitle] - Extra detail/floor information
 */

// Special locations such as staircases and building access points
export const SPECIAL_LOCATIONS = [
  {
    id: "LOC-STAIRCASE-3",
    name: "Staircase (3rd Floor Entrance)",
    category: "Entrance",
    nodeId: "N0",
    roomCode: "STAIRS",
    subtitle: "Main Entry / Exit Point",
  },
];

/**
 * Derives a clean, normalized list of all searchable locations on the floor.
 * Sourced directly from floorData.js.
 * 
 * @returns {NavLocation[]}
 */
export function getLocations() {
  const roomLocations = rooms.map((room) => {
    const doorNode = roomToNode[room.id] || "N0";
    
    // Extract room number if format like "B-406 Classroom"
    const match = room.label.match(/([A-Z]-\d{3})/);
    const roomCode = match ? match[1] : undefined;

    return {
      id: room.id,
      name: room.label,
      category: room.category || "General",
      nodeId: doorNode,
      roomCode,
      subtitle: `${room.category} • Floor 3`,
    };
  });

  return [...SPECIAL_LOCATIONS, ...roomLocations];
}

/**
 * Asynchronous loader for locations.
 * Structure this to easily switch to `fetch('/api/locations')` in future.
 * 
 * @returns {Promise<NavLocation[]>}
 */
export async function fetchLocations() {
  // If backend API becomes available, swap implementation here:
  // try {
  //   const res = await fetch('/api/locations');
  //   if (res.ok) return await res.json();
  // } catch (e) {
  //   console.warn("Failed to fetch locations from API, falling back to static data", e);
  // }

  return Promise.resolve(getLocations());
}

/**
 * Filter locations by search query and optional category.
 * 
 * @param {string} query 
 * @param {string} [category] 
 * @returns {NavLocation[]}
 */
export function searchLocations(query = "", category = "") {
  const all = getLocations();
  const q = query.trim().toLowerCase();

  return all.filter((loc) => {
    const matchesCategory = !category || category === "All" || loc.category.toLowerCase() === category.toLowerCase();
    if (!matchesCategory) return false;

    if (!q) return true;

    return (
      loc.name.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      (loc.roomCode && loc.roomCode.toLowerCase().includes(q)) ||
      loc.id.toLowerCase().includes(q)
    );
  });
}

/**
 * Finds a location by its room ID or node ID.
 * 
 * @param {string} idOrNodeId 
 * @returns {NavLocation | undefined}
 */
export function findLocation(idOrNodeId) {
  if (!idOrNodeId) return undefined;
  const all = getLocations();
  return all.find((loc) => loc.id === idOrNodeId || loc.nodeId === idOrNodeId);
}

/**
 * Flexible lookup for URL deep-linking params or fuzzy queries.
 * Matches room IDs, node IDs, room numbers (e.g. "304"), or query terms.
 * 
 * @param {string} identifier 
 * @returns {NavLocation | undefined}
 */
export function findLocationByCodeOrId(identifier) {
  if (!identifier) return undefined;
  const normalized = identifier.trim().toLowerCase();
  const all = getLocations();

  // 1. Direct match on id or nodeId
  const direct = all.find((l) => l.id.toLowerCase() === normalized || l.nodeId.toLowerCase() === normalized);
  if (direct) return direct;

  // 2. Room code match (e.g. "304", "B-304", "305")
  const codeMatch = all.find((l) => l.roomCode && l.roomCode.toLowerCase().replace(/[^a-z0-9]/g, "").includes(normalized.replace(/[^a-z0-9]/g, "")));
  if (codeMatch) return codeMatch;

  // 3. Partial name match (e.g. "server", "stairs", "lounge", "boys")
  const nameMatch = all.find((l) => l.name.toLowerCase().includes(normalized) || l.id.toLowerCase().includes(normalized));
  if (nameMatch) return nameMatch;

  return undefined;
}

