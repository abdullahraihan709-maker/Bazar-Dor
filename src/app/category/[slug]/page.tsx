import { notFound } from "next/navigation";
import CategoryCards from "./CategoryCards";
import categoriesData from "@/../public/caregories.json";
import allProductsData from "@/../public/allProducts.json";
import { Category, Product } from "@/types/types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const categories: Category[] = categoriesData;
  const products: Product[] = allProductsData as Product[];

  // ১. স্লাগ বা আইডি দিয়ে ক্যাটাগরি খুঁজে বের করা
  const category = categories.find(
    (c) => c.slug === slug || c.id === slug
  );

  // ক্যাটাগরি না পাওয়া গেলে 404 পেজ দেখাবে
  if (!category) {
    notFound();
  }

  // ২. ওই ক্যাটাগরির আওতাধীন পণ্যগুলো ফিল্টার করা
  const categoryProducts = products.filter(
    (p) => p.category === category.id || p.category === category.slug
  );

  return (
    <CategoryCards
      category={category}
      initialProducts={categoryProducts}
    />
  );
}