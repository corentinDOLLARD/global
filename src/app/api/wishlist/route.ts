import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.wishlistItem.findMany({
    where: { userId: "demo-user" },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const serialized = items.map((item) => ({
    ...item,
    product: {
      ...item.product,
      images: JSON.parse(item.product.images),
      colors: item.product.colors ? JSON.parse(item.product.colors) : [],
      sizes: item.product.sizes ? JSON.parse(item.product.sizes) : [],
    },
  }));

  return NextResponse.json(serialized);
}

export async function POST(request: NextRequest) {
  const { productId } = await request.json();

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId: "demo-user", productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
    return NextResponse.json({ action: "removed" });
  }

  await prisma.wishlistItem.create({
    data: { userId: "demo-user", productId },
  });

  return NextResponse.json({ action: "added" });
}
