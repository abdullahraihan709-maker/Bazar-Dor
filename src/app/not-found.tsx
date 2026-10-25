import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">404</p>
      <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 btn-sm sm:btn-md"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
