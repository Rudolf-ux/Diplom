import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Roulette from "../components/Roulette";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <Roulette />

      <section className="cases">
        <h2>Popular Cases</h2>
        <CaseGrid />
      </section>
    </div>
  );
}
