'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [socialLoading, setSocialLoading] = useState<
        'google' | 'github' | null
    >(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg("");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                const message =
                    error.message || "সাইন ইন করতে ব্যর্থ হয়েছে।";

                setErrorMsg(message);
                toast.error(message);
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");

                router.push("/");
                router.refresh();
            }
        } catch (err) {
            console.error(err);

            const message =
                "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";

            setErrorMsg(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };





    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        setSocialLoading(provider);
        setErrorMsg("");

        const toastId = toast.loading(
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন হচ্ছে...`
        );

        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            // OAuth সাধারণত অন্য পেজে redirect করে।
            // Redirect না হলে loading toast সরিয়ে দিন।
            toast.dismiss(toastId);
        } catch (err) {
            console.error(err);

            const message =
                `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।`;

            setErrorMsg(message);
            toast.error(message, { id: toastId });
            setSocialLoading(null);
        }
    };


    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F4F6F4] px-4 font-sans ">

            {/* Header Info */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1">
                    সাইন ইন
                </h1>
                <p className="text-sm text-gray-600 font-normal">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Main Card Container */}
            <div className="w-full max-w-[460px] bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">

                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-gray-700 font-medium text-sm text-left">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#008744] focus:ring-1 focus:ring-[#008744] transition-all text-sm"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-gray-700 font-medium text-sm text-left">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full h-11 px-3.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#008744] focus:ring-1 focus:ring-[#008744] transition-all text-sm"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#008744] text-white font-semibold text-base rounded-lg shadow-sm hover:bg-[#007038] active:bg-[#005c2e] transition-colors duration-200 mt-2 disabled:opacity-50"
                    >
                        {loading ? 'সাইন ইন হচ্ছে...' : 'সাইন ইন'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-5">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <span className="relative px-3 bg-white text-xs text-gray-500 font-medium">
                        অথবা
                    </span>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn('google')}
                        disabled={socialLoading !== null || loading}
                        className="flex items-center justify-center gap-2 h-11 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {socialLoading === 'google' ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#008744]" />
                                <span>লোড হচ্ছে...</span>
                            </>
                        ) : (
                            <>
                                <FcGoogle className="text-lg shrink-0" />
                                <div className="flex flex-col text-left leading-tight">
                                    <span>Google দিয়ে</span>
                                    <span>চালিয়ে যান</span>
                                </div>
                            </>
                        )}
                    </button>

                    {/* GitHub Button */}
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn('github')}
                        disabled={socialLoading !== null || loading}
                        className="flex items-center justify-center gap-2 h-11 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {socialLoading === 'github' ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#008744]" />
                                <span>লোড হচ্ছে...</span>
                            </>
                        ) : (
                            <>
                                <FaGithub className="text-lg shrink-0" />
                                <div className="flex flex-col text-left leading-tight">
                                    <span>GitHub দিয়ে</span>
                                    <span>চালিয়ে যান</span>
                                </div>
                            </>
                        )}
                    </button>
                </div>

                {/* Redirect Link */}
                <div className="text-center mt-6 text-sm text-gray-600 font-medium">
                    অ্যাকাউন্ট নেই?{' '}
                    <a href="/sign-up" className="text-[#008744] hover:underline font-bold ml-0.5">
                        সাইন আপ করুন
                    </a>
                </div>

            </div>

            {/* Back to Home Link */}
            <Link
                href="/"
                className="mt-6 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium flex items-center gap-1"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
}
