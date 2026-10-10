'use client'
import HeroPicture from "../../../public/bazar-hero.png";
import Link from 'next/link';
import Image from 'next/image';
import BanglaDate from "../Date";

export default function HeroSection() {


    return (
        <div className='container mt-8 mx-auto'>
            <div className="w-full bg-[#F4F6F4] p-4 sm:p-6 md:p-8 rounded-3xl  border border-gray-100/50 shadow-sm font-sans relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Left Side: Content Wrapper */}
                <div className="flex flex-col items-start text-left max-w-[580px] z-10">

                    {/* Dynamic Badge Date */}
                    <div className="bg-[#E2ECE5] text-[#008744] text-[12px] sm:text-xs font-bold px-3 py-1 rounded-full mb-4 select-none">
                        <BanglaDate />
                    </div>

                    {/* Main Heading Text */}
                    <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black text-gray-900 leading-[1.25] tracking-tight mb-4">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed tracking-wide mb-6">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Action Button Element */}
                    <Link
                        href="#allProduct"
                        className="flex items-center justify-center px-6 h-11 bg-[#008744] hover:bg-[#007038] active:bg-[#005c2e] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all duration-200"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                document.getElementById("allProduct")?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                            className="flex items-center justify-center px-6 h-11 bg-[#008744] hover:bg-[#007038] active:bg-[#005c2e] text-white font-bold text-sm sm:text-base rounded-xl shadow-sm transition-all duration-200"
                        >
                            সব পণ্য দেখুন
                        </button>
                    </Link>
                </div>

                {/* Right Side: Visual Artwork Vector Wrapper */}
                <div className="flex items-center justify-center relative min-w-[240px] md:min-w-[280px] self-center md:self-auto select-none">
                    <Image src={HeroPicture} height={400} width={400} alt={'icon'} />
                </div>

            </div>
        </div>

    );
}
