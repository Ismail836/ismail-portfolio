import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/schedule.css';
import ThemeToggle from '@/components/common/ThemeToggle';
import ScheduleStats from '@/components/schedule/ScheduleStats';
import Timetable from '@/components/schedule/Timetable';
import Habits from '@/components/schedule/Habits';
import BucketList from '@/components/schedule/BucketList';
import ScheduleNav from '@/components/schedule/ScheduleNav';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  DEFAULT_BUCKET,
  DEFAULT_HABITS,
  STORAGE,
  TAB_TITLES,
} from '@/lib/schedule';

function loadInitialHabits() {
  try {
    const raw = localStorage.getItem(STORAGE.habits);
    const saved = raw ? JSON.parse(raw) : null;
    if (saved?.length) return saved;
  } catch {
    /* ignore */
  }
  return DEFAULT_HABITS;
}

function loadInitialPeriod() {
  const p = Number(localStorage.getItem(STORAGE.period));
  return p === 30 ? 30 : 15;
}

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const saved = localStorage.getItem(STORAGE.tab);
    if (['timetable', 'habits', 'bucket'].includes(hash)) return hash;
    if (['timetable', 'habits', 'bucket'].includes(saved)) return saved;
    return 'timetable';
  });

  const [timetable, setTimetable] = useLocalStorage(STORAGE.timetable, {});
  const [habits, setHabits] = useLocalStorage(STORAGE.habits, loadInitialHabits());
  const [bucket, setBucket] = useLocalStorage(STORAGE.bucket, DEFAULT_BUCKET);
  const [habitPeriod, setHabitPeriod] = useState(loadInitialPeriod);

  useEffect(() => {
    localStorage.setItem(STORAGE.tab, activeTab);
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE.period, String(habitPeriod));
  }, [habitPeriod]);

  const title = TAB_TITLES[activeTab] || 'Schedule Hub';

  return (
    <div className="schedule-app schedule-body">
      <header className="schedule-header container">
        <Link to="/" className="schedule-back">← Portfolio</Link>
        <div className="schedule-header-main">
          <span className="eyebrow">Life game</span>
          <h1>{title}</h1>
        </div>
        <ThemeToggle />
      </header>

      <ScheduleStats
        activeTab={activeTab}
        timetable={timetable}
        habits={habits}
        habitPeriod={habitPeriod}
        bucket={bucket}
      />

      <main className="schedule-main container">
        {activeTab === 'timetable' && <Timetable timetable={timetable} onChange={setTimetable} />}
        {activeTab === 'habits' && (
          <Habits
            habits={habits}
            habitPeriod={habitPeriod}
            onHabitsChange={setHabits}
            onPeriodChange={setHabitPeriod}
          />
        )}
        {activeTab === 'bucket' && <BucketList bucket={bucket} onChange={setBucket} />}
      </main>

      <ScheduleNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
