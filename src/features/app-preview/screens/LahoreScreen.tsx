import { Header, Bot, Body } from "./parts";

// Schematic of the pilot across Lahore: homes on the edge, workplaces in the middle, commutes drawn as route lines.
export function LahoreScreen() {
  // [x, y, label side]: each label has its own clear spot so none overlap at phone size.
  const places: Record<string, [number, number, "left" | "right" | "below"]> = {
    "Mall Road": [120, 24, "right"],
    "Liberty Market": [206, 50, "left"],
    "Gulberg Blvd": [160, 82, "right"],
    "Arfa Tower": [96, 108, "left"],
    "Gulberg III": [234, 118, "left"],
    "DHA Phase 5": [226, 170, "left"],
    "Model Town": [170, 142, "right"],
    "Garden Town": [52, 140, "below"],
    "Faisal Town": [122, 194, "right"],
    "Johar Town": [40, 194, "right"],
    Township: [166, 218, "right"],
    "Bahria Town": [24, 222, "right"],
  };
  const routes: [string, string][] = [
    ["Johar Town", "Arfa Tower"],
    ["Garden Town", "Mall Road"],
    ["Faisal Town", "Arfa Tower"],
    ["Model Town", "Gulberg Blvd"],
    ["DHA Phase 5", "Liberty Market"],
    ["Gulberg III", "Liberty Market"],
    ["Bahria Town", "Johar Town"],
    ["Township", "Faisal Town"],
  ];
  const curve = (a: string, b: string) => {
    const [x1, y1] = places[a];
    const [x2, y2] = places[b];
    const mx = (x1 + x2) / 2 + (y2 - y1) * 0.25;
    const my = (y1 + y2) / 2 - (x2 - x1) * 0.25;
    return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
  };
  return (
    <>
      <Header title="Across Lahore" />
      <Body>
        <Bot>The pilot runs across all of Lahore.</Bot>
        <div className="rounded-[20px] bg-screen p-2">
          <svg viewBox="0 0 260 232" className="block h-auto w-full" role="img" aria-label="Map of Lahore with commute routes across the city">
            {routes.map(([a, b]) => (
              <path key={a + b} d={curve(a, b)} className="fill-none stroke-accent" strokeWidth="4.5" strokeLinecap="round" />
            ))}
            {Object.entries(places).map(([name, [x, y, side]]) => {
              const label =
                side === "left"
                  ? { x: x - 9, y: y + 3.5, anchor: "end" as const }
                  : side === "right"
                    ? { x: x + 9, y: y + 3.5, anchor: "start" as const }
                    : { x, y: y + 17, anchor: "middle" as const };
              return (
                <g key={name}>
                  <circle cx={x} cy={y} r="5" className="fill-screen stroke-ink" strokeWidth="2.5" />
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor={label.anchor}
                    className="fill-ink stroke-screen text-[10px] font-semibold"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke" }}
                  >
                    {name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <Bot>Where do you commute?</Bot>
        <div className="rounded-[18px] bg-panel px-3.5 py-2.5 font-semibold">Johar Town → Arfa Tower</div>
      </Body>
    </>
  );
}
