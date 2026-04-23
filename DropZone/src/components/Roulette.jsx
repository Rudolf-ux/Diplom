export default function Roulette() {
  return (
    <div className="roulette">
      <div className="roulette-track">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="roulette-item">
            🎯
          </div>
        ))}
      </div>
    </div>
  );
}
