import Link from "next/link";
import { Product } from "@/types/types";
import { toBengaliNumber, getUnitText } from "@/lib/Bengali";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface ProductDetailsProps {
  product: Product | null;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {



  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl mb-6">
          🛍️
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          পণ্যটি পাওয়া যায়নি
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-8 max-w-md mx-auto">
          দুঃখিত, আপনি যে পণ্যের বিবরণ খুঁজছেন তা খুঁজে পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-[#0a8145] hover:bg-[#086a38] text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  // Calculate market stats
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let minMarketName = "";
  let maxMarketName = "";
  let totalAvg = 0;

  if (markets.length > 0) {
    let lowest = Infinity;
    let highest = -Infinity;
    let sum = 0;

    markets.forEach((m) => {
      const avg = (m.min + m.max) / 2;
      sum += avg;

      if (m.min < lowest) {
        lowest = m.min;
        minMarketName = `${m.division}ের ${m.market}`;
      }
      if (m.max > highest) {
        highest = m.max;
        maxMarketName = `${m.division}ের ${m.market}`;
      }
    });

    minPrice = lowest;
    maxPrice = highest;
    totalAvg = Math.round(sum / markets.length);
  } else {
    totalAvg = product.today;
  }

  // Calculate difference from yesterday
  const priceDiff = product.today - (product.yesterday || product.today);
  const diffAbsBn = toBengaliNumber(Math.abs(priceDiff));
  let diffSentence = "গতকালকের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";
  if (priceDiff > 0) {
    diffSentence = `গতকালকের তুলনায় আজ দাম বেড়েছে ${diffAbsBn} টাকা`;
  } else if (priceDiff < 0) {
    diffSentence = `গতকালকের তুলনায় আজ দাম কমেছে ${diffAbsBn} টাকা`;
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctBn = toBengaliNumber(Math.abs(product.change?.pct ?? 0).toFixed(1));

  const unitShort =
    product.unit === "litre"
      ? "লিটার"
      : product.unit === "dozen"
      ? "ডজন"
      : product.unit === "piece"
      ? "পিস"
      : "কেজি";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-emerald-700 transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex items-start space-x-5">
          <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl shrink-0 shadow-2xs">
            {product.image || product.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {getUnitText(product.unit)} • {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
              {diffSentence}
            </p>
          </div>
        </div>

        {/* Right Price Highlight Card */}
        <div className="bg-gray-50/70 border border-gray-100/80 rounded-2xl p-5 min-w-\\\[190px] text-right flex flex-col items-end justify-center self-stretch md:self-auto">
          <span className="text-sm text-gray-700 font-normal mb-1">আজকের দাম</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-sm font-medium text-gray-600">
              টাকা / {unitShort}
            </span>
          </div>
          <div className="mt-2">
            {isUp && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#fdeeed] text-[#d92d20] border border-red-100/50">
                ▲ {pctBn}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#eaf7ee] text-[#0a8145] border border-emerald-100/50">
                ▼ {pctBn}%
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-500">
                — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary (দামের সারসংক্ষেপ) */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Minimum Price */}
          <div className="bg-white rounded-2xl border border-gray-100/90 p-5 sm:p-6 shadow-xs">
            <span className="text-sm text-gray-700 font-normal">সর্বনিম্ন দাম</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0a8145] my-1.5">
              {toBengaliNumber(minPrice)} টাকা
            </div>
            <p className="text-sm text-gray-700 truncate">
              {minMarketName ? `সবচেয়ে কম ${minMarketName}` : "সবচেয়ে কম দামের বাজার"}
            </p>
          </div>

          {/* Maximum Price */}
          <div className="bg-white rounded-2xl border border-gray-100/90 p-5 sm:p-6 shadow-xs">
            <span className="text-sm text-gray-700 font-normal">সর্বাধিক দাম</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#d92d20] my-1.5">
              {toBengaliNumber(maxPrice)} টাকা
            </div>
            <p className="text-sm text-gray-700 truncate">
              {maxMarketName ? `সবচেয়ে বেশি ${maxMarketName}` : "সবচেয়ে বেশি দামের বাজার"}
            </p>
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl border border-gray-100/90 p-5 sm:p-6 shadow-xs">
            <span className="text-sm text-gray-700 font-normal">গড় দাম</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#0a8145] my-1.5">
              {toBengaliNumber(totalAvg)} টাকা
            </div>
            <p className="text-sm text-gray-700">
              প্রতি {unitShort}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>

      {/* Market Breakdown Table (বাজারভিত্তিক আজকের দাম) */}
      <div className="bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length > 0 ? (
          <div className="overflow-x-auto rounded-3xl border border-gray-100/90">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500">
                  <th className="py-3 px-4">বাজার</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4 text-center">সর্বনিম্ন</th>
                  <th className="py-3 px-4 text-center">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, idx) => {
                  const avg = (m.min + m.max) / 2;
                  const avgFormatted =
                    avg % 1 === 0 ? avg.toString() : avg.toFixed(2);

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-black">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-800">
                        {toBengaliNumber(m.min)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-center text-gray-800">
                        {toBengaliNumber(m.max)} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-950">
                        {toBengaliNumber(avgFormatted)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">
            এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}