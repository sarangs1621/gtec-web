"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Opens its children as a modal whenever any `#enquire` link is clicked (or the page loads with #enquire). */
export function EnquireDialog({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => dialog.current?.open || dialog.current?.showModal();
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.('a[href="#enquire"]')) return;
      e.preventDefault();
      open();
    };
    if (location.hash === "#enquire") open();
    document.addEventListener("click", onClick);

    // Pop up once per visit when the reader nears the end of the page (the footer comes into view).
    const seen = () => {
      try {
        return sessionStorage.getItem("enquire-auto") === "1";
      } catch {
        return false;
      }
    };
    const footer = document.querySelector("footer");
    const io = new IntersectionObserver(([entry]) => {
      // scrollY guard: on a short page the footer is visible at load, and that's not "reaching the end".
      if (!entry.isIntersecting || seen() || scrollY < innerHeight / 2) return;
      io.disconnect();
      try {
        sessionStorage.setItem("enquire-auto", "1");
      } catch {}
      open();
    });
    if (footer && !seen()) io.observe(footer);

    return () => {
      document.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label="Enquire now"
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      className="m-auto max-h-[92svh] w-[min(1120px,calc(100%-24px))] max-w-none overflow-y-auto overscroll-contain rounded-[32px] bg-navy text-white shadow-[0_40px_120px_rgba(0,0,0,.5)] backdrop:bg-ink/70 backdrop:backdrop-blur-sm open:animate-[pop_.45s_var(--ease-out-expo)]"
    >
      <button
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
      {children}
    </dialog>
  );
}
