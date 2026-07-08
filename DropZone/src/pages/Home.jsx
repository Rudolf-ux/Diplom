import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Footer from "../components/Footer";
import { CATEGORIES } from "../data/cases";
import { api } from "../api/client";

export default function Home() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/cases")
      .then(setCases)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <h1 className="hero-title">Drop<span className="hero-accent">Zone</span></h1>
        <p className="hero-subtitle">Open cases. Win items. Try your luck.</p>
      </section>

      <div className="container">
        {loading && <p>Загрузка кейсов...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!loading && !error && CATEGORIES.map((cat) => {
          const list = cases.filter((c) => c.category === cat.id);
          if (list.length === 0) return null;
          return (
            <section key={cat.id} className="cases-section">
              <h2 className="section-title" style={{ color: cat.color }}>
                {cat.label}
              </h2>
              <CaseGrid cases={list} />
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
