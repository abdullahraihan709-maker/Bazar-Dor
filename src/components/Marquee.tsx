import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import Link from "next/link";
import allProductsData from "@/../public/allProducts.json";


interface AllProducts {
  id: number;          
  slug: string;            
  nameBn: string;         
  categoryIcon: string;   
  image: string;         
  unit: string;       
  today: number;           
  change: { 
    dir: string;          
    pct: number;   
  };
}

/**
 * Helper function to convert English digits (0-9) and decimals (.) 
 * into their Bengali numeral equivalents (০-৯).
 */
const toBengaliNumber = (num: number | string) => {
  const map: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
  };
  return num.toString().replace(/[0-9.]/g, (char) => map[char] || char);
};

/**
 * Helper function to map English unit strings to clear 
 * Bengali unit descriptions for display.
 */
const getUnitText = (unit: string) => {
  switch (unit) {
    case 'kg': return 'প্রতি কেজি';
    case 'litre': return 'প্রতি লিটার';
    case 'dozen': return 'প্রতি ডজন';
    case 'piece': return 'প্রতি পিস';
    default: return 'প্রতি কেজি';
  }
};

const Marquee = () => {
  // Load local product data into our typed array
  const headlines: AllProducts[] = allProductsData;

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