import { reveal } from "@/lib/reveal";

const finishGround = { surface: "bg-surface", panel: "bg-panel" };

// Steps along a line: a column on phones, a row from tablet up, with a ring for the last stop.
// `ground` is the colour behind it, so the ring's middle matches.
export function StepTimeline({ steps, ground = "surface" }: { steps: { title: string; text: string }[]; ground?: keyof typeof finishGround }) {
  return (
    <ol className="relative mt-14 grid gap-10 before:absolute before:top-[10px] before:bottom-[10px] before:left-[9px] before:w-[4px] before:rounded-full before:bg-ink md:grid-cols-4 md:gap-8 md:before:top-[9px] md:before:right-[calc(25%-35px)] md:before:bottom-auto md:before:left-[9px] md:before:h-[4px] md:before:w-auto">
      {steps.map((s, i) => (
        <li key={s.title} className="relative pl-12 md:pt-14 md:pl-0" {...reveal(1 + i)}>
          <span aria-hidden="true" className={`absolute top-0 left-0 h-[22px] w-[22px] rounded-full ${i === steps.length - 1 ? `border-[5px] border-ink ${finishGround[ground]}` : "bg-ink"}`} />
          <h3 className="t-title">{s.title}</h3>
          <p className="mt-2">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
