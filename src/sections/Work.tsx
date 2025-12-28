import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { DURATION, EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

export const Work = () => {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Web' | 'Sys' | 'Sec' | 'Gfx'>('All');
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => {
        if (filter === 'AI') return p.category === 'AI';
        if (filter === 'Web') return p.category === 'Web';
        if (filter === 'Sec') return p.category === 'Security';
        if (filter === 'Gfx') return p.category === 'Graphics & Simulation';
        if (filter === 'Sys') return ['System', 'Infra', 'Software Engineering', 'DevOps & Utilities'].includes(p.category);
        return false;
    });

  return (
    <section id="work" className="section-shell px-6 py-28 lg:px-12">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-[1600px]"
      >
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <motion.span variants={fadeInUp} className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">03</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-semibold text-text-strong">Selected Work</motion.h2>
            <motion.div variants={revealLine} className="h-px w-16 bg-gradient-to-r from-line via-accent-3/40 to-line" />
          </div>

          <motion.div variants={fadeInUp} className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <Filter size={14} className="mr-2 shrink-0 text-accent-3/70" />
            {['All', 'AI', 'Web', 'Sys', 'Sec', 'Gfx'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f as any)}
                className={`rounded-full border px-4 py-2 text-[11px] font-mono uppercase tracking-[0.3em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                  filter === f
                    ? 'border-accent bg-accent/10 text-accent shadow-glow'
                    : 'border-line/70 bg-bg-elev-1/70 text-text-muted hover:bg-bg-elev-1/90 hover:text-text-strong'
                }`}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: DURATION.sm, ease: EASE_OUT }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-bg-elev-1/80 p-6 pt-10 shadow-card transition-all ${
                  p.featured ? 'border-accent/40' : 'border-line/70 hover:border-accent/40'
                }`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-10 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%)]" />
                </div>

                {p.featured && (
                  <div className="absolute top-4 left-4 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-accent">
                    Featured
                  </div>
                )}

                <div className={`relative z-10 mb-4 flex items-start justify-between ${p.featured ? 'mt-8' : 'mt-2'}`}>
                  <div className="flex flex-col">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full transition-all ${p.featured ? 'bg-accent shadow-glow' : 'bg-accent/50 group-hover:bg-accent'}`} />
                      <h4 className="text-base font-semibold text-text-strong transition-colors group-hover:text-accent">{p.title}</h4>
                    </div>
                    <div className="pl-4 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">{p.role}</div>
                  </div>
                  <div className="flex gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} GitHub`}
                        className="rounded-full p-2 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} Live link`}
                        className="rounded-full p-2 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="relative z-10 mb-6 flex-grow border-l border-line-strong/60 pl-4 text-sm leading-relaxed text-text-muted/90">
                  {p.description}
                </p>

                <div className="relative z-10 mt-auto pl-4">
                  {p.impact && (
                    <div className="mb-4 border-b border-dashed border-line/60 pb-4">
                      <div className="mb-1 text-[11px] font-mono uppercase tracking-[0.3em] text-accent-2/80">Impact</div>
                      <div className="text-xs font-medium text-text-strong">{p.impact}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line/70 bg-bg px-2 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted/80 transition-colors group-hover:border-accent/30"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="px-1 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted/50">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 text-[10px] font-mono uppercase tracking-[0.3em] text-line-strong opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                  ID: {p.id}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};
