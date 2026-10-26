import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { Enquire } from "@/components/sections";
import { EnquireDialog } from "@/components/EnquireDialog";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "G-TEC EDUCATION | Global Leader in Training & Skilling", template: "%s | G-TEC Education" },
  description:
    "World's largest IT education network — 800+ centres across 23 countries, 25 years of IT education, skilling and vocational training.",
  icons: { icon: "/logo.png" },
};

// Runs before paint so scroll-reveal elements start hidden only when JS + motion are available.
const motionFlag = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <EnquireDialog>
          <Enquire />
        </EnquireDialog>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
