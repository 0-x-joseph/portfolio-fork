import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { METRICS } from '../constants';
import { DURATION, EASE_OUT, staggerContainer, fadeInUp } from '../utils/motion';

const Counter = ({ value, suffix }: { value: string, suffix?: string }) => {
  // Parse numeric part and handle prefixes like "<" or ">"
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericValue = match ? parseFloat(match[2]) : parseFloat(value);
  const isNumeric = !isNaN(numericValue);
  const reduceMotion = useReducedMotion();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  const springValue = useSpring(0, {
    duration: reduceMotion ? 0 : 1.5,
    bounce: 0
  });

  const displayValue = useTransform(springValue, (current) => {
    if (!isNumeric) return value;
    return `${prefix}${Math.round(current)}`;
  });

  useEffect(() => {
    if (isInView && isNumeric) {
      springValue.set(numericValue);
    }
  }, [isInView, isNumeric, numericValue, springValue]);

  return (
    <span ref={ref} className="flex items-baseline">
        {isNumeric ? <motion.span>{displayValue}</motion.span> : value}
        {suffix && <span className="text-2xl text-accent-2 font-mono ml-1">{suffix}</span>}
    </span>
  );
};

export const Metrics = () => {
  return (
    <section className="section-shell px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Signal</span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-text-strong">Impact Metrics</h2>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Last 12 months</div>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[28px] border border-line/70 bg-bg-elev-1/80 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-bg-elev-2/80"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-10 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_55%)]" />
              </div>
              <div className="relative z-10 font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
                <span className="text-accent-3">0{i + 1}</span> {m.label}
              </div>
              <div className="relative z-10 mt-4 text-4xl md:text-5xl font-display font-semibold text-text-strong">
                <Counter value={m.value} suffix={m.suffix} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
