import { PrismaClient } from "../generated/prisma/index.js";
export const connectDb = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log("Prisma connected successfully");
  } catch (err) {
    console.error(" Prisma failed to connect:", err);
  }
};
