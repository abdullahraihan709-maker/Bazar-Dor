import React from 'react';
import { Product } from '@/types/types';
import { toBengaliNumber } from '@/lib/Bengali';
import ProductCards from './ProductCards';
import allProductsData from '@/../public/allProducts.json';

const AllProducts = () => {
  const products: Product[] = allProductsData as Product[];

  // সেকশন এ: দাম বাড়ার দিক থেকে শীর্ষ ৬টি পণ্য
  const topRisers = [...products]
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // সেকশন বি: দাম কমার দিক থেকে শীর্ষ ৬টি পণ্য
  const topFallers = [...products]
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Section A — “আজ দাম বেড়েছে ▲” */}
      <div>
        <h2 className="text-2xl font-extrabold flex items-center gap-2 mb-4 text-gray-900">
          <span className="text-red-600 text-lg">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRisers.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Section B — “আজ দাম কমেছে ▼” */}
      <div>
        <h2 className="text-2xl font-extrabold flex items-center gap-2 mb-4 text-gray-900">
          <span className="text-green-600 text-lg">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topFallers.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Section C — “সব পণ্য” with subtitle */}
      <div id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-gray-900">সব পণ্য</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default AllProducts;