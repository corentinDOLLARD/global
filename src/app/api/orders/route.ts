import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { userId: "demo-user" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const serialized = orders.map((o) => ({
    ...o,
    items: o.items.map((item) => ({
      ...item,
      product: {
        ...item.product,
        images: JSON.parse(item.product.images),
      },
    })),
  }));

  return NextResponse.json(serialized);
}

export async function POST(request: NextRequest) {
  const { items, shipping, address } = await request.json();

  const subtotal = items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shipping;

  let addressId: string | undefined;
  if (address) {
    const addr = await prisma.address.create({
      data: {
        userId: "demo-user",
        firstName: address.firstName,
        lastName: address.lastName,
        street: address.street,
        city: address.city,
        zipCode: address.zipCode,
      },
    });
    addressId = addr.id;
  }

  const order = await prisma.order.create({
    data: {
      userId: "demo-user",
      addressId,
      status: "confirmed",
      subtotal,
      shipping,
      total,
      items: {
        create: items.map(
          (item: {
            productId: string;
            quantity: number;
            price: number;
            color?: string;
            size?: string;
          }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
          })
        ),
      },
    },
  });

  return NextResponse.json({ orderId: order.id, status: order.status });
}
