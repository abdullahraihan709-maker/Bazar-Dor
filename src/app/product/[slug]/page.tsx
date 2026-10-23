import React from "react";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/types";
import allProductsData from "@/../public/allProducts.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  // সব পণ্য থেকে স্লাগ ম্যাচ করে নির্দিষ্ট পণ্যটি খুঁজে বের করা
  const products: Product[] = allProductsData as Product[];
  const product = products.find((p) => p.slug === slug) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0]">
      <main className="flex-1">
        <ProductDetails product={product} />
      </main>
    </div>
  );
}