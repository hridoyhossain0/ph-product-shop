
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { IoCaretDownSharp } from "react-icons/io5";

type ProfileDropdownProps = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    handleSignOut: () => void;
};

export default function ProfileDropdown({
    name,
    email,
    image,
    handleSignOut,
}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile trigger */}
            <div className="flex items-center gap-5">
                <Link
                    href="/profile"
                    className="h-[56px] w-[56px] overflow-hidden rounded-2xl bg-gray-100"
                    aria-label="আমার প্রোফাইল"
                >
                    <Image
                        src={image || "/MY_IMAGE.jpg"}
                        alt={name || "Profile"}
                        width={56}
                        height={56}
                        unoptimized
                        className="h-full w-full object-cover"
                    />
                </Link>

                <span className="text-2xl font-medium text-[#202923]">
                    {name || "আমার প্রোফাইল"}
                </span>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle profile menu"
                    aria-expanded={isOpen}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                >
                    <IoCaretDownSharp />
                </button>
            </div>

            {/* Popup menu */}
            {isOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-[#fbfdfb] p-4 shadow-lg">
                    <div className="mb-3 border-b border-gray-100 pb-3">
                        <p className="truncate text-sm font-bold text-gray-800">
                            {name || "ব্যবহারকারী"}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                            {email || ""}
                        </p>
                    </div>

                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="mb-2 flex items-center gap-2 rounded-lg py-1 text-sm font-medium text-gray-700 hover:text-[#008744]"
                    >
                        <span><FaUser /></span>
                        <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg py-1 text-left text-sm font-medium text-red-600 hover:text-red-700"
                    >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </div>
            )}
        </div>
    );
}
