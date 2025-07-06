import { PrismaClient } from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({});
}
/**
 * @type {PrismaClient}
 */

const prisma = globalForPrisma.prisma;

export default prisma;
