import { useState, useEffect } from "react";
import { ITEMS, RARITY } from "../data/cases";

const NAMES = ["Player1", "ProGamer", "SkinLord", "CS2Fan", "DropKing", "LuckyOne", "AwpMaster", "KnifeHunter", "CaseGod", "SpinPro"];

function generateDrop() {
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  const user = NAMES[Math.floor(Math.random() * NAMES.length)];
  return { item, user, id: Date.now() + Math.random() };
}

export default function LiveDrops() {
  const [drops, setDrops] = useState(() =>
    Array.from({ length: 20 }, generateDrop)
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) => {
        const next = [...prev.slice(1), generateDrop()];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (hidden) {
    return (
      <div className="live-drops live-drops-hidden">
        <button className="live-drops-show" onClick={() => setHidden(false)}>
          Show Live Drops ▲
        </button>
      </div>
    );
  }

  return (
    <div className="live-drops">
      <div className="live-drops-label">LIVE DROPS</div>
      <button className="live-drops-hide" onClick={() => setHidden(true)}>
        ▼
      </button>
      <div className="live-drops-track">
        <div className="live-drops-scroll">
          {drops.map((drop) => (
            <div
              key={drop.id}
              className="live-drop-item"
              style={{ borderBottomColor: RARITY[drop.item.rarity].color }}
            >
              <span className="live-drop-emoji">{drop.item.emoji}</span>
              <div className="live-drop-info">
                <span className="live-drop-name">{drop.item.name.split(" | ")[1] || drop.item.name}</span>
                <span className="live-drop-user">{drop.user}</span>
              </div>
              <span className="live-drop-price">${drop.item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
