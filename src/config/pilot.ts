// Pilot coverage, taken from the app mocks. [FILL] Confirm against the real pilot.
export const pilot = {
  starts: [
    { name: "Johar Town", covered: true },
    { name: "DHA Phase 5", covered: true },
    { name: "Gulberg III", covered: true },
    { name: "Model Town", covered: true },
    { name: "Garden Town", covered: true },
    { name: "Faisal Town", covered: true },
    { name: "Bahria Town", covered: false },
    { name: "Township", covered: false },
  ],
  destinations: [
    { name: "Arfa Software Technology Park", covered: true },
    { name: "Gulberg Main Boulevard", covered: true },
    { name: "Mall Road", covered: true },
    { name: "Liberty Market", covered: true },
  ],
};

// The last choice in every area picker, for commutes outside the pilot list.
export const otherArea = "Another area";
