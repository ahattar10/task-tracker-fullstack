import { Link, Outlet, useNavigate } from "react-router-dom";
import { trackEvent } from "../analytics/ga4";
import { clearAccessToken } from "../services/http";

export function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    trackEvent("user_logout", {
      source: "sidebar_button",
    });
    clearAccessToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="shell">
      <aside className="rail">
        <h1>Task Tracker</h1>
        <p className="rail-subtitle">Personal task dashboard</p>
        <nav>
          <Link to="/tasks">Tasks</Link>
        </nav>
        <button onClick={handleLogout} className="ghost-btn" type="button">
          Log Out
        </button>
      </aside>
      <main className="panel">
        <header className="panel-header">
          <h2>Your tasks</h2>
          <p>Track, update, and complete work in one place.</p>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
