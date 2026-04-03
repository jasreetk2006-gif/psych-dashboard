import { useState } from "react";

interface Module {
  id: number;
  title: string;
  category: string;
  status: "Published" | "Draft";
  completions: number;
  lastUpdated: string;
}

const initialModules: Module[] = [
  { id: 1, title: "Stress & Resilience", category: "Stress", status: "Published", completions: 412, lastUpdated: "Mar 10, 2025" },
  { id: 2, title: "Sleep Habits", category: "Wellness", status: "Published", completions: 388, lastUpdated: "Feb 28, 2025" },
  { id: 3, title: "Mindful Thinking", category: "Mindfulness", status: "Published", completions: 301, lastUpdated: "Mar 5, 2025" },
  { id: 4, title: "Social Connection", category: "Relationships", status: "Published", completions: 275, lastUpdated: "Mar 18, 2025" },
  { id: 5, title: "Managing Anxiety", category: "Anxiety", status: "Draft", completions: 0, lastUpdated: "Apr 1, 2025" },
  { id: 6, title: "Building Confidence", category: "Self-esteem", status: "Draft", completions: 0, lastUpdated: "Apr 2, 2025" },
];

const ContentPage = () => {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [filter, setFilter] = useState<"All" | "Published" | "Draft">("All");

  const toggleStatus = (id: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Published" ? "Draft" : "Published" }
          : m
      )
    );
  };

  const filtered = modules.filter(
    (m) => filter === "All" || m.status === filter
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Content</h2>
          <p>Manage psychology modules in the app.</p>
        </div>
      </div>

      <div className="table-controls">
        <div className="filter-tabs">
          {(["All", "Published", "Draft"] as const).map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="modules-grid">
        {filtered.map((module) => (
          <div key={module.id} className="module-card">
            <div className="module-top">
              <span className="module-category">{module.category}</span>
              <span className={`badge ${module.status === "Published" ? "badge-active" : "badge-inactive"}`}>
                {module.status}
              </span>
            </div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-meta">
              {module.completions > 0
                ? `${module.completions.toLocaleString()} completions`
                : "No completions yet"}
            </p>
            <p className="module-updated muted">Updated {module.lastUpdated}</p>
            <div className="module-actions">
              <button className="btn-secondary">Edit</button>
              <button
                className={`btn-toggle ${module.status === "Published" ? "btn-unpublish" : "btn-publish"}`}
                onClick={() => toggleStatus(module.id)}
              >
                {module.status === "Published" ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
