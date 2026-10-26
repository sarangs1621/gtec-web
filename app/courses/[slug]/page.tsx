import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CourseCard, Perks } from "@/components/sections";
import { COURSES, courseUrl } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => COURSES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  return course ? { title: course.title, description: course.summary } : {};
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const i = COURSES.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const course = COURSES[i];
  const Icon = course.icon;
  const others = COURSES.map((c, n) => ({ c, n: n + 1 })).filter(({ c }) => c.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy pt-36 pb-[clamp(80px,9vw,136px)]">
        <div className="pointer-events-none absolute top-[-200px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(0,66,130,.45),transparent_65%)] blur-[40px]" />
        <div className="relative mx-auto w-[min(1240px,100%)] px-6">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white">
            <ArrowLeft className="size-4" /> All courses
          </Link>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(40px,6vw,80px)]">
            <div>
              <div data-reveal="0" className="mb-6 flex items-center gap-4">
                <span className="flex size-15 flex-none items-center justify-center rounded-[18px] border border-white/16 bg-linear-135 from-red/55 to-red/12">
                  <Icon className="size-7" strokeWidth={1.8} />
                </span>
                <span className="font-display text-[13px] font-bold tracking-[.1em] text-coral">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h1 data-reveal="0.1" className="font-display text-[clamp(44px,6vw,88px)] leading-none font-extrabold tracking-[-.035em] text-balance">
                {course.title}
              </h1>
              <p data-reveal="0.2" className="mt-6 max-w-[560px] text-lg leading-relaxed text-pretty text-white/75">{course.description}</p>
              <div data-reveal="0.3" className="mt-9 flex flex-wrap gap-3">
                <a href="#enquire" className="inline-flex items-center gap-2.5 rounded-full bg-red px-7 py-4 text-[15px] font-bold shadow-[0_12px_32px_rgba(255,1,0,.38)] transition hover:-translate-y-0.5 hover:bg-red-dark">
                  Enquire about {course.title} <ArrowRight className="size-4" strokeWidth={2.4} />
                </a>
                <a href={courseUrl(course.slug)} className="inline-flex items-center rounded-full border border-white/22 bg-white/6 px-7 py-4 text-[15px] font-semibold transition hover:border-white/45 hover:bg-white/14">
                  Full syllabus
                </a>
              </div>
            </div>

            <div data-reveal="0.15" className="rounded-[28px] border border-white/14 bg-white/5 p-8 backdrop-blur-lg">
              <div className="mb-5 text-[11px] font-bold tracking-[.16em] text-white/50 uppercase">What you&apos;ll learn</div>
              <ul className="grid gap-3.5">
                {course.tags.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-semibold">
                    <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-[rgba(0,120,255,.25)] text-sky">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold text-white/60">{course.note}</div>
            </div>
          </div>

          <Perks />

          <h2 className="font-display mt-24 mb-8 text-3xl font-bold tracking-tight">Explore other programmes</h2>
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {others.map(({ c, n }) => <CourseCard key={c.slug} course={c} n={n} />)}
          </div>
        </div>
      </section>
    </>
  );
}
