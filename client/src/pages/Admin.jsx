const metrics = [
  { label: "Total bookings", value: "1,234" },
  { label: "Active users", value: "856" },
  { label: "Revenue today", value: "45.2M" },
];

const routes = [
  { route: "HCM → Hanoi", bookings: 234, revenue: "8.2M" },
  { route: "HCM → Dalat", bookings: 189, revenue: "3.4M" },
];

const recent = [
  { id: "BK20251115001", route: "HCM → Hanoi", time: "Today, 08:00", price: "1.2M" },
  { id: "BK20251120015", route: "Hanoi → Hue", time: "Yesterday, 14:00", price: "820K" },
];

export const AdminPage = () => {
  return (
    <div className="admin-grid">
      <section className="metrics-row">
        {metrics.map((item) => (
          <div className="metric-card surface" key={item.label}>
            <div className="muted small">{item.label}</div>
            <div className="metric-value">{item.value}</div>
          </div>
        ))}
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Bookings trend (Last 7 days)</h2>
          <div className="pill">Admin only</div>
        </div>
        <div className="chart-placeholder">[Line chart placeholder]</div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Top routes</h2>
        </div>
        <div className="table">
          <div className="table-head">
            <span>Route</span>
            <span>Bookings</span>
            <span>Revenue</span>
          </div>
          {routes.map((row) => (
            <div className="table-row" key={row.route}>
              <span>{row.route}</span>
              <span>{row.bookings}</span>
              <span>{row.revenue}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="surface">
        <div className="section-head">
          <h2>Recent bookings</h2>
        </div>
        <div className="table cols-4">
          <div className="table-head">
            <span>Booking ID</span>
            <span>Route</span>
            <span>Time</span>
            <span>Price</span>
          </div>
          {recent.map((row) => (
            <div className="table-row" key={row.id}>
              <span>{row.id}</span>
              <span>{row.route}</span>
              <span>{row.time}</span>
              <span>{row.price}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
