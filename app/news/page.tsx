import type { Metadata } from "next";
import { News, PageHero, Ticker } from "@/components/sections";

export const metadata: Metadata = { title: "News & events" };

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News & events" title="Latest happenings at G-TEC." intro="Job fairs, announcements and events from across the G-TEC network." />
      <Ticker />
      <News heading={false} />
    </>
  );
}
