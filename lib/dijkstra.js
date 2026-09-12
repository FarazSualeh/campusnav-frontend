// lib/dijkstra.js
import { nodes, edges, stairConnections } from "./floorData";
import { floor2Nodes, floor2Edges } from "./floor2Data";

/**
 * Calculates Euclidean distance between two node objects.
 */
function getDistance(n1, n2) {
  if (!n1 || !n2) return 1;
  const dx = n1.x - n2.x;
  const dy = n1.y - n2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Builds an adjacency list from the nodes and edges in floorData.
 */
export function buildGraph() {
  const allNodes = [...nodes, ...floor2Nodes];
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));
  const adjacency = new Map();

  for (const node of allNodes) {
    adjacency.set(node.id, []);
  }

  for (const [u, v] of [...edges, ...floor2Edges]) {
    const nodeU = nodeMap.get(u);
    const nodeV = nodeMap.get(v);
    if (!nodeU || !nodeV) continue;

    const dist = getDistance(nodeU, nodeV);

    adjacency.get(u)?.push({ node: v, weight: dist, type: "corridor" });
    adjacency.get(v)?.push({ node: u, weight: dist, type: "corridor" });
  }

  for (const connection of stairConnections) {
    const { from, to, weight, type, fromFloor, toFloor } = connection;
    adjacency.get(from)?.push({ node: to, weight, type, fromFloor, toFloor });
    adjacency.get(to)?.push({ node: from, weight, type, fromFloor: toFloor, toFloor: fromFloor });
  }

  return { nodeMap, adjacency };
}

/**
 * Finds the shortest path between startNodeId and endNodeId using Dijkstra's algorithm.
 * 
 * @param {string} startNodeId 
 * @param {string} endNodeId 
 * @returns {{ path: string[], totalDistance: number }}
 */
export function findShortestPath(startNodeId, endNodeId) {
  if (!startNodeId || !endNodeId) {
    return { path: [], totalDistance: 0 };
  }

  if (startNodeId === endNodeId) {
    return { path: [startNodeId], totalDistance: 0 };
  }

  const { adjacency } = buildGraph();

  if (!adjacency.has(startNodeId) || !adjacency.has(endNodeId)) {
    return { path: [], totalDistance: 0 };
  }

  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set();

  for (const nodeId of adjacency.keys()) {
    distances.set(nodeId, Infinity);
    unvisited.add(nodeId);
  }

  distances.set(startNodeId, 0);

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let current = null;
    let minDistance = Infinity;

    for (const nodeId of unvisited) {
      const d = distances.get(nodeId);
      if (d < minDistance) {
        minDistance = d;
        current = nodeId;
      }
    }

    if (current === null || minDistance === Infinity) {
      break; // Remaining nodes are unreachable
    }

    if (current === endNodeId) {
      break; // Found destination
    }

    unvisited.delete(current);

    const neighbors = adjacency.get(current) || [];
    for (const { node: neighbor, weight, type, fromFloor, toFloor } of neighbors) {
      if (!unvisited.has(neighbor)) continue;

      const alt = minDistance + weight;
      if (alt < distances.get(neighbor)) {
        distances.set(neighbor, alt);
        previous.set(neighbor, { node: current, edge: { weight, type, fromFloor, toFloor } });
      }
    }
  }

  // Reconstruct path
  const path = [];
  let curr = endNodeId;

  if (previous.has(curr) || curr === startNodeId) {
    while (curr) {
      path.unshift(curr);
      curr = previous.get(curr)?.node;
    }
  }

  const totalDistance = distances.get(endNodeId) !== Infinity ? Math.round(distances.get(endNodeId)) : 0;

  const floorTransitions = [];
  for (let index = 1; index < path.length; index += 1) {
    const step = previous.get(path[index]);
    if (step?.edge.type === "stairs") {
      floorTransitions.push({ fromNode: path[index - 1], toNode: path[index], fromFloor: step.edge.fromFloor, toFloor: step.edge.toFloor });
    }
  }

  return {
    path,
    totalDistance,
    floorTransitions,
  };
}
