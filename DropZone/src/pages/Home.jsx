import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <section className="hero">
        <h1 className="hero-title">Drop<span className="hero-accent">Zone</span></h1>
        <p className="hero-subtitle">Open cases. Win items. Try your luck.</p>
      </section>
      <section className="cases container">
        <h2>Popular Cases</h2>
        <CaseGrid />
      </section>
      <Footer />
    </div>
  );
}
