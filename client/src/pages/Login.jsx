import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../lib/auth";
import { useTheme } from "../lib/theme";

export const LoginPage = () => {
  const { user, loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const title = useMemo(
    () => (mode === "login" ? "Sign in to your AWAD workspace" : "Create your AWAD account"),
    [mode]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const email = form.email.trim();
      const password = form.password;
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        const name = form.name.trim() || email;
        await registerWithEmail(name, email, password);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to sign you in");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="layout-main" style={{ minHeight: "70vh" }}>
      <div className="topbar" style={{ marginBottom: "0.5rem" }}>
        <div />
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
      <div className="hero">
        <div className="pill" style={{ justifySelf: "center" }}>
          Secure Access
        </div>
        <h1>{title}</h1>
        <p className="muted">
          Use your email and password or continue with Google SSO to view dashboards, manage
          profiles, and access admin tools with role-based permissions.
        </p>
        <div className="hero-card">
          <div className="auth-switch">
            <button
              type="button"
              className={`chip ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              Email login
            </button>
            <button
              type="button"
              className={`chip ${mode === "register" ? "active" : ""}`}
              onClick={() => setMode("register")}
            >
              Create account
            </button>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === "register" && (
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  required
                />
              </label>
            )}
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </label>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" disabled={pending}>
              {pending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <GoogleLogin
            onSuccess={(res) => loginWithGoogle(res.credential)}
            onError={() => alert("Google sign-in failed")}
            theme="outline"
            shape="pill"
            text="continue_with"
            size="large"
          />
          <p className="muted">Single Sign-On keeps your session secure via httpOnly cookies.</p>
          <div className="admin-callout">
            <div className="pill" style={{ justifySelf: "flex-start" }}>
              Admin access
            </div>
            <p className="muted">
              Use the demo admin account to explore the admin dashboard without creating a new user.
            </p>
            <div className="credential-grid">
              <div className="credential">
                <span>Email</span>
                <code>admin@admin.com</code>
              </div>
              <div className="credential">
                <span>Password</span>
                <code>admin@admin.com</code>
              </div>
            </div>
            <p className="muted">After signing in, click Admin in the sidebar to view admin tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
