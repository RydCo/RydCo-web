import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function RidersSection() {
  return (
    <Section ground="apricot" labelledBy="riders-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <h2 id="riders-title" className="t-h2 lg:col-span-6" {...reveal(0)}>
          Every rider is phone verified
        </h2>
        <div className="grid gap-5 lg:col-span-5 lg:col-start-8" {...reveal(1)}>
          <p>
            Every account starts with a Pakistani mobile number and a code sent to it by SMS. We call it &ldquo;Phone verified&rdquo;, never &ldquo;identity
            verified&rdquo;, because that is all it confirms.
          </p>
          <p>Your number is never shown to other users. Others see only your first name and the area you start from, never your exact address.</p>
        </div>
      </div>
    </Section>
  );
}
