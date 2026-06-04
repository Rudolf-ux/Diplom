import { useState, useRef, useEffect } from "react";
import { RARITY, rollItem } from "../data/cases";

const ITEM_WIDTH = 120;
const VISIBLE_ITEMS = 5;
const TRACK_LENGTH = 60;

function generateTrack(items) {
  const result = [];
  for (let i = 0; i < TRACK_LENGTH; i++) {
    result.push(items[Math.floor(Math.random() * items.length)]);
  }
  return result;
}

export default function Roulette({ items, onResult }) {
  const [spinning, setSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const [trackItems, setTrackItems] = useState(() => generateTrack(items));
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const animRef = useRef(null);

  function spin() {
    if (spinning) return;

    const winner = rollItem(items);
    setWonItem(null);

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
        if (onResult) onResult(winner);
      }
    }

    animRef.current = requestAnimationFrame(animate);
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
            ref={trackRef}
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

      {wonItem && (
        <div className="roulette-result" style={{ borderColor: RARITY[wonItem.rarity].color }}>
          <span className="result-emoji">{wonItem.emoji}</span>
          <span className="result-name">{wonItem.name}</span>
          <span className="result-rarity" style={{ color: RARITY[wonItem.rarity].color }}>
            {RARITY[wonItem.rarity].label}
          </span>
          <span className="result-price">${wonItem.price.toFixed(2)}</span>
        </div>
      )}

      <button
        className={`spin-btn ${spinning ? "spinning" : ""}`}
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
}
