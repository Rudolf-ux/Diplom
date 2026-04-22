import CaseCard from "./CaseCard";

const cases = [
  { title: "Case 1", price: 2.5, img: "https://via.placeholder.com/150" },
  { title: "Case 2", price: 5, img: "https://via.placeholder.com/150" },
  { title: "Case 3", price: 10, img: "https://via.placeholder.com/150" },
  { title: "Case 4", price: 20, img: "https://via.placeholder.com/150" },
];

export default function CaseGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {cases.map((c, i) => (
        <CaseCard key={i} {...c} />
      ))}
    </div>
  );
}
