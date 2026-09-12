// Coordinates and routing data for the 2nd floor, Engineering Building.
// The two inner atriums are intentionally represented only by corridor geometry;
// they are open-to-below voids, not destinations.

export const FLOOR_2_WIDTH = 720;
export const FLOOR_2_HEIGHT = 650;

export const floor2Rooms = [
  // Top row (left to right)
  { id: "F2-B306", label: "B-306 ECE Project Lab / FE CR2", x: 15, y: 18, w: 95, h: 58, category: "Lab" },
  { id: "F2-B307", label: "B-307 ECE Lab 3", x: 115, y: 18, w: 68, h: 58, category: "Lab" },
  { id: "F2-B308", label: "B-308 FE CR1", x: 188, y: 18, w: 68, h: 58, category: "Classroom" },
  { id: "F2-GIRLS", label: "Girls Toilet", x: 261, y: 18, w: 50, h: 58, category: "Washroom" },
  { id: "F2-BOYS", label: "Boys Toilet", x: 355, y: 18, w: 55, h: 58, category: "Washroom" },
  { id: "F2-B310", label: "B-310 ECE Lab 6", x: 415, y: 18, w: 75, h: 58, category: "Lab" },
  { id: "F2-B311", label: "B-311 ECS Lab 5", x: 495, y: 18, w: 80, h: 58, category: "Lab" },
  { id: "F2-B312", label: "B-312 ECS Lab 4", x: 580, y: 18, w: 120, h: 58, category: "Lab" },

  // Right column
  { id: "F2-B313", label: "B-313 ECS Lab 3", x: 630, y: 135, w: 75, h: 110, category: "Lab" },
  { id: "F2-B314", label: "B-314 ECS Project Lab", x: 630, y: 265, w: 75, h: 110, category: "Lab" },

  // Bottom row (left to right)
  { id: "F2-B303", label: "B-303 ECE Lab 2", x: 8, y: 504, w: 75, h: 58, category: "Lab" },
  { id: "F2-B302", label: "B-302 ECE CR2", x: 88, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F2-B301", label: "B-301 ECE CR1", x: 175, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F2-B319", label: "B-319 Girls Common Room", x: 315, y: 504, w: 45, h: 58, category: "Admin" },
  { id: "F2-B318", label: "B-318 ECS Lab-1", x: 365, y: 504, w: 90, h: 58, category: "Lab" },
  { id: "F2-B317", label: "B-317 ECS Lab-2", x: 460, y: 504, w: 90, h: 58, category: "Lab" },
  { id: "F2-B316", label: "B-316 ECS CR2", x: 555, y: 504, w: 70, h: 58, category: "Classroom" },
  { id: "F2-B315", label: "B-315 ECS CR1", x: 630, y: 504, w: 75, h: 58, category: "Classroom" },

  // Left column and center lab
  { id: "F2-B305", label: "B-305 ECE Lab 4", x: 10, y: 115, w: 58, h: 75, category: "Lab" },
  { id: "F2-B304", label: "B-304 ECE Lab 3", x: 10, y: 200, w: 58, h: 75, category: "Lab" },
  { id: "F2-STAFF", label: "Staff Toilet", x: 10, y: 285, w: 58, h: 65, category: "Washroom" },
  { id: "F2-B320", label: "B-320 ECS Lab 4", x: 330, y: 180, w: 70, h: 150, category: "Lab" },
];

export const floor2Nodes = [
  { id: "F2-N0", x: 286, y: 585, type: "Staircase", label: "Front Staircase" },
  { id: "F2-N1", x: 337, y: 480 }, { id: "F2-N2", x: 410, y: 480 },
  { id: "F2-N3", x: 505, y: 480 }, { id: "F2-N4", x: 590, y: 480 }, { id: "F2-N5", x: 668, y: 480 },
  { id: "F2-N6", x: 610, y: 480, type: "Junction" }, { id: "F2-N7", x: 610, y: 320 },
  { id: "F2-N8", x: 610, y: 190 }, { id: "F2-N9", x: 610, y: 95, type: "Junction" },
  { id: "F2-N10", x: 640, y: 95 }, { id: "F2-N11", x: 535, y: 95 }, { id: "F2-N12", x: 452, y: 95 },
  { id: "F2-N13", x: 382, y: 95 }, { id: "F2-N14", x: 333, y: 95, type: "Junction" },
  { id: "F2-N15", x: 286, y: 95 }, { id: "F2-N16", x: 222, y: 95 }, { id: "F2-N17", x: 149, y: 95 },
  { id: "F2-N18", x: 62, y: 95 }, { id: "F2-N19", x: 85, y: 95, type: "Junction" },
  { id: "F2-N20", x: 85, y: 152 }, { id: "F2-N21", x: 85, y: 237 }, { id: "F2-N22", x: 85, y: 317 },
  { id: "F2-N23", x: 85, y: 480, type: "Junction" }, { id: "F2-N24", x: 46, y: 480 },
  { id: "F2-N25", x: 129, y: 480 }, { id: "F2-N26", x: 216, y: 480 }, { id: "F2-N27", x: 315, y: 480, type: "Junction" },
  // The back stair and the two loop junctions are separate nodes.
  { id: "F2-S1", x: 333, y: 74, type: "Staircase", label: "Back Staircase" },
  // Inner loop: it touches the perimeter only at F2-N14 and F2-N27.
  { id: "F2-I0", x: 315, y: 130, type: "Junction" }, { id: "F2-I1", x: 120, y: 130 },
  { id: "F2-I2", x: 600, y: 130 }, { id: "F2-I3", x: 315, y: 255 },
  { id: "F2-I4", x: 120, y: 430 }, { id: "F2-I5", x: 315, y: 430, type: "Junction" },
  { id: "F2-I6", x: 600, y: 430 },
];

export const floor2Edges = [
  // Outer perimeter loop
  ["F2-N0", "F2-N27"], ["F2-N27", "F2-N1"], ["F2-N1", "F2-N2"], ["F2-N2", "F2-N3"], ["F2-N3", "F2-N4"], ["F2-N4", "F2-N5"], ["F2-N5", "F2-N6"],
  ["F2-N6", "F2-N7"], ["F2-N7", "F2-N8"], ["F2-N8", "F2-N9"],
  ["F2-N9", "F2-N10"], ["F2-N10", "F2-N11"], ["F2-N11", "F2-N12"], ["F2-N12", "F2-N13"], ["F2-N13", "F2-N14"], ["F2-N14", "F2-N15"], ["F2-N15", "F2-N16"], ["F2-N16", "F2-N17"], ["F2-N17", "F2-N18"], ["F2-N18", "F2-N19"],
  ["F2-N19", "F2-N20"], ["F2-N20", "F2-N21"], ["F2-N21", "F2-N22"], ["F2-N22", "F2-N23"],
  ["F2-N23", "F2-N24"], ["F2-N24", "F2-N25"], ["F2-N25", "F2-N26"], ["F2-N26", "F2-N0"],
  // Inner loop, with exactly two perimeter junctions: F2-N14 and F2-N27.
  ["F2-N14", "F2-S1"], ["F2-N14", "F2-I0"], ["F2-I0", "F2-I1"], ["F2-I0", "F2-I2"],
  ["F2-I1", "F2-I4"], ["F2-I4", "F2-I5"], ["F2-I5", "F2-I6"], ["F2-I6", "F2-I2"],
  ["F2-I0", "F2-I3"], ["F2-I3", "F2-I5"], ["F2-I5", "F2-N27"],
];

export const floor2RoomToNode = {
  "F2-B306": "F2-N18", "F2-B307": "F2-N17", "F2-B308": "F2-N16", "F2-GIRLS": "F2-N15",
  "F2-BOYS": "F2-N13", "F2-B310": "F2-N12", "F2-B311": "F2-N11", "F2-B312": "F2-N10",
  "F2-B313": "F2-N8", "F2-B314": "F2-N7", "F2-B315": "F2-N5", "F2-B316": "F2-N4",
  "F2-B317": "F2-N3", "F2-B318": "F2-N2", "F2-B319": "F2-N1", "F2-B303": "F2-N24",
  "F2-B302": "F2-N25", "F2-B301": "F2-N26", "F2-B305": "F2-N20", "F2-B304": "F2-N21",
  "F2-STAFF": "F2-N22", "F2-B320": "F2-I3",
};
