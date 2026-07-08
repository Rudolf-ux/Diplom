import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import caseRoutes from "./routes/cases.js";
import inventoryRoutes from "./routes/inventory.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(express.json());

// Проверка живости.
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Роуты API.
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin", adminRoutes);

// 404 для неизвестных /api-путей.
app.use("/api", (_req, res) => res.status(404).json({ error: "Не найдено" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`DropZone API запущен на http://localhost:${PORT}`);
});
