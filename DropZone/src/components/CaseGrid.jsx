import { CASES } from "../data/cases";
import CaseCard from "./CaseCard";

export default function CaseGrid() {
  return (
    <div className="case-grid">
      {CASES.map((c) => (
        <CaseCard key={c.id} caseData={c} />
      ))}
    </div>
  );
}
