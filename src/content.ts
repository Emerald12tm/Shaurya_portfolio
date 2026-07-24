// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
// Every section of the site pulls from the objects below, so changing
// text/links/projects here is all you need to do. While `npm run dev` is
// running, saves to this file hot-reload the site instantly in your
// browser. Once you push to GitHub, Vercel redeploys automatically.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Shaurya Gupta",
  role: "High School Junior & Aspiring Software Engineer",
  tagline:
    "Hi, I'm Shaurya. High school junior building full-stack web apps, leading a robotics team, and exploring AI.",
  location: "Class of 2028",
  availability: "Seeking summer internships & research opportunities",
  email: "emerald12tm@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Emerald12tm" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Email", href: "mailto:emerald12tm@gmail.com" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string; // path in /public, e.g. "/projects/my-app.png"
};

// TODO: swap these placeholders for your real projects — none were provided yet.
export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A 2-3 sentence overview of the problem this project solves and what you learned building it. Focus on the 'why', not just the 'what'.",
    tags: ["React", "Node.js", "Firebase"],
    liveUrl: "https://your-demo-link.vercel.app",
    repoUrl: "https://github.com/Emerald12tm/project-one",
    image: undefined,
  },
  {
    title: "Project Two",
    description:
      "A short description of a data-driven or algorithmic project — e.g. a Python script that analyzes local data, or something you built for USACO/competitive programming.",
    tags: ["Python", "Pandas"],
    liveUrl: undefined,
    repoUrl: "https://github.com/Emerald12tm/project-two",
    image: undefined,
  },
  {
    title: "Project Three",
    description:
      "A hackathon or collaborative team project. Mention the team, the time constraint, and the award or outcome if there was one.",
    tags: ["JavaScript", "Tailwind CSS", "Hackathon"],
    liveUrl: "https://your-demo-link.vercel.app",
    repoUrl: "https://github.com/Emerald12tm/project-three",
    image: undefined,
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
  award?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Founder & Team Lead",
    org: "FTC Team 26936, AgileBlast Robotics",
    dates: "2024 – Present",
    bullets: [
      "Founded and directed a First Tech Challenge robotics team, overseeing programming, mechanical design, and systems integration",
      "Diagnose and resolve hardware/software issues using REV Hardware Client and Android Studio",
      "Coach team members in Java programming and core robotics engineering principles",
    ],
    award: "Rookie Sensation Award",
  },
  {
    role: "Founder & Team Lead",
    org: "AgileBlast FLL Team",
    dates: "2020 – Present · 5 Seasons",
    bullets: [
      "Founded and have led a FIRST Lego League competitive team across five consecutive seasons",
      "Mentor students in engineering design, iterative problem-solving, and SPIKE Prime programming",
    ],
    award: "Champions Award, Innovation Award, Motivate Award, Rising All-Star Award",
  },
  {
    role: "Technology Support",
    org: "Independent",
    dates: "Ongoing",
    bullets: [
      "Troubleshoot devices, software, and applications for teachers and family members",
      "Translate complex technical issues into clear, accessible guidance for non-technical users",
      "Perform Windows installations, system imaging, and hardware component replacement",
    ],
  },
];

export const skills = [
  {
    category: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "Lua"],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Android Studio",
      "VS Code",
      "REV Hardware Client",
      "OnShape CAD",
      "LEGO SPIKE Prime",
      "Bambu Lab 3D Printing",
      "Microsoft Office Suite",
      "Google Workspace",
    ],
  },
  {
    category: "Hardware",
    items: [
      "Windows Installation & System Imaging",
      "PC Hardware Repair & Component Replacement",
      "Hardware Diagnostics & Troubleshooting",
    ],
  },
  {
    category: "Certifications",
    items: [
      "Google AI Essentials Certification",
      "Python Certified Entry-Level Programmer (PCEP)",
    ],
  },
];

export const education = {
  school: "Plainfield North High School",
  location: "Plainfield, IL",
  graduation: "Expected May 2028",
  weightedGpa: "5.88 / 5.0",
  unweightedGpa: "5.0 / 5.0",
  honor: "National Junior Honor Society — President",
};

export const activities = [
  "National Junior Honor Society — President",
  "Math Team — Class Leader",
  "DECA",
  "Science Olympiad",
  "Feed My Starving Children — Volunteer",
  "UIUC FLL Robotics — Volunteer",
  "Religious Service — Volunteer",
];

export const coreCompetencies = [
  "Excellent written & verbal communication",
  "Customer-focused mindset",
  "Calm under pressure",
  "High confidentiality & responsibility",
  "Rapid learner",
];
