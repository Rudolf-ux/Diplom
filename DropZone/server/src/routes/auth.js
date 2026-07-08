import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { serializeUser } from "../lib/serialize.js";

const router = Router();

// POST /api/auth/register — регистрация нового пользователя.
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Укажите логин и пароль" });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: "Логин минимум 3 символа" });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: "Пароль минимум 4 символа" });
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return res.status(409).json({ error: "Такой логин уже занят" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, passwordHash },
    });

    const token = signToken(user);
    res.status(201).json({ token, user: serializeUser(user) });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST /api/auth/login — вход по логину и паролю.
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Укажите логин и пароль" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const token = signToken(user);
    res.json({ token, user: serializeUser(user) });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// GET /api/auth/me — текущий пользователь по токену.
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: serializeUser(req.user) });
});

export default router;
