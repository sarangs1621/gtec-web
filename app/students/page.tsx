import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Testimonials } from "@/components/sections";
import { STUDENT_LINKS } from "@/lib/data";

export const metadata: Metadata = { title: "Students" };

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Students"
        title="Everything you need, in one place."
        intro="Check results, verify certificates, pay fees and find your next job — then hear from students who have walked the path."
      >
        <div data-stagger className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
          {STUDENT_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.url}
              className="group flex items-center justify-between rounded-[18px] border border-white/10 bg-white/4 px-5 py-4.5 font-semibold transition hover:border-white/30 hover:bg-white/8"
            >
              {l.label}
              <ArrowUpRight className="size-4.5 text-white/40 transition group-hover:text-coral" />
            </a>
          ))}
        </div>
      </PageHero>
      <Testimonials grid />
    </>
  );
}
