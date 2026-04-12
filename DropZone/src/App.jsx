import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">DropZone</div>
        <nav className="nav">
          <a href="#" className="nav-link">
            Cases
          </a>
          <a href="#" className="nav-link">
            Telegram
          </a>
          <a href="#" className="nav-link">
            Discord
          </a>
          <a href="#" className="nav-link">
            FAQ
          </a>
        </nav>
        <button className="login-btn">Login</button>
      </header>

      <section className="cases">
        <h2>Popular Cases</h2>
        <div className="case-grid">
          <div className="case-card">Case 1</div>
          <div className="case-card">Case 2</div>
          <div className="case-card">Case 3</div>
          <div className="case-card">Case 4</div>
        </div>
      </section>
    </div>
  );
}

export default App;
