import Link from 'next/link';

export default function ProductNotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#f7f9f6] p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
                পণ্য পাওয়া যায়নি
            </h1>

            <p className="text-gray-500">
                পণ্যটি মুছে ফেলা হয়েছে অথবা ID সঠিক নয়।
            </p>

            <Link
                href="/"
                className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
                হোমে ফিরে যান
            </Link>
        </main>
    );
}