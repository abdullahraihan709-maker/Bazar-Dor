import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
import allProductsData from "@/../public/allProducts.json";
import { Product } from "@/types/types";
import { toBengaliNumber, getUnitText } from '@/lib/Bengali';


const Marquee = () => {
  // Load local product data into our typed array
  const headlines: Product[] = allProductsData;

  return (
    
    <div className="bg-white border-y border-gray-200 py-1 overflow-hidden shadow-xs">
      
      <MarqueeText direction="right" duration={10}>

        <div className="flex items-center gap-8 whitespace-nowrap">
          {headlines.map((h) => {
            // Determine price movement flags for conditional styling and symbols
            const isUp = h.change.dir === 'up';
            const isDown = h.change.dir === 'down';
            const absPct = Math.abs(h.change.pct); // Always use positive number for display percentage

            return (
              <Link
                key={h.id}
                href={`/category/${h.slug}`}
                className="flex items-center gap-2 text-gray-800 hover:text-green-700 transition-colors px-2"
              >
                {/* Product Emoji / Icon */}
                <span className="text-base">{h.image || h.categoryIcon}</span>

                {/* Product Name in Bengali */}
                <span className="font-bold text-gray-900">{h.nameBn}</span>

                {/* Localized Price and Unit */}
                <span className="text-gray-700 font-medium">
                  {toBengaliNumber(h.today)} টাকা/{getUnitText(h.unit)}
                </span>

                {/* Percentage Change Badge with color coding (Green for up, Red for down, Gray for flat) */}
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded ${
                    isUp
                      ? 'text-green-600 bg-green-50'
                      : isDown
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {isUp && `▲ ${toBengaliNumber(absPct)}%`}
                  {isDown && `▼ ${toBengaliNumber(absPct)}%`}
                  {!isUp && !isDown && `—${toBengaliNumber(absPct)}%`}
                </span>
              </Link>
            );
          })}
        </div>
        
      </MarqueeText>
    
    </div>
  );
};

export default Marquee;