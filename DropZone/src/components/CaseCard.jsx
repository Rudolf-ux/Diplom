import { Link } from "react-router-dom";

export default function CaseCard({ caseData }) {
  return (
    <Link
      to={`/case/${caseData.id}`}
      className="case-card"
      style={{ borderColor: `${caseData.color}33` }}
    >
      <div className="case-card-emoji">{caseData.emoji}</div>
      <h3>{caseData.name}</h3>
      <p className="case-price" style={{ color: caseData.color }}>
        ${caseData.price.toFixed(2)}
      </p>
      <span className="case-open-btn">Open Case</span>
    </Link>
  );
}
