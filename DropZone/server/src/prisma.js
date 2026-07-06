import { PrismaClient } from "@prisma/client";

// Единый экземпляр PrismaClient на всё приложение.
const prisma = new PrismaClient();

export default prisma;
