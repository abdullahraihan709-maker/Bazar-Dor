'use client';

import NavLinks from './NavLinks';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Header = () => {

    const router = useRouter();
    const { data: session, isPending } = useSession();

    // Bengali Date Start
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    } );
    // Bengali Date End

    const handleSignOut = async () => {
        const toastId = toast.loading("লগআউট হচ্ছে...");
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে লগআউট হয়েছে!", { id: toastId });
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
        <header className=" bg-white  top-0 z-40 backdrop-blur-md transition-all">
            
            <div className='mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3'>
                <div className="flex items-center gap-2">

                    <span aria-hidden="true" className="bg-green-100 grid size-10 place-items-center rounded-xl bg-primary text-lg text-primary-content">🛒</span>

                    <div className="leading-tight">
                    <span className="block text-2xl font-extrabold tracking-tight">বাজার দর</span>
                    <span className="block text-xs text-slate-600 text-base-content/60 ">{date}</span>  {/* Bengali Date */}
                    </div>
                </div>

                <div className='ms-auto flex items-center gap-3'>
                    {isPending ? (
                        <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-xl"></div>
                    ) : session ? (
                        <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline-block">
                                {session.user.name}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors cursor-pointer'
                            >
                                লগআউট
                            </button>
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
