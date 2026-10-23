import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/types';
import { toBengaliNumber, getUnitText } from '@/lib/Bengali';

interface ProductCardProps {
  product: Product;
}

const ProductCards: React.FC<ProductCardProps> = ({ product }) => {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  const absPct = Math.abs(product.change.pct);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl p-2 bg-gray-50 rounded-xl flex items-center justify-center">
          {product.image || product.categoryIcon}
        </span>
        <div>
          <h3 className="font-bold text-gray-900 text-base">{product.nameBn}</h3>
          <p className="text-[14px] text-gray-500 mt-0.5">{getUnitText(product.unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-50">
        <div>
          <span className="block text-[14px] text-gray-500">আজকের দাম</span>
          <span className="text-lg font-extrabold text-gray-900">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-md ${
            isUp
              ? 'text-red-600 bg-red-50'
              : isDown
              ? 'text-green-600 bg-green-50'
              : 'text-gray-500 bg-gray-100'
          }`}
        >
          {isUp && `▲ ${toBengaliNumber(absPct)}%`}
          {isDown && `▼ ${toBengaliNumber(absPct)}%`}
          {!isUp && !isDown && `—${toBengaliNumber(absPct)}%`}
        </span>
      </div>
    </Link>
  );
};

export default ProductCards;