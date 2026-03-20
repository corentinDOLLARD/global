import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const existing = await prisma.newsletter.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Vous êtes déjà inscrit(e) !" });
  }

  await prisma.newsletter.create({ data: { email } });

  return NextResponse.json({ message: "Inscription réussie ! Bienvenue." });
}
