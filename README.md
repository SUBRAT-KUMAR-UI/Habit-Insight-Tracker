# Habit Insight Tracker

A simple React app to track your daily habits and actually understand what your data is telling you.

---

## What is this?

Most habit apps just let you check boxes. This one tries to go a step further — it looks at what you've checked (or missed) and tells you something useful about it.

We built this because we wanted to answer questions like:
- Am I actually consistent, or does it just feel that way?
- Which day of the week do I always fall off?
- Have I been getting better or worse lately?

---

## Features

**Habit Management**
Add habits, delete ones you don't need, and track each one on its own. Nothing fancy, just works.

**Daily Tracking**
Mark habits as done for today. Everything saves to localStorage so your data sticks around between sessions.

**History View**
See the last 7 to 30 days at a glance. Makes it easy to spot patterns without doing any mental math.

**Insights**
This is the main part of the project:
- *Consistency Score* — what percentage of days did you actually follow through?
- *Weak Day Detection* — which weekday do you miss the most?
- *Streak Tracking* — your current streak and your longest one

All of this is calculated from the stored dates, no backend needed.

---

## Tech Stack

- React (functional components, hooks)
- JavaScript ES6+
- localStorage

---

## Data Model

Each habit looks like this in storage:

```json
{
  "id": "string",
  "name": "string",
  "completedDates": ["2026-04-20", "2026-04-22"]
}
```

---

## How the logic works

**Consistency** — total completions divided by total days since the habit was added.

**Weak Day** — whichever weekday shows up least in `completedDates`.

**Streak** — walks backwards through dates to find consecutive days. Tracks both current and all-time best.

---

## Running it locally

```bash
git clone <your-repo-link>
cd habit-insight-tracker
npm install
npm start
```

Should be live at `localhost:3000`.

---

## What's next

- Add charts so the data is easier to read visually
- Habit categories (health, work, personal, etc.)
- Maybe a backend someday so data syncs across devices

---

## Contributors

- **Subrat Kumar Sahu** — UI and components
- **Suryanshu Tiwari** — logic and data handling

---

The goal was to keep it small and focused. Habit tracking doesn't need to be complicated — but it should at least tell you something worth knowing.
