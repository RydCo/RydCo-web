// Lahore areas for the commute pickers. The pilot covers all of Lahore; these are the places people pick from.
// `zone` is the part of the city the pickers group them under, `aliases` are other names people search by, and `at`
// is the area's middle as [latitude, longitude], which the map uses to tell which area a pin is in.
// [FILL] The `at` points are approximate middles; check them on a map before relying on the pin.
export type Area = { name: string; zone: string; at: [number, number]; aliases?: string[] };

const zones = {
  dha: "DHA and Cantt",
  centre: "Gulberg and the centre",
  canal: "Model Town and the Canal",
  johar: "Johar Town and Canal West",
  south: "Raiwind and Multan Road",
  north: "Old City and the north",
};

const dha = (phase: number, at: Area["at"]): Area => ({
  name: `DHA Phase ${phase}`,
  zone: zones.dha,
  at,
  aliases: ["DHA", "Defence", `Defence Phase ${phase}`, `DHA ${phase}`],
});

export const pilot: { starts: Area[]; destinations: Area[] } = {
  starts: [
    { name: "Johar Town", at: [31.4697, 74.2728], zone: zones.johar },
    dha(5, [31.461, 74.41]),
    { name: "Gulberg III", at: [31.5112, 74.344], zone: zones.centre, aliases: ["Gulberg 3", "Gulberg"] },
    { name: "Model Town", at: [31.4835, 74.3255], zone: zones.canal },
    { name: "Garden Town", at: [31.5025, 74.32], zone: zones.canal },
    { name: "Faisal Town", at: [31.479, 74.306], zone: zones.canal },
    dha(1, [31.4795, 74.3895]),
    dha(2, [31.485, 74.414]),
    dha(3, [31.474, 74.378]),
    dha(4, [31.467, 74.392]),
    dha(6, [31.472, 74.449]),
    dha(7, [31.44, 74.46]),
    dha(8, [31.499, 74.45]),
    { name: "Askari", at: [31.51, 74.404], zone: zones.dha, aliases: ["Askari 10", "Askari 11"] },
    { name: "Cantt", at: [31.515, 74.38], zone: zones.dha, aliases: ["Cantonment"] },
    { name: "Cavalry Ground", at: [31.4985, 74.37], zone: zones.dha },
    { name: "Walton", at: [31.489, 74.36], zone: zones.dha },
    { name: "Gulberg II", at: [31.524, 74.348], zone: zones.centre, aliases: ["Gulberg 2", "Gulberg"] },
    { name: "Shadman", at: [31.538, 74.33], zone: zones.centre },
    { name: "Garhi Shahu", at: [31.559, 74.349], zone: zones.centre },
    { name: "Ichhra", at: [31.528, 74.317], zone: zones.centre },
    { name: "Iqbal Town", at: [31.51, 74.285], zone: zones.canal, aliases: ["Allama Iqbal Town"] },
    { name: "Muslim Town", at: [31.517, 74.311], zone: zones.canal },
    { name: "Township", at: [31.45, 74.31], zone: zones.canal },
    { name: "Green Town", at: [31.43, 74.31], zone: zones.canal },
    { name: "Wahdat Colony", at: [31.508, 74.298], zone: zones.canal },
    { name: "Wapda Town", at: [31.438, 74.265], zone: zones.johar, aliases: ["Wapda"] },
    { name: "EME Society", at: [31.438, 74.238], zone: zones.johar, aliases: ["EME"] },
    { name: "PCSIR Housing", at: [31.432, 74.274], zone: zones.johar, aliases: ["PCSIR"] },
    { name: "Valencia", at: [31.417, 74.256], zone: zones.johar },
    { name: "Nasheman-e-Iqbal", at: [31.437, 74.225], zone: zones.johar },
    { name: "Mustafa Town", at: [31.495, 74.27], zone: zones.johar },
    { name: "Sabzazar", at: [31.52, 74.265], zone: zones.johar },
    { name: "Thokar Niaz Baig", at: [31.472, 74.24], zone: zones.johar, aliases: ["Thokar"] },
    { name: "Bahria Town", at: [31.368, 74.185], zone: zones.south, aliases: ["Bahria"] },
    { name: "Lake City", at: [31.384, 74.243], zone: zones.south },
    { name: "Bahria Orchard", at: [31.35, 74.22], zone: zones.south },
    { name: "Samanabad", at: [31.538, 74.3], zone: zones.north },
    { name: "Gulshan-e-Ravi", at: [31.556, 74.285], zone: zones.north },
    { name: "Shahdara", at: [31.623, 74.285], zone: zones.north },
    { name: "Walled City", at: [31.582, 74.315], zone: zones.north, aliases: ["Old City", "Androon Shehar"] },
    { name: "Mughalpura", at: [31.57, 74.37], zone: zones.north },
    { name: "Shalimar", at: [31.585, 74.382], zone: zones.north, aliases: ["Harbanspura"] },
  ],
  destinations: [
    { name: "Arfa Software Technology Park", at: [31.4755, 74.3427], zone: zones.canal, aliases: ["Arfa Tower", "Arfa", "Software Technology Park"] },
    { name: "Gulberg Main Boulevard", at: [31.516, 74.35], zone: zones.centre, aliases: ["Main Boulevard", "Gulberg"] },
    { name: "Mall Road", at: [31.56, 74.33], zone: zones.north, aliases: ["The Mall", "Shahrah-e-Quaid-e-Azam"] },
    { name: "Liberty Market", at: [31.51, 74.344], zone: zones.centre, aliases: ["Liberty"] },
    { name: "MM Alam Road", at: [31.512, 74.351], zone: zones.centre, aliases: ["M.M. Alam", "MM Alam"] },
    { name: "Hafeez Centre", at: [31.516, 74.343], zone: zones.centre },
    { name: "Kalma Chowk", at: [31.504, 74.331], zone: zones.centre },
    { name: "Jail Road", at: [31.537, 74.334], zone: zones.centre },
    { name: "Expo Centre, Johar Town", at: [31.463, 74.265], zone: zones.johar, aliases: ["Expo Centre", "Emporium"] },
    { name: "University of Central Punjab", at: [31.447, 74.268], zone: zones.johar, aliases: ["UCP"] },
    { name: "Punjab University (New Campus)", at: [31.493, 74.296], zone: zones.canal, aliases: ["PU", "Punjab University"] },
    { name: "FAST-NUCES Lahore", at: [31.481, 74.303], zone: zones.canal, aliases: ["FAST", "NUCES"] },
    { name: "Shaukat Khanum Hospital", at: [31.45, 74.257], zone: zones.johar, aliases: ["Shaukat Khanum"] },
    { name: "LUMS", at: [31.471, 74.41], zone: zones.dha, aliases: ["Lahore University of Management Sciences"] },
    { name: "DHA Phase 6 commercial", at: [31.475, 74.456], zone: zones.dha, aliases: ["DHA", "Defence", "CCA"] },
    { name: "Packages Mall", at: [31.47, 74.356], zone: zones.dha, aliases: ["Walton Road"] },
    { name: "GCU Lahore", at: [31.573, 74.311], zone: zones.north, aliases: ["Government College University", "GCU"] },
    { name: "King Edward Medical University", at: [31.576, 74.318], zone: zones.north, aliases: ["KEMU", "Mayo Hospital"] },
    { name: "UET Lahore", at: [31.577, 74.357], zone: zones.north, aliases: ["UET", "Engineering University"] },
    { name: "Sundar Industrial Estate", at: [31.32, 74.17], zone: zones.south, aliases: ["Sundar", "Raiwind Road"] },
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

// The areas as picker options, grouped under their part of the city, in the order the zones are listed above.
const zoneOrder = Object.values(zones);
const options = (list: Area[]) =>
  [...list]
    .sort((a, b) => zoneOrder.indexOf(a.zone) - zoneOrder.indexOf(b.zone))
    .map((a) => ({ value: a.name, label: a.name, keywords: a.aliases, group: a.zone }));

// The two ends of a commute, worded the same in every picker and in the waitlist's sign-up email. `areas` are what the
// picker lists (ending with Another area); `places` are the areas themselves, for the map, and `mapTitle` heads it.
export const commuteEnds = {
  from: { label: "I start in", areas: withOther(options(pilot.starts)), places: pilot.starts, mapTitle: "Where do you start?" },
  to: { label: "I’m headed to", areas: withOther(options(pilot.destinations)), places: pilot.destinations, mapTitle: "Where are you headed?" },
};
export const areaPlaceholder = "Choose an area";

function withOther<T>(list: T[]) {
  return [...list, { value: otherArea, label: otherArea, hint: "Tell us where", always: true }];
}

// What the map says. The pin is never stored or sent: only the name of the area it lands in.
export const areaMap = {
  open: (end: string) => `Find “${end}” on the map`,
  search: { placeholder: "Search for an area", noMatch: (typed: string) => `No area matches “${typed}”. Move the map to find it.`, found: areaSearch.found },
  loading: "Loading the map…",
  notListed: "Not on our list yet: tell us where in the form",
  confirm: "Use this area",
  other: otherArea,
  locate: "Go to my location",
  locateFailed: "We couldn’t find your location. Move the map instead.",
  close: "Close the map",
};
