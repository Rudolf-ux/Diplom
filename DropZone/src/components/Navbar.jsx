import { Link } from "react-router-dom";
import LiveDrops from "./LiveDrops";

export default function Navbar() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          Drop<span className="logo-accent">Zone</span>
        </Link>

        <nav className="nav">
          <Link to="/">Cases</Link>
          <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://discord.gg/" target="_blank" rel="noreferrer">Discord</a>
          <Link to="/">FAQ</Link>
        </nav>

        <div className="header-right">
          <div className="balance">
            <span className="balance-icon">$</span>
            <span className="balance-value">1,000.00</span>
            <button className="balance-add">+</button>
          </div>
          <button className="login-btn">
            <span className="login-avatar">👤</span>
            Login
          </button>
        </div>
      </header>
      <LiveDrops />
    </>
  );
}
