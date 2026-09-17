// Coordinates and routing data for the 1st floor, Engineering Building.
// The two atriums are intentionally left out of the graph because they are open-to-below voids.

export const FLOOR_1_WIDTH = 720;
export const FLOOR_1_HEIGHT = 650;

export const floor1Rooms = [
  // Top row, left to right
  { id: "F1-B206A", label: "B-206A Classroom", x: 8, y: 18, w: 70, h: 58, category: "Classroom" },
  { id: "F1-B206B", label: "B-206B Survey Lab", x: 78, y: 18, w: 55, h: 58, category: "Lab" },
  { id: "F1-B206C", label: "B-206C Classroom", x: 135, y: 18, w: 63, h: 58, category: "Classroom" },
  { id: "F1-B207A", label: "B-207A ISRO Lab", x: 200, y: 18, w: 55, h: 58, category: "Lab" },
  { id: "F1-B207B", label: "B-207B Civil Engg Project Lab", x: 255, y: 18, w: 73, h: 58, category: "Lab" },
  { id: "F1-FEMALE-STAFF", label: "Female Staff Toilet", x: 330, y: 17, w: 55, h: 58, category: "Washroom" },
  { id: "F1-BOYS", label: "Boys Toilet", x: 413, y: 17, w: 55, h: 58, category: "Washroom" },
  { id: "F1-B208", label: "B-208 Classroom", x: 470, y: 18, w: 65, h: 58, category: "Classroom" },
  { id: "F1-B209", label: "B-209 CADD Lab", x: 536, y: 18, w: 65, h: 58, category: "Lab" },
  { id: "F1-B210", label: "B-210 Classroom", x: 604, y: 18, w: 109, h: 58, category: "Classroom" },

  // Right side, top to bottom
  { id: "F1-B211", label: "B-211 Drawing Hall-1", x: 638, y: 85, w: 80, h: 170, category: "Classroom" },
  { id: "F1-B212", label: "B-212 Drawing Hall-2", x: 638, y: 258, w: 80, h: 175, category: "Classroom" },
  { id: "F1-B213", label: "B-213 Class Room", x: 638, y: 425, w: 80, h: 130, category: "Classroom" },

  // Bottom row, right to left
  { id: "F1-B214", label: "B-214 Classroom", x: 557, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F1-B215", label: "B-215 Classroom", x: 474, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F1-B216", label: "B-216 Tom Lab", x: 400, y: 504, w: 72, h: 58, category: "Lab" },
  { id: "F1-B217", label: "B-217 Exam Cell", x: 275, y: 504, w: 125, h: 58, category: "Admin" },
  { id: "F1-B201", label: "B-201 Classroom", x: 175, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F1-B202", label: "B-202 Classroom", x: 88, y: 504, w: 82, h: 58, category: "Classroom" },
  { id: "F1-B203", label: "B-203 Classroom", x: 15, y: 504, w: 68, h: 58, category: "Classroom" },

  // Left side, bottom to top
  { id: "F1-CONDUCTION", label: "Conduction Room", x: 1, y: 415, w: 75, h: 60, category: "Admin" },
  { id: "F1-STAFF", label: "Staff Toilet", x: 1, y: 343, w: 75, h: 70, category: "Washroom" },
  { id: "F1-B204", label: "B-204 Engineering Geology Lab", x: 1, y: 222, w: 75, h: 118, category: "Lab" },
  { id: "F1-B205", label: "B-205 Environmental Engineering Lab", x: 1, y: 108, w: 75, h: 112, category: "Lab" },

  // One room group with its only door on the B-218 Staffroom side.
  { id: "F1-MIDDLE-CLUSTER", label: "Civil HOD / B-218 Staffroom", x: 375, y: 110, w: 120, h: 180, category: "Admin" },
  { id: "F1-CONFERENCE", label: "Conference Room", x: 375, y: 295, w: 120, h: 170, category: "Admin" },
];

export const floor1Nodes = [
  { id: "F1-N0", x: 266, y: 585, type: "Staircase", label: "Front Staircase" },
  { id: "F1-N1", x: 320, y: 480 }, { id: "F1-N2", x: 410, y: 480 }, { id: "F1-N3", x: 505, y: 480 },
  { id: "F1-N4", x: 590, y: 480 }, { id: "F1-N5", x: 620, y: 480, type: "Junction" },
  { id: "F1-N6", x: 620, y: 390 }, { id: "F1-N7", x: 620, y: 250 }, { id: "F1-N8", x: 620, y: 95, type: "Junction" },
  { id: "F1-N9", x: 590, y: 95 }, { id: "F1-N10", x: 440, y: 95 }, { id: "F1-N11", x: 358, y: 95 },
  { id: "F1-N12", x: 399, y: 95, type: "Staircase", label: "Back Staircase" }, { id: "F1-N13", x: 350, y: 95 },
  { id: "F1-N14", x: 266, y: 95 }, { id: "F1-N15", x: 195, y: 95 }, { id: "F1-N16", x: 122, y: 95 },
  { id: "F1-N17", x: 49, y: 95 }, { id: "F1-N18", x: 85, y: 95, type: "Junction" },
  { id: "F1-N19", x: 85, y: 210 }, { id: "F1-N20", x: 85, y: 315 }, { id: "F1-N21", x: 85, y: 410 },
  { id: "F1-N22", x: 85, y: 480, type: "Junction" }, { id: "F1-N23", x: 45, y: 480 },
  { id: "F1-N24", x: 130, y: 480 }, { id: "F1-N25", x: 220, y: 480 },
  { id: "F1-M0", x: 365, y: 95, type: "Junction" },
  { id: "F1-C1", x: 365, y: 200, type: "RoomGroup", label: "B-218 Staffroom door" },
  { id: "F1-C2", x: 365, y: 315, type: "RoomGroup", label: "Conference Room door" },
  { id: "F1-M2", x: 365, y: 480, type: "Junction" },
];

export const floor1Edges = [
  ["F1-N0", "F1-N1"], ["F1-N1", "F1-N2"], ["F1-N2", "F1-N3"], ["F1-N3", "F1-N4"], ["F1-N4", "F1-N5"],
  ["F1-N5", "F1-N6"], ["F1-N6", "F1-N7"], ["F1-N7", "F1-N8"], ["F1-N8", "F1-N9"], ["F1-N9", "F1-N10"],
  ["F1-N10", "F1-N12"], ["F1-N12", "F1-N11"], ["F1-N11", "F1-N13"], ["F1-N13", "F1-N14"], ["F1-N14", "F1-N15"],
  ["F1-N15", "F1-N16"], ["F1-N16", "F1-N17"], ["F1-N17", "F1-N18"], ["F1-N18", "F1-N19"], ["F1-N19", "F1-N20"],
  ["F1-N20", "F1-N21"], ["F1-N21", "F1-N22"], ["F1-N22", "F1-N23"], ["F1-N23", "F1-N24"], ["F1-N24", "F1-N25"], ["F1-N25", "F1-N0"],
  // Mid corridor from the Female Staff Toilet side to the Exam Cell side.
  ["F1-N11", "F1-M0"], ["F1-M0", "F1-C1"], ["F1-C1", "F1-C2"], ["F1-C2", "F1-M2"], ["F1-M2", "F1-N1"],
];

export const floor1RoomToNode = {
  "F1-B206A": "F1-N17", "F1-B206B": "F1-N16", "F1-B206C": "F1-N15", "F1-B207A": "F1-N14", "F1-B207B": "F1-N13",
  "F1-FEMALE-STAFF": "F1-N11", "F1-BOYS": "F1-N10", "F1-B208": "F1-N9", "F1-B209": "F1-N9", "F1-B210": "F1-N8",
  "F1-B211": "F1-N7", "F1-B212": "F1-N6", "F1-B213": "F1-N5", "F1-B214": "F1-N4", "F1-B215": "F1-N3",
  "F1-B216": "F1-N2", "F1-B217": "F1-N1", "F1-B201": "F1-N25", "F1-B202": "F1-N24", "F1-B203": "F1-N23",
  "F1-CONDUCTION": "F1-N21", "F1-STAFF": "F1-N21", "F1-B204": "F1-N20", "F1-B205": "F1-N19",
  "F1-MIDDLE-CLUSTER": "F1-C1", "F1-CONFERENCE": "F1-C2",
};