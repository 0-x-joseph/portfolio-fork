import React, { useEffect, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Metrics } from './sections/Metrics';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Experience } from './sections/Experience';
import LiquidEther from './components/LiquidEther';
import GradualBlur from './components/GradualBlur';

const App = () => {
  const prefersReducedMotion = useReducedMotion();
  const liquidColors = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const styles = getComputedStyle(document.documentElement);
    return ['--liquid-1', '--liquid-2', '--liquid-3']
      .map((token) => styles.getPropertyValue(token).trim())
      .filter(Boolean);
  }, []);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen text-text selection:bg-accent selection:text-bg overflow-x-hidden font-body bg-bg">
      {/* Global Fluid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!prefersReducedMotion && liquidColors.length === 3 && (
          <LiquidEther 
            colors={liquidColors} 
            mouseForce={5}
            cursorSize={220}
            isViscous={false}
            viscous={18}
            iterationsViscous={18}
            iterationsPoisson={18}
            dt={0.014}
            resolution={0.45}
            autoDemo={true}
            autoSpeed={0.06}
            autoIntensity={0.4}
          />
        )}
      </div>

      {/* Ambient Light Wash */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 left-[-12%] h-[360px] w-[360px] sm:h-[520px] sm:w-[520px] rounded-full bg-accent/12 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] rounded-full bg-accent-3/12 blur-[120px]" />
        <div className="absolute bottom-[-25%] right-[-8%] h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full bg-accent-2/14 blur-[140px]" />
      </div>
      
      {/* Cinematic Viewport Blur Effects */}
      <GradualBlur 
        target="page" 
        position="bottom" 
        height="6rem"
        responsive={true}
        mobileHeight="5rem"
        tabletHeight="5.5rem"
        desktopHeight="6rem"
        strength={1.6} 
        divCount={6} 
        zIndex={50} 
        opacity={1} 
        preset="smooth"
      />
      
      {/* Noise Overlay */}
      <div className="bg-noise"></div>
      
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <Metrics />
        <About />
        <Skills />
        <Work />
        <div
          className="max-w-[1600px] mx-auto border-t border-line/60"
          aria-hidden="true"
        />
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default App;
