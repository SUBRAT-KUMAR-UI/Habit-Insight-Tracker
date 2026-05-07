import useHabits from "../hooks/useHabits";
import HabitForm from "../components/HabitForm";
import HabitManageCard from "../components/HabitManageCard";
import { getStreak } from "../utils/analytics";


function Habits() {
  const { habits, addHabit, deleteHabit } = useHabits();

  return (
    <div className="page">
      <h1 className="page-title">Manage Habits</h1>
      <p className="page-subtitle">Add or remove your habits.</p>

      <HabitForm onAdd={addHabit} />

      {habits.length === 0 ? (
        <p className="empty-state">No habits found. Add your first habit.</p>
      ) : (
        <div className="habit-list">
          {habits.map((habit) => (
            <HabitManageCard
              key={habit.id}
              habit={habit}
              onDelete={deleteHabit}
              streak={getStreak(habit)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Habits;