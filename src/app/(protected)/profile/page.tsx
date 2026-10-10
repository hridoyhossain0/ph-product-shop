
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
        }
    }, [session?.user?.name]);


    const handleSignOut = async () => {
        const toastId = toast.loading("সাইন আউট হচ্ছে...");

        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("সফলভাবে সাইন আউট হয়েছে!", {
                            id: toastId,
                        });
                        router.push("/sign-in");
                        router.refresh();
                    },
                    onError: (ctx) => {
                        toast.error(
                            ctx.error.message || "সাইন আউট করা যায়নি!",
                            { id: toastId }
                        );
                    },
                },
            });
        } catch (error) {
            console.error("Sign out error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
                id: toastId,
            });
        }
    };



    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            const message = "অনুগ্রহ করে আপনার নাম লিখুন।";
            setMessage(message);
            toast.error(message);
            return;
        }

        setIsSaving(true);
        setMessage("");

        const toastId = toast.loading("প্রোফাইল আপডেট হচ্ছে...");

        try {
            const result = await authClient.updateUser({
                name: name.trim(),
            });

            if (result.error) {
                const message =
                    result.error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।";

                setMessage(message);
                toast.error(message, { id: toastId });
            } else {
                const message = "আপনার তথ্য সফলভাবে আপডেট হয়েছে।";

                setMessage(message);
                toast.success(message, { id: toastId });
            }
        } catch (error) {
            console.error("Profile update error:", error);

            const message = "আপডেট করা যায়নি। আবার চেষ্টা করুন।";
            setMessage(message);
            toast.error(message, { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };


    if (isPending) {
        return (
            <main className="min-h-screen bg-[#F0F5F0] p-6">
                <div className="mx-auto max-w-md animate-pulse">
                    <div className="mb-6 h-8 w-40 rounded bg-gray-200" />
                    <div className="h-20 rounded-xl bg-white" />
                </div>
            </main>
        );
    }

    if (!session) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F0F5F0] p-6">
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="mb-4 text-gray-700">
                        প্রোফাইল দেখতে সাইন ইন করুন।
                    </p>
                    <Link
                        href="/sign-in"
                        className="inline-flex rounded-lg bg-[#07883F] px-6 py-2 text-sm font-semibold text-white hover:bg-[#067536]"
                    >
                        সাইন ইন
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F0F5F0] px-4 py-10 sm:px-6">
            <div className="mx-auto w-full max-w-md">

                {/* Page Heading */}
                <div className="mb-5">
                    <h1 className="text-xl font-bold text-[#202923]">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Information Card */}
                <section className="mb-4 flex items-center gap-3 rounded-xl border border-[#E4EAE4] bg-[#FBFDFC] p-3.5 shadow-sm">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                            width={40}
                            height={40}
                            src={session.user.image || "/MY_IMAGE.jpg"}
                            alt={session.user.name || "Profile"}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#263329]">
                            {session.user.name || "ব্যবহারকারী"}
                        </p>
                        <p className="mt-1 truncate text-[10px] text-gray-500">
                            {session.user.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-red-400 px-2 py-1.5 text-[10px] font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <span aria-hidden="true">↩</span>
                        সাইন আউট
                    </button>
                </section>

                {/* Edit Profile Card */}
                <section className="rounded-xl border border-[#E4EAE4] bg-[#FBFDFC] p-4 shadow-sm">
                    <h2 className="mb-6 text-sm font-bold text-[#263329]">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate}>
                        <label
                            htmlFor="profile-name"
                            className="mb-1 block text-xs font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="profile-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="আপনার নাম লিখুন"
                            required
                            className="h-9 w-full rounded-md border border-[#E2E9E2] bg-transparent px-3 text-xs text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#07883F] focus:ring-1 focus:ring-[#07883F]/20"
                        />

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="mt-2.5 flex h-8 w-full items-center justify-center rounded-md bg-[#07883F] text-xs font-semibold text-white shadow-sm transition hover:bg-[#067536] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                        {message && (
                            <p
                                role="status"
                                className={`mt-3 text-xs ${message.includes("সফলভাবে")
                                    ? "text-green-700"
                                    : "text-red-600"
                                    }`}
                            >
                                {message}
                            </p>
                        )}
                    </form>
                </section>
            </div>
        </main>
    );
}
