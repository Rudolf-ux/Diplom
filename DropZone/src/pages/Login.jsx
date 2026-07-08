import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Что-то пошло не так");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Drop<span className="logo-accent">Zone</span>
        </Link>
      </header>

      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Вход
            </button>
            <button
              className={`auth-tab ${mode === "register" ? "active" : ""}`}
              onClick={() => { setMode("register"); setError(""); }}
            >
              Регистрация
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label">
              Логин
              <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="например, player1"
              />
            </label>

            <label className="auth-label">
              Пароль
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="••••••"
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-submit" type="submit" disabled={busy}>
              {busy ? "..." : mode === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>

          <p className="auth-hint">
            Демо-аккаунты: <b>admin / admin123</b> (админ), <b>user / user123</b>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
