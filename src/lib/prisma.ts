import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


(prisma as any).$on("query", (e: any) => {
  console.log("\x1b[36m%s\x1b[0m", `[Prisma Query] ${e.query}`); // Cyan
  console.log("\x1b[33m%s\x1b[0m", `↳ Params: ${e.params}`); // Yellow
  console.log("\x1b[90m%s\x1b[0m", `↳ Duration: ${e.duration}ms`); // Gray
});

(prisma as any).$on("warn", (e: any) => {
  console.warn("\x1b[33m[Prisma Warning]\x1b[0m", e.message);
});

(prisma as any).$on("error", (e: any) => {
  console.error("\x1b[31m[Prisma Error]\x1b[0m", e.message);
});
