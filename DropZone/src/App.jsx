import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseDetail from "./pages/CaseDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CaseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
