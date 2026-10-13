// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
// Every section of the site pulls from the objects below. Projects are the
// exception: they are ranked automatically from your GitHub every hour (see
// `github` and `projectNotes`). While `npm run dev` is running, saves here
// hot-reload instantly. Push to GitHub and Vercel redeploys automatically.
//
// Rule of thumb: only put numbers here that you can back up. When you have
// real figures (users, accuracy, cycle time), add them — they're what make
// a project read as impressive.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Shaurya Gupta",
  shortName: "Shaurya",
  role: "Math + CS · Robotics · Builder",
  headline: ["I build robots,", "software, and the", "math underneath."],
  tagline:
    "High school junior in Plainfield, IL. I lead programming for FTC Team 26936, ship SafeSpace — a wellness app for students — and I'm pushing deeper into algorithms, simulation, and research.",
  location: "Plainfield, IL",
  classOf: "Class of 2028",
  availability: "Open to summer 2027 research mentorship",
  email: "emerald12tm@gmail.com",
  // Set to "/resume.pdf" once public/resume.pdf is your real resume.
  // (The current file is a placeholder, so the button stays hidden.)
  resumeUrl: undefined as string | undefined,
  socials: [
    { label: "GitHub", href: "https://github.com/Emerald12tm" },
    // { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "Email", href: "mailto:emerald12tm@gmail.com" },
  ],
};

// Headline numbers in the hero. Facts only.
export const stats = [
  { value: "4.0", label: "Unweighted GPA" },
  { value: "5", label: "FLL seasons led" },
  { value: "Dean's List", label: "FTC Finalist" },
];

// ── Projects ─────────────────────────────────────────────────────────────
// The Projects section ranks every original (non-fork) repo on your GitHub by
// commit history, recent activity, amount of code, and reach (stars, forks,
// a live site). The ranking refreshes every hour, so whatever you're pushing
// to most lately rises to the top on its own.

export const github = {
  user: "Emerald12tm",
  // Repos that should never be featured. Names are case-insensitive.
  hidden: [
    "Shaurya_portfolio", // this site
    "personal_website", // replaced by this site
    "FTC2025", // superseded by FTC-Decode-2025-2026
    "my-first-repo",
    "Copy_Website_Project",
  ],
  // How many repos get the large featured card treatment.
  featured: 2,
  // Max repos shown in total (featured + compact list).
  limit: 6,
};

export type ProjectNote = {
  title: string;
  kicker: string;
  summary: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  image?: string; // path in /public, e.g. "/projects/my-app.png"
};

// Optional hand-written story for a repo, keyed by repo name (lowercase).
// Repos without a note still appear, using their GitHub description.
export const projectNotes: Record<string, ProjectNote> = {
  "ftc-decode-2025-2026": {
    title: "AgileBlast Robot Code",
    kicker: "FTC Team 26936 · DECODE 2025–26",
    summary:
      "Competition software for our FIRST Tech Challenge robot: autonomous path following, vision, and a flywheel launcher, documented so every teammate can learn it and change it.",
    highlights: [
      "Autonomous routines on Pedro Pathing, localized with goBILDA Pinpoint odometry",
      "Limelight 3A vision and IMU integrated into TeleOp and test OpModes",
      "Flywheel launcher with servo-driven hood and gate, fed by an intake and transfer system",
      "17-section TeamCode Guide covering design rationale, debugging, and the bugs we found",
    ],
    stack: ["Java", "Android Studio", "Pedro Pathing", "Limelight 3A"],
  },
  safespace: {
    title: "SafeSpace",
    kicker: "Student wellness web app · Live",
    summary:
      "A calm check-in space for students to pause, breathe, journal, and reset: a few quiet minutes shaped around how they're feeling.",
    highlights: [
      "Mood check-in that steers students toward breathing, journaling, or reset activities",
      "Accounts, private journal history, and password reset on Supabase auth",
      "Presented at Google NYC through All Star Code",
    ],
    stack: ["JavaScript", "Supabase", "Vercel", "HTML/CSS"],
    liveUrl: "https://safespace-ashen.vercel.app",
    image: "/projects/safespace.png",
  },
  adopt_a_dog: {
    title: "Adopt a Dog",
    kicker: "API mashup",
    summary:
      "Pairs two public APIs (Dog CEO and RandomUser) into a browsable grid of adoptable-dog profiles with a detail view.",
    highlights: [],
    stack: ["JavaScript", "REST APIs"],
  },
};

// ── Experience ───────────────────────────────────────────────────────────

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  awards?: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Founder & Team Lead",
    org: "FTC Team 26936 · AgileBlast Robotics",
    dates: "2024 — Present",
    bullets: [
      "Lead programming, mechanical design, and systems integration for the team's competition robot",
      "Built the autonomous and TeleOp software stack in Java: path following, odometry, and vision",
      "Teach teammates Java and robot debugging with REV Hardware Client and Android Studio",
    ],
    awards: ["Dean's List Finalist", "Rookie Sensation Award"],
  },
  {
    role: "Founder & Team Lead",
    org: "AgileBlast FIRST LEGO League",
    dates: "2020 — Present · 5 seasons",
    bullets: [
      "Founded and led a competitive FLL team across five consecutive seasons",
      "Mentor younger students in engineering design, iteration, and SPIKE Prime programming",
    ],
    awards: ["Champions Award", "Innovation Award", "Motivate Award", "Rising All-Star Award"],
  },
  {
    role: "Creator & Developer",
    org: "SafeSpace",
    dates: "2026 — Present",
    bullets: [
      "Designed and shipped a full-stack wellness app for students on Supabase and Vercel",
      "Presented the project to engineers and peers at Google NYC through All Star Code",
    ],
  },
];

export const honors = [
  { title: "FTC Dean's List Finalist", detail: "FIRST Tech Challenge" },
  { title: "Rookie Sensation Award", detail: "FTC Team 26936 · first season" },
  { title: "Champions Award", detail: "FIRST LEGO League" },
  { title: "Innovation, Motivate & Rising All-Star", detail: "FIRST LEGO League" },
  { title: "PCEP Certified", detail: "Python Institute" },
];

// ── Trajectory: what's next ──────────────────────────────────────────────
// Status values: "active" (working on it now), "next" (planned), "done".

export type Milestone = {
  title: string;
  status: "active" | "next" | "done";
  when: string;
  detail: string;
};

export const trajectory: Milestone[] = [
  {
    title: "Fireflyers — multi-drone wildfire simulation",
    status: "active",
    when: "ISEF cycle · 2027",
    detail:
      "A simulation study comparing coordination strategies (nearest fire edge, assigned zones, task bidding) for drones tracking a moving fire front, with spread grounded in NASA FIRMS satellite data.",
  },
  {
    title: "USACO",
    status: "active",
    when: "Silver this season → Gold by Dec 2027",
    detail:
      "Training competitive algorithms and data structures, building on the Java I write every week for FTC.",
  },
  {
    title: "Math beyond single-variable calculus",
    status: "next",
    when: "Summer 2027 →",
    detail: "Calculus, then multivariable calculus or linear algebra, the foundations for ML and robotics.",
  },
  {
    title: "SafeSpace in schools",
    status: "next",
    when: "2026 — 27",
    detail:
      "Bringing in school counselors to design a crisis-escalation process, documenting how minors' data is protected, and entering the Congressional App Challenge (IL-14).",
  },
  {
    title: "Research mentorship",
    status: "next",
    when: "Summer 2027",
    detail:
      "Looking for a lab in robotics, autonomy, or digital mental health where I can contribute to real research.",
  },
];

// ── Skills ───────────────────────────────────────────────────────────────

export const skills = [
  { category: "Languages", items: ["Java", "Python", "JavaScript", "Lua"] },
  {
    category: "Robotics",
    items: ["Pedro Pathing", "Odometry", "Limelight Vision", "REV Hardware Client", "SPIKE Prime"],
  },
  {
    category: "Web & Tools",
    items: ["Supabase", "Vercel", "Android Studio", "VS Code", "Git"],
  },
  { category: "Making", items: ["OnShape CAD", "Bambu Lab 3D Printing"] },
];

// ── Education ────────────────────────────────────────────────────────────

export const education = {
  school: "Plainfield North High School",
  location: "Plainfield, IL",
  graduation: "Class of 2028",
  unweightedGpa: "4.0",
  weightedGpa: "4.8",
  coursework: [
    "AP Computer Science Principles",
    "AP Statistics",
    "AP Physics 1",
    "AP U.S. History",
    "AP English Language",
    "AP Spanish Language",
    "Honors Chemistry",
    "Honors Biology",
    "Precalculus I–II (dual credit)",
  ],
};

export const activities = [
  { name: "Varsity Tennis", detail: "Player, 3 years · Girls' Varsity Manager, 2 years" },
  { name: "Math Team", detail: "Class Leader" },
  { name: "Science Olympiad", detail: "Competitor" },
  { name: "DECA", detail: "Member" },
  { name: "UIUC FLL Robotics", detail: "Volunteer" },
  { name: "Feed My Starving Children", detail: "Volunteer" },
];
