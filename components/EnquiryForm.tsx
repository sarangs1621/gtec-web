"use client";

import { startTransition, useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { COUNTRIES, COURSES } from "@/lib/data";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[14px] border border-white/14 bg-white/6 px-4 py-[15px] text-[15px] text-white outline-none transition focus:border-coral focus:bg-white/9 aria-invalid:border-coral";

export function EnquiryForm() {
  const [n, setN] = useState(0); // remount = fresh form after "Send another"
  return <Form key={n} onReset={() => setN(n + 1)} />;
}

function Form({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { ok: false, message: "" });
  // On a course page, preselect that course.
  const slug = usePathname().match(/^\/courses\/([^/]+)/)?.[1] ?? "";

  if (state.ok)
    return (
      <div role="status" className="px-3 py-10 text-center">
        <div className="mx-auto mb-5.5 flex size-18 items-center justify-center rounded-full bg-[rgba(0,102,204,.25)] text-sky">
          <Check className="size-7.5" strokeWidth={2.6} />
        </div>
        <div className="font-display mb-2.5 text-[26px] font-bold tracking-tight">Thank you — we&apos;ll be in touch.</div>
        <p className="mb-6 leading-relaxed text-white/70">A counsellor from your nearest G-TEC centre will call you within one working day.</p>
        <button type="button" onClick={onReset} className="rounded-full border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/8">
          Send another enquiry
        </button>
      </div>
    );

  const e = state.errors ?? {};
  const err = (k: string) => (e[k] ? <p id={`${k}-err`} className="mt-1.5 text-[13px] text-coral">{e[k]}</p> : null);
  const inv = (k: string) => ({ "aria-invalid": !!e[k] || undefined, "aria-describedby": e[k] ? `${k}-err` : undefined });

  return (
    // onSubmit instead of action={...}: React resets action forms after submit, which would wipe input on a validation error.
    <form
      noValidate
      className="grid gap-3.5"
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <div className="font-display mb-1.5 text-[22px] font-bold tracking-tight">Quick enquiry</div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        <div>
          <input name="name" required autoComplete="name" placeholder="Full name" aria-label="Full name" className={field} {...inv("name")} />
          {err("name")}
        </div>
        <div>
          <input name="phone" required type="tel" autoComplete="tel" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" className={field} {...inv("phone")} />
          {err("phone")}
        </div>
      </div>
      <div>
        <input name="email" type="email" autoComplete="email" placeholder="Email address" aria-label="Email address" className={field} {...inv("email")} />
        {err("email")}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        <select name="country" aria-label="Country" defaultValue="" className={cn(field, "appearance-none")} {...inv("country")}>
          <option value="">Country</option>
          {COUNTRIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <select name="course" aria-label="Course interest" defaultValue={slug} className={cn(field, "appearance-none")} {...inv("course")}>
          <option value="">Course interest</option>
          {COURSES.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      </div>
      <textarea name="message" rows={3} maxLength={2000} placeholder="Anything else we should know?" aria-label="Message" className={cn(field, "resize-y")} />
      <button
        disabled={pending}
        className="mt-1.5 inline-flex items-center justify-center gap-2.5 rounded-full bg-red px-7 py-4.5 font-bold shadow-[0_12px_32px_rgba(255,1,0,.38)] transition duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-red-dark hover:shadow-[0_18px_44px_rgba(255,1,0,.5)] disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request a callback"} <ArrowRight className="size-4" strokeWidth={2.4} />
      </button>
      {state.message && <p role="alert" className="text-sm text-coral">{state.message}</p>}
      <p className="mt-1 text-xs leading-normal text-white/45">By submitting you agree to be contacted by a G-TEC counsellor. We never share your details.</p>
    </form>
  );
}
