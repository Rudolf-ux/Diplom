import { Router } from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/inventory — предметы текущего пользователя (не проданные).
router.get("/", requireAuth, async (req, res) => {
  try {
    const rows = await prisma.inventoryItem.findMany({
      where: { userId: req.user.id, status: "OWNED" },
      include: { item: true, case: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(
      rows.map((row) => ({
        id: row.id,
        item: row.item,
        caseId: row.caseId,
        caseName: row.case?.name ?? null,
        createdAt: row.createdAt,
      }))
    );
  } catch (err) {
    console.error("inventory error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST /api/inventory/:id/sell — продать предмет: цена уходит в баланс.
router.post("/:id/sell", requireAuth, async (req, res) => {
  try {
    const invId = Number(req.params.id);
    const row = await prisma.inventoryItem.findUnique({
      where: { id: invId },
      include: { item: true },
    });

    if (!row || row.userId !== req.user.id) {
      return res.status(404).json({ error: "Предмет не найден" });
    }
    if (row.status === "SOLD") {
      return res.status(400).json({ error: "Предмет уже продан" });
    }

    const [updatedUser] = await prisma.$transaction([
      prisma.user.update({
        where: { id: req.user.id },
        data: { balance: { increment: row.item.price } },
      }),
      prisma.inventoryItem.update({
        where: { id: invId },
        data: { status: "SOLD" },
      }),
    ]);

    res.json({ balance: Number(updatedUser.balance), soldFor: row.item.price });
  } catch (err) {
    console.error("sell error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
