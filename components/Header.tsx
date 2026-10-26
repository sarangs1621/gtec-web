"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Menu, MessageCircle, Phone, Sparkles, X } from "lucide-react";
import { CONTACT, NAV } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  // Close mobile drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Track scroll position to trigger morphing into compact floating dock
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrolled(top > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Links for scrolled dock: includes "Home" at the beginning, followed by NAV items
  const dockLinks = [
    { href: "/", label: "Home" },
    ...NAV,
  ];

  return (
    <>
      {/* ──────────────── Desktop & Tablet Floating Header ──────────────── */}
      <div className="fixed top-4 md:top-5 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none px-4">
        <motion.header
          layout
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
            mass: 0.8,
          }}
          className={cn(
            "pointer-events-auto relative flex items-center justify-between rounded-full",
            "border border-white/12 backdrop-blur-[24px]",
            "transition-colors duration-300",
            scrolled
              ? "bg-[#060e22]/85 py-1.5 px-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)]"
              : "w-[min(1120px,calc(100%-32px))] bg-[#07132e]/65 py-2.5 px-4 shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.14)]"
          )}
        >
          {/* Subtle top rim light shimmer */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          {/* Left Brand Identity: Full logo at top, collapses when scrolled */}
          <AnimatePresence mode="popLayout" initial={false}>
            {!scrolled && (
              <motion.div
                key="brand-logo"
                initial={{ opacity: 0, scale: 0.9, x: -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: -16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 pr-2"
              >
                <Link href="/" className="group flex items-center gap-3 focus:outline-none">
                  <div className="relative overflow-hidden rounded-[10px] ring-1 ring-white/15 transition-all duration-300 group-hover:ring-white/35 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.15)]">
                    <img
                      src="/logo.png"
                      alt="G-TEC Education"
                      className="block h-[38px] w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-[13px] font-bold tracking-tight text-white leading-tight">
                      G-TEC <span className="text-red">EDUCATION</span>
                    </span>
                    <span className="text-[9.5px] text-white/50 font-medium tracking-wider uppercase">
                      Global Network · 25+ Yrs
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Nav Items: Liquid Pill Hover Effect */}
          <nav
            aria-label="Main"
            onMouseLeave={() => setHoveredHref(null)}
            className="flex items-center gap-1"
          >
            {(scrolled ? dockLinks : NAV).map((n) => {
              const isCurrent =
                n.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(n.href);
              const isHovered = hoveredHref === n.href;

              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onMouseEnter={() => setHoveredHref(n.href)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 select-none",
                    isCurrent ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {/* Sliding Liquid Hover Pill */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-liquid-pill"
                      className="absolute inset-0 rounded-full bg-white/12 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Active Indicator Dot (when not hovered) */}
                  {isCurrent && !isHovered && (
                    <motion.span
                      layoutId="nav-active-pip"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-red shadow-[0_0_8px_rgba(255,1,0,0.9)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Pay + Enquire at top, compact Enquire chip when scrolled */}
          <div className="flex items-center pl-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {!scrolled ? (
                <motion.div
                  key="full-actions"
                  initial={{ opacity: 0, scale: 0.9, x: 16 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 16 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-1.5"
                >
                  <a
                    href={CONTACT.pay}
                    className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-white/75 transition hover:bg-white/8 hover:text-white"
                  >
                    Pay Now
                  </a>
                  <a
                    href="#enquire"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-red px-5 py-2 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(255,1,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-dark hover:shadow-[0_12px_28px_rgba(255,1,0,0.5)]"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.4}
                    />
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="dock-action"
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-1 flex items-center"
                >
                  <a
                    href="#enquire"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-red px-3 py-1.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(255,1,0,0.4)] transition hover:bg-red-dark hover:scale-105"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      </div>

      {/* ──────────────── Mobile Floating Navbar & Expanding Modal ──────────────── */}
      <div className="fixed top-3.5 inset-x-4 z-50 flex justify-center lg:hidden pointer-events-none">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className={cn(
            "pointer-events-auto relative w-full max-w-[460px] rounded-full border border-white/15 bg-navy/80 py-2 px-3 backdrop-blur-[24px] shadow-[0_14px_36px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.18)] flex items-center justify-between",
            open && "opacity-0 pointer-events-none"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="G-TEC Education" className="h-8 w-auto rounded-[8px]" />
            <span className="font-display text-[13px] font-bold text-white tracking-tight">
              G-TEC <span className="text-red">EDUCATION</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            className="flex size-9.5 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/15 active:scale-95"
          >
            <Menu className="size-4.5" />
          </button>
        </motion.div>
      </div>

      {/* Mobile Expanding Card Modal (Bhavana Kulkarni style) */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 flex items-start justify-center p-3.5 pt-3.5 sm:p-5 sm:pt-5 lg:hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-md"
            />

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
              className="relative z-10 w-full max-w-[460px] overflow-hidden rounded-[28px] border border-white/15 bg-[#07132f]/95 p-5 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="G-TEC Education" className="h-8.5 w-auto rounded-[8px]" />
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-bold text-white tracking-tight">
                      G-TEC <span className="text-red">EDUCATION</span>
                    </span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">
                      Global Network
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-9.5 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Navigation Links list */}
              <nav aria-label="Mobile Menu" className="my-5 flex flex-col gap-1">
                {[
                  { href: "/", label: "Home" },
                  ...NAV,
                ].map((item, idx) => {
                  const isCurrent =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl px-4 py-3 text-[16px] font-semibold transition-all",
                          isCurrent
                            ? "bg-white/12 text-white font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                            : "text-white/75 hover:bg-white/6 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isCurrent && (
                            <span className="size-2 rounded-full bg-red shadow-[0_0_8px_rgba(255,1,0,0.9)]" />
                          )}
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="size-4 text-white/40 transition group-hover:text-white group-hover:translate-x-0.5" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10">
                <a
                  href="#enquire"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red py-3.5 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(255,1,0,0.4)] transition hover:bg-red-dark active:scale-[0.98]"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="size-4" strokeWidth={2.4} />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={CONTACT.pay}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 py-2.5 text-center text-xs font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    Pay Online
                  </a>
                  <a
                    href={CONTACT.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 py-2.5 text-center text-xs font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    <MessageCircle className="size-3.5 text-green-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

