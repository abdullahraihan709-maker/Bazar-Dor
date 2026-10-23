import React from "react";

export default function ProductDetailsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      
      {/* Breadcrumb Navigation Skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-10"></div>
        <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </div>

      {/* Top Summary Card Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-5 w-full">
          <div className="w-20 h-20 rounded-2xl bg-gray-200 shrink-0"></div>
          <div className="space-y-3 flex-1">
            <div className="h-7 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100/80 rounded-2xl p-5 min-w-47.5 h-28 flex flex-col items-end justify-center">
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-28 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-12"></div>
        </div>
      </div>

      {/* Price Summary (দামের সারসংক্ষেপ) Skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-36 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100/90 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-7 bg-gray-200 rounded w-28"></div>
              <div className="h-3 bg-gray-200 rounded w-36"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Breakdown Table Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}