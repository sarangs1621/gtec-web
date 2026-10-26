'use client';

import { useEffect, useState } from 'react';

export function Loader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDone(true);
      return;
    }

    // Lock body scroll while loader is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Exactly 3s in total: fade starts at 2.4s, gone at 3s.
    const leaveTimer = setTimeout(() => setIsLeaving(true), 2400);
    const doneTimer = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = prevOverflow;
    }, 3000);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Covers Skip too, which bypasses the timer above that unlocks scrolling.
  useEffect(() => {
    if (isDone) document.body.style.overflow = '';
  }, [isDone]);

  if (isDone) return null;

  return (
    <aside
      id="site-loader"
      aria-label="Loading G-TEC Education"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ease-out select-none ${
        isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Repeating Graph Paper Grid Canvas */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />

      {/* Center Character Video with Multiply Blend and Brightness Normalization */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <video
          src="/video/loading.mp4"
          autoPlay
          muted
          playsInline
          loop
          className="h-72 sm:h-96 md:h-[460px] w-auto max-w-full object-contain mix-blend-multiply brightness-[1.08] contrast-[1.05]"
        />

        {/* Minimalist Telemetry Progress Cue */}
        <div className="mt-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-red animate-pulse" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-2/80">
            Compiling Curriculum &bull; 23 Nations
          </p>
        </div>
      </div>

      {/* Discrete Skip Button */}
      <button
        type="button"
        onClick={() => {
          setIsLeaving(true);
          setTimeout(() => setIsDone(true), 300);
        }}
        className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-widest text-ink-2/60 hover:text-ink transition-colors p-2"
        aria-label="Skip intro loader"
      >
        Skip &rarr;
      </button>
    </aside>
  );
}
