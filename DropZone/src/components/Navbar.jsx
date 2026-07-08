import { Link, useNavigate } from "react-router-dom";
import LiveDrops from "./LiveDrops";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          Drop<span className="logo-accent">Zone</span>
        </Link>

        <nav className="nav">
          <Link to="/">Cases</Link>
          {isAuthenticated && <Link to="/inventory">Inventory</Link>}
          {isAdmin && <Link to="/admin">Admin</Link>}
          <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
          <a href="https://discord.gg/" target="_blank" rel="noreferrer">Discord</a>
        </nav>

        <div className="header-right">
          {isAuthenticated ? (
            <>
              <div className="balance">
                <span className="balance-icon">$</span>
                <span className="balance-value">
                  {Number(user.balance).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <button className="login-btn" onClick={handleLogout}>
                <span className="login-avatar">👤</span>
                {user.username} · Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <span className="login-avatar">👤</span>
              Войти
            </Link>
          )}
        </div>
      </header>
      <LiveDrops />
    </>
  );
}
