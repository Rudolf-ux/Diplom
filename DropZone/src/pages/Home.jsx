import Navbar from "../components/Navbar";
import CaseGrid from "../components/CaseGrid";
import Roulette from "../components/Roulette";

export default function Home() {
  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Navbar />
      <Roulette />

      <section className="p-6">
        <h2 className="text-2xl mb-4">Popular Cases</h2>
        <CaseGrid />
      </section>
    </div>
  );
}
