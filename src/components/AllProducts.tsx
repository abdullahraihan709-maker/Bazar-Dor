'use client';
import { useState, useMemo } from 'react';
import { Product } from '@/types/types';
import { toBengaliNumber } from '@/lib/Bengali';
import ProductCards from './ProductCards';
import allProductsData from '@/../public/allProducts.json';
import SortDropdown, { SortOption } from './SortDropdown';

const AllProducts = () => {
  const products: Product[] = allProductsData as Product[];
  const [sortOption, setSortOption] = useState<SortOption>("default");

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

  // সেকশন সি: সব পণ্যের জন্য সর্টিং লজিক
  const sortedAllProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === "price-asc") {
      return list.sort((a, b) => a.today - b.today);
    }
    if (sortOption === "price-desc") {
      return list.sort((a, b) => b.today - a.today);
    }
    return list; // default
  }, [products, sortOption]);

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
      
      {/* Section C — “সব পণ্য” with subtitle & Sort Control */}
      <div id="সব-পণ্য" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">সব পণ্য</h2>
            <p className="text-sm sm:text-sm text-gray-500 mt-1">
              মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          {/* Sort Dropdown Control */}
          <div className="self-end sm:self-auto">
            <SortDropdown currentSort={sortOption} onChange={setSortOption} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAllProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default AllProducts;