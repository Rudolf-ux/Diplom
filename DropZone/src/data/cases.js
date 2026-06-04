export const RARITY = {
  common: { label: "Mil-Spec", color: "#4b79ff", chance: 0.6 },
  uncommon: { label: "Restricted", color: "#8f00ff", chance: 0.25 },
  rare: { label: "Classified", color: "#ff12ae", chance: 0.1 },
  legendary: { label: "Covert", color: "#ff1212", chance: 0.05 },
};

export const CATEGORIES = [
  { id: "free", label: "Free Cases", color: "#93ff1f" },
  { id: "regular", label: "Regular Cases", color: "#4b79ff" },
  { id: "premium", label: "Premium Cases", color: "#8f00ff" },
  { id: "special", label: "Special Cases", color: "#ff12ae" },
];

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
  { id: 13, name: "M4A4 | Dragon King", rarity: "rare", price: 10.0, emoji: "🔥" },
  { id: 14, name: "Desert Eagle | Conspiracy", rarity: "rare", price: 6.5, emoji: "🔥" },
  { id: 15, name: "AWP | Dragon Lore", rarity: "legendary", price: 150.0, emoji: "🎯" },
  { id: 16, name: "M4A4 | Howl", rarity: "legendary", price: 200.0, emoji: "🔥" },
  { id: 17, name: "Karambit | Fade", rarity: "legendary", price: 180.0, emoji: "🗡️" },
  { id: 18, name: "Glock-18 | Fade", rarity: "legendary", price: 120.0, emoji: "🔫" },
  { id: 19, name: "Butterfly | Doppler", rarity: "legendary", price: 250.0, emoji: "🗡️" },
  { id: 20, name: "M9 Bayonet | Crimson Web", rarity: "legendary", price: 300.0, emoji: "🗡️" },
  { id: 21, name: "AK-47 | Fire Serpent", rarity: "rare", price: 15.0, emoji: "🐍" },
  { id: 22, name: "M4A1-S | Hyper Beast", rarity: "rare", price: 9.0, emoji: "👾" },
  { id: 23, name: "USP-S | Kill Confirmed", rarity: "rare", price: 7.0, emoji: "💀" },
  { id: 24, name: "P90 | Asiimov", rarity: "uncommon", price: 3.5, emoji: "🤖" },
  { id: 25, name: "Glock-18 | Water Elemental", rarity: "uncommon", price: 2.8, emoji: "💧" },
  { id: 26, name: "Five-SeveN | Monkey Business", rarity: "uncommon", price: 1.6, emoji: "🐒" },
  { id: 27, name: "Galil AR | Shattered", rarity: "common", price: 0.8, emoji: "🔫" },
  { id: 28, name: "FAMAS | Pulse", rarity: "common", price: 0.4, emoji: "🔫" },
  { id: 29, name: "MP9 | Sand Dashed", rarity: "common", price: 0.2, emoji: "🔫" },
  { id: 30, name: "Sawed-Off | Sage Spray", rarity: "common", price: 0.1, emoji: "🔫" },
];

export const CASES = [
  // FREE CASES
  { id: "free-1", name: "Daily Free Case", price: 0, color: "#93ff1f", emoji: "🆓", category: "free", items: [1, 2, 3, 4, 5, 6, 27, 28, 29, 30] },
  { id: "free-2", name: "Starter Case", price: 0, color: "#82ff1b", emoji: "🎁", category: "free", items: [1, 2, 3, 4, 7, 8, 24, 25] },
  { id: "free-3", name: "Rookie Case", price: 0, color: "#7acc00", emoji: "🌱", category: "free", items: [2, 3, 4, 5, 6, 27, 28, 29] },
  { id: "free-4", name: "Lucky Drop", price: 0, color: "#5cbf0a", emoji: "🍀", category: "free", items: [1, 3, 5, 7, 9, 24, 26, 30] },
  { id: "free-5", name: "Welcome Case", price: 0, color: "#4fb300", emoji: "👋", category: "free", items: [1, 2, 4, 6, 27, 28, 29, 30] },
  { id: "free-6", name: "Bronze Case", price: 0, color: "#cd7f32", emoji: "🥉", category: "free", items: [2, 4, 5, 6, 8, 25, 27, 29] },
  { id: "free-7", name: "Zero Risk Case", price: 0, color: "#6abf4b", emoji: "🛡️", category: "free", items: [1, 3, 4, 6, 27, 28, 29, 30] },
  { id: "free-8", name: "Bonus Case", price: 0, color: "#4dd636", emoji: "⭐", category: "free", items: [2, 3, 5, 7, 24, 26, 28, 30] },
  { id: "free-9", name: "Try Your Luck", price: 0, color: "#57e03c", emoji: "🎲", category: "free", items: [1, 4, 6, 8, 9, 25, 27, 29] },
  { id: "free-10", name: "First Spin Case", price: 0, color: "#6fef50", emoji: "🎰", category: "free", items: [1, 2, 3, 5, 6, 24, 28, 30] },

  // REGULAR CASES
  { id: "reg-1", name: "Weapon Case", price: 1.49, color: "#4b79ff", emoji: "📦", category: "regular", items: [1, 2, 3, 4, 7, 8, 11, 12] },
  { id: "reg-2", name: "Rapid Fire Case", price: 1.99, color: "#f97316", emoji: "⚡", category: "regular", items: [1, 2, 5, 6, 7, 9, 24, 11] },
  { id: "reg-3", name: "Pistol Case", price: 2.49, color: "#5c6dff", emoji: "🔫", category: "regular", items: [1, 10, 25, 26, 7, 23, 18, 14] },
  { id: "reg-4", name: "SMG Case", price: 1.99, color: "#3d8bfd", emoji: "💨", category: "regular", items: [2, 6, 7, 8, 24, 29, 9, 11] },
  { id: "reg-5", name: "Rifle Case", price: 2.99, color: "#2e6bcf", emoji: "🎯", category: "regular", items: [3, 9, 11, 13, 21, 22, 12, 14] },
  { id: "reg-6", name: "Shotgun Case", price: 1.49, color: "#1a5cbf", emoji: "💥", category: "regular", items: [4, 5, 27, 28, 30, 8, 14, 23] },
  { id: "reg-7", name: "Veteran Case", price: 3.49, color: "#06b6d4", emoji: "🎖️", category: "regular", items: [1, 3, 5, 7, 9, 11, 13, 15] },
  { id: "reg-8", name: "Streetwear Case", price: 2.49, color: "#0ea5e9", emoji: "🏙️", category: "regular", items: [2, 4, 8, 10, 24, 26, 12, 22] },
  { id: "reg-9", name: "Neon Case", price: 3.99, color: "#8b5cf6", emoji: "💜", category: "regular", items: [7, 9, 24, 25, 11, 13, 22, 16] },
  { id: "reg-10", name: "Assault Case", price: 2.99, color: "#6366f1", emoji: "⚔️", category: "regular", items: [1, 3, 7, 9, 11, 21, 14, 23] },

  // PREMIUM CASES
  { id: "prem-1", name: "Premium Case", price: 4.99, color: "#8f00ff", emoji: "💎", category: "premium", items: [5, 6, 9, 10, 11, 12, 13, 14, 16] },
  { id: "prem-2", name: "Dream Case", price: 9.99, color: "#ffd700", emoji: "✨", category: "premium", items: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
  { id: "prem-3", name: "Sniper Elite Case", price: 5.99, color: "#ef4444", emoji: "🎯", category: "premium", items: [3, 4, 8, 10, 12, 13, 14, 15] },
  { id: "prem-4", name: "Elite Case", price: 7.49, color: "#ec4899", emoji: "👑", category: "premium", items: [2, 4, 6, 8, 10, 12, 14, 16, 19] },
  { id: "prem-5", name: "Dragon Case", price: 6.99, color: "#ff6b2c", emoji: "🐉", category: "premium", items: [11, 13, 15, 21, 22, 16, 17, 19] },
  { id: "prem-6", name: "Hydra Case", price: 5.49, color: "#00d4aa", emoji: "🐍", category: "premium", items: [7, 9, 11, 21, 23, 14, 16, 20] },
  { id: "prem-7", name: "Phantom Case", price: 8.99, color: "#9333ea", emoji: "👻", category: "premium", items: [10, 12, 13, 14, 15, 17, 18, 19] },
  { id: "prem-8", name: "Gold Rush Case", price: 9.49, color: "#eab308", emoji: "💰", category: "premium", items: [11, 12, 13, 15, 16, 17, 19, 20] },
  { id: "prem-9", name: "Crimson Case", price: 6.49, color: "#dc2626", emoji: "❤️‍🔥", category: "premium", items: [8, 10, 14, 15, 17, 20, 22, 23] },
  { id: "prem-10", name: "Vice Case", price: 7.99, color: "#c026d3", emoji: "🌴", category: "premium", items: [9, 11, 13, 15, 18, 19, 21, 22] },

  // SPECIAL CASES
  { id: "spec-1", name: "Knife Case", price: 14.99, color: "#ff12ae", emoji: "🗡️", category: "special", items: [11, 12, 14, 17, 18, 19, 20, 15] },
  { id: "spec-2", name: "Karambit Case", price: 19.99, color: "#ff552e", emoji: "🪃", category: "special", items: [13, 14, 15, 17, 19, 20, 16, 18] },
  { id: "spec-3", name: "Butterfly Dream", price: 24.99, color: "#fbbf24", emoji: "🦋", category: "special", items: [12, 15, 17, 19, 20, 16, 18, 14] },
  { id: "spec-4", name: "M9 Case", price: 29.99, color: "#f43f5e", emoji: "🔪", category: "special", items: [15, 16, 17, 19, 20, 18, 21, 13] },
  { id: "spec-5", name: "Insane Case", price: 49.99, color: "#ef4444", emoji: "🤯", category: "special", items: [15, 16, 17, 18, 19, 20, 21, 22] },
  { id: "spec-6", name: "Bayonet Case", price: 17.99, color: "#a855f7", emoji: "⚔️", category: "special", items: [11, 14, 17, 19, 20, 15, 23, 16] },
  { id: "spec-7", name: "Glove Case", price: 34.99, color: "#f59e0b", emoji: "🧤", category: "special", items: [15, 16, 17, 18, 19, 20, 22, 13] },
  { id: "spec-8", name: "Souvenir Case", price: 12.99, color: "#10b981", emoji: "🏆", category: "special", items: [11, 12, 13, 14, 15, 18, 21, 23] },
  { id: "spec-9", name: "Sticker Case", price: 8.99, color: "#f472b6", emoji: "🏷️", category: "special", items: [7, 9, 11, 13, 14, 15, 22, 17] },
  { id: "spec-10", name: "Contraband Case", price: 99.99, color: "#ffc700", emoji: "☠️", category: "special", items: [15, 16, 17, 18, 19, 20, 21, 22] },
];

export function getItemById(id) {
  return ITEMS.find((item) => item.id === id);
}

export function getCaseById(caseId) {
  return CASES.find((c) => c.id === caseId);
}

export function getCasesByCategory(category) {
  return CASES.filter((c) => c.category === category);
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
