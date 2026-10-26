import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-[min(1240px,100%)] flex-col items-center justify-center px-6 pt-32 text-center">
      <p className="font-display text-8xl font-extrabold tracking-tight text-red">404</p>
      <h1 className="font-display mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-white/65">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-red px-7 py-3.5 font-bold transition hover:bg-red-dark">
        Back home
      </Link>
    </section>
  );
}
