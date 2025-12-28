import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { SOCIALS } from '../constants';
import { DURATION, EASE_OUT } from '../utils/motion';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION.md, ease: EASE_OUT }}
      className="fixed top-0 left-0 w-full z-40 border-b border-line/70 bg-bg/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12">
        <a
          href="#"
          className="group flex items-center gap-4 rounded-full px-2 py-1 font-mono text-xs uppercase tracking-widest text-text-strong transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong/70 bg-bg-elev-1/90 text-[10px] font-semibold tracking-[0.3em] text-text-strong transition-all group-hover:border-accent/60 group-hover:text-accent">
            IA
          </span>
          <span className="flex flex-col">
            <span className="text-xs text-text-strong">Ismail Ammar</span>
            <span className="text-[10px] text-text-muted">Security + AI Systems</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          <a href="#about" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full px-2 py-1">About</a>
          <a href="#work" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full px-2 py-1">Work</a>
          <a href="#skills" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full px-2 py-1">Stack</a>
          <a href="#contact" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full px-2 py-1">Contact</a>
          <a
            href={SOCIALS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong/70 bg-bg-elev-1/80 px-4 py-2 text-text-strong transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Resume <ArrowRight size={14} />
          </a>
        </div>

        <button
          className="md:hidden rounded-full p-2 text-text-strong hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: DURATION.sm, ease: EASE_OUT }}
            className="md:hidden border-t border-line/70 bg-bg-elev-1/90 backdrop-blur-xl"
          >
            <div className="grid gap-5 px-6 py-6 font-mono text-xs uppercase tracking-widest text-text-muted">
              <a href="#about" className="rounded-full px-3 py-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg" onClick={() => setIsOpen(false)}>About</a>
              <a href="#work" className="rounded-full px-3 py-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg" onClick={() => setIsOpen(false)}>Work</a>
              <a href="#skills" className="rounded-full px-3 py-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg" onClick={() => setIsOpen(false)}>Stack</a>
              <a href="#contact" className="rounded-full px-3 py-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg" onClick={() => setIsOpen(false)}>Contact</a>
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2 text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
