import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams.get("q")?.toLowerCase() || "";

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany();

  const results = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    )
    .slice(0, 8)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: JSON.parse(p.images)[0],
      category: p.category,
    }));

  return NextResponse.json(results);
}
