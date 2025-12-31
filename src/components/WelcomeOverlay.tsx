import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ParticleTextEffect } from './ParticleTextEffect';

const STORAGE_KEY = 'portfolio-welcome-seen';
const FALLBACK_DISMISS_MS = 9000;
const COMPLETE_HOLD_MS = 500;

type WelcomeOverlayProps = {
  onFinish?: () => void;
};

export const WelcomeOverlay = ({ onFinish }: WelcomeOverlayProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const restoreOverflowRef = useRef('');
  const finishRef = useRef(false);
  const hasShownRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  const hasInitRef = useRef(false);
  const isVisibleRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const finish = useCallback(() => {
    if (finishRef.current) return;
    finishRef.current = true;
    if (hasShownRef.current) {
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {}
    }
    onFinishRef.current?.();
  }, []);

  const scheduleClose = useCallback((delay: number) => {
    if (closeTimerRef.current !== null) return;
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setIsVisible(false);
    }, delay);
  }, []);

  const handleComplete = useCallback(() => {
    if (!isVisibleRef.current) return;
    scheduleClose(COMPLETE_HOLD_MS);
  }, [scheduleClose]);

  useEffect(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    let hasSeen = false;
    try {
      hasSeen = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      hasSeen = false;
    }

    if (!hasSeen) {
      hasShownRef.current = true;
      setIsVisible(true);
    } else {
      finish();
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    restoreOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    isVisibleRef.current = true;
    return () => {
      isVisibleRef.current = false;
      document.body.style.overflow = restoreOverflowRef.current;
      lenis?.start();
    };
  }, [isVisible, lenis]);

  useEffect(() => {
    if (!isVisible) return;
    if (reduceMotion) {
      scheduleClose(1400);
      return;
    }

    fallbackTimerRef.current = window.setTimeout(() => {
      fallbackTimerRef.current = null;
      setIsVisible(false);
    }, FALLBACK_DISMISS_MS);

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isVisible, reduceMotion, scheduleClose]);

  if (!isReady) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (hasShownRef.current) finish();
      }}
    >
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#030303]/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.3, 1] }}
        >
          <motion.div
            className="relative flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-10 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.35, 1] }}
          >
            {reduceMotion ? (
              <div className="text-3xl md:text-5xl font-display font-semibold text-text-strong tracking-tight">
                Welcome to my portfolio
              </div>
            ) : (
              <ParticleTextEffect onComplete={handleComplete} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
