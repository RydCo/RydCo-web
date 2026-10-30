// Topics for the contact form. Links can open it with one chosen: /contact/?topic=company#message
export const contactTopics = [
  { id: "riding", label: "Riding with RydCo" },
  { id: "driving", label: "Driving with RydCo" },
  { id: "company", label: "A commute pilot for our company" },
  { id: "partner", label: "Partnering or sponsoring" },
  { id: "safety", label: "Safety, checks or my data" },
  { id: "other", label: "Something else" },
] as const;

export type ContactTopic = (typeof contactTopics)[number]["id"];

export const contactLink = (topic: ContactTopic) => `/contact/?topic=${topic}#message`;
export const pilotEnquiry = contactLink("company");
export const partnerEnquiry = contactLink("partner");
export const safetyEnquiry = contactLink("safety");
