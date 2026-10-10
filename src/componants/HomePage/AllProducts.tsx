import { ProductType } from '@/app/page';
import React from 'react';
import Link from 'next/link';

const AllProducts = ({ product }: { product: ProductType }) => {
    const isUp = product.change.dir === 'up'
    const isDown = product.change.dir === 'down'
    const ProductsPt = new Intl.NumberFormat('bn-BD').format(product.change.pct);


    const translateUnit = (unit: string): string => {
        const unitMap: Record<string, string> = {
            'kg': 'কেজি',
            'litre': 'লিটার',
            'piece': 'পিস',
            'dozen': 'ডজন',
            'gm': 'গ্রাম',
            'pc': 'টি'
        };

        return unitMap[unit.toLowerCase().trim()] || unit;
    };


    const toBengaliNumber = (value: number | string) => {
        const bengaliDigits = [
            "০",
            "১",
            "২",
            "৩",
            "৪",
            "৫",
            "৬",
            "৭",
            "৮",
            "৯",
        ];

        return String(value).replace(
            /\d/g,
            (digit) => bengaliDigits[Number(digit)]
        );
    };
    return (
        <Link href={`/product/${product.id}`}>
            <div className="w-full max-w-[500px] m-auto bg-[#fcfdfe] border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                {/* Top Section Layout */}
                <div className="flex items-start gap-4 mb-auto">
                    {/* Render Emoji Wrapper with specific visual styling properties */}
                    <div className="text-4xl p-3 bg-gray-50 rounded-2xl flex items-center justify-center min-w-[64px] min-h-[64px]">
                        {product.image}
                    </div>
                    <div>
                        <h3 className="lg:text-2xl text-sm font-bold text-gray-900 tracking-wide">
                            {product.nameBn}
                        </h3>
                        <p className="lg:text-lg text-xs text-gray-400 font-medium mt-0.5">

                            প্রতি {translateUnit(product.unit)}
                        </p>
                    </div>
                </div>

                {/* Bottom Layout Row Divider */}
                <div className="mt-auto pt-4 border-t border-gray-50/70 flex items-end justify-between">
                    <div>
                        <span className="block lg:text-lg text-xs text-gray-400 font-semibold mb-1">
                            আজকের দাম
                        </span>
                        <span className="lg:text-2xl text-xl font-black text-gray-900">
                            {toBengaliNumber(product.today)} <span className=" font-bold ml-0.5">টাকা</span>
                        </span>
                    </div>

                    {/* Volatility Trend Status Badge matching color schemes */}
                    <span
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full lg:text-xl text-lg font-black tracking-wide ${isUp
                            ? "bg-red-50 text-red-600"
                            : isDown
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {isUp && "▲"}
                        {isDown && "▼"}
                        {!isUp && !isDown && "—"}
                        {ProductsPt}%
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default AllProducts;