import type { Metadata } from "next";
import { About, Affiliations, PageHero, Stats, Subsidiaries } from "@/components/sections";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="25 years of making professionals."
        intro="An ISO-certified global institution and a trusted leader in IT education, skill development and vocational training — with 800+ centres across 23 countries."
      >
        <div className="mt-12">
          <Stats />
        </div>
      </PageHero>
      <About cta={false} />
      <Affiliations />
      <Subsidiaries />
    </>
  );
}
