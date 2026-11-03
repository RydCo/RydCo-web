import { Plus } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { riderCancelAnswer } from "@/config/rules";
import { reveal } from "@/lib/reveal";

const questions = [
  {
    q: "Is RydCo a taxi?",
    a: "No. RydCo is cost-sharing. Drivers are commuters going your way anyway, and everyone in the car splits the fuel. Drivers earn back their fuel cost, not a fare.",
  },
  {
    q: "How much will I pay?",
    a: "The app shows your share before you request. It depends on the distance, the car and the fuel price, and it goes down if another rider joins.",
  },
  {
    q: "What if I need to cancel?",
    a: riderCancelAnswer,
  },
  {
    q: "What if the driver cancels?",
    a: "You owe nothing, and you can find another ride straight away.",
  },
  {
    q: "Can I book my whole week?",
    a: "Yes. Request a repeating commute and the driver confirms the dates that work. You can skip a single date or cancel all future dates.",
  },
  {
    q: "Where does RydCo work?",
    a: "Anywhere in Lahore during the pilot. More cities come after it.",
  },
];

export function QuestionsSection() {
  return (
    <Section ground="panel" id="questions" labelledBy="questions-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="questions-title" className="t-h2 lg:col-span-4" {...reveal(0)}>
          Good to know
        </h2>
        <div className="grid gap-2 lg:col-span-8" {...reveal(1)}>
          {questions.map((item) => (
            <details key={item.q} className="group rounded-surface bg-surface px-6 py-5 md:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[20px] font-bold md:text-[22px] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="grid h-10 w-10 flex-none place-items-center rounded-full bg-panel transition-transform duration-200 group-open:rotate-45">
                  <Plus />
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] pb-1">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
