export function FormError({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="alert" className="mt-4 rounded-[20px] bg-cream p-4 font-semibold">
      That didn&rsquo;t send. Check your connection and try again, or email us at rydcoapp@gmail.com.
    </p>
  );
}

// Shown when no form endpoint is set yet and the visitor's email app opened with their details instead.
export function MailNote({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="status" className="mt-4 rounded-[20px] bg-cream p-4 font-semibold">
      Your email app should open with your details filled in. Press send and you&rsquo;re done.
    </p>
  );
}
