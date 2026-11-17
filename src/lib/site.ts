import { z } from "zod";
const origin = process.env.SITE_URL || "http://localhost:3000";
export const site = {
  name: "The Maverick Builder",
  publication: "The Builders’ Voice",
  brand: "nMaverick",
  personName: "", // Add your public name before enabling Person structured data.
  url: z.url().parse(origin).replace(/\/$/, ""),
  description:
    "Cybersecurity engineering, independent thinking, and technology that serves people. Build. Envision. Challenge. Empower.",
  portrait: null as null | { src: string; alt: string },
  socials: [] as {
    label: "GitHub" | "LinkedIn" | "Substack" | "Instagram";
    url: string;
  }[],
};
export const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Writing", "/writing"],
  ["Work", "/work"],
  ["Impact", "/impact"],
  ["Contact", "/contact"],
] as const;
export const pillars = [
  {
    number: "01",
    name: "Engineer",
    verb: "Build with intention.",
    text: "Designing and securing complex systems. From cloud infrastructure to the emerging boundaries of AI.",
    href: "/work",
  },
  {
    number: "02",
    name: "Futurist",
    verb: "Look beyond the horizon.",
    text: "Exploring how emerging technology reshapes work, institutions, and human possibility.",
    href: "/ideas",
  },
  {
    number: "03",
    name: "Maverick",
    verb: "Question the defaults.",
    text: "Independent thinking about technology, power, and the assumptions we inherit.",
    href: "/writing",
  },
  {
    number: "04",
    name: "Advocate",
    verb: "Open the door wider.",
    text: "Connecting technical progress to education, access, and meaningful economic opportunity.",
    href: "/impact",
  },
];
export const career = [
  {
    title: "Cloud & enterprise security",
    detail:
      "Experience working with cloud infrastructure, enterprise environments, and SaaS security.",
  },
  {
    title: "Architecture & technical leadership",
    detail:
      "An engineering perspective on secure systems and the responsibility of technical decisions.",
  },
  {
    title: "AI security & emerging systems",
    detail:
      "An ongoing focus on how agentic systems can be observed, understood, and secured.",
  },
]; // Add verified dates and employers here when ready.
export const milestones: {
  title: string;
  date: string;
  description: string;
}[] = [];
export const initiativeSchema = z.object({
  name: z.string(),
  mission: z.string(),
  location: z.string(),
  status: z.enum(["Exploring", "In development", "Active", "Completed"]),
  description: z.string(),
  outcomes: z.array(z.string()),
  images: z.array(z.object({ src: z.string(), alt: z.string() })),
  relatedWriting: z.array(z.string()),
  participate: z.string(),
});
export const initiatives = z.array(initiativeSchema).parse([]);
export const ideas: {
  title: string;
  date: string;
  kind: string;
  body: string;
}[] = [];
export const projects = [
  {
    slug: "the-resistance",
    title: "The Resistance",
    eyebrow: "AI SECURITY / OBSERVABILITY",
    summary: "Making AI actions visible, understandable, and investigable.",
    status: "In development",
    href: "/work/the-resistance",
  },
];
export const architecture = [
  { title: "AI activity", detail: "Tools, agents, applications" },
  { title: "Event collection", detail: "Capture the evidence" },
  { title: "Processing", detail: "Validate & normalize" },
  { title: "Investigation", detail: "Correlate & examine" },
  { title: "Findings", detail: "Explain with evidence" },
];
export const categories = [
  "Engineering",
  "Artificial Intelligence",
  "Policy and Society",
  "The Maverick Perspective",
  "Community and Opportunity",
] as const;
