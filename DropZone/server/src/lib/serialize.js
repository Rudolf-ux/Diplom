// Приведение записи пользователя к безопасному виду для клиента
// (без passwordHash, с числовым balance вместо Prisma.Decimal).
export function serializeUser(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    balance: Number(user.balance),
    createdAt: user.createdAt,
  };
}
