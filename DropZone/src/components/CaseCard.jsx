export default function CaseCard({ title, price, img }) {
  return (
    <div className="case-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
    </div>
  );
}
