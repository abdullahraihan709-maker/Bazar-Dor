import React from "react";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Product } from "@/types/types";
import allProductsData from "@/../public/allProducts.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const products: Product[] = allProductsData as Product[];

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  // সব পণ্য থেকে স্লাগ ম্যাচ করে নির্দিষ্ট পণ্যটি খুঁজে বের করা
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0]">
      <main className="flex-1">
        <ProductDetails product={product} />
      </main>
    </div>
  );
}
