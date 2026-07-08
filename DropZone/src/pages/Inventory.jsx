import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { RARITY } from "../data/cases";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setBalance } = useAuth();

  async function load() {
    setLoading(true);
    try {
      const data = await api.get("/inventory");
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function sell(id) {
    try {
      const res = await api.post(`/inventory/${id}/sell`);
      setBalance(res.balance);
      setItems((prev) => prev.filter((row) => row.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1 className="section-title">Мой инвентарь</h1>

        {loading && <p>Загрузка...</p>}
        {error && <p className="auth-error">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="inv-empty">Пусто. Открой кейс, чтобы получить предметы!</p>
        )}

        <div className="inv-grid">
          {items.map((row) => {
            const rarity = RARITY[row.item.rarity] || {};
            return (
              <div
                key={row.id}
                className="inv-card"
                style={{ borderColor: rarity.color }}
              >
                <span className="inv-emoji">{row.item.emoji}</span>
                <span className="inv-name">{row.item.name}</span>
                <span className="inv-rarity" style={{ color: rarity.color }}>
                  {rarity.label}
                </span>
                <button className="inv-sell" onClick={() => sell(row.id)}>
                  Продать ${row.item.price.toFixed(2)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
