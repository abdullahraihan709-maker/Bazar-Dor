"use client";
import Link from "next/link";
import categoriesData from "@/../public/caregories.json";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const navs: Category[] = categoriesData;
  const pathname = usePathname();
  return (
    <div className="border-t border-gray-100 bg-white">
      <nav className="mx-auto max-w-6xl px-2 sm:px-4">
        <div className="flex items-center justify-start gap-2 overflow-x-auto py-1.5 text-sm font-medium sm:justify-center sm:gap-4" aria-label="পণ্যের বিভাগ">
          {navs.map((n) => {
            const isActive = 
              pathname === `/category/${n.slug}` ||
              pathname === `/category/${n.id}`;

            return (
            <Link
              key={n.id}
              href={`/category/${n.slug}`}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors ${
                  isActive
                    ? "bg-[#0a8145] rounded-lg hover:text-slate-200 text-white shadow-sm"
                    : "text-gray-700  hover:bg-gray-100"
              }`}
            >
              <span className="text-base">{n.icon}</span>
              <span>{n.nameBn}</span>
            </Link>
          );
          })}
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;





