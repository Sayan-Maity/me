/**
 * Single source of truth for the whole site.
 *
 * Everything here is read at build time and baked into static HTML:
 * the rendered page, the JSON-LD graph, /resume.json and /llms.txt all
 * derive from these objects. Edit here, rebuild, done. No runtime fetch.
 */

export const site = {
  url: "https://sayanmaity.com",
  title: "Sayan Maity — Frontend Engineer",
  description:
    "Sayan Maity is a frontend engineer at Zamp in Bengaluru, building agent platforms, real-time systems and design systems with React, Next.js and TypeScript.",
} as const;

export const person = {
  name: "Sayan Maity",
  role: "Software Engineer",
  company: "Zamp",
  location: "Bengaluru, India",
  email: "sayan@zamp.ai",
  tagline:
    "I build product surfaces for AI agents — the interfaces, the real-time plumbing underneath them, and the design systems that keep them coherent.",
  links: {
    github: "https://github.com/Sayan-Maity",
    linkedin: "https://www.linkedin.com/in/sayan-maity-756b8b202",
    npm: "https://www.npmjs.com/package/sayan-ui",
    resume: "/resume.pdf",
  },
} as const;

/** Short-form "what I'm doing right now". Recruiters and agents read this first. */
export const now: readonly string[] = [
  "Most of my time goes to the Agents product at Zamp — the API layer, the creation and permissions flows, and the SSE pipeline that keeps task state live across every surface.",
  "Lately I have been deep in performance and platform work: build times, end-to-end test infrastructure, and a design system that had to survive a dark-mode migration without breaking the legacy product.",
  "Open to frontend and full-stack roles.",
];

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
          "Built the Agents feature end to end, across frontend and backend: the API layer, listing with search and filter, detail pages, the creation flow, tools-access and dataset-grant management, and sharing. On the backend, added task-count endpoints, agent-aware task attribution, and permission-aware bulk actions.",
          "Designed the real-time task system — an SSE event pipeline (parse, guard, classify, resolve, plan) feeding a normalized task-list store, so task state stays live and consistent across every surface.",
          "Led the app-wide dark mode rollout: semantic color tokens, a refreshed palette, and a migration path that let the legacy product stay light-mode while the new product went fully themed.",
          "Built the Playwright end-to-end test infrastructure and the staging and production auto-deploy pipelines; integrated AWS Secrets Manager; cut build times and resolved memory-pressure failures; drove supply-chain security response and added automated audit checks with Slack alerting.",
          "Led the AG Grid to TanStack Table migration — column resizing, drag-reordering, virtualization and pinned panes — shipped as a sequenced multi-part rollout.",
        ],
      },
      {
        title: "Frontend Engineer",
        type: "Internship",
        start: "2024-09",
        end: "2025-04",
        dates: "Sep 2024 — Apr 2025",
        highlights: [
          "Shipped Audit Trails.",
          "Built the display-config rules engine, including column-hiding logic driven by display rules.",
          "Added multi-dataset support and toggle-driven multi-header configuration.",
          "Built a shared FileUploaderWrapper component adopted across the app.",
          "Added lazy loading across multiple APIs to cut initial page load.",
          "Shipped three to four versions of Zamp's marketing website, iterating on design and content as the product positioning evolved.",
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
          "Implemented domain redirection with SIWE authentication, serving over 5K monthly active users.",
          "Improved Next.js app performance by 40–50%, optimising LCP, FCP and Speed Index against Lighthouse.",
          "Built Garden-book, a component library in React, TypeScript and Tailwind — 20+ reusable components adopted across four projects, documented and tested through Storybook.",
          "Built the Quest page frontend end to end, with Zustand for state management.",
          "Refactored the WBTC-Garden landing page and built animated components in Garden-kiosk and WBTC-Garden with GSAP.",
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
  // Notes are kept to one rendered line — roughly 60 characters including
  // the company name. Lead with the metric where there is one.
  {
    company: "Katalis.ai",
    note: "DALL·E + LLM image generation, admin dashboards",
    dates: "2023—24",
  },
  {
    company: "Taiyō.AI",
    note: "Elasticsearch-backed pages, embedded Kibana",
    dates: "2023",
  },
  {
    company: "Listnr",
    note: "40% faster page load; +30% engagement",
    dates: "2023",
  },
  {
    company: "Desi QnA",
    note: "Taught 20+ hours of frontend curriculum",
    dates: "2023",
  },
  // TODO(sayan): one concrete clause, ideally with a number.
  { company: "Zapit AI", note: "TODO", dates: "2023" },
];

export const skills: readonly string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Zustand",
  "Chakra UI",
  "TanStack Table",
  "Playwright",
  "Node.js",
];

export const education = {
  degree: "B.Tech, Computer Science and Engineering",
  school: "University of Engineering and Management, Kolkata",
  schoolShort: "UEM Kolkata",
  grade: "8.5 CGPA",
} as const;
