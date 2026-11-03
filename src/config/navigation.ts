export type NavItem = { label: string; href: string };

// The header: both sides of a ride first, then the trust question, then companies and who we are. Every link is a
// page (no jumps within a page), and contact lives in the footer, beside the header's own sign-up button.
export const nav: NavItem[] = [
  { label: "Ride", href: "/how-it-works/" },
  { label: "Drive", href: "/drivers/" },
  { label: "Safety", href: "/safety/" },
  { label: "For companies", href: "/organizations/" },
  { label: "About", href: "/about/" },
];

// The footer repeats the header and adds contact; the legal pages sit apart, by the copyright.
export const footerNav: NavItem[] = [...nav, { label: "Contact", href: "/contact/" }];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];
