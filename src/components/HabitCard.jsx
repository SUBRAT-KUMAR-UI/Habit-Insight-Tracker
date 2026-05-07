function HabitCard({ habit, onToggle, streak, today }) {
  const completedToday = habit.completions.includes(today);

  return (
    <div className="habit-card">
      <div className="habit-info">
        <span className="habit-name">{habit.name}</span>
        <span className="habit-streak">🔥 {streak} day streak</span>
      </div>
      <div className="habit-actions">
        <button
          className={completedToday ? "btn-completed" : "btn-complete"}
          onClick={() => onToggle(habit.id, today)}
        >
          {completedToday ? "✓ Done" : "Complete Today"}
        </button>
      </div>
    </div>
  );
}

export default HabitCard;