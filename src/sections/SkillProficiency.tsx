'use client';

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Shield,
  Server,
  Cpu,
  Coins,
  Terminal,
  Network,
  Database,
  Ship,
  GitBranch,
  Github,
  Code2,
  Lock,
  LineChart,
  Zap,
} from 'lucide-react';
import { SKILLS } from '../constants';
import { DURATION, EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ');

// Calibrated for Youssef Bouryal's specific profile
const SKILL_PROFICIENCY: Record<string, number> = {
  'C': 96,
  'C++': 92,
  'Rust (Learning)': 68,
  'POSIX': 88,
  'Memory Management': 94,
  'UNIX Shell': 90,
  'ECDSA': 85,
  'Public Key Recovery': 82,
  'Consensus Logic': 78,
  'Smart Contract Logic': 72,
  'Jitcoin Protocol': 88,
  'Django REST': 86,
  'Node.js': 84,
  'PostgreSQL': 82,
  'Docker': 86,
  'Bash Scripting': 92,
  'API Design': 85,
  'Quantitative Analysis': 90,
  'Econometrics': 84,
  'Data Modeling': 86,
  'Risk Assessment': 82,
};

const CATEGORY_TONES: Record<
  string,
  { icon: string; badge: string; label: string; bar: string; glow: string }
> = {
  'Systems & Protocols': {
    icon: 'text-accent',
    badge: 'border-accent/40 bg-accent/10',
    label: 'text-accent/80',
    bar: 'from-accent via-accent-2/70 to-accent-3/50',
    glow: 'from-accent/30 via-transparent to-transparent',
  },
  'Blockchain & Cryptography': {
    icon: 'text-accent-3',
    badge: 'border-accent-3/40 bg-accent-3/10',
    label: 'text-accent-3/80',
    bar: 'from-accent-3 via-accent/60 to-accent-2/50',
    glow: 'from-accent-3/30 via-transparent to-transparent',
  },
  'Backend Infrastructure': {
    icon: 'text-accent-2',
    badge: 'border-accent-2/40 bg-accent-2/10',
    label: 'text-accent-2/80',
    bar: 'from-accent-2 via-accent/70 to-accent-3/40',
    glow: 'from-accent-2/30 via-transparent to-transparent',
  },
  'Analytical Finance': {
    icon: 'text-text-strong',
    badge: 'border-line-strong/70 bg-bg/70',
    label: 'text-text-muted',
    bar: 'from-text-strong via-accent/50 to-accent-2/50',
    glow: 'from-white/20 via-transparent to-transparent',
  },
};

const DEFAULT_TONE = {
  icon: 'text-text-strong',
  badge: 'border-line-strong/70 bg-bg/70',
  label: 'text-text-muted',
  bar: 'from-text-strong via-accent/40 to-accent-2/40',
  glow: 'from-white/15 via-transparent to-transparent',
};

const SKILL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'C': Terminal,
  'C++': Terminal,
  'Rust (Learning)': Cpu,
  'POSIX': Terminal,
  'Memory Management': Cpu,
  'UNIX Shell': Terminal,
  'ECDSA': Lock,
  'Public Key Recovery': Shield,
  'Consensus Logic': Network,
  'Smart Contract Logic': Code2,
  'Jitcoin Protocol': Zap,
  'Django REST': Server,
  'Node.js': Server,
  'PostgreSQL': Database,
  'Docker': Ship,
  'Bash Scripting': Terminal,
  'API Design': Network,
  'Quantitative Analysis': LineChart,
  'Econometrics': LineChart,
  'Data Modeling': Database,
  'Risk Assessment': Shield,
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Systems & Protocols': Cpu,
  'Blockchain & Cryptography': Shield,
  'Backend Infrastructure': Server,
  'Analytical Finance': Coins,
};

const EXTRA_SKILLS = [
  'P2P Networking',
  'Merkle Tree Implementation',
  'Deterministic Execution',
  'Memory Alignment',
  'Tokenomics Design',
  'Time-Series Analysis',
  'Lock-free Concurrency',
  'CI/CD Workflows',
  'GDB Debugging',
];

export const SkillProficiency = () => {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamically map buttons based on your actual SKILLS constant
  const CATEGORY_BUTTONS = useMemo(() => [
    { id: 'All', label: 'All Skills', icon: Code2 },
    ...SKILLS.map((category) => ({
      id: category.name,
      label: category.name,
      icon: CATEGORY_ICONS[category.name] ?? Code2,
    })),
  ], []);

  const SKILL_TO_CATEGORY = useMemo(() => SKILLS.reduce<Record<string, string>>((acc, category) => {
    category.skills.forEach((skill) => {
      acc[skill] = category.name;
    });
    return acc;
  }, {}), []);

  const ALL_SKILLS = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    SKILLS.forEach((category) => {
      category.skills.forEach((skill) => {
        if (!seen.has(skill)) {
          seen.add(skill);
          ordered.push(skill);
        }
      });
    });
    return ordered;
  }, []);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return ALL_SKILLS;
    const category = SKILLS.find((item) => item.name === activeCategory);
    return category?.skills ?? [];
  }, [activeCategory, ALL_SKILLS]);

  return (
    <section id="skill-proficiency" className="section-shell px-6 py-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-accent/15 blur-[140px]" />
        <div className="absolute bottom-0 left-[-6%] h-72 w-72 rounded-full bg-accent-3/15 blur-[140px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto max-w-[1600px]"
      >
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <motion.span variants={fadeInUp} className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            03
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-semibold text-text-strong">
            Technical Specs
          </motion.h2>
          <motion.div variants={revealLine} className="h-px flex-grow bg-gradient-to-r from-line via-accent/40 to-line" />
        </div>

        <motion.div variants={fadeInUp} className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-bg-elev-1/70 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur transition-all duration-500 hover:border-accent/30">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span className="flex items-center gap-2 text-text-strong">
                <Terminal size={12} className="text-accent" />
                Operational Readiness Report
              </span>
              <span className="h-px w-8 bg-line/70" />
              <span>Calibrated for Infrastructure</span>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-text-muted leading-relaxed">
              My technical core is forged through the rigorous <span className="text-accent">1337 school</span> systems curriculum. 
              I combine low-level C/C++ memory mastery with quantitative finance to architect high-performance, 
              deterministic blockchain protocols.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-bg-elev-2/70 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span>Stack coverage</span>
              <span className="text-text-strong">{ALL_SKILLS.length} modules loaded</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">
              {SKILLS.map((category) => (
                <span key={category.name} className={cn('rounded-full border px-3 py-1', CATEGORY_TONES[category.name]?.badge ?? DEFAULT_TONE.badge)}>
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categories Navigation */}
        <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap items-center gap-3">
          {CATEGORY_BUTTONS.map((category) => {
            const isActive = activeCategory === category.id;
            const tone = CATEGORY_TONES[category.id] ?? DEFAULT_TONE;
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-[0.3em] transition-all duration-300',
                  isActive ? 'bg-bg text-text-strong shadow-glow' : 'border-line-strong/70 bg-bg-elev-1/70 text-text-muted'
                )}
              >
                <Icon size={14} className={tone.icon} />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div key={activeCategory} variants={staggerContainer} initial="initial" animate="animate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const category = SKILL_TO_CATEGORY[skill] ?? 'General';
            const tone = CATEGORY_TONES[category] ?? DEFAULT_TONE;
            const Icon = SKILL_ICONS[skill] ?? Code2;
            const proficiency = SKILL_PROFICIENCY[skill] ?? 75;

            return (
              <motion.div key={skill} variants={fadeInUp} className="group relative rounded-[24px] border border-white/10 bg-bg-elev-1/70 p-5 backdrop-blur transition-all hover:border-accent/30">
                <div className="flex items-start gap-4 relative z-10">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl border', tone.badge)}>
                    <Icon size={18} className={tone.icon} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-text-strong">{skill}</h3>
                      <span className="text-xs font-mono text-text-muted">{proficiency}%</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-bg/70 border border-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${proficiency}%` }} 
                        className={cn('h-full bg-gradient-to-r', tone.bar)} 
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Blockchain Methodologies Section */}
        <motion.div variants={fadeInUp} className="mt-12 rounded-[28px] border border-white/10 bg-bg-elev-2/70 p-6 backdrop-blur">
          <div className="mb-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
            <span>Specialized Protocols & Methods</span>
            <span className="text-text-strong flex items-center gap-2"><Lock size={12}/> Network Integrity</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {EXTRA_SKILLS.map((skill) => (
              <span key={skill} className="rounded-full border border-line/70 bg-bg/60 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
