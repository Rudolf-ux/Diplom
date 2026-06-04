import { RARITY } from "../data/cases";

export default function WinModal({ item, onClose }) {
  if (!item) return null;

  const rarity = RARITY[item.rarity];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderColor: rarity.color }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-glow" style={{ background: `radial-gradient(circle, ${rarity.color}22 0%, transparent 70%)` }} />
        <span className="modal-emoji">{item.emoji}</span>
        <h2 className="modal-item-name">{item.name}</h2>
        <span className="modal-rarity" style={{ color: rarity.color }}>{rarity.label}</span>
        <span className="modal-price">${item.price.toFixed(2)}</span>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-sell" onClick={onClose}>
            Sell ${item.price.toFixed(2)}
          </button>
          <button className="modal-btn modal-btn-keep" onClick={onClose}>
            Keep Item
          </button>
        </div>
      </div>
    </div>
  );
}
