'use client';

import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Github,
  Layers,
  LayoutDashboard,
  Network,
  PenTool,
  Server,
  Ship,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { DURATION, EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

const cn = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(' ');

const SKILL_PROFICIENCY: Record<string, number> = {
  C: 95,
  'C++': 85,
  JavaScript: 90,
  TypeScript: 90,
  Python: 60,
  React: 90,
  'Next.js': 90,
  'React Native': 75,
  'Tailwind CSS': 88,
  'Node.js': 80,
  FastAPI: 60,
  Django: 55,
  MongoDB: 78,
  'OpenAI API': 80,
  PyTorch: 78,
  AWS: 80,
  Docker: 85,
  Git: 88,
  'GitHub Actions': 76,
  Linux: 95,
};

const SKILL_CATEGORIES: Record<string, string[]> = {
  'AI & ML': ['Python', 'OpenAI API', 'PyTorch'],
  Languages: ['C', 'C++', 'JavaScript', 'TypeScript'],
  Frontend: ['React', 'Next.js', 'React Native', 'Tailwind CSS'],
  Backend: ['Node.js', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB'],
  'DevOps & Tools': ['AWS', 'Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'Linux'],
};

const CATEGORY_TONES: Record<
  string,
  { icon: string; badge: string; label: string; bar: string; glow: string }
> = {
  'AI & ML': {
    icon: 'text-accent',
    badge: 'border-accent/40 bg-accent/10',
    label: 'text-accent/80',
    bar: 'from-accent via-accent-2/70 to-accent-3/50',
    glow: 'from-accent/30 via-transparent to-transparent',
  },
  Languages: {
    icon: 'text-accent-2',
    badge: 'border-accent-2/40 bg-accent-2/10',
    label: 'text-accent-2/80',
    bar: 'from-accent-2 via-accent/70 to-accent-3/40',
    glow: 'from-accent-2/30 via-transparent to-transparent',
  },
  Frontend: {
    icon: 'text-accent-3',
    badge: 'border-accent-3/40 bg-accent-3/10',
    label: 'text-accent-3/80',
    bar: 'from-accent-3 via-accent/60 to-accent-2/50',
    glow: 'from-accent-3/30 via-transparent to-transparent',
  },
  Backend: {
    icon: 'text-accent',
    badge: 'border-accent/40 bg-accent/10',
    label: 'text-accent/80',
    bar: 'from-accent via-accent-2/70 to-accent-3/40',
    glow: 'from-accent/25 via-transparent to-transparent',
  },
  'DevOps & Tools': {
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
  C: Terminal,
  'C++': Terminal,
  JavaScript: Code2,
  TypeScript: Code2,
  Python: Terminal,
  React: LayoutDashboard,
  'Next.js': LayoutDashboard,
  'React Native': LayoutDashboard,
  'Tailwind CSS': PenTool,
  'Node.js': Server,
  FastAPI: Network,
  Django: Layers,
  PostgreSQL: Database,
  MongoDB: Database,
  RAG: Network,
  'OpenAI API': Sparkles,
  LangChain: BrainCircuit,
  PyTorch: Cpu,
  AWS: Cloud,
  Docker: Ship,
  Kubernetes: Ship,
  Git: GitBranch,
  'GitHub Actions': Github,
  Linux: Terminal,
};

const CATEGORY_BUTTONS = [
  { id: 'All', label: 'All Skills', icon: Code2 },
  { id: 'AI & ML', label: 'AI & ML', icon: BrainCircuit },
  { id: 'Languages', label: 'Languages', icon: Code2 },
  { id: 'Frontend', label: 'Frontend', icon: LayoutDashboard },
  { id: 'Backend', label: 'Backend', icon: Server },
  { id: 'DevOps & Tools', label: 'DevOps & Tools', icon: PenTool },
];

const SKILL_TO_CATEGORY = Object.entries(SKILL_CATEGORIES).reduce<Record<string, string>>(
  (acc, [category, skills]) => {
    skills.forEach((skill) => {
      acc[skill] = category;
    });
    return acc;
  },
  {}
);

const ALL_SKILLS = (() => {
  const seen = new Set<string>();
  const ordered: string[] = [];
  Object.values(SKILL_CATEGORIES).forEach((skills) => {
    skills.forEach((skill) => {
      if (!seen.has(skill)) {
        seen.add(skill);
        ordered.push(skill);
      }
    });
  });
  return ordered;
})();

const EXTRA_SKILLS = [
  'System Design',
  'CI/CD Pipelines',
  'Observability',
  'Threat Modeling',
  'API Security',
  'Performance Tuning',
  'Distributed Systems',
  'Technical Documentation',
  'Agile Delivery',
];

export const SkillProficiency = () => {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return ALL_SKILLS;
    return SKILL_CATEGORIES[activeCategory] ?? [];
  }, [activeCategory]);

  return (
    <section id="skill-proficiency" className="section-shell px-6 py-28 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-accent/15 blur-[140px]" />
        <div className="absolute bottom-0 left-[-6%] h-72 w-72 rounded-full bg-accent-3/15 blur-[140px]" />
        <motion.div
          initial={reduceMotion ? { x: 0 } : { x: '-25%' }}
          animate={reduceMotion ? { x: 0 } : { x: '120%' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 h-px w-2/3 bg-gradient-to-r from-transparent via-accent-2/40 to-transparent opacity-60"
        />
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
            Skill Proficiency
          </motion.h2>
          <motion.div variants={revealLine} className="h-px flex-grow bg-gradient-to-r from-line via-accent/40 to-line" />
        </div>

        <motion.div variants={fadeInUp} className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-bg-elev-1/70 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span className="flex items-center gap-2 text-text-strong">
                <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
                Signal strength report
              </span>
              <span className="h-px w-8 bg-line/70" />
              <span>Updated quarterly</span>
            </div>
            <p className="mt-6 max-w-2xl text-sm text-text-muted leading-relaxed">
              A calibrated view of the tools I use to ship reliable systems. Percentages reflect real-world usage,
              project depth, and delivery confidence across production environments.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-bg-elev-2/70 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span>Coverage</span>
              <span className="text-text-strong">{ALL_SKILLS.length} signals tracked</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">
              {Object.keys(SKILL_CATEGORIES).map((category) => {
                const tone = CATEGORY_TONES[category] ?? DEFAULT_TONE;
                return (
                  <span
                    key={category}
                    className={cn('rounded-full border px-3 py-1', tone.badge)}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
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
                  isActive
                    ? `border-transparent bg-bg text-text-strong shadow-[0_0_0_1px_rgba(255,255,255,0.2)]`
                    : 'border-line-strong/70 bg-bg-elev-1/70 text-text-muted hover:text-text-strong',
                  isActive && tone.badge
                )}
              >
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border', tone.badge)}>
                  <Icon size={14} className={tone.icon} />
                </span>
                {category.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSkills.map((skill) => {
            const category = SKILL_TO_CATEGORY[skill] ?? 'General';
            const tone = CATEGORY_TONES[category] ?? DEFAULT_TONE;
            const Icon = SKILL_ICONS[skill] ?? Code2;
            const proficiency = Math.min(100, Math.max(55, SKILL_PROFICIENCY[skill] ?? 75));

            return (
              <motion.div
                key={`${activeCategory}-${skill}`}
                variants={fadeInUp}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: DURATION.sm, ease: EASE_OUT }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-bg-elev-1/70 p-5 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur"
              >
                <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className={cn('absolute -inset-0.5 bg-gradient-to-r', tone.glow)} />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />
                </div>

                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-bg/70">
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-lg border', tone.badge)}>
                      <Icon size={18} className={tone.icon} />
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-text-strong">{skill}</h3>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">
                        {proficiency}%
                      </span>
                    </div>

                    <div className="relative mt-3 h-2 overflow-hidden rounded-full border border-white/5 bg-bg/70">
                      <motion.div
                        className={cn('absolute inset-y-0 left-0 rounded-full bg-gradient-to-r', tone.bar)}
                        initial={{ width: 0 }}
                        whileInView={reduceMotion ? undefined : { width: `${proficiency}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1, ease: EASE_OUT }}
                        style={reduceMotion ? { width: `${proficiency}%` } : undefined}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">
                      <span>Proficiency</span>
                      <span className={tone.label}>{category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 rounded-[28px] border border-white/10 bg-bg-elev-2/70 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.04)_inset] backdrop-blur"
        >
          <div className="mb-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
            <span>Additional skill systems</span>
            <span className="text-text-strong">Operational readiness</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {EXTRA_SKILLS.map((skill) => (
              <motion.span
                key={skill}
                className="rounded-full border border-line/70 bg-bg/60 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted transition-colors"
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
