import { useMemo } from "react";
import { useAuth } from "../lib/auth";

export const DashboardPage = () => {
  const { user } = useAuth();

  const trips = useMemo(
    () => [
      {
        id: "BK20251115001",
        from: "HCM",
        to: "Hanoi",
        date: "15 Nov 2025, 08:00",
        seats: "A1, A2",
        status: "Ticket issued",
      },
      {
        id: "BK20251120015",
        from: "Hanoi",
        to: "Hue",
        date: "20 Nov 2025, 14:00",
        seats: "B3",
        status: "Ticket issued",
      },
    ],
    []
  );

  return (
    <div className="dashboard-grid">
      <section className="surface hero-surface">
        <div>
          <div className="pill" style={{ marginBottom: "0.5rem" }}>
            Upcoming trips
          </div>
          <h2>Welcome back, {user?.name?.split(" ")[0] || "traveler"} ✈️</h2>
          <p className="muted">Your latest bookings are ready — manage seats, tickets, and changes.</p>
        </div>
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Role</div>
            <div className="stat-value">{user?.role}</div>
            <div className="muted small">Current access level</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Session</div>
            <div className="stat-value">7d</div>
            <div className="muted small">Secure httpOnly cookies</div>
          </div>
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Upcoming trips</h2>
          <button type="button" className="link-btn">
            View history
          </button>
        </div>
        <div className="trip-list">
          {trips.map((trip) => (
            <div className="trip-card" key={trip.id}>
              <div>
                <div className="trip-route">
                  {trip.from} → {trip.to}
                </div>
                <div className="muted">{trip.date}</div>
                <div className="muted">Seats: {trip.seats}</div>
                <div className="muted">Booking ID: {trip.id}</div>
              </div>
              <div className="trip-actions">
                <button type="button" className="outline primary">
                  View E-ticket
                </button>
                <button type="button" className="outline danger">
                  {trip.status === "Ticket issued" ? "Cancel" : "Modify"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="empty-note muted">No more upcoming trips</div>
        <div className="cta-row">
          <button type="button">Search new trip</button>
        </div>
      </section>
    </div>
  );
};
