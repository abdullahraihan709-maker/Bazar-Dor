import Link from "next/link";
import categoriesData from "@/../public/caregories.json";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = () => {
  // Directly used imported JSON data
  const navs: Category[] = categoriesData;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 pt-2 pb-4 text-sm font-medium border-t border-gray-100">
      {navs.map((n) => (
        <Link
          key={n.id}
          href={`/category/${n.slug}`}
          className="flex items-center gap-1.5 text-gray-800 hover:text-green-700 transition-colors"
        >
          <span className="text-base">{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;