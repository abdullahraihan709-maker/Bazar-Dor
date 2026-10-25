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
            <div className='mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3'>
                <Link href="/" className="flex items-center gap-2">
                    <span aria-hidden="true" className="bg-green-700 grid size-10 place-items-center rounded-xl text-lg">🛒</span>
                    <div className="leading-tight">
                        <span className="block text-2xl font-extrabold tracking-tight text-gray-900">বাজার দর</span>
                        <span className="block text-xs text-slate-600">{date}</span>
                    </div>
                </Link>

                <div className='ms-auto flex items-center gap-3 relative'>
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
                            <Link href='/sign-in' className='text-black font-bold text-sm px-3 py-2 hover:text-green-700 transition-colors'>
                                সাইন ইন
                            </Link>
                            <Link href='/sign-up' className='bg-green-700 hover:bg-green-800 text-white font-bold text-sm border rounded-xl px-5 py-2 transition-colors'>
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