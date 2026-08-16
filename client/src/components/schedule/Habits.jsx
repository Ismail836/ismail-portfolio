import {
  getDayLabels,
  habitDoneCount,
  pctClass,
  uid,
} from '@/lib/schedule';

export default function Habits({ habits, habitPeriod, onHabitsChange, onPeriodChange }) {
  const days = getDayLabels(habitPeriod);
  const monthName = new Date().toLocaleString('en', { month: 'long', year: 'numeric' });

  const toggleCheck = (habitId, dayKey, checked) => {
    onHabitsChange(
      habits.map((h) =>
        h.id === habitId
          ? { ...h, checks: { ...h.checks, [dayKey]: checked } }
          : h
      )
    );
  };

  const removeHabit = (id) => onHabitsChange(habits.filter((h) => h.id !== id));

  const addHabit = () => {
    const name = window.prompt('Habit name (e.g. Wake up at 05:00 ⏰)');
    if (!name?.trim()) return;
    onHabitsChange([...habits, { id: uid(), name: name.trim(), goal: null, checks: {} }]);
  };

  const dailyPct = days.map((d) => {
    let done = 0;
    habits.forEach((h) => {
      if (h.checks[d.key]) done += 1;
    });
    const pct = habits.length ? Math.round((done / habits.length) * 100) : 0;
    return { ...d, pct, done, notDone: habits.length - done };
  });

  const overallDone = habits.reduce((sum, h) => sum + habitDoneCount(h, habitPeriod), 0);
  const overallGoal = habits.length * habitPeriod;
  const overallPct = overallGoal ? Math.round((overallDone / overallGoal) * 100) : 0;

  return (
    <section className="schedule-panel is-active">
      <div className="panel-toolbar panel-toolbar--split">
        <div>
          <h2>Habits & hobbies</h2>
          <p className="panel-hint">{monthName} · {habitPeriod}-day tracker</p>
        </div>
        <div className="habits-controls">
          <div className="segmented" role="group" aria-label="Tracking period">
            {[15, 30].map((p) => (
              <button
                key={p}
                type="button"
                className={`segmented-btn${habitPeriod === p ? ' is-active' : ''}`}
                onClick={() => onPeriodChange(p)}
              >
                {p} days
              </button>
            ))}
          </div>
          <button type="button" className="button button-secondary btn-sm" onClick={addHabit}>+ Habit</button>
        </div>
      </div>

      <div className="habits-layout">
        <div className="habits-grid-wrap glass-card">
          <div className="habits-scroll">
            <table className="habits-grid">
              <thead>
                <tr>
                  <th>My habits</th>
                  {days.map((d) => (
                    <th key={d.key}>{d.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit.id}>
                    <td className="habit-name">
                      <div className="habit-label">
                        <span>{habit.name}</span>
                        <button type="button" className="habit-delete" onClick={() => removeHabit(habit.id)} title="Remove habit">×</button>
                      </div>
                    </td>
                    {days.map((d) => (
                      <td key={d.key}>
                        <input
                          type="checkbox"
                          className="habit-check"
                          checked={!!habit.checks[d.key]}
                          onChange={(e) => toggleCheck(habit.id, d.key, e.target.checked)}
                          aria-label={`${habit.name} ${d.label}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Progress</td>
                  {dailyPct.map((d) => (
                    <td key={d.key} className={pctClass(d.pct)}>{d.pct}%</td>
                  ))}
                </tr>
                <tr>
                  <td>Done</td>
                  {dailyPct.map((d) => (
                    <td key={d.key}>{d.done}</td>
                  ))}
                </tr>
                <tr>
                  <td>Not done</td>
                  {dailyPct.map((d) => (
                    <td key={d.key}>{d.notDone}</td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <aside className="habits-analysis glass-card">
          <h3>Analysis</h3>
          <table className="analysis-table">
            <thead>
              <tr>
                <th>Habit</th>
                <th>Goal</th>
                <th>Done</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => {
                const goal = habit.goal ?? habitPeriod;
                const done = habitDoneCount(habit, habitPeriod);
                const pct = goal ? Math.min(100, Math.round((done / goal) * 100)) : 0;
                return (
                  <tr key={habit.id}>
                    <td>{habit.name}</td>
                    <td>{goal}</td>
                    <td>{done}</td>
                    <td>
                      <div className="mini-bar" title={`${pct}%`}>
                        <div className="mini-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="habits-overall">
            <span>Overall</span>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${overallPct}%` }} />
            </div>
            <strong>{overallPct}%</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
