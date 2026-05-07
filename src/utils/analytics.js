const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// counts consecutive completions going back from today
export function getStreak(habit) {
  let streak = 0;
  const date = new Date();

  while (true) {
    const dateString = date.toISOString().split("T")[0];
    if (habit.completions.includes(dateString)) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// completion rate based on last 7 days (or since creation if newer)
export function getCompletionRate(habits) {
  if (habits.length === 0) return 0;

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    last7Days.push(day.toISOString().split("T")[0]);
  }

  let totalPossible = 0;
  let totalCompletions = 0;

  habits.forEach((habit) => {
    last7Days.forEach((dateString) => {
      if (dateString >= habit.createdAt) {
        totalPossible++;
        if (habit.completions.includes(dateString)) totalCompletions++;
      }
    });
  });

  if (totalPossible === 0) return 0;
  return Math.round((totalCompletions / totalPossible) * 100);
}

// counts completions per weekday, returns best and worst day
export function getDayStats(habits) {
  if (habits.length === 0) return { bestDay: "N/A", worstDay: "N/A" };

  const dayCounts = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };

  habits.forEach((habit) => {
    habit.completions.forEach((dateString) => {
      const day = WEEKDAYS[new Date(dateString).getDay()];
      dayCounts[day]++;
    });
  });

  const total = Object.values(dayCounts).reduce((sum, count) => sum + count, 0);
  if (total === 0) return { bestDay: "N/A", worstDay: "N/A" };

  const bestDay  = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] >= dayCounts[b] ? a : b);
  const worstDay = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] <= dayCounts[b] ? a : b);

  return { bestDay, worstDay };
}

// returns last 7 days with total completions per day across all habits
export function getWeeklyData(habits) {
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    const count = habits.reduce((sum, habit) => {
      return habit.completions.includes(dateString) ? sum + 1 : sum;
    }, 0);

    result.push({ date: dateString, count });
  }

  return result;
}