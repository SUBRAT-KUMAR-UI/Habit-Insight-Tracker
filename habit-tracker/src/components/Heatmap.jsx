const CELL_COLORS = {
  0: "#e0e0e0",
  1: "#c8e6c9",
  2: "#66bb6a",
  3: "#2e7d32",
};

function getCellColor(count) {
  if (count >= 3) return CELL_COLORS[3];
  return CELL_COLORS[count] || CELL_COLORS[0];
}

function getLast30Days(habits) {
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    const count = habits.reduce((sum, habit) => {
      return habit.completions.includes(dateString) ? sum + 1 : sum;
    }, 0);

    days.push({ date: dateString, count });
  }

  return days;
}

function Heatmap({ habits }) {
  if (habits.length === 0) {
    return <p className="empty-state">No activity yet.</p>;
  }

  const days = getLast30Days(habits);

  return (
    <div className="heatmap-grid">
      {days.map((day) => (
        <div
          key={day.date}
          className="heatmap-cell"
          style={{ backgroundColor: getCellColor(day.count) }}
          title={`${day.date}: ${day.count} completion${day.count !== 1 ? "s" : ""}`}
        />
      ))}
    </div>
  );
}

export default Heatmap;