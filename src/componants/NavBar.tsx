
'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const API_URL =
    'https://openapi.programming-hero.com/api/bazardor/categories';

const NavBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(API_URL);

                if (!res.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('ক্যাটাগরি লোড করতে সমস্যা হয়েছে:', err);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full bg-[#FAFCFA] border-b border-[#F5F9F5] py-3 px-6 font-sans">
            <div className="max-w-[1280px] mx-auto flex gap-4 items-center overflow-x-auto no-scrollbar">
                {categoriesLoading ? (
                    <p className="text-xs text-gray-400 font-medium">
                        ক্যাটাগরি লোড হচ্ছে...
                    </p>
                ) : (
                    <Suspense
                        fallback={
                            <p className="text-xs text-gray-400 font-medium">
                                ক্যাটাগরি লোড হচ্ছে...
                            </p>
                        }
                    >
                        <CategoryLinks categories={categories} />
                    </Suspense>
                )}
            </div>
        </div>
    );
};

function CategoryLinks({ categories }: { categories: Category[] }) {
    const pathname = usePathname();

    return (
        <>
            {categories.map((c) => {
                const href = `/category/${c.id}`;

                const isActive =
                    pathname === href ||
                    pathname.startsWith(`${href}/`);

                return (
                    <Link
                        href={href}
                        key={c.id}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 flex-shrink-0 border ${isActive
                                ? 'bg-[#008744] text-white border-[#008744] shadow-sm'
                                : 'bg-[#F4F6F4] text-gray-700 border-transparent hover:bg-[#E8EFEA] hover:border-[#008744]/20 hover:text-[#008744]'
                            }`}
                    >
                        <span className="text-base select-none">
                            {c.icon}
                        </span>

                        <span className="text-xs font-bold">
                            {c.nameBn}
                        </span>
                    </Link>
                );
            })}
        </>
    );
}

export default NavBar;
