"use client";

import { useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { PerspectiveTunnel } from "@/components/ui/perspective-tunnel";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Story = (typeof TESTIMONIALS)[number];

const tones = {
  blue: { card: "bg-linear-160 from-blue to-[#061A3C] text-white", kind: "text-white/55", sub: "text-white/60" },
  red: { card: "bg-linear-160 from-red to-[#A30000] text-white", kind: "text-white/65", sub: "text-white/70" },
  light: { card: "border border-ink/8 bg-white text-ink", kind: "text-red", sub: "text-ink-2" },
};

/** YouTube and Instagram links to their embeddable player. */
function embed(url: string) {
  const u = new URL(url);
  if (u.hostname.includes("youtube")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}?autoplay=1&rel=0`;
  return `${u.origin}${u.pathname.replace(/\/$/, "")}/embed/`;
}

/** Brand marks in their own colours (lucide no longer ships brand icons). */
function YouTubeLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0000" />
      <path d="M9.75 8.6v6.8L15.6 12z" fill="#fff" />
    </svg>
  );
}

function InstagramLogo() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-full">
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FFDC80" />
          <stop offset=".25" stopColor="#F77737" />
          <stop offset=".5" stopColor="#E1306C" />
          <stop offset=".75" stopColor="#C13584" />
          <stop offset="1" stopColor="#833AB4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${id})`} />
      <rect x="6" y="6" width="12" height="12" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="15.9" cy="8.1" r=".95" fill="#fff" />
    </svg>
  );
}

function Card({ t, className }: { t: Story; className?: string }) {
  // With a thumbnail the card is the video's own cover, darkened for legible white text.
  const thumb = "thumb" in t ? t.thumb : undefined;
  const s = thumb ? { card: "bg-ink text-white", kind: "text-white/80", sub: "text-white/70" } : tones[t.tone];
  return (
    <span className={cn("relative flex flex-col overflow-hidden rounded-[26px] p-6.5 text-left", s.card, className)}>
      {thumb && (
        <>
          <img src={thumb} alt="" loading="lazy" draggable={false} className="absolute inset-0 size-full object-cover" />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,31,.55)_0%,rgba(5,12,31,.05)_35%,rgba(5,12,31,.35)_55%,rgba(5,12,31,.92)_100%)]" />
        </>
      )}
      <span className={cn("relative text-[11px] font-bold tracking-[.16em] uppercase", s.kind)}>{t.kind}</span>
      <span className="relative mt-auto block size-16 drop-shadow-[0_8px_18px_rgba(0,0,0,.25)]">
        {t.url.includes("youtube") ? <YouTubeLogo /> : <InstagramLogo />}
      </span>
      <span className="font-display relative mt-7 text-[22px] font-bold tracking-tight">{t.name}</span>
      <span className={cn("relative mt-1.5 text-[13px]", s.sub)}>G-TEC student</span>
    </span>
  );
}

/** Student stories: a scroll-driven 3D tunnel (or a plain grid); each card plays its video in a dialog. */
export function Stories({ grid, children }: { grid?: boolean; children?: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState<Story | null>(null);
  const play = (t: Story) => {
    setPlaying(t);
    dialog.current?.showModal();
  };

  return (
    <>
      {grid ? (
        <div data-stagger className="mx-auto flex w-[min(1240px,100%)] flex-wrap justify-center gap-4.5 px-6">
          {TESTIMONIALS.map((t) => (
            <button key={t.name} type="button" onClick={() => play(t)} aria-label={`Play ${t.name}'s story`} className="transition duration-450 ease-out-expo hover:-translate-y-1.5">
              <Card t={t} className="h-90 w-75" />
            </button>
          ))}
        </div>
      ) : (
        <PerspectiveTunnel
          // Six stories go round twice so the corridor never runs thin.
          items={[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => ({
            key: `${t.name}-${i}`,
            label: `Play ${t.name}'s story`,
            node: <Card t={t} className="size-full" />,
          }))}
          onSelect={(i) => play(TESTIMONIALS[i % TESTIMONIALS.length])}
        >
          {children}
        </PerspectiveTunnel>
      )}

      <dialog
        ref={dialog}
        onClose={() => setPlaying(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        aria-label={playing ? `${playing.name}'s story` : undefined}
        className="m-auto overflow-visible bg-transparent backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {playing && (
          <div className="relative">
            <iframe
              src={embed(playing.url)}
              title={`${playing.name}'s story`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className={cn(
                "block rounded-2xl bg-black",
                playing.url.includes("youtube") ? "aspect-video w-[min(92vw,960px)]" : "h-[min(86vh,760px)] w-[min(92vw,420px)]",
              )}
            />
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
