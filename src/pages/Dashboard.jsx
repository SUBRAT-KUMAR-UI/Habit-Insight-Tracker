import useHabits from "../hooks/useHabits";
import HabitCard from "../components/HabitCard";
import { getStreak } from "../utils/analytics";

const today = new Date().toISOString().split("T")[0];

function Dashboard() {
  const { habits, toggleHabitCompletion } = useHabits();

  const totalHabits    = habits.length;
  const completedToday = habits.filter((h) => h.completions.includes(today)).length;
  const longestStreak  = habits.reduce((max, h) => Math.max(max, getStreak(h)), 0);

  // habits with an active streak that aren't done yet today
  const atRisk = habits.filter((h) => {
    const streak = getStreak(h);
    const doneToday = h.completions.includes(today);
    return streak > 0 && !doneToday;
  });

  if (habits.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">Dashboard</h1>
        <p className="empty-state">
          No habits yet. Go to{" "}
          <a href="/habits" className="inline-link">Habits</a>{" "}
          to add your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Your daily check-in.</p>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{totalHabits}</span>
          <span className="stat-label">Total Habits</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedToday} / {totalHabits}</span>
          <span className="stat-label">Completed Today</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{longestStreak} 🔥</span>
          <span className="stat-label">Longest Streak</span>
        </div>
      </div>

      {/* Streaks at risk */}
      {atRisk.length > 0 && (
        <div className="risk-section">
          <h2 className="section-title">⚠️ Streaks at Risk</h2>
          <div className="habit-list">
            {atRisk.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                today={today}
                onToggle={toggleHabitCompletion}
                onDelete={() => {}}
                streak={getStreak(habit)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All habits today */}
      <div className="today-section">
        <h2 className="section-title">Today's Habits</h2>
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              today={today}
              onToggle={toggleHabitCompletion}
              onDelete={() => {}}
              streak={getStreak(habit)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;