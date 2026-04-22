export default function Roulette() {
  return (
    <div className="overflow-hidden py-6">
      <div className="flex gap-4 animate-spin-slow">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-20 bg-[#1e293b] rounded-lg flex items-center justify-center"
          >
            🎯
          </div>
        ))}
      </div>
    </div>
  );
}
