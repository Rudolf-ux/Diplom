import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Drop<span className="logo-accent">Zone</span>
      </Link>

      <nav className="nav">
        <Link to="/">Cases</Link>
        <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
        <a href="https://discord.gg/" target="_blank" rel="noreferrer">Discord</a>
        <Link to="/" className="nav-faq">FAQ</Link>
      </nav>

      <button className="login-btn">Login</button>
    </header>
  );
}
