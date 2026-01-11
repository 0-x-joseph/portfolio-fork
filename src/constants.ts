import { Project, Experience, Education, SkillCategory } from './types';

export const SOCIALS = {
  email: "joseph.bouryal@proton.me",
  github: "https://github.com/0-x-joseph",
  linkedin: "https://linkedin.com/in/youssef-bouryal",
  resume: "/resume.pdf"
};

export const SKILLS: SkillCategory[] = [
  {
    name: "Systems & Protocols",
    skills: ["C", "C++", "Rust (Learning)", "POSIX", "Memory Management", "UNIX Shell"]
  },
  {
    name: "Blockchain & Cryptography",
    skills: ["ECDSA", "Public Key Recovery", "Consensus Logic", "Smart Contract Logic", "Jitcoin Protocol"]
  },
  {
    name: "Backend Infrastructure",
    skills: ["Django REST", "Node.js", "PostgreSQL", "Docker", "Bash Scripting", "API Design"]
  },
  {
    name: "Analytical Finance",
    skills: ["Quantitative Analysis", "Econometrics", "Data Modeling", "Risk Assessment"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-0",
    role: "Software Engineering Scholar",
    company: "1337 Coding School (42 Network)",
    period: "SEP 2024 - PRESENT",
    description: "Engaged in an intensive, peer-to-peer curriculum focused on rebuilding core computer science technologies from scratch.",
    highlights: [
      "Engineered 'Jitcoin', a custom blockchain implementation in C++ to master P2P networking and state validation.",
      "Developed a POSIX-compliant shell (Minishell) in C, implementing process management and recursive descent parsing.",
      "Mastered low-level resource management and algorithmic optimization through project-based mastery."
    ],
    tech: ["C", "C++", "UNIX API", "Algorithms", "Concurrency"]
  },
  {
    id: "exp-1",
    role: "Backend & Systems Developer",
    company: "Freelance / Independent",
    period: "2022 - PRESENT",
    description: "Designing scalable backend architectures and cryptographic tools for decentralized applications.",
    highlights: [
      "Built 'ECDSA Web Wallet', implementing digital signature verification and public key recovery for secure transfers.",
      "Architected 'Sportify', a full-stack tournament management platform using Django REST and Docker.",
      "Developed custom libraries (LibFT) and string manipulation utilities (42sds) to optimize C application performance."
    ],
    tech: ["Python", "Django", "TypeScript", "Cryptography", "Docker"]
  },
  {
    id: "exp-2",
    role: "Financial Systems Analyst",
    company: "Academic Focus (Applied Finance)",
    period: "2021 - 2024",
    description: "Applied quantitative methods and econometric modeling to financial datasets, providing a strong foundation for DeFi protocol design.",
    highlights: [
      "Utilized statistical modeling to analyze market data and execute quantitative risk assessments.",
      "Developed an analytical mindset for audit-ready documentation and precision-critical data handling.",
    ],
    tech: ["Statistics", "Econometrics", "Data Analysis", "Risk Management"]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    degree: "Software Engineering",
    school: "1337 School (42 Network) | Rabat",
    year: "2024 - Present",
    focus: "Low-level C/C++ development, Kernel concepts, and Distributed Systems architecture."
  },
  {
    id: "edu-2",
    degree: "Bachelor’s in Applied Finance",
    school: "Cadi Ayyad University",
    year: "2021 - 2024",
    focus: "Quantitative Analysis, Statistics, and Financial Modeling (Ideal for Blockchain Tokenomics)."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Jitcoin Protocol",
    description: "A high-performance blockchain implementation in C++ designed to explore block validation and consensus mechanisms.",
    role: "Lead Protocol Engineer",
    impact: "Implemented block hashing, chain validation, and local state management for a custom cryptocurrency prototype.",
    tech: ["C++", "Data Structures", "Cryptography", "Systems"],
    featured: true,
    category: "Blockchain",
    github: "https://github.com/0-x-joseph/Jitcoin"
  },
  {
    id: "p2",
    title: "ECDSA Web Wallet",
    description: "A cryptographic authorization system using ECDSA signing and public key recovery to secure asset transfers.",
    role: "Backend Developer",
    impact: "Integrated secure key management and signature recovery logic from Alchemy University curriculum.",
    tech: ["JavaScript", "ECDSA", "Cryptography", "Security"],
    featured: true,
    category: "Blockchain",
    github: "https://github.com/0-x-joseph/ecdsa-web-wallet"
  },
  {
    id: "p3",
    title: "Minishell",
    description: "A custom UNIX shell in C featuring AST parsing, process pipelining, and signal handling.",
    role: "Systems Programmer",
    impact: "Built a recursive descent parser and custom garbage collector for leak-free session management.",
    tech: ["C", "POSIX", "Systems Programming"],
    featured: true,
    category: "Systems",
    github: "https://github.com/0-x-joseph/minishell"
  },
  {
    id: "p4",
    title: "Cub3D Game Engine",
    description: "A 3D raycasting engine written in C using MiniLibX, implementing real-time light physics.",
    role: "Graphics Engineer",
    impact: "Optimized ray-object intersection math to achieve high frame rates on CPU-only rendering.",
    tech: ["C", "Linear Algebra", "Optimization"],
    featured: true,
    category: "Systems",
    github: "https://github.com/0-x-joseph/cub3d"
  },
  {
    id: "p5",
    title: "Sportify Backend",
    description: "RESTful API for sports tournament management with real-time leaderboard calculations.",
    role: "Backend Architect",
    impact: "Containerized the entire Django stack with Docker for consistent production deployment.",
    tech: ["Python", "Django REST", "Docker", "PostgreSQL"],
    featured: false,
    category: "Backend",
    github: "https://github.com/0-x-joseph/sportify"
  }
];
