'use client';

import { useState } from 'react';
import type { ProductType } from '@/types/product';
import AllProducts from '@/componants/HomePage/AllProducts';

export default function CategoryProducts({
    products,
}: {
    products: ProductType[];
}) {
    const [sort, setSort] = useState('default');

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === 'price-low') return a.today - b.today;
        if (sort === 'price-high') return b.today - a.today;

        if (sort === 'change-high') {
            return Math.abs(b.change.pct) - Math.abs(a.change.pct);
        }

        if (sort === 'change-low') {
            return Math.abs(a.change.pct) - Math.abs(b.change.pct);
        }

        return 0;
    });

    return (
        <section>
            {/* Product count and sorting */}
            <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                    মোট{' '}
                    {new Intl.NumberFormat('bn-BD').format(products.length)}
                    টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="sort"
                        className="text-sm text-gray-600"
                    >
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-low">দাম: কম থেকে বেশি</option>
                        <option value="price-high">দাম: বেশি থেকে কম</option>
                       
                    </select>
                </div>
            </div>

            {/* Reuse your existing card */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => (
                    <AllProducts
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}