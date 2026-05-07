import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useHabits from "../hooks/useHabits";
import { getCompletionRate, getDayStats, getWeeklyData } from "../utils/analytics";
import Heatmap from "../components/Heatmap";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function Insights() {
  const { habits } = useHabits();

  const hasCompletions = habits.some((h) => h.completions.length > 0);

  if (!hasCompletions) {
    return (
      <div className="page">
        <h1 className="page-title">Insights</h1>
        <p className="empty-state">No data available yet. Start tracking habits to see insights.</p>
      </div>
    );
  }

  const completionRate       = getCompletionRate(habits);
  const { bestDay, worstDay } = getDayStats(habits);
  const chartData            = getWeeklyData(habits).map((entry) => ({
    date: formatDate(entry.date),
    completed: entry.count,
  }));

  return (
    <div className="page">
      <h1 className="page-title">Insights</h1>
      <p className="page-subtitle">Your habit patterns over the last 7 days.</p>

      <div className="insights-summary">
        <div className="stat-card">
          <span className="stat-value">{completionRate}%</span>
          <span className="stat-label">Completion Rate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{bestDay}</span>
          <span className="stat-label">Most Productive Day</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{worstDay}</span>
          <span className="stat-label">Least Productive Day</span>
        </div>
      </div>

      <div className="chart-section">
        <h2 className="section-title">Last 7 Days</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="date" tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
            <Tooltip />
            <Bar dataKey="completed" fill="#6c63ff" radius={[6, 6, 0, 0]} name="Habits Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h2 className="section-title">Activity Heatmap</h2>
        <Heatmap habits={habits} />
      </div>
    </div>
  );
}

export default Insights;