export const STORAGE = {
  timetable: 'schedule_timetable_v1',
  habits: 'schedule_habits_v1',
  bucket: 'schedule_bucket_v1',
  period: 'schedule_habits_period_v1',
  tab: 'schedule_active_tab_v1',
};

export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);

export const DEFAULT_HABITS = [
  { id: 'wake', name: 'Wake up at 05:00 ⏰', goal: null, checks: {} },
  { id: 'noreels', name: 'No Reels 🌿', goal: null, checks: {} },
  { id: 'code', name: 'Code 1 hour 💻', goal: null, checks: {} },
  { id: 'read', name: 'Read 20 pages 📖', goal: null, checks: {} },
  { id: 'workout', name: 'Workout 🏋️', goal: null, checks: {} },
];

export const DEFAULT_BUCKET = [
  { id: 'b1', text: 'Visit another country', done: false },
  { id: 'b2', text: 'Ship a game to itch.io', done: false },
  { id: 'b3', text: 'Speak at a tech meetup', done: false },
  { id: 'b4', text: 'Learn to surf / skydive', done: false },
];

export const TAB_TITLES = {
  timetable: 'Weekly Timetable',
  habits: 'Habits & Hobbies',
  bucket: 'Bucket List',
};

export function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatHour(h) {
  if (h === 12) return '12 PM';
  if (h > 12) return `${h - 12} PM`;
  return `${h} AM`;
}

export function getDayLabels(period) {
  const labels = [];
  const today = new Date();
  for (let i = period - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dow = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()];
    labels.push({ key: i, label: `${dow} ${d.getDate()}` });
  }
  return labels;
}

export function habitDoneCount(habit, period) {
  let n = 0;
  for (let i = 0; i < period; i += 1) {
    if (habit.checks[i]) n += 1;
  }
  return n;
}

export function pctClass(pct) {
  if (pct >= 70) return 'day-pct-high';
  if (pct >= 40) return 'day-pct-mid';
  return 'day-pct-low';
}

export function countTimetableFilled(timetable) {
  let filled = 0;
  const total = DAYS.length * HOURS.length;
  DAYS.forEach((day) => {
    HOURS.forEach((hour) => {
      if ((timetable[day]?.[hour] || '').trim()) filled += 1;
    });
  });
  return { filled, total };
}
