import { PrismaClient } from "@/generated";

export const prisma = new PrismaClient({
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

prisma.$on("query", (e: any) => {
  console.log("\x1b[36m%s\x1b[0m", `[Prisma Query] ${e.query}`);
  console.log("\x1b[33m%s\x1b[0m", `↳ Params: ${e.params}`);
  console.log("\x1b[90m%s\x1b[0m", `↳ Duration: ${e.duration}ms`);
});

prisma.$on("warn", (e: any) => {
  console.warn("\x1b[33m[Prisma Warning]\x1b[0m", e.message);
});

prisma.$on("error", (e: any) => {
  console.error("\x1b[31m[Prisma Error]\x1b[0m", e.message);
});
