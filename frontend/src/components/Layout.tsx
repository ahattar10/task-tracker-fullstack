import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearAccessToken } from "../services/http";

export function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/login");
  };

  return (
    <div className="shell">
      <aside className="rail">
        <h1>Task Tracker</h1>
        <p className="rail-subtitle">Day 6 Scaffold</p>
        <nav>
          <Link to="/tasks">Tasks</Link>
        </nav>
        <button onClick={handleLogout} className="ghost-btn" type="button">
          Log Out
        </button>
      </aside>
      <main className="panel">
        <header className="panel-header">
          <h2>Workspace</h2>
          <p>Frontend shell is ready for Day 7 CRUD integration.</p>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
