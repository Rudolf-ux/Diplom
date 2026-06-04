import { Link } from "react-router-dom";

export default function CaseCard({ caseData }) {
  const isFree = caseData.price === 0;

  return (
    <Link
      to={`/case/${caseData.id}`}
      className="case-card"
      style={{ "--card-color": caseData.color, borderColor: `${caseData.color}22` }}
    >
      <div className="case-card-image">
        <span className="case-card-emoji">{caseData.emoji}</span>
      </div>
      <div className="case-card-info">
        <h3>{caseData.name}</h3>
        <p className={`case-price ${isFree ? "free" : ""}`}>
          {isFree ? "FREE" : `$${caseData.price.toFixed(2)}`}
        </p>
      </div>
    </Link>
  );
}
