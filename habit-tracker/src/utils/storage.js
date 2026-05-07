const KEY = "habits-data";

export function loadHabits() {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveHabits(habits) {
  localStorage.setItem(KEY, JSON.stringify(habits));
}