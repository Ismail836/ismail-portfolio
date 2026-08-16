import { DAYS, DAY_LABELS, formatHour, HOURS } from '@/lib/schedule';

export default function Timetable({ timetable, onChange }) {
  const getCell = (day, hour) => timetable[day]?.[hour] || '';

  const setCell = (day, hour, value) => {
    onChange((prev) => ({
      ...prev,
      [day]: { ...(prev[day] || {}), [hour]: value },
    }));
  };

  return (
    <section className="schedule-panel is-active">
      <div className="panel-toolbar">
        <h2>Weekly timetable</h2>
        <p className="panel-hint">8 AM – 8 PM · 1 hour slots</p>
      </div>
      <div className="timetable-wrap glass-card">
        <div className="timetable-scroll">
          <table className="timetable-grid">
            <thead>
              <tr>
                <th className="timetable-corner">Time</th>
                {DAY_LABELS.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td className="time-cell">{formatHour(hour)}</td>
                  {DAYS.map((day) => (
                    <td key={`${day}-${hour}`}>
                      <input
                        type="text"
                        value={getCell(day, hour)}
                        placeholder="—"
                        aria-label={`${DAY_LABELS[DAYS.indexOf(day)]} ${formatHour(hour)}`}
                        onChange={(e) => setCell(day, hour, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
