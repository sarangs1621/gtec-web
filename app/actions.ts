"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { COUNTRIES, COURSES } from "@/lib/data";

export type EnquiryState = { ok: boolean; message: string; errors?: Record<string, string> };

export async function submitEnquiry(_: EnquiryState, form: FormData): Promise<EnquiryState> {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const country = get("country");
  const course = get("course");
  const message = get("message").slice(0, 2000);

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
  if (!/^\+?[\d\s()-]{7,20}$/.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)) errors.email = "Please enter a valid email.";
  if (country && !COUNTRIES.some((c) => c.name === country)) errors.country = "Unknown country.";
  if (course && !COURSES.some((c) => c.slug === course)) errors.course = "Unknown course.";
  if (Object.keys(errors).length) return { ok: false, message: "Please fix the highlighted fields.", errors };

  // ponytail: local JSONL file; swap for a DB or email service before deploying to a read-only host (e.g. Vercel).
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "enquiries.jsonl"),
    JSON.stringify({ name, phone, email, country, course, message, at: new Date().toISOString() }) + "\n",
  );

  return { ok: true, message: "" };
}
