import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RARITY } from "../data/cases";
import { api } from "../api/client";
import Navbar from "../components/Navbar";
import Roulette from "../components/Roulette";
import Footer from "../components/Footer";

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/cases/${id}`)
      .then(setCaseData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="not-found"><h2>Загрузка...</h2></div>
        <Footer />
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="app">
        <Navbar />
        <div className="not-found">
          <h2>{error || "Кейс не найден"}</h2>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const items = caseData.items;
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

        <Roulette items={items} caseId={caseData.id} />

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
