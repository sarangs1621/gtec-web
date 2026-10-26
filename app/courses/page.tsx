import type { Metadata } from "next";
import { CoursesSection, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title="Get job-ready with hands-on training."
        intro="Industry-focused programmes built for real careers — practical knowledge, lab experience and certifications that accelerate your growth."
      />
      <CoursesSection heading={false} />
    </>
  );
}
