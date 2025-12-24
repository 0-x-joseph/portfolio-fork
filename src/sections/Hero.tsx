import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Terminal, Activity, Cpu, Wifi } from 'lucide-react';
import { SOCIALS } from '../constants';
import { DURATION, fadeInUp, staggerContainer } from '../utils/motion';

// --- 1. UTILITY: Scramble/Decryption Text Effect ---
const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

export const Hero = () => {
  const ref = useRef(null);
  
  // --- 2. LOGIC: Mouse Spotlight & Parallax ---
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Mouse coordinates for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center max-w-[1200px] mx-auto border-x border-line/30 overflow-hidden group"
    >
      {/* --- 3. BACKGROUND: Dynamic Grid & Spotlight --- */}
      
      {/* The Grid Pattern (SVG) */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-muted) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      {/* The Spotlight (Reveals content/grid around mouse) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(32, 194, 14, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- 4. DECOR: Rotating Radar & Data Lines --- */}
      <motion.div style={{ y, opacity }} className="absolute top-10 right-0 lg:right-10 pointer-events-none hidden lg:block z-0">
        <div className="relative w-96 h-96">
            {/* Spinning Rings */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-line/20 rounded-full border-dashed"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-line/10 rounded-full"
            />
             {/* The "Scanner" */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-accent/20 w-full h-full"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 50%)' }}
            />
            {/* Central Core */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-accent/5 backdrop-blur-sm border border-accent/30 rounded-full flex items-center justify-center">
                    <Cpu className="text-accent animate-pulse" size={32} />
                </div>
            </div>
        </div>
      </motion.div>

      {/* --- 5. CONTENT: Main Hero Data --- */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-5xl"
      >
        {/* Status Line */}
        <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
          <div className="flex gap-1">
             <span className="w-1 h-1 bg-accent rounded-full animate-ping" />
             <span className="w-1 h-1 bg-accent rounded-full" />
          </div>
          <div className="px-3 py-1 border border-accent/30 bg-accent/5 rounded-full backdrop-blur-md">
            <span className="font-mono text-accent text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Wifi size={10} /> System Operational
            </span>
          </div>
        </motion.div>

        {/* The Name (Decryption Effect) */}
        <motion.div variants={fadeInUp} className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-text-strong via-text to-text-muted mb-6">
            <ScrambleText text="ISMAIL" /> <br />
            <span className="text-line-strong opacity-50"><ScrambleText text="AMMAR" /></span>
            </h1>
        </motion.div>

        {/* The Pitch */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-8 md:items-end mb-16">
            <div className="max-w-xl border-l-2 border-accent/50 pl-6 relative">
                <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: "100%" }} 
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute left-[-2px] top-0 w-[2px] bg-accent" 
                />
                <p className="text-xl md:text-2xl text-text font-light leading-relaxed">
                  Architecting <span className="text-text-strong font-medium relative inline-block">
                    neural networks
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent opacity-40"></span>
                  </span> and scalable systems. I turn complex research into production-grade reality.
                </p>
            </div>
            
            {/* Stats / Tech Stack Mini-Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-3">
                    <Activity className="text-accent" size={16} />
                    <span>MLOps Specialist</span>
                </div>
                <div className="flex items-center gap-3">
                    <Terminal className="text-accent" size={16} />
                    <span>Full-Stack Eng.</span>
                </div>
                <div className="col-span-2 h-px bg-line/50 w-full my-1"></div>
                <div className="col-span-2 text-[10px] opacity-60">
                    LATENCY: 12ms // LOCATION: MOROCCO
                </div>
            </div>
        </motion.div>

        {/* --- 6. ACTIONS: Magnetic & Glitch Buttons --- */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-5">
          <ButtonGlitch href="#work" primary>
            Initialize Project Viewer
          </ButtonGlitch>
          
          <ButtonGlitch href={SOCIALS.github}>
            Github Protocol
          </ButtonGlitch>
        </motion.div>
      </motion.div>

      {/* Footer Decor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: DURATION.lg }}
        className="absolute bottom-10 left-6 right-6 flex justify-between items-end border-t border-line/30 pt-6"
      >
         <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest flex gap-4">
            <span>Scroll Index: 001</span>
            <span className="animate-pulse">_CursorActive</span>
         </div>
         <div className="font-mono text-[10px] text-text-muted">V 2.0.5 [STABLE]</div>
      </motion.div>
    </section>
  );
};

// --- Sub-Component: Glitch/Magnetic Button ---
const ButtonGlitch = ({ children, href, primary = false }: { children: React.ReactNode, href: string, primary?: boolean }) => {
    return (
        <motion.a 
            href={href}
            className={`relative px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest overflow-hidden group ${
                primary ? 'bg-accent text-bg' : 'bg-transparent text-text border border-line-strong'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative z-10 flex items-center gap-2">
                {children} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Scanline Effect on Hover */}
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-300 ease-in-out z-0" />
            
            {/* Glitch Corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
    );
};
