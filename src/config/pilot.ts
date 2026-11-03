// Lahore areas for the commute pickers. `zone` is the part of the city the picker shows under each name, `aliases` are
// other names people search by, and `at` is the area's middle as [latitude, longitude], which the map uses to tell
// which area a pin is in. Only `covered` areas are in the pilot.
// [FILL] Confirm coverage with the pilot routes. Areas added beyond the first pilot list start as not covered.
// [FILL] The `at` points are approximate middles; check them on a map before relying on the pin.
export type Area = { name: string; zone: string; at: [number, number]; covered: boolean; aliases?: string[] };

const zones = {
  dha: "DHA and Cantt",
  centre: "Gulberg and the centre",
  canal: "Model Town and the Canal",
  johar: "Johar Town and Canal West",
  south: "Raiwind and Multan Road",
  north: "Old City and the north",
};

const dha = (phase: number, at: Area["at"], covered = false): Area => ({
  name: `DHA Phase ${phase}`,
  zone: zones.dha,
  at,
  covered,
  aliases: ["DHA", "Defence", `Defence Phase ${phase}`, `DHA ${phase}`],
});

export const pilot: { starts: Area[]; destinations: Area[] } = {
  starts: [
    { name: "Johar Town", at: [31.4697, 74.2728], zone: zones.johar, covered: true },
    dha(5, [31.461, 74.41], true),
    { name: "Gulberg III", at: [31.5112, 74.344], zone: zones.centre, covered: true, aliases: ["Gulberg 3", "Gulberg"] },
    { name: "Model Town", at: [31.4835, 74.3255], zone: zones.canal, covered: true },
    { name: "Garden Town", at: [31.5025, 74.32], zone: zones.canal, covered: true },
    { name: "Faisal Town", at: [31.479, 74.306], zone: zones.canal, covered: true },
    dha(1, [31.4795, 74.3895]),
    dha(2, [31.485, 74.414]),
    dha(3, [31.474, 74.378]),
    dha(4, [31.467, 74.392]),
    dha(6, [31.472, 74.449]),
    dha(7, [31.44, 74.46]),
    dha(8, [31.499, 74.45]),
    { name: "Askari", at: [31.51, 74.404], zone: zones.dha, covered: false, aliases: ["Askari 10", "Askari 11"] },
    { name: "Cantt", at: [31.515, 74.38], zone: zones.dha, covered: false, aliases: ["Cantonment"] },
    { name: "Cavalry Ground", at: [31.4985, 74.37], zone: zones.dha, covered: false },
    { name: "Walton", at: [31.489, 74.36], zone: zones.dha, covered: false },
    { name: "Gulberg II", at: [31.524, 74.348], zone: zones.centre, covered: false, aliases: ["Gulberg 2", "Gulberg"] },
    { name: "Shadman", at: [31.538, 74.33], zone: zones.centre, covered: false },
    { name: "Garhi Shahu", at: [31.559, 74.349], zone: zones.centre, covered: false },
    { name: "Ichhra", at: [31.528, 74.317], zone: zones.centre, covered: false },
    { name: "Iqbal Town", at: [31.51, 74.285], zone: zones.canal, covered: false, aliases: ["Allama Iqbal Town"] },
    { name: "Muslim Town", at: [31.517, 74.311], zone: zones.canal, covered: false },
    { name: "Township", at: [31.45, 74.31], zone: zones.canal, covered: false },
    { name: "Green Town", at: [31.43, 74.31], zone: zones.canal, covered: false },
    { name: "Wahdat Colony", at: [31.508, 74.298], zone: zones.canal, covered: false },
    { name: "Wapda Town", at: [31.438, 74.265], zone: zones.johar, covered: false, aliases: ["Wapda"] },
    { name: "EME Society", at: [31.438, 74.238], zone: zones.johar, covered: false, aliases: ["EME"] },
    { name: "PCSIR Housing", at: [31.432, 74.274], zone: zones.johar, covered: false, aliases: ["PCSIR"] },
    { name: "Valencia", at: [31.417, 74.256], zone: zones.johar, covered: false },
    { name: "Nasheman-e-Iqbal", at: [31.437, 74.225], zone: zones.johar, covered: false },
    { name: "Mustafa Town", at: [31.495, 74.27], zone: zones.johar, covered: false },
    { name: "Sabzazar", at: [31.52, 74.265], zone: zones.johar, covered: false },
    { name: "Thokar Niaz Baig", at: [31.472, 74.24], zone: zones.johar, covered: false, aliases: ["Thokar"] },
    { name: "Bahria Town", at: [31.368, 74.185], zone: zones.south, covered: false, aliases: ["Bahria"] },
    { name: "Lake City", at: [31.384, 74.243], zone: zones.south, covered: false },
    { name: "Bahria Orchard", at: [31.35, 74.22], zone: zones.south, covered: false },
    { name: "Samanabad", at: [31.538, 74.3], zone: zones.north, covered: false },
    { name: "Gulshan-e-Ravi", at: [31.556, 74.285], zone: zones.north, covered: false },
    { name: "Shahdara", at: [31.623, 74.285], zone: zones.north, covered: false },
    { name: "Walled City", at: [31.582, 74.315], zone: zones.north, covered: false, aliases: ["Old City", "Androon Shehar"] },
    { name: "Mughalpura", at: [31.57, 74.37], zone: zones.north, covered: false },
    { name: "Shalimar", at: [31.585, 74.382], zone: zones.north, covered: false, aliases: ["Harbanspura"] },
  ],
  destinations: [
    { name: "Arfa Software Technology Park", at: [31.4755, 74.3427], zone: zones.canal, covered: true, aliases: ["Arfa Tower", "Arfa", "Software Technology Park"] },
    { name: "Gulberg Main Boulevard", at: [31.516, 74.35], zone: zones.centre, covered: true, aliases: ["Main Boulevard", "Gulberg"] },
    { name: "Mall Road", at: [31.56, 74.33], zone: zones.north, covered: true, aliases: ["The Mall", "Shahrah-e-Quaid-e-Azam"] },
    { name: "Liberty Market", at: [31.51, 74.344], zone: zones.centre, covered: true, aliases: ["Liberty"] },
    { name: "MM Alam Road", at: [31.512, 74.351], zone: zones.centre, covered: false, aliases: ["M.M. Alam", "MM Alam"] },
    { name: "Hafeez Centre", at: [31.516, 74.343], zone: zones.centre, covered: false },
    { name: "Kalma Chowk", at: [31.504, 74.331], zone: zones.centre, covered: false },
    { name: "Jail Road", at: [31.537, 74.334], zone: zones.centre, covered: false },
    { name: "Expo Centre, Johar Town", at: [31.463, 74.265], zone: zones.johar, covered: false, aliases: ["Expo Centre", "Emporium"] },
    { name: "University of Central Punjab", at: [31.447, 74.268], zone: zones.johar, covered: false, aliases: ["UCP"] },
    { name: "Punjab University (New Campus)", at: [31.493, 74.296], zone: zones.canal, covered: false, aliases: ["PU", "Punjab University"] },
    { name: "FAST-NUCES Lahore", at: [31.481, 74.303], zone: zones.canal, covered: false, aliases: ["FAST", "NUCES"] },
    { name: "Shaukat Khanum Hospital", at: [31.45, 74.257], zone: zones.johar, covered: false, aliases: ["Shaukat Khanum"] },
    { name: "LUMS", at: [31.471, 74.41], zone: zones.dha, covered: false, aliases: ["Lahore University of Management Sciences"] },
    { name: "DHA Phase 6 commercial", at: [31.475, 74.456], zone: zones.dha, covered: false, aliases: ["DHA", "Defence", "CCA"] },
    { name: "Packages Mall", at: [31.47, 74.356], zone: zones.dha, covered: false, aliases: ["Walton Road"] },
    { name: "GCU Lahore", at: [31.573, 74.311], zone: zones.north, covered: false, aliases: ["Government College University", "GCU"] },
    { name: "King Edward Medical University", at: [31.576, 74.318], zone: zones.north, covered: false, aliases: ["KEMU", "Mayo Hospital"] },
    { name: "UET Lahore", at: [31.577, 74.357], zone: zones.north, covered: false, aliases: ["UET", "Engineering University"] },
    { name: "Sundar Industrial Estate", at: [31.32, 74.17], zone: zones.south, covered: false, aliases: ["Sundar", "Raiwind Road"] },
  ],
};

// The last choice in every area picker, for commutes outside the list. It stays in view whatever is searched.
const otherArea = "Another area";

// What the area pickers' search says.
export const areaSearch = {
  placeholder: "Search areas…",
  noMatch: (typed: string) => `No area matches “${typed}”. Use it as you typed it, or choose ${otherArea}.`,
  found: (count: number) => `${count} ${count === 1 ? "area" : "areas"} found`,
  useTyped: (typed: string) => `Use “${typed}”`,
  typedHint: "Not on our list yet",
};

export const inPilot = "In the pilot";
export const notCovered = "Not covered yet";

const withOther = (list: Area[]) => [
  ...list.map((a) => ({ value: a.name, label: a.name, hint: a.zone, keywords: a.aliases, group: a.covered ? inPilot : notCovered })),
  { value: otherArea, label: otherArea, hint: "Tell us where", group: notCovered, always: true },
];

// What the area pickers offer, grouped by whether the pilot reaches them: the pilot first.
const startAreas = withOther(pilot.starts);
const destinationAreas = withOther(pilot.destinations);

// The two ends of a commute, worded the same in every picker and in the waitlist's sign-up email. `places` are the
// areas themselves, for the map; `mapTitle` heads it.
export const commuteEnds = {
  from: { label: "I start in", areas: startAreas, places: pilot.starts, mapTitle: "Where do you start?" },
  to: { label: "I’m headed to", areas: destinationAreas, places: pilot.destinations, mapTitle: "Where are you headed?" },
};

// What the map says. The pin is never stored or sent: only the name of the area it lands in.
export const areaMap = {
  row: "Choose on map",
  rowHint: "Not sure of the name? Find it on the map",
  help: "Move the map to put the pin on your area. We keep only the area’s name, never the exact spot.",
  loading: "Loading the map…",
  nearest: "Your pin is in",
  none: "None of our areas is near here",
  noneHint: "Choose it anyway and tell us where in the form.",
  use: (name: string) => `Use ${name}`,
  useOther: `Use ${otherArea}`,
  other: otherArea,
  locate: "Go to my location",
  locateFailed: "We couldn’t find your location. Move the map instead.",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  close: "Close the map",
};
export const areaPlaceholder = "Choose an area";
