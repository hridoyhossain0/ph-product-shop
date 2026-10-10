
"use client";

import { useMemo, useState } from "react";
import type { ProductType } from "@/app/page";
import AllProducts from "./AllProducts";

type Props = {
    products: ProductType[];
};

export default function ProductToolbar({ products }: Props) {
    const [sortBy, setSortBy] = useState("default");
    const [discountOnly, setDiscountOnly] = useState(false);

    const sortedProducts = useMemo(() => {
        let result = [...products];

        if (discountOnly) {
            result = result.filter(
                (product) => product.change?.dir === "down"
            );
        }

        if (sortBy === "price-low") {
            result.sort((a, b) => a.today - b.today);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.today - a.today);
        
        }

        return result;
    }, [products, sortBy, discountOnly]);

    return (
        <>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#202923]">
                        সব পণ্য
                    </h1>
                    <p className="mt-3 text-sm text-gray-600">
                        মোট {new Intl.NumberFormat("bn-BD").format(sortedProducts.length)}
                        টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <label
                        htmlFor="product-sort"
                        className="text-sm text-gray-700"
                    >
                        সাজান
                    </label>

                    <select
                        id="product-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-[#FBFCFB] px-3 py-2 text-sm outline-none focus:border-[#008744]"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-low">দাম: কম থেকে বেশি</option>
                        <option value="price-high">দাম: বেশি থেকে কম</option>
                    </select>

                    
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => (
                    <AllProducts key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}
