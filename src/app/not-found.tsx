
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F0F5F0] px-4 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-[#E4EAE4] bg-[#FBFDFC] p-8 text-center shadow-sm sm:p-12">

                {/* 404 Illustration */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#E2ECE5]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-12 w-12 text-[#008744]"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m16 16 4 4" />
                        <path d="M8.5 9.5h.01M13.5 9.5h.01" />
                        <path d="M9 13s1 1 2 1 2-1 2-1" />
                    </svg>
                </div>

                {/* Error Code */}
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#008744]">
                    Error 404
                </p>

                <h1 className="mb-3 text-3xl font-black text-[#202923] sm:text-4xl">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h1>

                <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-gray-500">
                    দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
                    ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি আর উপলব্ধ নেই।
                </p>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#008744] px-7 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#007038] active:bg-[#005c2e]"
                >
                    ← হোম পেজে ফিরে যান
                </Link>

                <p className="mt-6 text-xs font-medium text-gray-400">
                    বাজার দর — আজকের বাজারের দাম এক নজরে
                </p>
            </div>
        </main>
    );
}
