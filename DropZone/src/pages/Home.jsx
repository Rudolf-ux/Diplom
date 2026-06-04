import { useState } from "react";
import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Footer from "../components/Footer";
import { CATEGORIES, getCasesByCategory } from "../data/cases";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("free");

  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <h1 className="hero-title">Drop<span className="hero-accent">Zone</span></h1>
        <p className="hero-subtitle">Open cases. Win items. Try your luck.</p>
      </section>
      <section className="cases container">
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
              style={{
                "--tab-color": cat.color,
                borderColor: activeCategory === cat.id ? cat.color : "transparent",
              }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <CaseGrid cases={getCasesByCategory(activeCategory)} />
      </section>
      <Footer />
    </div>
  );
}
