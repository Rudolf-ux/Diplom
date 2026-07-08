import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Источник данных — тот же файл, что использует фронтенд.
import { ITEMS, CASES } from "../../src/data/cases.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Очистка старых данных...");
  // Порядок важен из-за внешних ключей.
  await prisma.inventoryItem.deleteMany();
  await prisma.caseItem.deleteMany();
  await prisma.case.deleteMany();
  await prisma.item.deleteMany();

  console.log(`Заливка ${ITEMS.length} предметов...`);
  for (const item of ITEMS) {
    await prisma.item.create({
      data: {
        id: item.id,
        name: item.name,
        rarity: item.rarity,
        price: item.price,
        emoji: item.emoji,
      },
    });
  }

  console.log(`Заливка ${CASES.length} кейсов...`);
  for (const c of CASES) {
    await prisma.case.create({
      data: {
        id: c.id,
        name: c.name,
        price: c.price,
        color: c.color,
        emoji: c.emoji,
        category: c.category,
        items: {
          create: c.items.map((itemId) => ({ itemId })),
        },
      },
    });
  }

  console.log("Создание пользователей (admin / user)...");
  const adminHash = await bcrypt.hash("admin123", 10);
  const userHash = await bcrypt.hash("user123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: { role: "ADMIN", passwordHash: adminHash },
    create: {
      username: "admin",
      passwordHash: adminHash,
      role: "ADMIN",
      balance: 100000,
    },
  });

  await prisma.user.upsert({
    where: { username: "user" },
    update: {},
    create: {
      username: "user",
      passwordHash: userHash,
      role: "USER",
      balance: 1000,
    },
  });

  console.log("Готово! Учётки: admin/admin123 (ADMIN), user/user123 (USER)");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
