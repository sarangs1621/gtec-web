"use client";

import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Perspective Tunnel — cards fly out of the distance toward the viewer as the
 * page scrolls through a tall section with a pinned 100svh stage. Driven by
 * page scroll (not a captured wheel) so it never traps scrolling and works on
 * touch. Cards are laid out on a golden-angle spiral; the pointer pans the
 * camera.
 */

export type TunnelItem = { key: string; node: React.ReactNode; label: string };

type TunnelCardData = {
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
};

const layout = (i: number): TunnelCardData => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  return {
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX: 0.28 + (i % 3) * 0.08,
    radiusFactorY: 0.26 + (i % 2) * 0.09,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    index: i,
  };
};

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };
// Cards are drawn at this size and scaled, so their contents never reflow.
const BASE_W = 240;

type StageDimensions = { width: number; height: number; isMobile: boolean };

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

function TunnelCard({
  item,
  card,
  progress,
  pointer,
  total,
  stage,
  onSelect,
}: {
  item: TunnelItem;
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelect?: () => void;
}) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  // Faded-out cards (including the ones that have flown past the lens) must not catch clicks.
  const pointerEvents = useTransform(opacity, (o) => (o > 0.3 ? "auto" : "none"));

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]: number[]) => {
    const offsetX = baseX - px * panStrength;
    const offsetY = baseY - py * panStrength;
    return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
  });

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={item.label}
      style={{ width: cardWidth, transform, opacity, pointerEvents, zIndex: card.index + 1 }}
      className="group absolute top-1/2 left-1/2 aspect-[4/5] cursor-pointer select-none will-change-transform"
    >
      <div className="relative size-full overflow-hidden rounded-[26px] shadow-2xl shadow-ink/20 ring-1 ring-ink/10 transition-all duration-500 group-hover:shadow-blue/30 group-hover:ring-red/60">
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: BASE_W, height: BASE_W * 1.25, transform: `scale(${cardWidth / BASE_W})` }}
        >
          {item.node}
        </div>
      </div>
    </motion.button>
  );
}

export function PerspectiveTunnel({
  items,
  onSelect,
  children,
  className,
}: {
  items: TunnelItem[];
  onSelect?: (index: number) => void;
  /** Centre content that grows as you travel through. */
  children?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({ width: 1440, height: 900, isMobile: false });

  useEffect(() => {
    const updateDimensions = () =>
      setStage({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 });
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

  const pointer = useCameraParallax(!reduce);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 1.2]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.6, 1, 1, 0.3]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={containerRef} className={cn("relative h-[300vh]", className)}>
      <div
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden select-none"
        style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] [background-size:28px_28px] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,66,130,0.12)_0%,transparent_70%)]" />

        <div className="pointer-events-none absolute size-[48vmin] rounded-full border border-blue/15" />
        <div className="pointer-events-none absolute size-[76vmin] rounded-full border border-dashed border-ink/15" />

        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="z-0 flex max-w-xl flex-col items-center px-6 text-center">
          {children}
        </motion.div>

        <motion.div
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 font-mono text-xs tracking-[0.3em] text-ink-2 uppercase"
        >
          <span>Scroll to explore</span>
          <div className="h-6 w-px bg-linear-to-b from-red to-transparent" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, i) => (
            <TunnelCard
              key={item.key}
              item={item}
              card={layout(i)}
              progress={smoothProgress}
              pointer={pointer}
              total={items.length}
              stage={stage}
              onSelect={onSelect && (() => onSelect(i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerspectiveTunnel;
