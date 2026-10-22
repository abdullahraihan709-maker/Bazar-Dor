import Link from "next/link";
import categoriesData from "@/../public/caregories.json";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  const navs: Category[] = categoriesData;

  return (
    <div className="border-t border-gray-100 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 py-1 overflow-x-auto text-sm font-medium">
          {navs.map((n) => (
            <Link
              key={n.id}
              href={`/category/${n.slug}`}
              className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 transition-colors whitespace-nowrap px-2 py-1"
            >
              <span className="text-base">{n.icon}</span>
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;