'use client';

import React, { useState, useRef, useEffect } from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Bengali Date Start
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });
    // Bengali Date End

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        const toastId = toast.loading("লগআউট হচ্ছে...");
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে লগআউট হয়েছে!", { id: toastId });
                    setDropdownOpen(false);
                    router.push("/");
                    router.refresh();
                },
                onError: () => {
                    toast.error("লগআউট ব্যর্থ হয়েছে।", { id: toastId });
                }
            }
        });
    };

    return (
        <header className="sticky bg-white top-0 z-40 backdrop-blur-md transition-all border-b border-gray-100">
            <div className='mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3'>
                <Link href="/" className="flex min-w-0 items-center gap-2">
                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-green-700 text-lg sm:size-10">🛒</span>
                    <div className="leading-tight">
                        <span className="block text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">বাজার দর</span>
                        <span className="block truncate text-[10px] text-slate-600 sm:text-xs">{date}</span>
                    </div>
                </Link>

                <div className='relative ms-auto flex shrink-0 items-center gap-1 sm:gap-3'>
                    {isPending ? (
                        <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-xl"></div>
                    ) : session ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* User Profile Trigger Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold overflow-hidden border border-emerald-200">
                                    {session.user.image ? (
                                        <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        session.user.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <span className="text-sm font-semibold text-gray-800 hidden sm:inline-block">
                                    {session.user.name}
                                </span>
                                <span className="text-xs text-gray-400">▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-lg p-3 z-50 animate-in fade-in zoom-in-95">
                                    <div className="px-3 py-2 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors font-medium"
                                    >
                                        <span>👤</span>
                                        <span>আমার প্রোফাইল</span>
                                    </Link>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium mt-1 cursor-pointer"
                                    >
                                        <span>↩</span>
                                        <span>সাইন আউট</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href='/sign-in' className='px-2 py-2 text-xs font-bold text-black transition-colors hover:text-green-700 sm:px-3 sm:text-sm'>
                                সাইন ইন
                            </Link>
                            <Link href='/sign-up' className='rounded-xl border bg-green-700 px-2.5 py-2 text-xs font-bold text-white transition-colors hover:bg-green-800 sm:px-5 sm:text-sm'>
                                সাইন আপ
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <NavLinks />
        </header>
    );
};

export default Header;
