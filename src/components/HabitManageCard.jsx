function HabitManageCard({ habit, onDelete, streak }) {
  return (
    <div className="habit-card">
      <div className="habit-info">
        <span className="habit-name">{habit.name}</span>
        <span className="habit-streak">🔥 {streak} day streak</span>
        <span className="habit-date">Added {habit.createdAt}</span>
      </div>
      <div className="habit-actions">
        <button className="btn-delete" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default HabitManageCard;