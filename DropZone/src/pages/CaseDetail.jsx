import { useParams, Link } from "react-router-dom";
import { getCaseById, getCaseItems, RARITY } from "../data/cases";
import Navbar from "../components/Navbar";
import Roulette from "../components/Roulette";
import Footer from "../components/Footer";

export default function CaseDetail() {
  const { id } = useParams();
  const caseData = getCaseById(id);

  if (!caseData) {
    return (
      <div className="app">
        <Navbar />
        <div className="not-found">
          <h2>Case not found</h2>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const items = getCaseItems(caseData);
  const isFree = caseData.price === 0;

  return (
    <div className="app">
      <Navbar />
      <div className="container case-detail">
        <Link to="/" className="back-link">← Back to Cases</Link>

        <div className="case-detail-header">
          <div className="case-detail-image">
            <span className="case-detail-emoji">{caseData.emoji}</span>
          </div>
          <h1>{caseData.name}</h1>
          <p className="case-detail-price" style={{ color: caseData.color }}>
            {isFree ? "FREE" : `$${caseData.price.toFixed(2)}`}
          </p>
        </div>

        <Roulette items={items} />

        <section className="case-contents">
          <h2>Case Contents</h2>
          <div className="items-list">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-row"
                style={{ borderLeftColor: RARITY[item.rarity].color }}
              >
                <span className="item-emoji">{item.emoji}</span>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-rarity" style={{ color: RARITY[item.rarity].color }}>
                    {RARITY[item.rarity].label}
                  </span>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
