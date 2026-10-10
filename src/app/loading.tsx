'use client'

import React from 'react';

interface ExactCardSkeletonProps {
    shimmerClassStr: string;
}

export default function Loading() {
    const summaryItems = Array.from({ length: 6 });
    const allProductItems = Array.from({ length: 30 });

    const nativeShimmer = "bg-[linear-gradient(100deg,#E2E8E4_20%,#F4F6F4_45%,#E2E8E4_70%)] bg-[length:250%_100%] animate-[pulse_1.5s_infinite_linear]";

    return (
        <div className="min-h-screen bg-[#F4F6F4] text-[#1E2722] font-sans antialiased" lang="bn">
            <span className="sr-only" role="status">বাজারের দামের তথ্য লোড হচ্ছে…</span>

            {/* Top Header */}
            <header className="w-full bg-[#006A38] h-14 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-6 rounded bg-white/20 animate-pulse" />
                    <div className="hidden md:flex items-center gap-4">
                        <div className="w-16 h-3 rounded bg-white/10" />
                        <div className="w-16 h-3 rounded bg-white/10" />
                        <div className="w-16 h-3 rounded bg-white/10" />
                    </div>
                </div>
                <div className="w-20 h-7 rounded-full bg-white/20 animate-pulse" />
            </header>

            {/* Main Container */}
            <main className="max-w-[1240px] mx-auto px-3 py-5 sm:px-6 sm:py-8 space-y-7">

                {/* Banner */}
                <div className="w-full bg-[#EBF3EE] border border-[#DEE7E2] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-3 z-10 w-full max-w-[620px]">
                        <div className={`h-4 w-28 rounded ${nativeShimmer}`} />
                        <div className={`h-8 w-11/12 sm:w-2/3 rounded-md ${nativeShimmer}`} />
                        <div className={`h-3.5 w-full rounded ${nativeShimmer}`} />
                        <div className={`h-9 w-32 rounded-lg ${nativeShimmer} mt-4`} />
                    </div>
                    <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex-shrink-0 ${nativeShimmer} self-center md:self-auto`} />
                </div>

                {/* Section: Price Up */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rotate-45 border-l-2 border-t-2 border-[#D32F2F] bg-transparent mt-1" />
                        <div className={`h-5 w-32 rounded ${nativeShimmer}`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {summaryItems.map((_, i) => (
                            <ExactCardSkeleton key={`up-${i}`} shimmerClassStr={nativeShimmer} />
                        ))}
                    </div>
                </section>

                {/* Section: Price Down */}
                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rotate-45 border-r-2 border-b-2 border-[#388E3C] bg-transparent mb-1" />
                        <div className={`h-5 w-32 rounded ${nativeShimmer}`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {summaryItems.map((_, i) => (
                            <ExactCardSkeleton key={`down-${i}`} shimmerClassStr={nativeShimmer} />
                        ))}
                    </div>
                </section>

                {/* Section: All Products */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#DEE7E2] pb-3">
                        <div className={`h-6 w-24 rounded ${nativeShimmer}`} />
                        <div className={`h-8 w-40 rounded-md ${nativeShimmer}`} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {allProductItems.map((_, i) => (
                            <ExactCardSkeleton key={`product-${i}`} shimmerClassStr={nativeShimmer} />
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

function ExactCardSkeleton({ shimmerClassStr }: ExactCardSkeletonProps) {
    return (
        <div className="bg-white border border-[#E3ECE6] rounded-xl p-3.5 flex flex-col justify-between min-h-[96px] shadow-sm" aria-hidden="true">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 ${shimmerClassStr}`} />
                    <div className="space-y-1">
                        <div className={`h-4 w-28 rounded ${shimmerClassStr}`} />
                        <div className={`h-2.5 w-16 rounded ${shimmerClassStr}`} />
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-between mt-3 pt-1 border-t border-[#FAFAFA]">
                <div className={`h-5 w-16 rounded ${shimmerClassStr}`} />
                <div className={`h-3.5 w-10 rounded ${shimmerClassStr}`} />
            </div>
        </div>
    );
}
