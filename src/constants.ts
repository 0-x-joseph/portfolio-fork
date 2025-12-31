import { Project, Experience, Education, SkillCategory, Metric } from './types';

export const SOCIALS = {
  email: "eammarpro@gmail.com",
  github: "https://github.com/is-ammar",
  linkedin: "https://linkedin.com/in/is-ammar",
  resume: "/resume.pdf"
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Security & Systems",
    skills: ["Linux", "Networking", "C", "C++", "Python"]
  },
  {
    name: "Backend & Systems",
    skills: ["FastAPI", "Django", "Node.js", "NestJS", "PostgreSQL", "MongoDB"]
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS"]
  },
  {
    name: "DevOps & Cloud",
    skills: ["AWS", "Docker", "Kubernetes", "Git", "GitHub Actions"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-0",
    role: "Full-Stack & Security Engineer",
    company: "Freelance / Consultant",
    period: "2025 - Present",
    description: "Architecting secure full-stack products and hardening backend services for real-world traffic and threat models.",
    highlights: [
      "Designed security-first APIs with strong auth, rate limiting, and audit logging.",
      "Shipped responsive full-stack applications with observability and hardened defaults.",
      "Consulted on vulnerability triage, hardening reviews, and incident-ready runbooks."
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Linux"]
  },
  {
    id: "exp-1",
    role: "Board Member | Recruiter | Web Player | DFIR Player",
    company: "M4SEC Team",
    period: "2024 - Present",
    description: "Elite academic CTF team representing 1337 Coding School in Rabat (UM6P / 42 Network). Driving recruitment, competitive strategy, and hands-on participation across web security and DFIR tracks.",
    highlights: [
      "Ranked #1 in Morocco for the 2025 season and #135 worldwide on CTFtime (late 2025).",
      "Placed top 10 in major CTFs, including CyberSphere CTF (1st, 2024), L3akCTF (4th, 2024), DeadSec CTF (5th, 2024), RSTCON CTF (4th, 2025), and FortID CTF (6th, 2025).",
      "Coordinated recruiting, onboarding, and category specialization across web, DFIR, and incident response playbooks."
    ],
    tech: ["Web Security", "DFIR", "Incident Response", "CTF Strategy", "Linux", "Networking"]
  },
  {
    id: "exp-2",
    role: "Software Engineering Scholar",
    company: "1337 School (42 Network)",
    period: "2024 - Present",
    description: "Engaged in an intensive, project-based curriculum focused on system programming, networking, and advanced algorithms.",
    highlights: [
      "Built a custom Unix shell, a 3D ray-tracing engine, and a multi-threaded web server from scratch in C.",
      "Mastered low-level memory management and the POSIX API through peer-evaluated projects.",
      "Collaborated in a high-pressure, zero-instruction environment to solve algorithmic puzzles."
    ],
    tech: ["C", "C++", "Unix API", "Multithreading", "Algorithms"]
  },
  {
    id: "exp-3",
    role: "Navigation Systems Lead",
    company: "Royal Navy / Maritime Sector",
    period: "2022 - 2024",
    description: "Managed mission-critical navigation systems and real-time telemetry data in high-stakes environments.",
    highlights: [
      "Orchestrated complex sensor networks ensuring 99.9% operational uptime.",
      "Led cross-functional teams to execute high-precision maneuvers in dynamic environments.",
      "Performed real-time debugging and anomaly resolution on critical system hardware/software."
    ],
    tech: ["Systems Monitoring", "Incident Response", "Real-time Telemetry", "Navigation Software"]
  },
  {
    id: "exp-4",
    role: "Technical Analyst (Intern)",
    company: "Royal Navy / Maritime Sector",
    period: "2020 - 2022",
    description: "Supported the maintenance and calibration of integrated bridge systems and data telemetry.",
    highlights: [
      "Analyzed data telemetry to optimize operational trajectories.",
      "Collaborated on hardware-software interfacing and maintenance protocols.",
      "Maintained exhaustive technical documentation under international regulatory standards."
    ],
    tech: ["Data Analysis", "Integrated Systems", "Compliance"]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    degree: "Software Engineering",
    school: "1337 School (42 Network)",
    year: "2024 - Present",
    focus: "Deep dive into low-level C/C++, Unix kernel concepts, and algorithmic optimization."
  },
  {
    id: "edu-2",
    degree: "Maritime Professional Certifications",
    school: "Royal Navy / Maritime Training Center",
    year: "2020 - 2023",
    focus: "Technical specialization in naval operations and system safety.",
    certifications: [
      "Brevet Élémentaire en Navigation (B.E)",
      "Certificat Maritime Militaire (Military Maritime Qualification)",
      "Certificat de Spécialité Maritime (Specialized Technical Training)"
    ]
  },
  {
    id: "edu-3",
    degree: "Economics and Management",
    school: "University Hassan I",
    year: "2019 - 2021",
    focus: "Quantitative analysis, management theory, and strategic decision-making."
  },
  {
    id: "edu-4",
    degree: "High School Diploma",
    school: "Scientific Stream",
    year: "2019"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p8",
    title: "Minishell",
    description: "A comprehensive Unix shell built in C, featuring a custom AST parser, process pipelining, and automated memory management.",
    role: "System Programmer",
    impact: "Engineered a recursive descent parser and a custom garbage collector to handle complex command execution and leak-free session management.",
    tech: ["C", "Unix API", "POSIX Signals", "Process Management"],
    featured: true,
    category: "Software Engineering",
    github: "https://github.com/Is-Ammar/MINI-SHELL"
  },
  {
    id: "p7",
    title: "Wordle Clone",
    description: "A feature-rich Wordle implementation with daily challenges, persistent game state, and advanced letter-scoring algorithms.",
    role: "Frontend Dev",
    impact: "Engineered a robust state machine to handle animations, virtual keyboard sync, and daily solution fetching.",
    tech: ["React", "TypeScript", "LocalStorage", "CSS3 Animations"],
    featured: true,
    category: "Web",
    github: "https://github.com/is-ammar/wordle"
  },
  {
    id: "p3",
    title: "BioGuide",
    description: "A full-stack platform for visualizing structured biomedical data with interactive dashboards and advanced search tooling.",
    role: "Full-Stack Dev",
    impact: "Built a high-performance data engine for real-time visualization of PMC research corpora.",
    tech: ["React", "Node.js", "MongoDB", "D3.js", "Tailwind"],
    featured: true,
    category: "Web",
    github: "https://github.com/Is-Ammar/BioGuide"
  },
  {
    id: "p4",
    title: "LANG-ME",
    description: "A modern educational hub integrating external APIs for real-time dictionary lookups, book discovery, and curated learning resources.",
    role: "Frontend Dev",
    impact: "Engineered a responsive, API-driven architecture using CSS Grid and modular React components.",
    tech: ["React", "Styled Components", "REST APIs", "CSS Grid"],
    featured: false,
    category: "Web",
    github: "https://github.com/is-ammar/lang-me"
  },
  {
    id: "p5",
    title: "Cloud_Wishes CTF challenge",
    description: "A gamified web security challenge featuring hidden telemetry data, URL manipulation, and API exploitation.",
    role: "Security Researcher / Developer",
    impact: "Designed a multi-stage puzzle involving Base64 decoding, broken access control, and logic flaws.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    featured: true,
    category: "Security",
    github: "https://github.com/is-ammar/Cloud_Wishes"
  },
  {
    id: "p6",
    title: "Cloud Wishlist server",
    description: "A Node.js security challenge backend featuring token-based authentication, rate limiting, and Base64 obfuscation.",
    role: "Backend Dev / Security Designer",
    impact: "Implemented a multi-layered verification system with environment-driven CORS and state-based rate limiting.",
    tech: ["Node.js", "Express", "CORS", "Buffer"],
    featured: false,
    category: "Security",
    github: "https://github.com/is-ammar/server"
  },
  {
    id: "p9",
    title: "Dining Philosophers",
    description: "A multi-threaded simulation of the classic synchronization problem, implementing deadlock prevention and thread safety in C.",
    role: "System Developer",
    impact: "Solved the Circular Wait condition using an asymmetric resource acquisition strategy, ensuring 100% thread safety and starvation monitoring.",
    tech: ["C", "pthreads", "Mutexes", "Synchronization"],
    featured: false,
    category: "Software Engineering",
    github: "https://github.com/Is-Ammar/PHILOSOPHERS"
  },
  {
    id: "p10",
    title: "miniRT",
    description: "A CPU-driven ray tracing engine that simulates light physics to render 3D scenes with shadows, reflections, and Phong shading.",
    role: "Graphics Engineer",
    impact: "Developed a custom 3D math library for vector/matrix operations and implemented an optimized ray-object intersection algorithm.",
    tech: ["C", "MiniLibX", "Linear Algebra", "Ray Tracing"],
    featured: true,
    category: "Graphics & Simulation",
    github: "https://github.com/Is-Ammar/miniRT"
  },
  {
    id: "p11",
    title: "React Chess Engine",
    description: "A high-performance chess engine integrated into a React web app, featuring a Minimax search with Alpha-Beta pruning.",
    role: "Full-Stack Developer",
    impact: "Engineered a strategic engine (~1400 ELO) capable of real-time positional evaluation and draw negotiation.",
    tech: ["React", "TypeScript", "Minimax Algorithm", "Tailwind CSS"],
    featured: true,
    category: "Software Engineering",
    github: "https://github.com/Is-Ammar/ichess"
  },
  {
    id: "p12",
    title: "Fract-ol",
    description: "A high-performance fractal rendering engine in C capable of visualizing infinite sets like Mandelbrot, Julia, and Tricorn in real-time.",
    role: "Graphics Programmer",
    impact: "Implemented smooth mouse-centered zooming and optimized escape-time algorithms to maintain high frame rates during exploration.",
    tech: ["C", "MiniLibX", "Complex Mathematics", "Computer Graphics"],
    featured: false,
    category: "Graphics & Simulation",
    github: "https://github.com/Is-ammar/fract-ol"
  },
  {
    id: "p13",
    title: "Push_Swap",
    description: "An optimized sorting algorithm that sorts data across two stacks using a restricted instruction set, achieving O(n log n) complexity.",
    role: "Algorithm Developer",
    impact: "Engineered a chunk-based pre-sorting strategy that sorts 500 numbers in under 5500 operations (Top-tier efficiency).",
    tech: ["C", "Algorithms", "Data Structures", "Complexity Analysis"],
    featured: false,
    category: "Software Engineering",
    github: "https://github.com/Is-ammar/push_swap"
  },
  {
    id: "p14",
    title: "Push_Swap Utility Tester",
    description: "An automated Python testing suite that validates sorting logic, benchmarks instruction counts, and identifies edge-case failures.",
    role: "QA / Automation Engineer",
    impact: "Automated the validation of 1000+ random permutations, ensuring the algorithm stays within the 5500-move limit for 500 integers.",
    tech: ["Python", "Subprocess", "CLI Testing", "Randomization"],
    featured: false,
    category: "DevOps & Utilities",
    github: "https://github.com/Is-ammar/push_swap_tester"
  }
];
