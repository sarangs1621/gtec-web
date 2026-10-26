"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

// G-TEC imagery first, Unsplash campus/tech shots between them.
const IMAGES = [
  { src: "https://www.gteceducation.com/assets/img/home/intro-tmb-lg.webp", alt: "G-TEC students" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", alt: "Students working on laptops" },
  { src: "https://www.gteceducation.com/assets/img/home/intro-tmb-sm.webp", alt: "G-TEC classroom" },
  { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80", alt: "Humanoid robot" },
  { src: "https://www.gteceducation.com/assets/img/og-image/preview.jpg", alt: "G-TEC Education" },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", alt: "Circuit board" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", alt: "Students studying together" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", alt: "Code on a screen" },
  { src: "https://www.gteceducation.com/assets/img/news-events/news-tmb.webp", alt: "G-TEC job fair" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80", alt: "Engineer with laptop" },
];

export function HeroSection() {
  return (
    <TiltedGridHero
      images={IMAGES}
      speed={4.5}
      tileHeight={30}
      axis={62}
      curve={78}
      fade={14}
      className="h-[100svh] min-h-[640px] w-full bg-navy text-white"
    >
      {/* keeps the band legible without hiding it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,31,.85)_0%,rgba(5,12,31,.35)_45%,rgba(5,12,31,.15)_70%,#050C1F_100%)]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1240px] flex-col items-center justify-start px-6 pt-[18vh] text-center">
        <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] font-semibold backdrop-blur">
          <span className="size-2 rounded-full bg-red animate-pulse" />
          World&apos;s largest IT education network · Est. 2000
        </span>

        <h1 className="font-display max-w-[14ch] text-balance text-[clamp(44px,7vw,104px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          Making Professionals{" "}
          <span className="bg-gradient-to-r from-red to-[#FF6B5E] bg-clip-text text-transparent">
            Globally.
          </span>
        </h1>

        <p className="mt-6 max-w-[560px] text-pretty text-[clamp(16px,1.4vw,19px)] leading-relaxed text-white/80">
          An ISO-certified global institution with 800+ centres across 23
          countries — 25 years of IT education, skilling and vocational
          training that employers trust.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#enquire"
            className="inline-flex items-center gap-2.5 rounded-full bg-red px-7 py-4 text-[15px] font-bold shadow-[0_12px_32px_rgba(255,1,0,.38)] transition hover:-translate-y-0.5 hover:bg-[#E60000] hover:shadow-[0_18px_44px_rgba(255,1,0,.5)]"
          >
            Enquire Now <ArrowRight className="size-4" strokeWidth={2.4} />
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-4 text-[15px] font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </TiltedGridHero>
  );
}

export default HeroSection;
