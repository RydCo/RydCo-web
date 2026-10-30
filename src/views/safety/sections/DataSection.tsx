import Link from "next/link";
import { Arrow } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { reveal } from "@/lib/reveal";

export function DataSection() {
  return (
    <Section labelledBy="data-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 id="data-title" className="t-h2 lg:col-span-5" {...reveal(0)}>
          Your data, kept close
        </h2>
        <div className="grid gap-5 lg:col-span-6 lg:col-start-7" {...reveal(1)}>
          <p>Your date of birth and exact saved places stay private. Drivers&rsquo; ID documents are used only for the checks above.</p>
          <p>Documents are kept and deleted under our retention policy, and you can deactivate or delete your account from the app at any time.</p>
          <Link href="/privacy/" className="inline-flex items-center gap-2 py-2 font-semibold underline decoration-2 underline-offset-[6px]">
            Read the privacy policy <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}
