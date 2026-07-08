import { Router } from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { rollItem } from "../lib/roll.js";

const router = Router();

// Привести кейс с вложенными предметами к плоскому виду для фронта.
function shapeCase(dbCase) {
  return {
    id: dbCase.id,
    name: dbCase.name,
    price: dbCase.price,
    color: dbCase.color,
    emoji: dbCase.emoji,
    category: dbCase.category,
    items: dbCase.items.map((ci) => ci.item),
  };
}

// GET /api/cases — все кейсы с предметами.
router.get("/", async (_req, res) => {
  try {
    const cases = await prisma.case.findMany({
      include: { items: { include: { item: true } } },
    });
    res.json(cases.map(shapeCase));
  } catch (err) {
    console.error("list cases error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// GET /api/cases/:id — один кейс с предметами.
router.get("/:id", async (req, res) => {
  try {
    const dbCase = await prisma.case.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { item: true } } },
    });
    if (!dbCase) {
      return res.status(404).json({ error: "Кейс не найден" });
    }
    res.json(shapeCase(dbCase));
  } catch (err) {
    console.error("get case error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST /api/cases/:id/open — открыть кейс. Исход считает СЕРВЕР.
router.post("/:id/open", requireAuth, async (req, res) => {
  try {
    const dbCase = await prisma.case.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { item: true } } },
    });
    if (!dbCase) {
      return res.status(404).json({ error: "Кейс не найден" });
    }

    const items = dbCase.items.map((ci) => ci.item);
    if (items.length === 0) {
      return res.status(400).json({ error: "В кейсе нет предметов" });
    }

    const price = dbCase.price;
    const balance = Number(req.user.balance);

    // Платный кейс — проверяем баланс.
    if (price > 0 && balance < price) {
      return res.status(400).json({ error: "Недостаточно средств" });
    }

    // Сервер честно выбирает победителя.
    const won = rollItem(items);

    // Атомарно: списываем цену и кладём приз в инвентарь.
    const [updatedUser, inventoryRow] = await prisma.$transaction([
      prisma.user.update({
        where: { id: req.user.id },
        data: price > 0 ? { balance: { decrement: price } } : {},
      }),
      prisma.inventoryItem.create({
        data: { userId: req.user.id, itemId: won.id, caseId: dbCase.id },
      }),
    ]);

    res.json({
      item: won,
      balance: Number(updatedUser.balance),
      inventoryId: inventoryRow.id,
    });
  } catch (err) {
    console.error("open case error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
