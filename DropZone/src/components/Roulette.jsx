import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RARITY } from "../data/cases";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

const ITEM_WIDTH = 140;
const VISIBLE_ITEMS = 5;
const TRACK_LENGTH = 60;

function generateTrack(items) {
  const result = [];
  for (let i = 0; i < TRACK_LENGTH; i++) {
    result.push(items[Math.floor(Math.random() * items.length)]);
  }
  return result;
}

export default function Roulette({ items, caseId }) {
  const [spinning, setSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [trackItems, setTrackItems] = useState(() => generateTrack(items));
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState("");
  const [inventoryId, setInventoryId] = useState(null);
  const animRef = useRef(null);

  const { isAuthenticated, setBalance } = useAuth();
  const navigate = useNavigate();

  async function spin() {
    if (spinning) return;
    setError("");

    // Открытие требует авторизации.
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    let result;
    try {
      // РЕЗУЛЬТАТ РЕШАЕТ СЕРВЕР.
      result = await api.post(`/cases/${caseId}/open`);
    } catch (err) {
      setError(err.message);
      return;
    }

    const winner = result.item;
    setBalance(result.balance);
    setInventoryId(result.inventoryId);
    setWonItem(null);
    setShowModal(false);

    // Строим ленту и вставляем победителя, пришедшего с сервера, в предпоследнюю позицию.
    const shuffled = [];
    for (let i = 0; i < TRACK_LENGTH; i++) {
      shuffled.push(items[Math.floor(Math.random() * items.length)]);
    }
    const winIndex = TRACK_LENGTH - 3;
    shuffled[winIndex] = winner;
    setTrackItems(shuffled);

    const targetOffset = -(winIndex * ITEM_WIDTH - (VISIBLE_ITEMS * ITEM_WIDTH) / 2 + ITEM_WIDTH / 2);

    setSpinning(true);
    setOffset(0);

    const startTime = performance.now();
    const duration = 4000;
    const startOffset = 0;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentOffset = startOffset + (targetOffset - startOffset) * eased;

      setOffset(currentOffset);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setWonItem(winner);
        setTimeout(() => setShowModal(true), 600);
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }

  async function sellWon() {
    if (!inventoryId) { setShowModal(false); return; }
    try {
      const res = await api.post(`/inventory/${inventoryId}/sell`);
      setBalance(res.balance);
    } catch (err) {
      setError(err.message);
    } finally {
      setShowModal(false);
    }
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="roulette-wrapper">
      <div className="roulette">
        <div className="roulette-pointer" />
        <div className="roulette-viewport">
          <div
            className="roulette-track"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {trackItems.map((item, i) => (
              <div
                key={i}
                className="roulette-item"
                style={{ borderColor: RARITY[item.rarity].color }}
              >
                <span className="roulette-item-emoji">{item.emoji}</span>
                <span className="roulette-item-name">{item.name.split(" | ")[1] || item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="roulette-error">{error}</div>}

      {wonItem && !showModal && (
        <div className="roulette-result" style={{ borderColor: RARITY[wonItem.rarity].color }}>
          <span className="result-emoji">{wonItem.emoji}</span>
          <span className="result-name">{wonItem.name}</span>
          <span className="result-rarity" style={{ color: RARITY[wonItem.rarity].color }}>
            {RARITY[wonItem.rarity].label}
          </span>
          <span className="result-price">${wonItem.price.toFixed(2)}</span>
        </div>
      )}

      {showModal && wonItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: RARITY[wonItem.rarity].color }}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div
              className="modal-glow"
              style={{
                background: `radial-gradient(circle, ${RARITY[wonItem.rarity].color}22 0%, transparent 70%)`,
              }}
            />
            <span className="modal-emoji">{wonItem.emoji}</span>
            <h2 className="modal-item-name">{wonItem.name}</h2>
            <span className="modal-rarity" style={{ color: RARITY[wonItem.rarity].color }}>
              {RARITY[wonItem.rarity].label}
            </span>
            <span className="modal-price">${wonItem.price.toFixed(2)}</span>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-sell" onClick={sellWon}>
                Продать ${wonItem.price.toFixed(2)}
              </button>
              <button className="modal-btn modal-btn-keep" onClick={() => setShowModal(false)}>
                Оставить
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className={`spin-btn ${spinning ? "spinning" : ""}`}
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "OPEN CASE"}
      </button>
    </div>
  );
}
