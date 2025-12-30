import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Filter, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import { DURATION, EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

const MAX_VISIBLE = 6;

export const Work = () => {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Web' | 'Sys' | 'Sec' | 'Gfx'>('All');
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pendingCollapseScroll = useRef(false);
  
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

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  const scrollToWork = useCallback(() => {
    sectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [reduceMotion]);

  const handleToggleShowAll = useCallback(() => {
    setShowAll((prev) => {
      pendingCollapseScroll.current = prev;
      return !prev;
    });
  }, []);

  const hasMoreProjects = filteredProjects.length > MAX_VISIBLE;
  const visibleProjects = hasMoreProjects && !showAll
    ? filteredProjects.slice(0, MAX_VISIBLE)
    : filteredProjects;
  const buttonLabel = showAll ? 'View less' : 'View more';
  const buttonHoverLabel = showAll ? 'Show less' : 'Show all';
  const progressLabel = showAll
    ? `Showing all ${filteredProjects.length}`
    : `Showing ${visibleProjects.length} of ${filteredProjects.length}`;

  return (
    <section id="work" ref={sectionRef} className="section-shell px-6 py-28 lg:px-12">
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

        <motion.div id="work-grid" layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence
            mode="popLayout"
            onExitComplete={() => {
              if (!pendingCollapseScroll.current) return;
              pendingCollapseScroll.current = false;
              requestAnimationFrame(() => scrollToWork());
            }}
          >
            {visibleProjects.map((p) => (
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

        {hasMoreProjects && (
          <motion.div variants={fadeInUp} className="mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">
              <span className="h-px w-12 bg-line/70" />
              <span>{progressLabel}</span>
              <span className="h-px w-12 bg-line/70" />
            </div>
            <SlideToggleButton
              primaryLabel={buttonLabel}
              hoverLabel={buttonHoverLabel}
              onClick={handleToggleShowAll}
              aria-expanded={showAll}
              aria-controls="work-grid"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

const SlideToggleButton = ({
  primaryLabel,
  hoverLabel,
  onClick,
  ariaExpanded,
  ariaControls,
}: {
  primaryLabel: string;
  hoverLabel: string;
  onClick: () => void;
  ariaExpanded?: boolean;
  ariaControls?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isClicked) return;
    const timeout = window.setTimeout(() => setIsClicked(false), 650);
    return () => window.clearTimeout(timeout);
  }, [isClicked]);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    onClick();
  };

  const handleHover = (next: boolean) => {
    if (reduceMotion) return;
    setIsHovered(next);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      disabled={isClicked}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-line-strong/70 bg-bg-elev-1/80 px-7 py-3 text-[11px] font-mono uppercase tracking-[0.3em] text-text-strong transition-all duration-500 ease-out hover:border-accent/60 hover:text-accent hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-70"
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      <span className="relative z-10 flex items-center gap-3 transition-all duration-500 ease-out group-hover:-translate-x-1.5">
        <span className="relative inline-flex min-w-[10ch] items-center">
          <span
            className={`transition-all duration-500 ${
              isHovered ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'
            }`}
          >
            {primaryLabel}
          </span>
          <span
            className={`absolute left-0 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {hoverLabel}
          </span>
        </span>
        <span className="relative ml-1 h-4 w-4">
          <ArrowRight
            className={`absolute left-0 top-0 h-4 w-4 transition-all duration-700 ${
              isHovered ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'
            } ${isClicked && !reduceMotion ? 'translate-x-8 opacity-0' : ''}`}
          />
          <ArrowRight
            className={`absolute left-0 top-0 h-4 w-4 transition-all duration-700 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } ${isClicked && !reduceMotion ? 'translate-x-8 opacity-0' : ''}`}
          />
        </span>
      </span>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -inset-6 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_60%)]" />
      </span>
      <span className="absolute inset-0 origin-left scale-x-0 bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-y-100" />
    </motion.button>
  );
};
