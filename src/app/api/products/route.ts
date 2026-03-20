import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "featured";
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featured === "true") where.badge = { not: null };

  let products = await prisma.product.findMany({ where });

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  switch (sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
  }

  const serialized = products.map((p) => ({
    ...p,
    images: JSON.parse(p.images),
    colors: p.colors ? JSON.parse(p.colors) : [],
    sizes: p.sizes ? JSON.parse(p.sizes) : [],
  }));

  return NextResponse.json(serialized);
}
