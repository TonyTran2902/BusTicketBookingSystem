import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useTheme } from "../lib/theme";

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">AWAD Travel</div>
        <nav className="nav">
          <div className="nav-label">Navigation</div>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Upcoming
          </NavLink>
          <a className="disabled">History</a>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            Profile
          </NavLink>
          <a className="disabled">Payments</a>
          <a className="disabled">Notifications</a>
          {user?.role === "admin" && (
            <>
              <div className="nav-label" style={{ marginTop: "0.5rem" }}>
                Admin
              </div>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
                Overview
              </NavLink>
            </>
          )}
        </nav>
        <div className="user-pane">
          <div className="user-name">{user?.name}</div>
          <div className="user-email">{user?.email}</div>
          <button onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="layout-main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="brand-badge">AW</div>
            <div>
              <div className="topbar-title">AWAD Dashboard</div>
              <div className="muted small">Plan, track, and manage trips</div>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} type="button">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <div className="user-chip">
              <span className="user-name">{user?.name}</span>
              <div className="pill">Signed in</div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
