// lib/floorData.js
//
// Coordinates and labels for the 3rd floor, Engineering building.
// This matches the node IDs used in the Supabase `nodes` table so
// the map and the routing API stay in sync.
//
// Coordinate system: a 700 x 620 unit grid. (0,0) is top-left.
// Rooms are boxes; corridor nodes are points along the loop.

export const FLOOR_WIDTH = 700;
export const FLOOR_HEIGHT = 620;

// Room boxes: what gets drawn on the map (the physical room outline)
export const rooms = [
  // top row, left to right
  { id: "R-B406", label: "B-406 Classroom", x: 40,  y: 20,  w: 90, h: 60, category: "Classroom" },
  { id: "R-B407", label: "B-407 Classroom", x: 130, y: 20,  w: 90, h: 60, category: "Classroom" },
  { id: "R-B408", label: "B-408 Classroom", x: 220, y: 20,  w: 90, h: 60, category: "Classroom" },
  { id: "R-B409", label: "B-409 Seminar Hall", x: 310, y: 20, w: 90, h: 60, category: "Classroom" },
  { id: "R-BOYS",  label: "Boys Toilet",  x: 400, y: 20, w: 45, h: 60, category: "Washroom" },
  { id: "R-STAFF", label: "Staff Toilet", x: 445, y: 20, w: 45, h: 60, category: "Washroom" },
  { id: "R-SE",   label: "Software Engineering Lab", x: 490, y: 20, w: 70, h: 60, category: "Lab" },
  { id: "R-AI",   label: "Artificial Intelligence Lab", x: 560, y: 20, w: 70, h: 60, category: "Lab" },
  { id: "R-SYS",  label: "System Programing Lab", x: 630, y: 20, w: 70, h: 60, category: "Lab" },

  // right column, top to bottom
  { id: "R-CLOUD", label: "Cloud Computing Lab", x: 640, y: 130, w: 60, h: 100, category: "Lab" },
  { id: "R-DBA",   label: "Database & Analytics Lab", x: 640, y: 260, w: 60, h: 100, category: "Lab" },

  // bottom row, right to left
  { id: "R-PROJ",  label: "Project Lab", x: 560, y: 500, w: 70, h: 60, category: "Lab" },
  { id: "R-PROG",  label: "Programing Paradigm Lab", x: 480, y: 500, w: 80, h: 60, category: "Lab" },
  { id: "R-ESP",   label: "Electronics & Signal Processing Lab", x: 390, y: 500, w: 90, h: 60, category: "Lab" },
  { id: "R-NSL",   label: "Network & Security Lab", x: 310, y: 500, w: 80, h: 60, category: "Lab" },
  { id: "R-SERVER", label: "Server Room", x: 240, y: 500, w: 70, h: 60, category: "Admin" },
  { id: "R-AIML",  label: "CSE AIML Lab-1", x: 140, y: 500, w: 90, h: 60, category: "Lab" },
  { id: "R-CSEDS", label: "CSE DS Lab-1", x: 60,  y: 500, w: 80, h: 60, category: "Lab" },
  { id: "R-ECE",   label: "ECE Admin", x: 0, y: 460, w: 60, h: 100, category: "Admin" },

  // left column, bottom to top
  { id: "R-GIRLS", label: "Girls Toilet", x: 0, y: 340, w: 60, h: 60, category: "Washroom" },
  { id: "R-B404", label: "B-404 Classroom", x: 0, y: 200, w: 60, h: 100, category: "Classroom" },
  { id: "R-B405", label: "B-405 Classroom", x: 0, y: 90,  w: 60, h: 100, category: "Classroom" },

  // center
  { id: "R-LOUNGE", label: "Computer Admin Lounge", x: 300, y: 220, w: 110, h: 90, category: "Admin" },
];

// Corridor nodes: points along the walkable path (matches Supabase `nodes`)
export const nodes = [
  { id: "N0",  x: 350, y: 560, type: "Entry" },     // staircase
  { id: "N1",  x: 275, y: 500 },
  { id: "N2",  x: 350, y: 500 },
  { id: "N3",  x: 435, y: 500 },
  { id: "N4",  x: 520, y: 500 },
  { id: "N5",  x: 595, y: 500 },
  { id: "N6",  x: 640, y: 460, type: "Junction" },
  { id: "N7",  x: 640, y: 310 },
  { id: "N8",  x: 640, y: 180 },
  { id: "N9",  x: 640, y: 90,  type: "Junction" },
  { id: "N10", x: 665, y: 80 },
  { id: "N11", x: 595, y: 80 },
  { id: "N12", x: 525, y: 80 },
  { id: "N13", x: 467, y: 80 },
  { id: "N14", x: 422, y: 80 },
  { id: "N15", x: 355, y: 80 },
  { id: "N16", x: 265, y: 80 },
  { id: "N17", x: 175, y: 80 },
  { id: "N18", x: 85,  y: 80 },
  { id: "N19", x: 60,  y: 90,  type: "Junction" },
  { id: "N20", x: 60,  y: 190 },
  { id: "N21", x: 60,  y: 300 },
  { id: "N22", x: 60,  y: 370 },
  { id: "N23", x: 60,  y: 460, type: "Junction" },
  { id: "N24", x: 185, y: 500 },
  { id: "N25", x: 100, y: 500 },
  { id: "N26", x: 30,  y: 500 },
  { id: "N27", x: 380, y: 80,  type: "Junction" },  // middle passage, top
  { id: "N28", x: 380, y: 500, type: "Junction" },  // middle passage, bottom
  { id: "N29", x: 355, y: 400 },                     // Computer Admin Lounge door
];

// Every direct connection (one row per direction, matches Supabase `edges`)
export const edges = [
  ["N0", "N1"], ["N1", "N2"], ["N2", "N3"], ["N3", "N4"], ["N4", "N5"],
  ["N5", "N6"], ["N6", "N7"], ["N7", "N8"], ["N8", "N9"], ["N9", "N10"],
  ["N10", "N11"], ["N11", "N12"], ["N12", "N13"], ["N13", "N14"], ["N14", "N15"],
  ["N15", "N16"], ["N16", "N17"], ["N17", "N18"], ["N18", "N19"], ["N19", "N20"],
  ["N20", "N21"], ["N21", "N22"], ["N22", "N23"], ["N23", "N24"], ["N24", "N25"],
  ["N25", "N26"], ["N26", "N0"],
  ["N27", "N28"], ["N27", "N12"], ["N28", "N4"], ["N28", "N29"],
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

