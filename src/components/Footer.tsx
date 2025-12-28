import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { SOCIALS } from '../constants';

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-line/70 bg-bg-elev-1/90 px-6 pb-14 pt-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse motion-reduce:animate-none" />
              Open to select engagements
            </div>
            <h2 className="mb-6 text-4xl md:text-5xl font-display font-semibold text-text-strong leading-tight">
              Let&apos;s build intelligent systems with measurable impact
            </h2>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-text-muted">
              Available for high-impact contracts and consulting. Expect clear communication, fast delivery,
              and production-ready outcomes.
            </p>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-line-strong/70 bg-bg-elev-1/80 px-6 py-3 text-[11px] font-mono uppercase tracking-[0.3em] text-text-strong transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Mail size={16} /> Start a conversation
            </a>
          </div>

          <div className="flex flex-col justify-end items-start lg:items-end">
            <div className="rounded-[28px] border border-line/70 bg-bg-elev-2/70 p-6 shadow-card">
              <div className="mb-6 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted">Links</div>
              <div className="flex flex-col gap-5">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-full px-2 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="group-hover:translate-x-1 transition-transform">GitHub</span> <Github size={16} />
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-full px-2 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span> <Linkedin size={16} />
                </a>
                <a
                  href={SOCIALS.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-full px-2 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Resume PDF</span> <Download size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-line-strong" />
            <span>© {new Date().getFullYear()} Ismail Ammar. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <span>RABAT, MA</span>
            <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Casablanca' })} UTC+1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
