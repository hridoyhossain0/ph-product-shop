'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
const NavBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const API_URL = "https://openapi.programming-hero.com/api/bazardor/categories"
    // const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories"

    useEffect(() => {


        const fetchCategories = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("ক্যাটাগরি লোড করতে সমস্যা হয়েছে:", err);
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
                    <p className="text-xs text-gray-400 font-medium">ক্যাটাগরি লোড হচ্ছে...</p>
                ) : (
                    categories.map((c) => (
                        <Link
                            href={`/category/${c.id}`}
                            key={c.id}
                            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F4F6F4] hover:bg-[#E8EFEA] rounded-full transition-colors group cursor-pointer border border-transparent hover:border-[#008744]/20 flex-shrink-0"
                        >
                            <span className="text-base select-none">{c.icon}</span>
                            <span className="text-xs font-bold text-gray-700 group-hover:text-[#008744] transition-colors">
                                {c.nameBn}
                            </span>
                        </Link>
                    ))
                )}
            </div>
            
        </div>
    );
};

export default NavBar;