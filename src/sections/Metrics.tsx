import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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
