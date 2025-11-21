import { useAuth } from "../lib/auth";

export const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="grid two">
      <div className="surface">
        <h2>Your profile</h2>
        {user ? (
          <div className="grid" style={{ alignItems: "center", gridTemplateColumns: "80px 1fr" }}>
            <img className="avatar" src={user.picture} alt={user.name} />
            <div>
              <p className="muted">Name</p>
              <p>{user.name}</p>
              <p className="muted" style={{ marginTop: "0.75rem" }}>
                Email
              </p>
              <p>{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="muted">No user loaded</p>
        )}
      </div>
      <div className="surface">
        <h2>Security</h2>
        <p className="muted">Role: {user?.role}</p>
        <p className="muted">SSO Provider: Google</p>
        <p className="muted">Session: httpOnly JWT (7d)</p>
      </div>
    </div>
  );
};
