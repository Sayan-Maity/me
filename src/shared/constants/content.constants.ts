/**
 * Single source of truth for the whole site.
 *
 * Everything here is read at build time and baked into static HTML:
 * the rendered page, the JSON-LD graph, /resume.json and /llms.txt all
 * derive from these objects. Edit here, rebuild, done. No runtime fetch.
 */

export const site = {
  url: "https://sayanmaity.in",
  title: "Sayan Maity",
  description:
    "Sayan Maity is a frontend engineer at Zamp in Bengaluru, building agent platforms, real-time systems and design systems with React, Next.js and TypeScript.",
} as const;

export const person = {
  name: "Sayan Maity",
  role: "Software Engineer",
  company: "Zamp",
  location: "Bengaluru, India",
  email: "sayancr777@gmail.com",
  /** Rendered under the name. Deliberately not part of the JSON-LD `name`
      field — agents should get "Sayan Maity" clean. */
  aka: "(people call me syooooon)",
  /** Square portrait rendered in the header. Replace public/portrait.jpg. */
  photo: "/portrait.jpg",
  tagline:
    "I build the product surfaces people use AI agents through. The interfaces, the real time systems that keep them fast, and the design that makes them feel considered.",
  links: {
    github: "https://github.com/Sayan-Maity",
    linkedin: "https://www.linkedin.com/in/sayan-maity-cr7",
    npm: "https://www.npmjs.com/package/sayan-ui",
  },
} as const;

export type Role = {
  title: string;
  type: "Full-time" | "Internship" | "Freelance";
  start: string; // ISO YYYY-MM, used for JSON-LD and resume.json
  end: string | null; // null = current
  dates: string; // human-readable, rendered on the page
  highlights: readonly string[];
};

export type Job = {
  company: string;
  /** Company site. Rendered as a link on the heading and used for JSON-LD. */
  url?: string;
  location?: string;
  roles: readonly Role[];
};

/** Detailed, current work. Rendered in full. */
export const experience: readonly Job[] = [
  {
    company: "Zamp",
    url: "https://www.zamp.ai",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Software Engineer",
        type: "Full-time",
        start: "2025-05",
        end: null,
        dates: "May 2025 — Present",
        highlights: [
          "Built the Agents product end to end: the API layer, creation and permissions flows, tools and dataset access, and sharing.",
          "Designed the real-time task system: an SSE pipeline feeding a normalized store, so task state stays live across every surface.",
          "Led the app-wide dark mode rollout, with a migration path that let the legacy product stay light while the new one went themed.",
          "Built the Playwright E2E infrastructure and the staging and production deploy pipelines; cut build times and fixed memory-pressure failures.",
        ],
      },
      {
        title: "Frontend Engineer",
        type: "Internship",
        start: "2024-09",
        end: "2025-04",
        dates: "Sep 2024 — Apr 2025",
        highlights: [
          "Shipped Audit Trails and the display-config rules engine driving column visibility.",
          "Added multi-dataset support and a shared file-upload component adopted across the app.",
          "Shipped several versions of Zamp's marketing site as the product positioning changed.",
        ],
      },
    ],
  },
  {
    company: "Hashira",
    // Hashira rebranded to Garden; the site now lives at garden.finance.
    url: "https://garden.finance",
    location: "Hyderabad, India",
    roles: [
      {
        title: "Software Engineer",
        type: "Internship",
        start: "2024-07",
        end: "2024-09",
        dates: "Jul 2024 — Sep 2024",
        highlights: [
          "Implemented domain redirection with SIWE authentication, serving 5K+ monthly active users.",
          "Improved Next.js performance 40–50%, optimising LCP, FCP and Speed Index against Lighthouse.",
          "Built Garden-book: 20+ reusable React components adopted across four projects, documented in Storybook.",
        ],
      },
    ],
  },
];

export type EarlyRole = {
  company: string;
  /** One short clause on what was built. Keep to roughly one line. */
  note: string;
  dates: string;
};

/**
 * Earlier internship and freelance work, collapsed into a compact list.
 * Volume stays visible; it does not compete with current work for attention.
 */
export const earlier: readonly EarlyRole[] = [
  // Newest first. Notes are kept to one rendered line — roughly 60
  // characters including the company name — and each opens with a verb.
  {
    company: "Zapit AI",
    note: "Built multiple user-metrics widgets",
    dates: "2024",
  },
  {
    company: "Katalis.ai",
    note: "Integrated DALL·E + LLM generation into dashboards",
    dates: "2023—24",
  },
  {
    company: "Taiyō.AI",
    note: "Built Elasticsearch-backed pages with Kibana",
    dates: "2023",
  },
  {
    company: "Listnr",
    note: "Cut page load 40% with lazy loading across the app",
    dates: "2023",
  },
  {
    company: "Desi QnA",
    note: "Taught 20+ hours of frontend curriculum",
    dates: "2023",
  },
];

/** Personal section. Deliberately short — two paragraphs, no lists. */
export const personal = {
  /** Sits before the quote. */
  before: [
    "I have been investing in Indian equities since college. It started with Rich Dad Poor Dad and turned into a habit of reading about markets and behaviour.",
  ],
  quote: {
    lead: "A line I keep coming back to:",
    text: "The art of being wise is knowing what to overlook.",
    author: "William James",
  },
  /** Sits after the quote. */
  after: [
    "Otherwise I am outdoors. I love playing in teams, football mostly. Sometimes I plan a trek and disappear into the hills for a few days.",
  ],
} as const;

export type SkillGroup = { label: string; items: readonly string[] };

/**
 * Grouped for the rendered page; `skills` below flattens it for JSON-LD
 * knowsAbout and resume.json, so the two can never drift apart.
 */
export type Achievement = {
  text: string;
  dates: string;
  /** Public certificate, where one exists. */
  certificate?: string;
};

export const achievements: readonly Achievement[] = [
  {
    text: "Won the Best-AI hack title in the Diversion hackathon organized by @ACM-IEM (600+ participants)",
    dates: "2024",
    certificate:
      "https://drive.google.com/file/d/1h5U7AGL2P3hVvZrTnNn_MtjAPoCsGqXy/view",
  },
  {
    text: "Secured 3rd position at Interrupt Innovate Iterate hackathon by @IIIT Allahabad (500+ participants)",
    dates: "2023",
    certificate:
      "https://drive.google.com/file/d/1KhpEVulty430_LbtwdGf84HEC7oD2q9x/view",
  },
  {
    text: "Secured 2nd rank out of 600+ students in intraclass Coding Competition @Hack Coders in our college UEM",
    dates: "2023",
  },
  {
    text: "Secured Global rank 4888th out of 21000+ participants in Google Kickstart 2022 Round D competition",
    dates: "2022",
    certificate:
      "https://drive.google.com/file/d/1GnLOEoxs-Y2uB6emKkXTjW60UCyXjIl3/view",
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Core",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "C++"],
  },
  { label: "Styling", items: ["Tailwind CSS", "shadcn/ui", "CSS"] },
  { label: "State", items: ["Zustand", "Redux", "MobX"] },
  {
    label: "Testing",
    items: ["Playwright", "Selenium", "Vitest", "Storybook"],
  },
  { label: "Backend", items: ["Go", "Node.js"] },
  {
    label: "Infra",
    items: [
      "Docker",
      "Temporal",
      "AWS S3",
      "CloudFront",
      "Secrets Manager",
      "Cloudflare",
      "GitHub Actions",
    ],
  },
];

export const skills: readonly string[] = skillGroups.flatMap((g) => g.items);

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "University of Engineering and Management, Kolkata",
  schoolShort: "UEM Kolkata",
  grade: "8.5 CGPA",
} as const;
