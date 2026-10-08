'use client';

import React, { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface ProductChange {
    dir: 'up' | 'down' | 'flat';
    pct: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    categoryIcon?: string;
    today: number;
    change: ProductChange;
}

const iconMap: Record<string, string> = {
    'sorno-machi-chal': '🍚',
    'miniket-chal': '🍚',
    peyaj: '🧅',
    ada: '🫚',
    begun: '🍆',
    'rui-mach': '🐟',
    dim: '🥚',
    'dui-dudh': '🥛',
    mokhhan: '🧈',
    roshun: '🧄',
    'morich-gunda': '🌶️',
    'kaccha-moric': '🌶️',
};

export default function Marquee() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Convert English number → Bangla number
    const toBanglaDigits = (num: number | string): string => {
        const banglaNums = [
            '০',
            '১',
            '২',
            '৩',
            '৪',
            '৫',
            '৬',
            '৭',
            '৮',
            '৯',
        ];

        return num.toString().replace(/\d/g, (digit) => {
            return banglaNums[Number(digit)];
        });
    };

    // Convert unit
    const formatUnit = (unit: string): string => {
        switch (unit) {
            case 'kg':
                return 'কেজি';

            case 'dozen':
                return 'ডজন';

            case 'liter':
            case 'litre':
                return 'লিটার';

            case 'piece':
            case 'pcs':
                return 'পিস';

            default:
                return unit;
        }
    };

    // Fetch API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    'https://api.api-store.workers.dev/api/bazardor/products'
                );

                if (!response.ok) {
                    throw new Error(
                        `API Error: ${response.status}`
                    );
                }

                const data: Product[] = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid API response');
                }

                setProducts(data);
            } catch (error) {
                console.error('Marquee API Error:', error);

                setError(
                    error instanceof Error
                        ? error.message
                        : 'Products load করা যায়নি'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Loading
    if (loading) {
        return (
            <div className="w-full bg-[#f8f9fa] border-y border-gray-200 py-2">
                <div className="text-center text-xs text-gray-400">
                    বাজারদর লোড হচ্ছে...
                </div>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="w-full bg-[#f8f9fa] border-y border-gray-200 py-2">
                <div className="text-center text-xs text-red-400">
                    বাজারদর লোড করা যায়নি
                </div>
            </div>
        );
    }

    // No products
    if (products.length === 0) {
        return (
            <div className="w-full bg-[#f8f9fa] border-y border-gray-200 py-2">
                <div className="text-center text-xs text-gray-400">
                    কোনো পণ্য পাওয়া যায়নি
                </div>
            </div>
        );
    }

    return (
        <div
            className="
                w-full
                bg-[#f8f9fa]
                border-y
                border-gray-200/80
                py-2
                overflow-hidden
                select-none
            "
        >
            <MarqueeText
                className='py-1.5'
                direction='right'
                duration={10}
                pauseOnHover={true}
            >
                <div className="flex items-center whitespace-nowrap">

                    {products.map((product) => {

                        const isUp =
                            product.change?.dir === 'up';

                        const isDown =
                            product.change?.dir === 'down';

                        const isFlat =
                            product.change?.dir === 'flat';

                        // Product icon
                        const icon =
                            iconMap[product.slug] ||
                            product.categoryIcon ||
                            '📦';

                        return (
                            <React.Fragment key={product.id}>

                                {/* Product Item */}
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                        px-4
                                        text-xs
                                        md:text-sm
                                        text-gray-700
                                        font-medium
                                    "
                                >

                                    {/* Icon */}
                                    <span className="text-sm md:text-base">
                                        {icon}
                                    </span>

                                    {/* Product name */}
                                    <span className="text-gray-700">
                                        {product.nameBn}
                                    </span>

                                    {/* Price */}
                                    <span className="text-gray-500">
                                        {toBanglaDigits(product.today)}
                                        {' '}
                                        টাকা/
                                        {formatUnit(product.unit)}
                                    </span>

                                    {/* UP */}
                                    {isUp && (
                                        <span className="text-red-600 font-semibold">
                                            ▲{' '}
                                            {toBanglaDigits(
                                                Math.abs(
                                                    product.change.pct
                                                ).toFixed(1)
                                            )}
                                            %
                                        </span>
                                    )}

                                    {/* DOWN */}
                                    {isDown && (
                                        <span className="text-emerald-600 font-semibold">
                                            ▼{' '}
                                            {toBanglaDigits(
                                                Math.abs(
                                                    product.change.pct
                                                ).toFixed(1)
                                            )}
                                            %
                                        </span>
                                    )}

                                    {/* FLAT */}
                                    {isFlat && (
                                        <span className="text-gray-500 font-semibold">
                                            — ০.০%
                                        </span>
                                    )}

                                </div>

                                {/* Divider */}
                                <span
                                    className="
                                        h-5
                                        w-px
                                        bg-gray-200
                                        shrink-0
                                    "
                                />

                            </React.Fragment>
                        );
                    })}

                </div>
            </MarqueeText>
        </div>
    );
}