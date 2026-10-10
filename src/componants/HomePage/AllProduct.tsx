import { ProductType } from "@/app/page";
import React from "react";

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

const getUnit = (unit: string) => {
    switch (unit) {
        case "kg":
            return "প্রতি কেজি";

        case "liter":
        case "litre":
        case "l":
            return "প্রতি লিটার";

        case "piece":
        case "pcs":
            return "প্রতি পিস";

        case "dozen":
            return "প্রতি ডজন";

        case "gram":
        case "g":
            return "প্রতি গ্রাম";

        default:
            return `প্রতি ${unit}`;
    }
};

const AllProduct = ({
    product,
}: {
    product: ProductType;
}) => {
    const priceChange = Number(product.change?.pct ?? 0);

    const isPositive =
        product.change?.dir === "up" || priceChange > 0;

    const isNegative =
        product.change?.dir === "down" || priceChange < 0;

    return (
        <div className="group bg-white border border-[#dfe5df] rounded-2xl p-4 md:p-5 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all duration-200">
            {/* Top */}
            <div className="flex items-start gap-4">

                {/* Product Icon */}
                <div className="w-12 h-12 bg-[#f1f5f1] rounded-xl flex items-center justify-center shrink-0 text-3xl group-hover:scale-105 transition-transform">
                    {product.image || product.categoryIcon || "📦"}
                </div>

                {/* Product Info */}
                <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                        {product.nameBn}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {getUnit(product.unit)}
                    </p>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-end justify-between">

                {/* Price */}
                <div>
                    <p className="text-xs text-gray-400 mb-1">
                        আজকের দাম
                    </p>

                    <div className="flex items-baseline gap-1">
                        <span className="text-xl md:text-2xl font-extrabold text-gray-900">
                            {toBengaliNumber(product.today)}
                        </span>

                        <span className="text-sm text-gray-600">
                            টাকা
                        </span>
                    </div>
                </div>

                {/* Price Change */}
                <div
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                        isPositive
                            ? "bg-red-50 text-red-600"
                            : isNegative
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    {isPositive && <span>▲</span>}
                    {isNegative && <span>▼</span>}
                    {!isPositive && !isNegative && (
                        <span>—</span>
                    )}

                    <span>
                        {toBengaliNumber(Math.abs(priceChange))}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;