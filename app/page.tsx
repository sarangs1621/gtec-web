import { Loader } from "@/components/Loader";
import { About, Affiliations, CoursesSection, Global, Hero, News, Subsidiaries, Testimonials, Ticker } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Ticker />
      <Affiliations />
      <About />
      <CoursesSection />
      <Global />
      <Testimonials />
      <News />
      <Subsidiaries />
    </>
  );
}
