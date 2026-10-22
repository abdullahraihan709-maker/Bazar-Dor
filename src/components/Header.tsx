import React from 'react';
import Image from 'next/image';
import NavLinks from './NavLinks';


const Header = () => {
    // Bengali Date Start
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    } );
    // Bengali Date End

    return (
        <header className=" bg-white  top-0 z-40 backdrop-blur-md transition-all">
            
            <div className='mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3'>
                <div className="flex items-center gap-2">

                    <span aria-hidden="true" className="bg-green-100 grid size-10 place-items-center rounded-xl bg-primary text-lg text-primary-content">🛒</span>

                    {/* <Image className='border border-solid border-green-600 rounded p-2  '
                    src="/logo-icon.png"
                    alt="Bazar Dor Logo"
                    width={40}
                    height={40}
                    priority
                    /> */}

                    <div className="leading-tight">
                    <span className="block text-xl font-bold tracking-tight">বাজার দর</span>
                    <span className="block text-xs text-base-content/60 ">{date}</span>  {/* Bengali Date */}
                    </div>
                </div>

                <div className='ms-auto flex items-center gap-4' >
                    <button className='text-black font-bold' >সাইন ইন</button>
                    <button className='bg-green-700 text-white font-bold border rounded-[12px] px-5 py-2'>সাইন আপ</button>
                </div>
            </div>
            <NavLinks />
        </header>
    );
};

export default Header;





        // <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95backdrop-blur">

        //     <div className="mx-auto flex w-full max-w-6x1 items-center gap-3 px-4 py-3">

        //             <a className="flex items-center gap-2" href="/">

        //                 <span aria-hidden="true" className="grid size-10 place-items-center rounded-x1 bg-primary text-1g text-primary-content">Logo</span>

        //                 <span className="leading-tight">
        //                     <span className="block text-xl font-bold tracking-tight">বাজার দর</span>
        //                     <span className="block text-xs text-base-content/60">{date}</span>  {/* Bengali Date */}
        //                 </span>

        //             </a>

        //             <div className="ms-auto flex items-center gap-2">
        //                 <a className="btn btn-ghost btn-sm sm:btn-md" href="/signin">সাইন ইন</a>
        //                 <a className="btn btn-primary btn-sm sm:btn-md" href="/signup">সাইন আপ</a>
        //             </div>
        //     </div>
            
        //     <div className="border-t border-base-200 bg-base-100">
        //         <nav aria-label="" className="mx-auto w-full max-w-6xl px-4">
        //             <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm">


        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>
        //                 <li className="shrink-0"></li>

        //             </ul>

        //         </nav>

        //     </div>

        // </header>