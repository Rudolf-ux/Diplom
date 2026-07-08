import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import CaseDetail from "./pages/CaseDetail";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Admin from "./pages/Admin";
import "./App.css";

// Требует входа. Иначе — на страницу логина.
function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="page-loading">Загрузка...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Требует роль администратора.
function RequireAdmin({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div className="page-loading">Загрузка...</div>;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/inventory"
            element={
              <RequireAuth>
                <Inventory />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
