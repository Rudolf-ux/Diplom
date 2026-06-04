import { Link } from "react-router-dom";

export default function CaseCard({ caseData }) {
  const isFree = caseData.price === 0;

  return (
    <Link
      to={`/case/${caseData.id}`}
      className="case-card"
      style={{ borderColor: `${caseData.color}33` }}
    >
      <div className="case-card-emoji">{caseData.emoji}</div>
      <h3>{caseData.name}</h3>
      <p className={`case-price ${isFree ? "free" : ""}`} style={{ color: isFree ? "#93ff1f" : caseData.color }}>
        {isFree ? "FREE" : `$${caseData.price.toFixed(2)}`}
      </p>
      <span className="case-open-btn">Open Case</span>
    </Link>
  );
}
