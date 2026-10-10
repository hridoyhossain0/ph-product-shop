"use client";

import React, { useEffect } from "react";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Market prices page error:", error);
    }, [error]);

    return (
        <main
            className="min-h-screen grid place-items-center p-6 bg-[#f0f5f0] text-[#253129] font-sans"
            lang="bn"
        >
            <section
                className="w-full max-w-[460px] p-[30px_24px] text-center bg-[#fbfdfb] border border-[#e0e9e1] rounded-[17px]"
                role="alert"
            >
                {/* Error Symbol */}
                <div
                    className="grid place-items-center w-[54px] h-[54px] mx-auto mb-4 rounded-[15px] bg-[#fff0ef] text-[#d83d3d] text-[29px] font-bold"
                    aria-hidden="true"
                >
                    !
                </div>

                {/* Title */}
                <h1 className="m-[0_0_10px] text-[22px] font-bold">
                    দুঃখিত, একটি সমস্যা হয়েছে
                </h1>

                {/* Description */}
                <p className="mx-auto mb-5 max-w-[340px] text-[#718078] text-sm leading-[1.8]">
                    পণ্যের দামের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন। সমস্যা চলতে থাকলে কিছুক্ষণ পরে পেজটি রিফ্রেশ করুন।
                </p>

                {/* Retry Button */}
                <button
                    type="button"
                    onClick={() => reset()}
                    className="border-0 rounded-export rounded-[10px] bg-[#14884b] text-white p-[11px_19px] text-sm font-bold cursor-pointer hover:bg-[#0f713e] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#8bcba8] focus-visible:outline-offset-3 transition-colors"
                >
                    আবার চেষ্টা করুন
                </button>

                {/* Error ID */}
                {error.digest && (
                    <div className="mt-3.5 text-[#98a39a] text-[11px] any-where break-all">
                        Error ID: {error.digest}
                    </div>
                )}
            </section>
        </main>
    );
}
