'use client';

import React, { useMemo, useState } from 'react';
import { motion, Reorder, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Code2,
  Database,
  GitBranch,
  Github,
  GripVertical,
  Layers,
  Network,
  Server,
  Ship,
  Sparkles,
  Terminal,
  Braces,
  Cpu,
  Lock,
  Zap,
  Coins,
  LineChart,
  ShieldCheck,
  FileCode,
} from 'lucide-react';
import { SKILLS } from '../constants';
import { InfiniteSlider } from '../components/InfiniteSlider';
import { DURATION, EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

const SKILL_ICONS: Record<string, LucideIcon> = {
  // Systems & Protocols
  'C': Terminal,
  'C++': Cpu,
  'Rust (Learning)': Zap,
  'POSIX': Terminal,
  'Memory Management': Activity,
  'UNIX Shell': Terminal,
  // Blockchain & Cryptography
  'ECDSA': Lock,
  'Public Key Recovery': ShieldCheck,
  'Consensus Logic': Network,
  'Smart Contract Logic': FileCode,
  'Jitcoin Protocol': Zap,
  // Backend Infrastructure
  'Django REST': Braces,
  'Node.js': Server,
  'PostgreSQL': Database,
  'Docker': Ship,
  'Bash Scripting': Terminal,
  'API Design': Network,
  // Analytical Finance
  'Quantitative Analysis': LineChart,
  'Econometrics': Activity,
  'Data Modeling': Database,
  'Risk Assessment': ShieldCheck,
  // Fallbacks
  Git: GitBranch,
  'GitHub Actions': Github,
};

const CARD_GLOWS = [
  'from-accent/25 via-transparent to-accent-2/20',
  'from-accent-2/20 via-transparent to-accent-3/20',
  'from-accent-3/20 via-transparent to-accent/20',
  'from-accent/25 via-transparent to-accent-3/15',
];

const SKILL_TONES: Record<
  string,
  { icon: string; badge: string; label: string; glow: string }
> = {
  'Systems & Protocols': {
    icon: 'text-accent',
    badge: 'border-accent/40 bg-accent/10',
    label: 'text-accent/80',
    glow: 'from-accent/30 via-transparent to-transparent',
  },
  'Blockchain & Cryptography': {
    icon: 'text-accent-3',
    badge: 'border-accent-3/40 bg-accent-3/10',
    label: 'text-accent-3/80',
    glow: 'from-accent-3/30 via-transparent to-transparent',
  },
  'Backend Infrastructure': {
    icon: 'text-accent-2',
    badge: 'border-accent-2/40 bg-accent-2/10',
    label: 'text-accent-2/80',
    glow: 'from-accent-2/30 via-transparent to-transparent',
  },
  'Analytical Finance': {
    icon: 'text-text-strong',
    badge: 'border-line-strong/70 bg-bg/70',
    label: 'text-text-muted',
    glow: 'from-white/15 via-transparent to-transparent',
  },
};

const DEFAULT_TONE = {
  icon: 'text-text-strong',
  badge: 'border-line-strong/70 bg-bg/70',
  label: 'text-text-muted',
  glow: 'from-white/10 via-transparent to-transparent',
};

const SkillTile = ({ skill, category }: { skill: string; category: string }) => {
  const Icon = SKILL_ICONS[skill] ?? Code2;
  const tone = SKILL_TONES[category] ?? DEFAULT_TONE;

  return (
    <div className="group relative flex h-16 min-w-[240px] items-center gap-3 overflow-hidden rounded-[20px] border border-white/10 bg-bg-elev-2/70 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-bg/70">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${tone.badge}`}>
          <Icon size={16} className={tone.icon} />
        </span>
      </div>
      <div className="relative z-10 flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-text-strong">{skill}</span>
        <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${tone.label}`}>
          {category}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute -inset-0.5 rounded-[20px] bg-gradient-to-r ${tone.glow}`} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />
      </div>
    </div>
  );
};

export const Skills = () => {
  const reduceMotion = useReducedMotion();
  const [skillGroups, setSkillGroups] = useState(() =>
    SKILLS.map((cat) => ({ ...cat, skills: [...cat.skills] }))
  );
  
  const totalSkills = useMemo(
    () => skillGroups.reduce((sum, cat) => sum + cat.skills.length, 0),
    [skillGroups]
  );

  const [rowOne, rowTwo] = useMemo(() => {
    const items = skillGroups.flatMap((cat) =>
      cat.skills.map((skill) => ({ skill, category: cat.name }))
    );
    const first: Array<{ skill: string; category: string }> = [];
    const second: Array<{ skill: string; category: string }> = [];
    items.forEach((item, index) => {
      if (index % 2 === 0) first.push(item);
      else second.push(item);
    });
    return [first, second];
  }, [skillGroups]);

  const handleReorder = (index: number, nextOrder: string[]) => {
    setSkillGroups((prev) =>
      prev.map((cat, i) => (i === index ? { ...cat, skills: nextOrder } : cat))
    );
  };

  return (
    <section id="skills" className="section-shell px-6 py-28 lg:px-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-10 h-64 w-64 rounded-full bg-accent/18 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent-2/18 blur-[120px]" />
        <motion.div
          initial={reduceMotion ? { x: 0 } : { x: '-20%' }}
          animate={reduceMotion ? { x: 0 } : { x: '120%' }}
          transition={reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute top-16 h-px w-1/3 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-60"
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
          <motion.span variants={fadeInUp} className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">02</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-semibold text-text-strong">Technical Arsenal</motion.h2>
          <motion.div variants={revealLine} className="h-px flex-grow bg-gradient-to-r from-line via-accent-3/40 to-line" />
        </div>

        <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
          <span className="flex items-center gap-2">
            <Zap size={12} className="text-accent" />
            {totalSkills} Specialized Modules Online
          </span>
          <span className="h-px w-8 bg-line" />
          <span className="flex items-center gap-2">
            <Coins size={12} className="text-accent-3" />
            Systems + Quantitative Finance
          </span>
        </motion.div>

        {/* Mobile: Interactive Reorderable Lists */}
        <div className="md:hidden grid gap-6">
          {skillGroups.map((cat, index) => {
            const glow = CARD_GLOWS[index % CARD_GLOWS.length];
            return (
              <motion.div
                key={cat.name}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-bg-elev-1/70 p-6 backdrop-blur"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2">{cat.name}</h3>
                </div>
                <Reorder.Group
                  axis="y"
                  values={cat.skills}
                  onReorder={(nextOrder) => handleReorder(index, nextOrder)}
                  className="space-y-3 list-none"
                >
                  {cat.skills.map((skill) => {
                    const Icon = SKILL_ICONS[skill] ?? Code2;
                    return (
                      <Reorder.Item
                        key={skill}
                        value={skill}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-bg/60 px-3 py-2 text-sm font-mono text-text-muted cursor-grab active:cursor-grabbing"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-bg-elev-2/70 text-accent">
                          <Icon size={16} />
                        </span>
                        <span>{skill}</span>
                        <GripVertical size={14} className="ml-auto text-text-muted/60" />
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Infinite Stream Matrix */}
        <motion.div
          variants={fadeInUp}
          className="relative hidden md:block overflow-hidden rounded-[32px] border border-white/10 bg-bg-elev-1/70 p-8 shadow-[2px_8px_40px_rgba(0,0,0,0.45)] backdrop-blur"
        >
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span className="flex items-center gap-2 text-text-strong">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Live protocol matrix stream
              </span>
              <span>Hover to decelerate modules</span>
            </div>

            <div className="space-y-4">
              <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <InfiniteSlider gap={22} duration={38} durationOnHover={80}>
                  {rowOne.map((item) => (
                    <SkillTile key={`${item.category}-${item.skill}`} skill={item.skill} category={item.category} />
                  ))}
                </InfiniteSlider>
              </div>
              <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <InfiniteSlider gap={22} duration={42} durationOnHover={80} reverse>
                  {rowTwo.map((item) => (
                    <SkillTile key={`${item.category}-${item.skill}`} skill={item.skill} category={item.category} />
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
