// lib/floorData.js
//
// Coordinates and labels for the 3rd floor, Engineering building.
// This matches the node IDs used in routing so the map and the routing API stay in sync.
//
// Coordinate system: a 720 x 650 unit grid. (0,0) is top-left.
// Rooms are boxes; corridor nodes are points along the loop.

export const FLOOR_WIDTH = 720;
export const FLOOR_HEIGHT = 650;

// Room boxes: physical room outlines on the 3rd floor
export const rooms = [
  // Top row (left to right) - y: 18, h: 58, corridor at y: 95
  { id: "R-B406", label: "B-406 Classroom", x: 15,  y: 18, w: 68, h: 58, category: "Classroom" },
  { id: "R-B407", label: "B-407 Classroom", x: 88,  y: 18, w: 68, h: 58, category: "Classroom" },
  { id: "R-B408", label: "B-408 Classroom", x: 161, y: 18, w: 68, h: 58, category: "Classroom" },
  { id: "R-B409", label: "B-409 Seminar Hall", x: 234, y: 18, w: 76, h: 58, category: "Classroom" },
  { id: "R-BOYS",  label: "Boys Toilet",  x: 315, y: 18, w: 65, h: 58, category: "Washroom" },
  { id: "R-STAFF", label: "Staff Toilet", x: 380, y: 18, w: 42, h: 58, category: "Washroom" },
  { id: "R-SE",   label: "Software Engineering Lab", x: 428, y: 18, w: 80, h: 58, category: "Lab" },
  { id: "R-AI",   label: "Artificial Intelligence Lab", x: 513, y: 18, w: 80, h: 58, category: "Lab" },
  { id: "R-SYS",  label: "System Programing Lab", x: 599, y: 18, w: 100, h: 58, category: "Lab" },

  // Right column (top to bottom) - x: 630, w: 75, corridor at x: 610
  { id: "R-CLOUD", label: "Cloud Computing Lab", x: 630, y: 135, w: 75, h: 110, category: "Lab" },
  { id: "R-DBA",   label: "Database & Analytics Lab", x: 630, y: 265, w: 75, h: 110, category: "Lab" },

  // Bottom row (right to left) - y: 504, h: 58, corridor at y: 480
  { id: "R-PROJ",  label: "Project Lab 418", x: 567, y: 504, w: 110, h: 58, category: "Lab" },
  { id: "R-PROG",  label: "Programing Paradigm Lab", x: 478, y: 504, w: 88, h: 58, category: "Lab" },
  { id: "R-ESP",   label: "Electronics & Signal Processing Lab", x: 357, y: 504, w: 100, h: 58, category: "Lab" },
  { id: "R-NSL",   label: "Network & Security Lab", x: 255, y: 504, w: 100, h: 58, category: "Lab" },
  { id: "R-SERVER", label: "Server Room", x: 186, y: 504, w: 65, h: 58, category: "Admin" },
  { id: "R-AIML",  label: "CSE AIML Lab-1", x: 85,  y: 504, w: 70, h: 58, category: "Lab" },
  { id: "R-CSEDS", label: "CSE DS Lab-1", x: 8,  y: 504, w: 75, h: 58, category: "Lab" },

  // Left column (bottom to top) - x: 10, w: 58, corridor at x: 85
  { id: "R-ECE",   label: "ECE Admin", x: 10, y: 360, w: 58, h: 85, category: "Admin" },
  { id: "R-GIRLS", label: "Girls Toilet", x: 10, y: 285, w: 58, h: 65, category: "Washroom" },
  { id: "R-B404", label: "B-404 Classroom", x: 10, y: 200, w: 58, h: 75, category: "Classroom" },
  { id: "R-B405", label: "B-405 Classroom", x: 10, y: 115, w: 58, h: 75, category: "Classroom" },

  // Center
  { id: "R-LOUNGE", label: "Admin Lounge/Staff Room", x: 318, y: 220, w: 125, h: 95, category: "Admin" },
];

// Corridor nodes: points along walkable pathways
export const nodes = [
  { id: "N0",  x: 160, y: 585, type: "Entry" },     // Staircase (Entrance) - bottom-left of Server Room
  { id: "N1",  x: 213, y: 480 },                     // Server Room door
  { id: "N2",  x: 294, y: 480 },                     // Network & Security Lab door
  { id: "N3",  x: 383, y: 480 },                     // Electronics & Signal Processing Lab door
  { id: "N4",  x: 474, y: 480 },                     // Programing Paradigm Lab door
  { id: "N5",  x: 561, y: 480 },                     // Project Lab door
  { id: "N6",  x: 610, y: 480, type: "Junction" },  // Bottom-Right junction
  { id: "N7",  x: 610, y: 320 },                     // Database & Analytics Lab door
  { id: "N8",  x: 610, y: 190 },                     // Cloud Computing Lab door
  { id: "N9",  x: 610, y: 95,  type: "Junction" },  // Top-Right junction
  { id: "N10", x: 639, y: 95 },                      // System Programing Lab door
  { id: "N11", x: 553, y: 95 },                      // Artificial Intelligence Lab door
  { id: "N12", x: 468, y: 95 },                      // Software Engineering Lab door
  { id: "N13", x: 401, y: 95 },                      // Staff Toilet door
  { id: "N14", x: 345, y: 95 },                      // Boys Toilet door
  { id: "N15", x: 272, y: 95 },                      // B-409 Seminar Hall door
  { id: "N16", x: 195, y: 95 },                      // B-408 Classroom door
  { id: "N17", x: 122, y: 95 },                      // B-407 Classroom door
  { id: "N18", x: 49,  y: 95 },                      // B-406 Classroom door
  { id: "N19", x: 85,  y: 95,  type: "Junction" },  // Top-Left junction
  { id: "N20", x: 85,  y: 152 },                     // B-405 Classroom door
  { id: "N21", x: 85,  y: 237 },                     // B-404 Classroom door
  { id: "N22", x: 85,  y: 317 },                     // Girls Toilet door
  { id: "N23", x: 85,  y: 480, type: "Junction" },  // Bottom-Left junction
  { id: "N24", x: 122, y: 480 },                     // CSE AIML Lab-1 door
  { id: "N25", x: 49,  y: 480 },                     // CSE DS Lab-1 door
  { id: "N26", x: 85,  y: 402 },                     // ECE Admin door
  { id: "N27", x: 315, y: 95,  type: "Junction" },  // Middle passage, top (Left of Boys Toilet)
  { id: "N28", x: 315, y: 480, type: "Junction" },  // Middle passage, bottom
  { id: "N29", x: 315, y: 252 },                     // Admin Lounge/Staff Room door
];

// Direct walkable corridor connections
export const edges = [
  // Top corridor (left to right): N18(49)→N19(85)→...→N15(272)→N27(315,jct)→N14(345)→N13(401)→N12(468)→N11(553)→N10(639)→N9(610)
  ["N18", "N19"], ["N19", "N17"], ["N17", "N16"], ["N16", "N15"], ["N15", "N27"],
  ["N27", "N14"], ["N14", "N13"], ["N13", "N12"], ["N12", "N11"], ["N11", "N10"], ["N10", "N9"],

  // Right corridor (top to bottom)
  ["N9", "N8"], ["N8", "N7"], ["N7", "N6"],

  // Bottom corridor (right to left): N6(610)→N5(561)→N4(474)→N3(383)→N28(315,jct)→N2(294)→N1(213)→...
  ["N6", "N5"], ["N5", "N4"], ["N4", "N3"], ["N3", "N28"], ["N28", "N2"], ["N2", "N1"],
  ["N1", "N0"], ["N0", "N24"], ["N24", "N23"], ["N23", "N25"],

  // Left corridor (bottom to top)
  ["N23", "N26"], ["N26", "N22"], ["N22", "N21"], ["N21", "N20"], ["N20", "N19"],

  // Central corridor (top to bottom) — all at x:315, perfectly straight
  ["N27", "N29"], ["N29", "N28"],
];

// Which corridor node each room connects to (its door)
export const roomToNode = {
  "R-B406": "N18", "R-B407": "N17", "R-B408": "N16", "R-B409": "N15",
  "R-BOYS": "N14", "R-STAFF": "N13", "R-SE": "N12", "R-AI": "N11", "R-SYS": "N10",
  "R-CLOUD": "N8", "R-DBA": "N7",
  "R-PROJ": "N5", "R-PROG": "N4", "R-ESP": "N3", "R-NSL": "N2", "R-SERVER": "N1",
  "R-AIML": "N24", "R-CSEDS": "N25", "R-ECE": "N26",
  "R-GIRLS": "N22", "R-GIRLS-B": "N22", "R-B404": "N21", "R-B405": "N20",
  "R-LOUNGE": "N29",
};

