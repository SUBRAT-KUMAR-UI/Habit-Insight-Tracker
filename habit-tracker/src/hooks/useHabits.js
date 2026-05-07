import { useState, useEffect } from "react";
import { loadHabits, saveHabits } from "../utils/storage";

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function useHabits() {
  const [habits, setHabits] = useState(loadHabits);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit(name) {
    const newHabit = {
      id: Date.now().toString(),
      name,
      createdAt: getTodayString(),
      completions: [],
    };
    setHabits([...habits, newHabit]);
  }

  function deleteHabit(id) {
    setHabits(habits.filter((habit) => habit.id !== id));
  }

  function toggleHabitCompletion(id, date) {
    setHabits(habits.map((habit) => {
      if (habit.id !== id) return habit;

      const alreadyDone = habit.completions.includes(date);
      const updatedCompletions = alreadyDone
        ? habit.completions.filter((d) => d !== date)
        : [...habit.completions, date];

      return { ...habit, completions: updatedCompletions };
    }));
  }

  return { habits, addHabit, deleteHabit, toggleHabitCompletion };
}

export default useHabits;