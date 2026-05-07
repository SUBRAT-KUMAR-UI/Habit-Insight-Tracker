import { useState } from "react";

function HabitForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName("");
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        className="habit-input"
        type="text"
        placeholder="Enter habit name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-primary" type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;