import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Footer from "../components/Footer";
import { CATEGORIES, getCasesByCategory } from "../data/cases";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <h1 className="hero-title">Drop<span className="hero-accent">Zone</span></h1>
        <p className="hero-subtitle">Open cases. Win items. Try your luck.</p>
      </section>

      <div className="container">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="cases-section">
            <h2 className="section-title" style={{ color: cat.color }}>
              {cat.label}
            </h2>
            <CaseGrid cases={getCasesByCategory(cat.id)} />
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
