interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const StatCard = ({ title, value, change, positive }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
      <p className={`stat-change ${positive ? "positive" : "negative"}`}>
        {change} vs last week
      </p>
    </div>
  );
};

export default StatCard;
