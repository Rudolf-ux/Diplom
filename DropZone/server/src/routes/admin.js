import { Router } from "express";
import prisma from "../prisma.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { serializeUser } from "../lib/serialize.js";

const router = Router();

// Все маршруты ниже — только для администратора.
router.use(requireAuth, requireAdmin);

/* ---------------------------- ITEMS (предметы) ---------------------------- */

// GET /api/admin/items — список всех предметов.
router.get("/items", async (_req, res) => {
  const items = await prisma.item.findMany({ orderBy: { id: "asc" } });
  res.json(items);
});

// POST /api/admin/items — создать предмет.
router.post("/items", async (req, res) => {
  try {
    const { name, rarity, price, emoji } = req.body || {};
    if (!name || !rarity || price == null || !emoji) {
      return res.status(400).json({ error: "Заполните name, rarity, price, emoji" });
    }
    const item = await prisma.item.create({
      data: { name, rarity, price: Number(price), emoji },
    });
    res.status(201).json(item);
  } catch (err) {
    console.error("create item error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// PUT /api/admin/items/:id — изменить предмет.
router.put("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, rarity, price, emoji } = req.body || {};
    const item = await prisma.item.update({
      where: { id },
      data: {
        ...(name != null && { name }),
        ...(rarity != null && { rarity }),
        ...(price != null && { price: Number(price) }),
        ...(emoji != null && { emoji }),
      },
    });
    res.json(item);
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Предмет не найден" });
    console.error("update item error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// DELETE /api/admin/items/:id — удалить предмет.
router.delete("/items/:id", async (req, res) => {
  try {
    await prisma.item.delete({ where: { id: Number(req.params.id) } });
    res.json({ ok: true });
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Предмет не найден" });
    console.error("delete item error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

/* ----------------------------- CASES (кейсы) ------------------------------ */

// GET /api/admin/cases — список кейсов с id предметов.
router.get("/cases", async (_req, res) => {
  const cases = await prisma.case.findMany({
    include: { items: true },
    orderBy: { id: "asc" },
  });
  res.json(
    cases.map((c) => ({
      id: c.id,
      name: c.name,
      price: c.price,
      color: c.color,
      emoji: c.emoji,
      category: c.category,
      itemIds: c.items.map((ci) => ci.itemId),
    }))
  );
});

// POST /api/admin/cases — создать кейс (с набором предметов).
router.post("/cases", async (req, res) => {
  try {
    const { id, name, price, color, emoji, category, itemIds } = req.body || {};
    if (!id || !name || !color || !emoji || !category) {
      return res.status(400).json({ error: "Заполните id, name, color, emoji, category" });
    }
    const created = await prisma.case.create({
      data: {
        id,
        name,
        price: Number(price) || 0,
        color,
        emoji,
        category,
        items: {
          create: (itemIds || []).map((itemId) => ({ itemId: Number(itemId) })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(created);
  } catch (err) {
    if (err.code === "P2002") return res.status(409).json({ error: "Кейс с таким id уже есть" });
    console.error("create case error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// PUT /api/admin/cases/:id — изменить кейс (поля и/или состав предметов).
router.put("/cases/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, color, emoji, category, itemIds } = req.body || {};

    const updated = await prisma.$transaction(async (tx) => {
      await tx.case.update({
        where: { id },
        data: {
          ...(name != null && { name }),
          ...(price != null && { price: Number(price) }),
          ...(color != null && { color }),
          ...(emoji != null && { emoji }),
          ...(category != null && { category }),
        },
      });

      // Если пришёл новый список предметов — пересобираем связи.
      if (Array.isArray(itemIds)) {
        await tx.caseItem.deleteMany({ where: { caseId: id } });
        if (itemIds.length) {
          await tx.caseItem.createMany({
            data: itemIds.map((itemId) => ({ caseId: id, itemId: Number(itemId) })),
          });
        }
      }

      return tx.case.findUnique({ where: { id }, include: { items: true } });
    });

    res.json(updated);
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Кейс не найден" });
    console.error("update case error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// DELETE /api/admin/cases/:id — удалить кейс.
router.delete("/cases/:id", async (req, res) => {
  try {
    await prisma.case.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Кейс не найден" });
    console.error("delete case error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

/* -------------------------- USERS (пользователи) -------------------------- */

// GET /api/admin/users — список пользователей.
router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  res.json(users.map(serializeUser));
});

// PATCH /api/admin/users/:id — изменить роль и/или баланс.
router.patch("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { role, balance } = req.body || {};
    if (role && !["USER", "ADMIN"].includes(role)) {
      return res.status(400).json({ error: "Роль должна быть USER или ADMIN" });
    }
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(role != null && { role }),
        ...(balance != null && { balance: Number(balance) }),
      },
    });
    res.json(serializeUser(user));
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Пользователь не найден" });
    console.error("update user error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
