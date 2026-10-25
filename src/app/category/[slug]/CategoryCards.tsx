"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCards from '@/components/ProductCards';
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import { Category, Product } from "@/types/types";
import { toBengaliNumber } from "@/lib/Bengali";


interface CategoryCardProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryCards({
  category,
  initialProducts,
}: CategoryCardProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [initialProducts, sortOption]);

  const countBn = toBengaliNumber(sortedProducts.length);

  return (
    <div className="mx-auto max-w-6xl px-3 py-8 sm:px-4 lg:px-6">
      
      {/* Category Banner Card */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-100/90 bg-white p-4 shadow-xs sm:gap-5 sm:p-8">
        
        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shrink-0">
          {category.icon}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {category.nameBn}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {countBn}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      
      </div>

      {/* Sort Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <p className="text-[16px] text-slate-600" aria-live="polite" >মোট {countBn}টি পণ্য দেখানো হচ্ছে</p>

            <div className="flex items-center gap-2">
                <SortDropdown currentSort={sortOption} onChange={setSortOption} />
            </div>

      </div>



      {/* Product List or Empty State */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedProducts.map((p) => (
            <ProductCards key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center my-8 shadow-xs">
          <div className="text-4xl mb-4">🛒</div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          
          <p className="text-sm text-gray-500 mb-6">
            অনুগ্রহ করে অন্য কোনো ক্যাটাগরি পরীক্ষা করুন অথবা মূল পাতায় ফিরে যান।
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-[#0a8145] hover:bg-[#086a38] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            
            <span>হোম পেজে ফিরে যান</span>

          </Link>
        </div>
      )}
    </div>
  );
}
