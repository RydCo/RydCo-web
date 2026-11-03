import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { safetyEnquiry } from "@/config/contact";

export function QuestionSection() {
  return (
    <CtaBand
      id="safety-q-title"
      title="A question about safety?"
      lead="Write to us and a person will answer. During a trip, use SOS or Report in the app."
      actions={<Button href={safetyEnquiry}>Send us a message</Button>}
    />
  );
}
