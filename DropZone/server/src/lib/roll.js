import crypto from "crypto";

// Шансы выпадения по редкости. Значения совпадают с фронтовым RARITY в src/data/cases.js.
export const RARITY_CHANCE = {
  common: 0.6,
  uncommon: 0.25,
  rare: 0.1,
  legendary: 0.05,
};

// Криптостойкое случайное число в [0, 1).
function random() {
  // 2^32 значений достаточно для честного выбора.
  return crypto.randomInt(0, 2 ** 32) / 2 ** 32;
}

// Честный серверный выбор предмета из кейса.
//
// Исправляет баг исходного клиентского rollItem, где шансы суммировались по каждому
// предмету, из-за чего реальные вероятности зависели от количества предметов в кейсе.
//
// Алгоритм:
//   1. Группируем предметы по редкости.
//   2. Выбираем редкость пропорционально её шансу — нормализуя только по тем
//      редкостям, что реально присутствуют в кейсе.
//   3. Внутри выбранной редкости берём предмет равновероятно.
//
// items: массив объектов вида { id, name, rarity, price, emoji }.
export function rollItem(items) {
  if (!items || items.length === 0) {
    throw new Error("Cannot roll from an empty case");
  }

  // 1. Группировка по редкости.
  const byRarity = new Map();
  for (const item of items) {
    if (!byRarity.has(item.rarity)) byRarity.set(item.rarity, []);
    byRarity.get(item.rarity).push(item);
  }

  // 2. Взвешенный выбор редкости среди присутствующих.
  const rarities = [...byRarity.keys()];
  const weights = rarities.map((r) => RARITY_CHANCE[r] ?? 0);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  // Фолбэк: если по какой-то причине суммарный вес 0 — равновероятно среди всех.
  if (totalWeight <= 0) {
    return items[crypto.randomInt(0, items.length)];
  }

  let roll = random() * totalWeight;
  let chosenRarity = rarities[rarities.length - 1];
  for (let i = 0; i < rarities.length; i++) {
    roll -= weights[i];
    if (roll <= 0) {
      chosenRarity = rarities[i];
      break;
    }
  }

  // 3. Равновероятный выбор предмета внутри редкости.
  const pool = byRarity.get(chosenRarity);
  return pool[crypto.randomInt(0, pool.length)];
}
