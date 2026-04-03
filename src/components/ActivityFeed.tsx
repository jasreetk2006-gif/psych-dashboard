const activities = [
  { id: 1, user: "alex_m", action: "completed module", target: "Stress & Resilience", time: "2m ago" },
  { id: 2, user: "priya_k", action: "signed up", target: "", time: "11m ago" },
  { id: 3, user: "jordan_t", action: "left feedback on", target: "Sleep Habits", time: "34m ago" },
  { id: 4, user: "sam_r", action: "completed module", target: "Mindful Thinking", time: "1h ago" },
  { id: 5, user: "dana_l", action: "started module", target: "Social Connection", time: "2h ago" },
];

const ActivityFeed = () => {
  return (
    <div className="activity-card">
      <h3>Recent Activity</h3>
      <ul className="activity-list">
        {activities.map((a) => (
          <li key={a.id} className="activity-item">
            <div className="activity-avatar">{a.user[0].toUpperCase()}</div>
            <div className="activity-text">
              <span className="activity-user">{a.user}</span>{" "}
              {a.action}{" "}
              {a.target && <span className="activity-target">"{a.target}"</span>}
            </div>
            <span className="activity-time">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
