import React from 'react';
import Image from 'next/image';

const Hero = () => {
    // Bengali Date Generator
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="mx-auto my-4 max-w-6xl bg-[#f0f5f0] px-3 sm:my-6 sm:px-4">
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-xs sm:gap-8 sm:p-10 lg:flex-row lg:p-12">
                
                {/* Left Side: Text Content & Button */}
                <div className="flex w-full max-w-xl flex-col items-start gap-4">
                    {/* Date Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {date}
                    </span>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Description Paragraph */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* Primary CTA Anchor Link to #সব-পণ্য */}
                    <a
                        href="#সব-পণ্য"
                        className="mt-2 bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer text-center inline-block"
                    >
                        সব পণ্য দেখুন
                    </a>
                </div>

                {/* Right Side: Hero Basket Illustration */}
                <div className="shrink-0 flex items-center justify-center">
                    <Image
                        src="/bazar-hero.png"
                        alt="Bazar Hero Illustration"
                        width={320}
                        height={240}
                        className="w-full max-w-70 sm:max-w-[320px] h-auto object-contain"
                        priority
                    />
                </div>

            </div>
        </div>
    );
};


export default Hero;
