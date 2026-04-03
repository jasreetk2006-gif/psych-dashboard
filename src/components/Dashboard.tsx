import { useState } from "react";
import StatCard from "./StatCard";
import ActivityFeed from "./ActivityFeed";
import UsersPage from "./UsersPage";
import ContentPage from "./ContentPage";
import SettingsPage from "./SettingsPage";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

type Page = "dashboard" | "users" | "content" | "settings";

const DashboardHome = () => (
  <>
    <div className="page-header">
      <div>
        <h2>Overview</h2>
        <p>Here's what's happening with the app today.</p>
      </div>
    </div>
    <div className="stats-grid">
      <StatCard title="Active Users" value="1,284" change="+12%" positive />
      <StatCard title="Sessions Today" value="3,701" change="+5%" positive />
      <StatCard title="Avg. Session Time" value="4m 32s" change="-2%" positive={false} />
      <StatCard title="Content Items" value="48" change="+3%" positive />
    </div>
    <div className="bottom-grid">
      <div className="chart-card">
        <h3>Weekly Active Users</h3>
        <div className="bar-chart">
          {[40, 65, 50, 80, 72, 90, 84].map((val, i) => (
            <div key={i} className="bar-col">
              <div className="bar" style={{ height: `${val}%` }} />
              <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <ActivityFeed />
    </div>
  </>
);

const navItems: { id: Page; icon: string; label: string }[] = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "users", icon: "👥", label: "Users" },
  { id: "content", icon: "📝", label: "Content" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const Dashboard = ({ username, onLogout }: DashboardProps) => {
  const [page, setPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardHome />;
      case "users": return <UsersPage />;
      case "content": return <ContentPage />;
      case "settings": return <SettingsPage username={username} />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>🧠</span>
          <span>Psych for Life</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="sidebar-user">👤 {username}</p>
          <button onClick={onLogout} className="logout-btn">Sign Out</button>
        </div>
      </aside>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;
