export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-stats">
          <div className="footer-stat">
            <span className="footer-stat-icon">📦</span>
            <span className="footer-stat-value">1,247,832</span>
            <span className="footer-stat-label">Cases Opened</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-icon">👥</span>
            <span className="footer-stat-value">84,521</span>
            <span className="footer-stat-label">Users Online</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-icon">🏆</span>
            <span className="footer-stat-value">3,891</span>
            <span className="footer-stat-label">Covert Dropped</span>
          </div>
          <div className="footer-stat">
            <span className="footer-stat-icon">💰</span>
            <span className="footer-stat-value">$2.4M</span>
            <span className="footer-stat-label">Total Won</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 DropZone. All rights reserved.</span>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">FAQ</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
