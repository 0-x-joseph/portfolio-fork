import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import { EASE_OUT, fadeInUp, staggerContainer, revealLine } from '../utils/motion';

  
export const Experience = () => {
  return (
    
    <section id="experience" className="section-shell px-6 py-28 lg:px-12">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-[1600px] mb-20"
      >
        <div className="mb-12 flex flex-wrap items-center gap-4">
          <motion.span variants={fadeInUp} className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">04</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-display font-semibold text-text-strong">Experience</motion.h2>
          <motion.div variants={revealLine} className="h-px flex-grow bg-gradient-to-r from-line via-accent-3/40 to-line" />
        </div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: EASE_OUT }}
            className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-line-strong/60 to-transparent origin-top md:left-[30%]"
          />

          <div className="space-y-12">
            {EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className="relative flex flex-col gap-6 md:flex-row md:gap-0 group"
              >
                <div className="md:w-[30%] md:pr-12 md:text-right flex flex-col md:items-end">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent-3/30 bg-accent-3/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-3">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-text-strong">{exp.company}</h4>
                </div>

                <div className="absolute left-[2px] top-2 z-10 md:left-[30%] md:-ml-[6px]">
                  <motion.div className="h-3 w-3 rounded-full border border-accent bg-bg transition-all duration-300 group-hover:bg-accent group-hover:shadow-glow" />
                  <div className="hidden md:block absolute top-1/2 left-full h-px w-8 bg-line transition-colors group-hover:bg-accent/50" />
                </div>

                <div className="md:w-[70%] md:pl-12">
                  <div className="relative rounded-[28px] border border-line/70 bg-bg-elev-1/80 p-6 shadow-card transition-colors group-hover:bg-bg-elev-1/90 group-hover:border-accent/30">
                    <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-accent/50 opacity-0 transition-opacity group-hover:opacity-100" />

                    <h3 className="mb-2 text-xl font-display font-semibold text-text-strong">{exp.role}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-text-muted">{exp.description}</p>

                    {exp.highlights && (
                      <div className="mb-6 space-y-2">
                        {exp.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-text/90">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {exp.tech && (
                      <div className="flex flex-wrap gap-2 border-t border-dashed border-line/60 pt-4">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line/70 bg-bg px-2 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted transition-colors hover:border-accent/30 hover:text-accent"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
