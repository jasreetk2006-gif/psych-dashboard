import { useState } from "react";

interface SettingsProps {
  username: string;
}

const SettingsPage = ({ username }: SettingsProps) => {
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(`${username}@asu.edu`);
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    newUsers: true,
    moduleCompletion: false,
    weeklyReport: true,
    bugAlerts: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Manage your account and preferences.</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile */}
        <div className="settings-card">
          <h3>Profile</h3>
          <div className="field">
            <label>Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Role</label>
            <input type="text" value="Developer" disabled className="input-disabled" />
          </div>
          <button className="btn-primary" onClick={handleSave}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <h3>Notifications</h3>
          <p className="muted" style={{ marginBottom: "20px", fontSize: "13px" }}>
            Choose what activity sends you an alert.
          </p>
          {[
            { key: "newUsers", label: "New user sign-ups" },
            { key: "moduleCompletion", label: "Module completion milestones" },
            { key: "weeklyReport", label: "Weekly analytics report" },
            { key: "bugAlerts", label: "Bug & error alerts" },
          ].map(({ key, label }) => (
            <div key={key} className="toggle-row">
              <span>{label}</span>
              <button
                className={`toggle ${notifications[key as keyof typeof notifications] ? "toggle-on" : "toggle-off"}`}
                onClick={() => toggle(key as keyof typeof notifications)}
              >
                <div className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="settings-card">
          <h3>App Info</h3>
          <div className="info-rows">
            <div className="info-row"><span>App</span><span>Psych for Life</span></div>
            <div className="info-row"><span>Version</span><span>0.1.0</span></div>
            <div className="info-row"><span>Environment</span><span>Development</span></div>
            <div className="info-row"><span>Auth</span><span>AWS Cognito</span></div>
            <div className="info-row"><span>Database</span><span>DocumentDB</span></div>
            <div className="info-row"><span>Storage</span><span>AWS S3</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
