import { useEffect, useState } from "react";
import { api } from "../api/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RARITIES = ["common", "uncommon", "rare", "legendary"];
const CATEGORIES = ["free", "regular", "premium", "special"];

export default function Admin() {
  const [tab, setTab] = useState("items");

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1 className="section-title">Админ-панель</h1>

        <div className="admin-tabs">
          <button className={`admin-tab ${tab === "items" ? "active" : ""}`} onClick={() => setTab("items")}>Предметы</button>
          <button className={`admin-tab ${tab === "cases" ? "active" : ""}`} onClick={() => setTab("cases")}>Кейсы</button>
          <button className={`admin-tab ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>Пользователи</button>
        </div>

        {tab === "items" && <ItemsAdmin />}
        {tab === "cases" && <CasesAdmin />}
        {tab === "users" && <UsersAdmin />}
      </div>
      <Footer />
    </div>
  );
}

/* ------------------------------- Предметы -------------------------------- */

const EMPTY_ITEM = { name: "", rarity: "common", price: "", emoji: "🔫" };

function ItemsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try { setItems(await api.get("/admin/items")); }
    catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  function edit(item) {
    setEditId(item.id);
    setForm({ name: item.name, rarity: item.rarity, price: item.price, emoji: item.emoji });
  }
  function reset() { setEditId(null); setForm(EMPTY_ITEM); }

  async function save(e) {
    e.preventDefault();
    setError("");
    try {
      if (editId) await api.put(`/admin/items/${editId}`, form);
      else await api.post("/admin/items", form);
      reset();
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    if (!confirm("Удалить предмет?")) return;
    try { await api.del(`/admin/items/${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div className="admin-section">
      <form className="admin-form" onSubmit={save}>
        <h3>{editId ? `Редактирование #${editId}` : "Новый предмет"}</h3>
        <input className="auth-input" placeholder="Название" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className="auth-input" value={form.rarity}
          onChange={(e) => setForm({ ...form, rarity: e.target.value })}>
          {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <input className="auth-input" type="number" step="0.1" placeholder="Цена" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="auth-input" placeholder="Эмодзи" value={form.emoji}
          onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
        {error && <div className="auth-error">{error}</div>}
        <div className="admin-form-actions">
          <button className="auth-submit" type="submit">{editId ? "Сохранить" : "Создать"}</button>
          {editId && <button type="button" className="admin-btn" onClick={reset}>Отмена</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Эмодзи</th><th>Название</th><th>Редкость</th><th>Цена</th><th></th></tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.emoji}</td>
              <td>{it.name}</td>
              <td>{it.rarity}</td>
              <td>${it.price.toFixed(2)}</td>
              <td className="admin-row-actions">
                <button className="admin-btn" onClick={() => edit(it)}>✎</button>
                <button className="admin-btn danger" onClick={() => remove(it.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- Кейсы ---------------------------------- */

const EMPTY_CASE = { id: "", name: "", price: "", color: "#4b79ff", emoji: "📦", category: "regular", itemIds: [] };

function CasesAdmin() {
  const [cases, setCases] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [form, setForm] = useState(EMPTY_CASE);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      setCases(await api.get("/admin/cases"));
      setAllItems(await api.get("/admin/items"));
    } catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  function edit(c) {
    setEditId(c.id);
    setForm({ id: c.id, name: c.name, price: c.price, color: c.color, emoji: c.emoji, category: c.category, itemIds: c.itemIds });
  }
  function reset() { setEditId(null); setForm(EMPTY_CASE); }

  function toggleItem(id) {
    setForm((f) => ({
      ...f,
      itemIds: f.itemIds.includes(id) ? f.itemIds.filter((x) => x !== id) : [...f.itemIds, id],
    }));
  }

  async function save(e) {
    e.preventDefault();
    setError("");
    try {
      if (editId) await api.put(`/admin/cases/${editId}`, form);
      else await api.post("/admin/cases", form);
      reset();
      load();
    } catch (err) { setError(err.message); }
  }

  async function remove(id) {
    if (!confirm("Удалить кейс?")) return;
    try { await api.del(`/admin/cases/${id}`); load(); }
    catch (err) { setError(err.message); }
  }

  return (
    <div className="admin-section">
      <form className="admin-form admin-form-wide" onSubmit={save}>
        <h3>{editId ? `Редактирование ${editId}` : "Новый кейс"}</h3>
        <input className="auth-input" placeholder="ID (напр. reg-15)" value={form.id} disabled={!!editId}
          onChange={(e) => setForm({ ...form, id: e.target.value })} />
        <input className="auth-input" placeholder="Название" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="auth-input" type="number" step="0.01" placeholder="Цена" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="auth-input" placeholder="Цвет (#hex)" value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })} />
        <input className="auth-input" placeholder="Эмодзи" value={form.emoji}
          onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
        <select className="auth-input" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="admin-item-picker">
          <span className="admin-picker-label">Предметы в кейсе:</span>
          <div className="admin-picker-grid">
            {allItems.map((it) => (
              <label key={it.id} className={`admin-pick ${form.itemIds.includes(it.id) ? "on" : ""}`}>
                <input type="checkbox" checked={form.itemIds.includes(it.id)} onChange={() => toggleItem(it.id)} />
                {it.emoji} {it.name}
              </label>
            ))}
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}
        <div className="admin-form-actions">
          <button className="auth-submit" type="submit">{editId ? "Сохранить" : "Создать"}</button>
          {editId && <button type="button" className="admin-btn" onClick={reset}>Отмена</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Эмодзи</th><th>Название</th><th>Категория</th><th>Цена</th><th>Предметов</th><th></th></tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.emoji}</td>
              <td>{c.name}</td>
              <td>{c.category}</td>
              <td>${c.price.toFixed(2)}</td>
              <td>{c.itemIds.length}</td>
              <td className="admin-row-actions">
                <button className="admin-btn" onClick={() => edit(c)}>✎</button>
                <button className="admin-btn danger" onClick={() => remove(c.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----------------------------- Пользователи ------------------------------ */

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try { setUsers(await api.get("/admin/users")); }
    catch (e) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function patch(id, body) {
    try {
      const updated = await api.patch(`/admin/users/${id}`, body);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) { alert(err.message); }
  }

  return (
    <div className="admin-section">
      {error && <div className="auth-error">{error}</div>}
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Логин</th><th>Роль</th><th>Баланс</th><th></th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>
                <select className="auth-input inline" value={u.role}
                  onChange={(e) => patch(u.id, { role: e.target.value })}>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td>
                <input className="auth-input inline" type="number" defaultValue={u.balance}
                  onBlur={(e) => {
                    const v = Number(e.target.value);
                    if (v !== u.balance) patch(u.id, { balance: v });
                  }} />
              </td>
              <td>${Number(u.balance).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
