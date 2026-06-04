import CaseCard from "./CaseCard";

export default function CaseGrid({ cases }) {
  return (
    <div className="case-grid">
      {cases.map((c) => (
        <CaseCard key={c.id} caseData={c} />
      ))}
    </div>
  );
}
