export const RARITY = {
  common: { label: "Mil-Spec", color: "#4b79ff", chance: 0.6 },
  uncommon: { label: "Restricted", color: "#8f00ff", chance: 0.25 },
  rare: { label: "Classified", color: "#ff12ae", chance: 0.1 },
  legendary: { label: "Covert", color: "#ff1212", chance: 0.05 },
};

export const ITEMS = [
  { id: 1, name: "P250 | Sand Dune", rarity: "common", price: 0.5, emoji: "🔫" },
  { id: 2, name: "MP7 | Forest DDPAT", rarity: "common", price: 0.3, emoji: "🔫" },
  { id: 3, name: "SG 553 | Spray Paint", rarity: "common", price: 0.4, emoji: "🔫" },
  { id: 4, name: "Nova | Walnut", rarity: "common", price: 0.2, emoji: "🔫" },
  { id: 5, name: "G3SG1 | Safari", rarity: "common", price: 0.6, emoji: "🔫" },
  { id: 6, name: "PP-Bizon | Sand Dashed", rarity: "common", price: 0.3, emoji: "🔫" },
  { id: 7, name: "MAC-10 | Indigo", rarity: "uncommon", price: 1.2, emoji: "💥" },
  { id: 8, name: "UMP-45 | Urban DDPAT", rarity: "uncommon", price: 1.5, emoji: "💥" },
  { id: 9, name: "FAMAS | Mecha", rarity: "uncommon", price: 2.0, emoji: "💥" },
  { id: 10, name: "Tec-9 | Ice Cap", rarity: "uncommon", price: 1.8, emoji: "💥" },
  { id: 11, name: "AK-47 | Redline", rarity: "rare", price: 8.0, emoji: "🔥" },
  { id: 12, name: "AWP | Corticera", rarity: "rare", price: 12.0, emoji: "🔥" },
  { id: 13, name: "M4A4 | 龍王 (Dragon King)", rarity: "rare", price: 10.0, emoji: "🔥" },
  { id: 14, name: "Desert Eagle | Conspiracy", rarity: "rare", price: 6.5, emoji: "🔥" },
  { id: 15, name: "AWP | Dragon Lore", rarity: "legendary", price: 150.0, emoji: "🎯" },
  { id: 16, name: "M4A4 | Howl", rarity: "legendary", price: 200.0, emoji: "🔥" },
  { id: 17, name: "Karambit | Fade", rarity: "legendary", price: 180.0, emoji: "🗡️" },
];

export const CASES = [
  {
    id: "weapon",
    name: "Weapon Case",
    price: 2.49,
    color: "#4ade80",
    emoji: "📦",
    items: [1, 2, 3, 4, 7, 8, 11, 12, 15],
  },
  {
    id: "premium",
    name: "Premium Case",
    price: 4.99,
    color: "#8847ff",
    emoji: "💎",
    items: [5, 6, 9, 10, 11, 12, 13, 14, 16],
  },
  {
    id: "budget",
    name: "Budget Case",
    price: 0.99,
    color: "#5e98d9",
    emoji: "🆓",
    items: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: "dream",
    name: "Dream Case",
    price: 9.99,
    color: "#ffd700",
    emoji: "✨",
    items: [9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  {
    id: "rapid",
    name: "Rapid Fire Case",
    price: 1.99,
    color: "#f97316",
    emoji: "⚡",
    items: [1, 2, 5, 6, 7, 9, 11, 15],
  },
  {
    id: "sniper",
    name: "Sniper Case",
    price: 5.99,
    color: "#ef4444",
    emoji: "🎯",
    items: [3, 4, 8, 10, 12, 13, 14, 15],
  },
  {
    id: "veteran",
    name: "Veteran Case",
    price: 3.49,
    color: "#06b6d4",
    emoji: "🎖️",
    items: [1, 3, 5, 7, 9, 11, 13, 15],
  },
  {
    id: "elite",
    name: "Elite Case",
    price: 7.49,
    color: "#ec4899",
    emoji: "👑",
    items: [2, 4, 6, 8, 10, 12, 14, 16],
  },
];

export function getItemById(id) {
  return ITEMS.find((item) => item.id === id);
}

export function getCaseById(caseId) {
  return CASES.find((c) => c.id === caseId);
}

export function getCaseItems(caseData) {
  return caseData.items.map((id) => getItemById(id)).filter(Boolean);
}

export function rollItem(items) {
  const roll = Math.random();
  let cumulative = 0;
  for (const item of items) {
    cumulative += RARITY[item.rarity].chance;
    if (roll <= cumulative) return item;
  }
  return items[0];
}
