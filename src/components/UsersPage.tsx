import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  joined: string;
  modulesCompleted: number;
  status: "Active" | "Inactive";
}

const allUsers: User[] = [
  { id: 1, name: "Alex Martinez", email: "alex.m@email.com", joined: "Jan 12, 2025", modulesCompleted: 7, status: "Active" },
  { id: 2, name: "Priya Kapoor", email: "priya.k@email.com", joined: "Feb 3, 2025", modulesCompleted: 3, status: "Active" },
  { id: 3, name: "Jordan Taylor", email: "jordan.t@email.com", joined: "Feb 18, 2025", modulesCompleted: 5, status: "Active" },
  { id: 4, name: "Sam Rivera", email: "sam.r@email.com", joined: "Mar 1, 2025", modulesCompleted: 2, status: "Inactive" },
  { id: 5, name: "Dana Lee", email: "dana.l@email.com", joined: "Mar 9, 2025", modulesCompleted: 9, status: "Active" },
  { id: 6, name: "Chris Nguyen", email: "chris.n@email.com", joined: "Mar 22, 2025", modulesCompleted: 1, status: "Inactive" },
  { id: 7, name: "Morgan Patel", email: "morgan.p@email.com", joined: "Apr 5, 2025", modulesCompleted: 6, status: "Active" },
  { id: 8, name: "Riley Chen", email: "riley.c@email.com", joined: "Apr 14, 2025", modulesCompleted: 4, status: "Active" },
];

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");

  const filtered = allUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Users</h2>
          <p>People using the Psych for Life app.</p>
        </div>
      </div>

      <div className="table-controls">
        <input
          className="search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {(["All", "Active", "Inactive"] as const).map((f) => (
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

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Modules Done</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="mini-avatar">{user.name[0]}</div>
                    {user.name}
                  </div>
                </td>
                <td className="muted">{user.email}</td>
                <td className="muted">{user.joined}</td>
                <td>{user.modulesCompleted}</td>
                <td>
                  <span className={`badge ${user.status === "Active" ? "badge-active" : "badge-inactive"}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-row">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
