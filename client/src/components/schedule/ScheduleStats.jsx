import { countTimetableFilled, habitDoneCount } from '@/lib/schedule';

export default function ScheduleStats({ activeTab, timetable, habits, habitPeriod, bucket }) {
  const tt = countTimetableFilled(timetable);
  const habitDone = habits.reduce((s, h) => s + habitDoneCount(h, habitPeriod), 0);
  const habitGoal = habits.length * habitPeriod;
  const habitPct = habitGoal ? Math.round((habitDone / habitGoal) * 100) : 0;
  const bucketDone = bucket.filter((b) => b.done).length;
  const bucketTotal = bucket.length;

  const cards = [
    { label: activeTab === 'timetable' ? 'Filled this week' : 'Timetable slots', value: `${tt.filled}/${tt.total}` },
    { label: activeTab === 'habits' ? `${habitPeriod}-day streak` : 'Habits progress', value: `${habitPct}%` },
    { label: activeTab === 'bucket' ? 'Dreams completed' : 'Bucket list', value: `${bucketDone}/${bucketTotal}` },
  ];

  return (
    <section className="schedule-stats glass-card container" aria-live="polite">
      {cards.map((c) => (
        <div key={c.label} className="stat-card">
          <span>{c.label}</span>
          <strong>{c.value}</strong>
        </div>
      ))}
    </section>
  );
}
