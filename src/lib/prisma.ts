import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

function createPrismaClient() {
  const libsql = createClient({
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  });
  const adapter = new PrismaLibSql(libsql);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
