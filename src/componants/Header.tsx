'use client'
import Logo from "../../public/logo-icon.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from "@/lib/auth-client";
import BanglaDate from "./Date";
import NavBar from "./NavBar";
import ProfileDropdown from "./ProfileDropdown";
import Marquee from "../app/(protected)/Marquee";
import toast from "react-hot-toast";



const Header = () => {
    const router = useRouter();






    const { data: session, isPending } = authClient.useSession();


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
        } catch (err) {
            console.error("Sign out error:", err);

            toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
                id: toastId,
            });
        }
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full bg-[#FAFCFA]">
            <nav className="w-full bg-[#FAFCFA]  border-b-2 border-[#F5F9F5]  py-3.5 px-6 ">
                <div className="container mx-auto flex items-center justify-between">

                    {/* Left Side: Logo & App Branding Meta */}
                    <Link href={'/'}>
                        <div className="flex items-center gap-3">
                            <div className="w-[42px] h-[42px] bg-[#008744] rounded-xl flex items-center justify-center text-white shadow-sm">
                                <Image src={Logo} height={20} width={20} alt="logo" />
                            </div>

                            <div className="flex flex-col text-left leading-tight">
                                <span className="text-xl font-bold text-gray-900 tracking-wide">
                                    বাজার দর
                                </span>
                                <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                                    <BanglaDate />
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Right Side: Dynamic Authentication Links */}
                    <div className="flex items-center gap-6">
                        {isPending ? (
                            <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
                        ) : session ? (
                            <ProfileDropdown
                                name={session.user.name}
                                email={session.user.email}
                                image={session.user.image}
                                handleSignOut={handleSignOut}
                            />
                        ) : (
                            <>
                                <Link
                                    href="/sign-in"
                                    className="text-sm font-bold text-gray-900 hover:text-[#008744] transition-colors"
                                >
                                    সাইন ইন
                                </Link>

                                <Link
                                    href="/sign-up"
                                    className="flex items-center justify-center px-5 h-9 bg-[#008744] hover:bg-[#007038] active:bg-[#005c2e] text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-200"
                                >
                                    সাইন আপ
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </nav>
            <NavBar />


        </div>
    );
};

export default Header;
