import Link from "next/link";
import { ArrowRight, Award, Briefcase, Check, FlaskConical, Mail, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Stories } from "@/components/Stories";
import { GlobeNetwork } from "@/components/GlobeNetwork";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import GlassFolder, { type ArtPreset } from "@/components/ui/glass-folder-cards";
import {
  AFFILIATIONS,
  CONTACT,
  COURSES,
  FLASH,
  NEWS,
  STATS,
  SUBSIDIARIES,
  type Course,
} from "@/lib/data";
import { cn } from "@/lib/utils";

const SITE = "https://www.gteceducation.com";
const wrap = "mx-auto w-[min(1240px,100%)] px-6";
const h2 = "font-display text-[clamp(32px,4.2vw,54px)] font-bold leading-[1.06] tracking-[-.025em] text-balance";
const section = "py-[clamp(80px,9vw,136px)]";
const blob = "animate-float pointer-events-none absolute rounded-full";

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div data-reveal="0" className={cn("mb-5 flex items-center gap-3 text-xs font-bold tracking-[.18em] uppercase", light ? "text-red" : "text-coral")}>
      <span className="h-0.5 w-7 bg-red" />
      {children}
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return <ArrowRight className={cn("size-4", className)} strokeWidth={2.4} />;
}

/* ── Hero (home) ───────────────────────────────────────────── */

export function Hero() {
  return (
    <section data-hero className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-navy">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <video
          src={`${SITE}/storage/app/public/video/19-12-25-01-24-03-12-25-04-20-web%20banner%20out.mp4`}
          poster={`${SITE}/assets/img/og-image/preview.jpg`}
          autoPlay
          muted
          loop
          playsInline
          className="block size-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,31,.6)_0%,rgba(5,12,31,.25)_40%,rgba(5,12,31,.7)_75%,#050C1F_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,31,.85)_0%,rgba(5,12,31,.35)_50%,rgba(5,12,31,0)_100%)]" />
      <Blobs />

      <div data-hero-copy className={cn(wrap, "relative pt-[clamp(150px,20vh,220px)] pb-[clamp(56px,9vh,96px)]")}>
        <div data-reveal="0.1" className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/8 py-2 pr-4 pl-2.5 text-[13px] font-semibold text-white/90 backdrop-blur-md">
          <span className="size-2 animate-[pulse-ring_2s_infinite] rounded-full bg-red" />
          World&apos;s largest IT education network · Est. 2000
        </div>
        <h1 className="font-display mb-6.5 max-w-[13ch] text-[clamp(46px,7.4vw,108px)] leading-[.98] font-extrabold tracking-[-.035em]">
          {["Making", "Professionals", "Globally."].map((w, i) => (
            <span key={w} className="-mb-[.1em] inline-block overflow-hidden pb-[.1em] align-bottom">
              <span
                className={cn("hero-word", i === 2 && "bg-linear-to-r from-red to-[#FF6B5E] bg-clip-text pr-[.05em] text-transparent")}
                style={{ "--i": i } as React.CSSProperties}
              >
                {w}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p data-reveal="0.55" className="mb-9 max-w-[560px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-pretty text-white/80">
          An ISO-certified global institution with 800+ centres across 23 countries — 25 years of IT education, skilling and
          vocational training that employers trust.
        </p>
        <div data-reveal="0.7" className="flex flex-wrap items-center gap-3">
          <a href="#enquire" className="inline-flex items-center gap-2.5 rounded-full bg-red px-7 py-4 text-[15px] font-bold shadow-[0_12px_32px_rgba(255,1,0,.38)] transition duration-300 ease-out-expo hover:-translate-y-[3px] hover:bg-red-dark hover:shadow-[0_18px_44px_rgba(255,1,0,.5)]">
            Enquire Now <Arrow />
          </a>
          <Link href="/courses" className="inline-flex items-center rounded-full border border-white/22 bg-white/6 px-7 py-4 text-[15px] font-semibold backdrop-blur-md transition duration-300 ease-out-expo hover:-translate-y-[3px] hover:border-white/45 hover:bg-white/14">
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}

function Blobs() {
  return (
    <>
      <div className={cn(blob, "top-[10%] -left-[10%] size-[46vw] bg-[radial-gradient(circle,rgba(0,102,204,.35),transparent_65%)] blur-[40px] [animation:float-a_14s_ease-in-out_infinite]")} />
      <div className={cn(blob, "-right-[5%] bottom-[5%] size-[36vw] bg-[radial-gradient(circle,rgba(255,1,0,.22),transparent_65%)] blur-[50px] [animation:float-b_18s_ease-in-out_infinite]")} />
    </>
  );
}

export function Stats() {
  return (
    <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-px overflow-hidden rounded-[22px] border border-white/12 bg-white/12 backdrop-blur-lg">
      {STATS.map((s) => (
        <div key={s.label} className="bg-navy/60 px-6.5 py-5.5">
          <div className="font-display text-[34px] leading-none font-bold tracking-tight">
            <span data-count={s.value}>{s.value.toLocaleString("en-US")}</span>
            <span className="text-coral">{s.suffix}</span>
          </div>
          <div className="mt-2 text-[13px] font-medium text-white/60">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Page hero (inner pages) ───────────────────────────────── */

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-navy pt-40 pb-20">
      <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,66,130,.45),transparent_65%)] blur-[40px]" />
      <div className={cn(wrap, "relative")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 data-reveal="0.1" className="font-display max-w-[16ch] text-[clamp(40px,5.6vw,80px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance">
          {title}
        </h1>
        {intro && <p data-reveal="0.2" className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-pretty text-white/70">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

/* ── Flash news ticker ─────────────────────────────────────── */

export function Ticker() {
  const row = (hidden?: boolean) => (
    <div aria-hidden={hidden} className="flex gap-18 pr-18 text-sm font-semibold whitespace-nowrap">
      {FLASH.map((f) => (
        <a key={f.text} href={f.url} tabIndex={hidden ? -1 : undefined} className="hover:underline">{f.text}</a>
      ))}
    </div>
  );
  return (
    <div className="flex items-stretch overflow-hidden bg-red">
      <div className="font-display flex flex-none items-center gap-2.5 bg-[#C40000] px-5.5 py-3.5 text-xs font-bold tracking-[.16em] uppercase">
        <span className="size-[7px] rounded-full bg-white" />
        Flash News
      </div>
      <div className="flex flex-1 items-center overflow-hidden">
        <div className="marquee flex w-max" style={{ "--dur": "36s" } as React.CSSProperties}>
          {row()}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

/* ── Affiliations marquee ──────────────────────────────────── */

export function Affiliations() {
  return (
    <section className="bg-navy pt-16 pb-18">
      <div className={cn(wrap, "mb-7 flex flex-wrap items-center justify-between gap-4")}>
        <p data-reveal="0" className="text-xs font-bold tracking-[.18em] text-white/50 uppercase">Affiliated with 100+ global certification bodies</p>
        <a href={`${SITE}/affiliations`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-coral">
          View all affiliations <Arrow className="size-3.5" />
        </a>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee flex w-max" style={{ "--dur": "48s" } as React.CSSProperties}>
          {[...AFFILIATIONS, ...AFFILIATIONS].map((a, i) => (
            <a
              key={i}
              href={a.url}
              title={a.name}
              aria-hidden={i >= AFFILIATIONS.length}
              tabIndex={i >= AFFILIATIONS.length ? -1 : undefined}
              className="mr-3.5 flex h-22 w-43 flex-none items-center justify-center rounded-[18px] bg-white p-4 transition duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,66,130,.35)]"
            >
              <img src={a.img} alt={a.name} loading="lazy" className="block max-h-full max-w-full object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About ─────────────────────────────────────────────────── */

export function About({ cta = true }: { cta?: boolean }) {
  return (
    <section id="about" className={cn(section, "rounded-t-[40px] bg-mist text-ink")}>
      <div className={cn(wrap, "grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(40px,6vw,96px)]")}>
        <div>
          <Eyebrow light>About G-TEC</Eyebrow>
          <h2 data-reveal="0.1" className={cn(h2, "mb-5.5")}>A global network of excellence in education, skills and careers.</h2>
          <p data-reveal="0.2" className="mb-4.5 text-[17px] leading-[1.7] text-pretty text-ink-2">
            G-TEC EDUCATION is an ISO-certified global institution and a trusted leader in IT education, skill development and
            vocational training. Over 25 years we have grown into a network of 800+ training institutions in more than 23
            countries, actively supporting government-approved projects.
          </p>
          <p data-reveal="0.25" className="mb-8 text-[17px] leading-[1.7] text-pretty text-ink-2">
            Our certificates are accepted internationally — wherever students go, G-TEC adds value. More than an institute, we
            are a community of students, teachers and partners who grow together.
          </p>
          <div data-stagger className="mb-9 grid gap-3.5">
            {["ISO-certified institution", "Internationally accepted certifications", "Partner on government-approved skilling projects"].map((t) => (
              <div key={t} className="flex items-center gap-3.5 text-[15px] font-semibold">
                <span className="flex size-9 flex-none items-center justify-center rounded-xl bg-ice text-blue">
                  <Check className="size-4" strokeWidth={2.6} />
                </span>
                {t}
              </div>
            ))}
          </div>
          {cta && (
            <div data-reveal="0.3" className="flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2.5 rounded-full bg-blue px-6.5 py-4 text-[15px] font-bold text-white transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-blue-dark">
                Read our story <Arrow />
              </Link>
              <a href={`${SITE}/leadership`} className="inline-flex items-center rounded-full border border-ink/16 px-6.5 py-4 text-[15px] font-semibold transition hover:border-blue hover:bg-white hover:text-blue">
                Leadership
              </a>
            </div>
          )}
        </div>
        <div data-reveal="0.15" className="relative pb-8 pl-6">
          <img src={`${SITE}/assets/img/home/intro-tmb-lg.webp`} alt="G-TEC students" className="block aspect-[4/5] w-full rounded-[28px] object-cover shadow-[0_30px_80px_rgba(0,66,130,.2)]" />
          <img src={`${SITE}/assets/img/home/intro-tmb-sm.webp`} alt="G-TEC classroom" className="absolute bottom-0 left-0 block aspect-square w-[44%] rounded-[22px] border-[6px] border-mist object-cover shadow-[0_20px_50px_rgba(11,26,51,.18)]" />
          <div className="absolute top-6 -right-3 rounded-[18px] border border-white/90 bg-white/78 px-4.5 py-3.5 shadow-[0_16px_40px_rgba(11,26,51,.12)] backdrop-blur-lg">
            <div className="font-display text-2xl font-extrabold tracking-tight text-blue">25 yrs</div>
            <div className="text-xs font-semibold text-ink-2">of trusted training</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Courses ───────────────────────────────────────────────── */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=75`;
// One shot per programme area, in course order, then campus life.
const COURSE_IMAGES = [
  { src: unsplash("1485827404703-89b55fcc595e"), alt: "Humanoid robot" },
  { src: unsplash("1461749280684-dccba630e2f6"), alt: "Code on a screen" },
  { src: unsplash("1531482615713-2afd69097998"), alt: "Team designing at computers" },
  { src: unsplash("1558494949-ef010cbdcc31"), alt: "Network server rack" },
  { src: unsplash("1554224155-6726b3ff858f"), alt: "Accounting with a calculator" },
  { src: unsplash("1503387762-592deb58ef4e"), alt: "Architectural drawings" },
  { src: unsplash("1522202176988-66273c2fd55f"), alt: "Students working on laptops" },
  { src: unsplash("1518770660439-4636190af475"), alt: "Circuit board" },
  { src: unsplash("1555066931-4365d14bab8c"), alt: "Laptop with code editor" },
  { src: unsplash("1581092160562-40aa08e78837"), alt: "Engineer working in a lab" },
  { src: unsplash("1523240795612-9a054b0db644"), alt: "Students studying together" },
  { src: unsplash("1517694712202-14dd9538aa97"), alt: "Developer at a laptop" },
];

const FOLDER_ART: ArtPreset[] = ["ember", "aurora", "dusk", "verdant", "glacier"];

export function CoursesSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="courses" className={cn(section, "relative overflow-hidden bg-navy", !heading && "pt-0")}>
      {heading && <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,66,130,.45),transparent_65%)] blur-[40px]" />}
      {heading && (
        // Full-bleed so the curved band runs edge to edge; the heading sits above the band's axis.
        <TiltedGridHero
          images={COURSE_IMAGES}
          speed={4.5}
          tileHeight={26}
          axis={72}
          curve={72}
          fade={14}
          className="mb-12 h-[860px] w-full md:h-[clamp(640px,78vh,760px)]"
        >
          <div className={cn(wrap, "relative z-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-end gap-x-16 gap-y-6")}>
            <div>
              <Eyebrow>Courses</Eyebrow>
              <h2 data-reveal="0.1" className={h2}>Get job-ready with hands-on training employers value.</h2>
            </div>
            <div data-reveal="0.2">
              <p className="mb-5 text-[17px] leading-[1.7] text-pretty text-white/70">
                Industry-focused programmes built for real careers — practical knowledge, lab experience and certifications that
                accelerate your growth.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 text-[15px] font-bold hover:text-coral">
                Browse all courses <Arrow />
              </Link>
            </div>
          </div>
        </TiltedGridHero>
      )}
      {/* backdrop for the folders: a dotted desk with soft brand glows, so the glass has something to frost */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(100%,2200px)]">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_30%,transparent_80%)] bg-[radial-gradient(rgba(255,255,255,.13)_1.1px,transparent_1.4px)] [background-size:24px_24px]" />
        <div className={cn(blob, "top-[8%] -left-[8%] size-[42vw] bg-[radial-gradient(circle,rgba(0,102,204,.32),transparent_65%)] blur-[50px] [animation:float-a_16s_ease-in-out_infinite]")} />
        <div className={cn(blob, "top-[38%] -right-[10%] size-[38vw] bg-[radial-gradient(circle,rgba(255,1,0,.18),transparent_65%)] blur-[60px] [animation:float-b_20s_ease-in-out_infinite]")} />
        <div className={cn(blob, "bottom-[4%] left-[25%] size-[34vw] bg-[radial-gradient(circle,rgba(0,102,204,.25),transparent_65%)] blur-[60px] [animation:float-a_22s_ease-in-out_infinite]")} />
      </div>
      <div className={cn(wrap, "relative")}>
        <p className="mb-10 flex items-center justify-center gap-2 text-center text-sm font-semibold text-white/60">
          <span className="size-1.5 animate-pulse rounded-full bg-coral" />
          Hover a folder to peek inside — click it to see every module.
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-16">
          {COURSES.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.slug} className="flex w-[340px] max-w-full flex-col">
                <GlassFolder
                  label={c.title}
                  meta={`${c.tags.length} modules inside`}
                  tone="light"
                  art={FOLDER_ART[i % FOLDER_ART.length]}
                  seed={i + 3}
                  action="none"
                  appearDelay={(i % 3) * 140}
                  width={340}
                  className="max-w-full"
                  files={c.tags.map((t, j) => ({
                    name: t,
                    meta: `Module ${j + 1}`,
                    href: `/courses/${c.slug}`,
                    art: j % 2 ? undefined : FOLDER_ART[(i + j + 1) % FOLDER_ART.length],
                  }))}
                />
                <div className="mt-6 flex flex-1 flex-col px-1">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 flex-none items-center justify-center rounded-xl border border-white/12 bg-linear-135 from-[rgba(0,120,255,.4)] to-blue/12 text-sky">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-[22px] font-bold tracking-tight">{c.title}</h3>
                    <span className="font-display ml-auto text-[13px] font-bold tracking-[.1em] text-coral">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 mb-4 text-[15px] leading-relaxed text-white/68">{c.summary}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-[13px] font-semibold text-white/55">{c.note}</span>
                    <Link href={`/courses/${c.slug}`} className="inline-flex flex-none items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-navy transition hover:bg-coral hover:text-white">
                      View course <Arrow className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const card = "relative overflow-hidden border text-white transition duration-450 ease-out-expo hover:-translate-y-1";

export function CourseCard({ course, n }: { course: Course; n: number }) {
  const Icon = course.icon;
  return (
    <Link
      href={`/courses/${course.slug}`}
      data-spot
      className={cn(card, "flex min-h-80 flex-col rounded-3xl border-white/10 bg-white/4 p-6.5 hover:border-white/30 hover:bg-white/6")}
    >
      <div className="relative flex items-start justify-between gap-3">
        <span className="flex size-13.5 flex-none items-center justify-center rounded-2xl border border-white/12 bg-linear-135 from-[rgba(0,120,255,.4)] to-blue/12 text-sky">
          <Icon className="size-6" strokeWidth={1.8} />
        </span>
        <span className="font-display text-[13px] font-bold tracking-[.1em] text-coral">{String(n).padStart(2, "0")}</span>
      </div>
      <h3 className="font-display relative mt-6 mb-2 text-[26px] font-bold tracking-tight">{course.title}</h3>
      <p className="relative mb-4.5 text-[15px] leading-relaxed text-white/68">{course.summary}</p>
      <Tags tags={course.tags} />
      <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4.5">
        <span className="text-[13px] font-semibold text-white/55">{course.note}</span>
        <span className="inline-flex items-center gap-2 text-sm font-bold">
          View details
          <span className="flex size-8.5 items-center justify-center rounded-full border border-white/14 bg-white/8"><Arrow /></span>
        </span>
      </div>
    </Link>
  );
}

function Tags({ tags, big }: { tags: string[]; big?: boolean }) {
  return (
    <div className={cn("relative flex flex-wrap", big ? "gap-2" : "mb-5.5 gap-1.5")}>
      {tags.map((t) => (
        <span key={t} className={cn("rounded-full border text-xs font-semibold", big ? "border-white/12 bg-white/8 px-3 py-[7px]" : "border-white/10 bg-white/6 px-[11px] py-1.5 text-white/78")}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function Perks() {
  const perks = [
    { icon: FlaskConical, title: "Hands-on labs", text: "Learn by building, in equipped labs at every centre." },
    { icon: Award, title: "Globally accepted certificates", text: "Credentials recognised across 23 countries." },
    { icon: Briefcase, title: "Placement support", text: "Job fairs, live vacancies and employer tie-ups." },
  ];
  return (
    <div data-stagger className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
      {perks.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/4 px-5.5 py-5">
          <span className="flex size-11.5 flex-none items-center justify-center rounded-[14px] bg-red/16 text-[#FF6B5E]">
            <Icon className="size-5.5" strokeWidth={1.9} />
          </span>
          <span>
            <span className="font-display block font-bold tracking-tight">{title}</span>
            <span className="mt-0.5 block text-[13px] leading-normal text-white/60">{text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Global presence ───────────────────────────────────────── */

export function Global({ cta = true }: { cta?: boolean }) {
  return (
    <section id="global" className={cn(section, "relative overflow-hidden bg-deep")}>
      <div className="pointer-events-none absolute top-1/2 -right-[18%] size-[min(900px,90vw)] -translate-y-1/2 rounded-full bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,.07)_0_1px,transparent_1px_64px)]" />
      <div className={cn(wrap, "relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,80px)]")}>
        <GlobeNetwork
          intro={
            <>
              <Eyebrow>Our presence around the world</Eyebrow>
              <h2 data-reveal="0.1" className={cn(h2, "mb-5")}>Proud to deliver excellence worldwide.</h2>
              <p className="mb-8 max-w-[480px] text-[17px] leading-[1.7] text-pretty text-white/70">
                World-class training that gives learners modern skills and opportunities to build careers anywhere in the world. Hover a
                country to find it on the globe.
              </p>
            </>
          }
          footer={
            <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <div className="font-display text-[clamp(44px,5vw,64px)] leading-[.9] font-extrabold tracking-[-.04em]">23</div>
                <div className="mt-2 text-sm font-semibold text-white/60">Countries</div>
              </div>
              <div>
                <div className="font-display text-[clamp(44px,5vw,64px)] leading-[.9] font-extrabold tracking-[-.04em]">800<span className="text-coral">+</span></div>
                <div className="mt-2 text-sm font-semibold text-white/60">Centres across the globe</div>
              </div>
              {cta && (
                <Link href="/centres" className="inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/6 px-6.5 py-4 text-[15px] font-semibold backdrop-blur-md transition hover:border-white/45 hover:bg-white/14">
                  Locate a centre <Arrow />
                </Link>
              )}
            </div>
          }
        />
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────── */

export function Testimonials({ heading = true, grid }: { heading?: boolean; grid?: boolean }) {
  if (!grid)
    return (
      // overflow-clip, not hidden: hidden would make this a scroll container and unpin the sticky stage.
      <section id="testimonials" className="overflow-clip rounded-t-[40px] bg-mist text-ink">
        <Stories>
          {heading && (
            <>
              <Eyebrow light>Testimonials</Eyebrow>
              <h2 className={h2}>Here&apos;s what our students have to say.</h2>
              <p className="mt-4 text-[15px] text-ink-2">Tap a card to watch their story.</p>
              <Link href="/students" className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-blue hover:text-red">
                View all stories <Arrow />
              </Link>
            </>
          )}
        </Stories>
      </section>
    );
  return (
    <section id="testimonials" className="overflow-hidden rounded-t-[40px] bg-mist py-[clamp(80px,9vw,136px)] text-ink">
      {heading && (
        <div className={cn(wrap, "mb-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-end gap-x-16 gap-y-6")}>
          <div>
            <Eyebrow light>Testimonials</Eyebrow>
            <h2 data-reveal="0.1" className={h2}>Here&apos;s what our students have to say.</h2>
          </div>
          <div data-reveal="0.2">
            <Link href="/students" className="inline-flex items-center gap-2 text-[15px] font-bold text-blue hover:text-red">
              View all stories <Arrow />
            </Link>
          </div>
        </div>
      )}
      <Stories grid />
    </section>
  );
}

/* ── News ──────────────────────────────────────────────────── */

export function News({ heading = true }: { heading?: boolean }) {
  return (
    <section id="news" className={cn(section, "bg-white text-ink")}>
      <div className={wrap}>
        {heading && (
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow light>News &amp; events</Eyebrow>
              <h2 data-reveal="0.1" className={cn(h2, "max-w-[14ch]")}>Latest happenings at G-TEC.</h2>
            </div>
            <Link data-reveal="0.2" href="/news" className="inline-flex items-center gap-2 text-[15px] font-bold text-blue hover:text-red">
              All news &amp; events <Arrow />
            </Link>
          </div>
        )}
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
          {NEWS.map((n) => (
            <a key={n.url} href={n.url} className="grid grid-cols-[minmax(120px,38%)_1fr] overflow-hidden rounded-3xl border border-ink/6 bg-mist transition duration-450 ease-out-expo hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,26,51,.12)]">
              <img src={`${SITE}/assets/img/news-events/news-tmb.webp`} alt="" loading="lazy" className="block size-full min-h-50 object-cover" />
              <div className="flex flex-col px-7 py-6.5">
                <span className="self-start rounded-full border border-ink/8 bg-white px-3 py-1.5 text-xs font-bold text-blue">{n.date}</span>
                <h3 className="font-display mt-4 mb-2.5 text-xl leading-[1.3] font-bold tracking-tight">{n.title}</h3>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-red">Read more <Arrow className="size-3.5" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Subsidiaries ──────────────────────────────────────────── */

export function Subsidiaries() {
  return (
    <section className="rounded-t-[40px] bg-navy py-16">
      <div className={cn(wrap, "flex flex-wrap items-center gap-8")}>
        <div data-reveal="0" className="flex-none">
          <div className="mb-2 text-xs font-bold tracking-[.18em] text-white/50 uppercase">Group of institutions</div>
          <div className="font-display text-[22px] font-bold tracking-tight">Our subsidiaries</div>
        </div>
        <div data-stagger className="flex flex-1 flex-wrap justify-end gap-3">
          {SUBSIDIARIES.map((s) => (
            <a key={s.name} href={s.url} className="flex h-18 w-37.5 items-center justify-center rounded-2xl bg-white p-3 transition duration-300 ease-out-expo hover:-translate-y-1">
              <img src={s.img} alt={s.name} loading="lazy" className="max-h-full max-w-full object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Enquiry (rendered by the root layout on every page) ───── */

export function Enquire() {
  const channels = [
    { icon: Phone, label: "Call us", value: CONTACT.phone.label, href: CONTACT.phone.href, tint: "bg-[rgba(0,102,204,.25)] text-sky" },
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp.label, href: CONTACT.whatsapp.href, tint: "bg-[rgba(37,211,102,.2)] text-[#7EE2A3]" },
    { icon: Mail, label: "Email", value: CONTACT.email.label, href: CONTACT.email.href, tint: "bg-red/20 text-[#FF8A80]" },
  ];
  return (
    // Rendered inside EnquireDialog, so no reveal animations: they'd wait on an observer that never sees a closed dialog.
    <section className="relative overflow-hidden p-[clamp(24px,4vw,56px)]">
      <div className={cn(blob, "top-0 left-[10%] size-[40vw] bg-[radial-gradient(circle,rgba(0,102,204,.35),transparent_65%)] blur-[50px] [animation:float-a_16s_ease-in-out_infinite]")} />
      <div className={cn(blob, "right-[5%] bottom-0 size-[32vw] bg-[radial-gradient(circle,rgba(255,1,0,.22),transparent_65%)] blur-[50px] [animation:float-b_20s_ease-in-out_infinite]")} />
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(28px,4vw,56px)]">
        <div>
          <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.18em] text-coral uppercase">
            <span className="h-0.5 w-7 bg-red" />
            Admissions open
          </div>
          <h2 className="font-display mb-5 text-[clamp(32px,4vw,52px)] leading-[1.02] font-extrabold tracking-[-.03em] text-balance">
            Start your journey with G-TEC.
          </h2>
          <p data-reveal="0.2" className="mb-9 max-w-[480px] text-[17px] leading-[1.7] text-pretty text-white/70">
            Tell us what you want to learn and our counsellors will call you back with course options, fees and the nearest centre.
          </p>
          <div className="grid max-w-[420px] gap-3.5">
            {channels.map(({ icon: Icon, label, value, href, tint }) => (
              <a key={label} href={href} className="flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/5 px-4.5 py-4 transition hover:border-white/30 hover:bg-white/8">
                <span className={cn("flex size-10.5 flex-none items-center justify-center rounded-xl", tint)}>
                  <Icon className="size-4.5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-white/55">{label}</span>
                  <span className="block font-bold">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-white/12 bg-white/5 p-[clamp(24px,3vw,36px)] shadow-[0_40px_100px_rgba(0,0,0,.35)] backdrop-blur-2xl">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
