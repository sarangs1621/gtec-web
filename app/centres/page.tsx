import type { Metadata } from "next";
import { Global, PageHero } from "@/components/sections";

export const metadata: Metadata = { title: "Global presence" };

export default function CentresPage() {
  return (
    <>
      <PageHero
        eyebrow="Global"
        title="800+ centres. 23 countries."
        intro="Wherever you are, there's a G-TEC centre close by. Pick your country to visit the regional site, or send an enquiry and we'll connect you with the nearest centre."
      >
        <a
          data-reveal="0.3"
          href="https://www.gteceducation.com/centres"
          className="mt-9 inline-flex rounded-full bg-red px-7 py-4 text-[15px] font-bold shadow-[0_12px_32px_rgba(255,1,0,.38)] transition hover:-translate-y-0.5 hover:bg-red-dark"
        >
          Search the centre directory
        </a>
      </PageHero>
      <Global cta={false} />
    </>
  );
}
