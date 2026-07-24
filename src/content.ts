// ─────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
// Every section of the site pulls from the objects below, so changing
// text/links/projects here is all you need to do. While `npm run dev` is
// running, saves to this file hot-reload the site instantly in your
// browser. Once you push to GitHub, Vercel redeploys automatically.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Your Name",
  role: "High School Senior & Aspiring Software Engineer",
  tagline:
    "Hi, I'm Your Name. High school senior building full-stack web apps and exploring AI.",
  location: "Class of 2026",
  availability: "Seeking summer internships & research opportunities",
  email: "you@example.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "Email", href: "mailto:you@example.com" },
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

export const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A 2-3 sentence overview of the problem this project solves and what you learned building it. Focus on the 'why', not just the 'what'.",
    tags: ["React", "Node.js", "Firebase"],
    liveUrl: "https://your-demo-link.vercel.app",
    repoUrl: "https://github.com/yourusername/project-one",
    image: undefined,
  },
  {
    title: "Project Two",
    description:
      "A short description of a data-driven or algorithmic project — e.g. a Python script that analyzes local data, or something you built for USACO/competitive programming.",
    tags: ["Python", "Pandas"],
    liveUrl: undefined,
    repoUrl: "https://github.com/yourusername/project-two",
    image: undefined,
  },
  {
    title: "Project Three",
    description:
      "A hackathon or collaborative team project. Mention the team, the time constraint, and the award or outcome if there was one.",
    tags: ["JavaScript", "Tailwind CSS", "Hackathon"],
    liveUrl: "https://your-demo-link.vercel.app",
    repoUrl: "https://github.com/yourusername/project-three",
    image: undefined,
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "JavaScript", "C++", "HTML/CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git/GitHub", "VS Code", "Linux", "Firebase", "Figma"],
  },
];

export const coursework = [
  "AP Computer Science A",
  "AP CS Principles",
  "Data Structures",
  "Calculus",
];

export const leadership = [
  {
    role: "President, Coding Club",
    detail: "Lead weekly meetings and organize beginner workshops.",
  },
  {
    role: "FTC/FRC Robotics Team Lead",
    detail: "Manage the programming subteam for the school robotics team.",
  },
  {
    role: "CyberPatriot Member",
    detail: "Compete in national cybersecurity defense competitions.",
  },
];

export const achievements = [
  "USACO Silver Division",
  "Congressional App Challenge — Participant",
  "Local Hackathon Award",
];
