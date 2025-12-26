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
    <section className="section-shell py-20 px-6 max-w-[1200px] mx-auto border-x border-line/20">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {METRICS.map((m, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            className="relative rounded-xl border border-line/70 bg-bg-elev-1/70 p-6 md:p-8 min-h-[140px] flex flex-col justify-between hover:border-accent/40 hover:bg-bg-elev-2/80 transition-colors cursor-crosshair group overflow-hidden"
          >
            {/* Hover scanline effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/20 via-accent-3/30 to-accent-2/20 -translate-y-full group-hover:translate-y-[900%] transition-transform duration-1000"></div>
            
            <div className="font-mono text-xs uppercase tracking-wider text-text-muted group-hover:text-accent-3 transition-colors">
              <span className="text-accent-3/80 group-hover:text-accent-2">0{i + 1}</span> // {m.label}
            </div>
            <div className="text-4xl md:text-5xl font-display font-bold text-text-strong mt-2">
              <Counter value={m.value} suffix={m.suffix} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
