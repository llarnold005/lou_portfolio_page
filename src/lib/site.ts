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
  {
    id: "agent",
    title: "AI Agent",
    detail: "A system attempts an action",
    simple:
      "An AI agent asks to read a fictional document using a tool. The question is what it tried to do, and whether it was allowed.",
    technical:
      "Preserve agent, tool, operation, authorization, and source context. The demo uses synthetic event demo-001; no real agents or applications are connected.",
    status: "Conceptual input",
    event: "demo-001 · document.read requested",
  },
  {
    id: "events",
    title: "Activity Events",
    detail: "Capture what happened",
    simple:
      "A record describes the attempted action and its result, giving an investigator something to examine.",
    technical:
      "Collect action and outcome records with stable references. Source integrations and full context capture are architectural direction; collection coverage is not verified.",
    status: "Planned collection model",
    event: "demo-001 · synthetic activity record",
  },
  {
    id: "ingestion",
    title: "Ingestion Pipeline",
    detail: "Move and validate the evidence",
    simple:
      "The record travels through a pipeline that checks whether the required information is present.",
    technical:
      "Java event processing, Kafka integration, event validation, and reliable consumption are owner-described development streams. OCSF-aligned normalization and enrichment are planned; delivery milestones remain unverified.",
    status: "In development / unverified",
    event: "demo-001 · validation simulated",
  },
  {
    id: "analysis",
    title: "Security Analysis",
    detail: "Ask evidence-backed questions",
    simple:
      "An investigator examines the record and its context. A suspicious action is a question to investigate, not proof of harm.",
    technical:
      "Python services are being developed for evidence retrieval, event-reference validation, and findings. Correlation, detections, and agentic orchestration are planned directions. This browser demo runs none of those services.",
    status: "In development / planned",
    event: "demo-001 · illustrative context check",
  },
  {
    id: "findings",
    title: "Investigation Findings",
    detail: "Explain what is known",
    simple:
      "A finding connects an explanation to the evidence and makes uncertainty visible. People still need to review important decisions.",
    technical:
      "The synthetic finding cites demo-001 only. Evidence-backed findings are the product direction; production detections, autonomous remediation, and real investigations are not claimed.",
    status: "Planned output",
    event: "demo-001 · fictional finding, no risk verdict",
  },
];
export const categories = [
  "Engineering",
  "Artificial Intelligence",
  "Policy and Society",
  "The Maverick Perspective",
  "Community and Opportunity",
] as const;
