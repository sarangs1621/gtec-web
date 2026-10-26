import Link from "next/link";
import { CONTACT, FOOTER_LINKS, SOCIAL } from "@/lib/data";

const SITE = "https://www.gteceducation.com";

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-abyss pt-18 pb-8">
      <div className="mx-auto grid w-[min(1240px,100%)] grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-10 px-6">
        <div>
          <img src="/logo.png" alt="G-TEC Education" className="mb-4.5 block h-14 rounded-xl" />
          <p className="mb-5 max-w-[280px] text-sm leading-relaxed text-white/60">
            World&apos;s largest IT education network. A global leader in training and skilling since 2000.
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.url} className="rounded-full border border-white/12 px-3.5 py-2 text-[13px] font-semibold text-white/75 transition hover:border-coral hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <p className="font-display mb-4.5 text-sm font-bold">{col.title}</p>
            <div className="grid gap-2.5 text-sm text-white/60">
              {col.links.map((l) =>
                l.url.startsWith("/") ? (
                  <Link key={l.label} href={l.url} className="hover:text-white">{l.label}</Link>
                ) : (
                  <a key={l.label} href={l.url} className="hover:text-white">{l.label}</a>
                ),
              )}
            </div>
          </div>
        ))}

        <div>
          <p className="font-display mb-4.5 text-sm font-bold">Connect</p>
          <div className="grid gap-2.5 text-sm leading-relaxed text-white/60">
            <span>{CONTACT.address[0]}<br />{CONTACT.address[1]}</span>
            <a href={CONTACT.phone.href} className="hover:text-white">{CONTACT.phone.label}</a>
            <a href={CONTACT.whatsapp.tel} className="hover:text-white">{CONTACT.whatsapp.label}</a>
            <a href={CONTACT.email.href} className="hover:text-white">{CONTACT.email.label}</a>
            <a href={`${SITE}/supportdesk`} className="hover:text-white">Support Desk</a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-[min(1240px,100%)] flex-wrap items-center justify-between gap-4 border-t border-white/8 px-6 pt-6 text-[13px] text-white/45">
        <span>© {new Date().getFullYear()} G-TEC EDUCATION. All rights reserved. ISO-certified institution.</span>
        <div className="flex gap-5">
          <a href={`${SITE}/privacypolicy`} className="hover:text-white">Privacy Policy</a>
          <a href={`${SITE}/ouroffices`} className="hover:text-white">Our Offices</a>
        </div>
      </div>
    </footer>
  );
}
