const tabs = [
  { id: 'timetable', icon: '🕐', label: 'Timetable' },
  { id: 'habits', icon: '✓', label: 'Habits' },
  { id: 'bucket', icon: '★', label: 'Bucket' },
];

export default function ScheduleNav({ activeTab, onTabChange }) {
  return (
    <nav className="schedule-nav" aria-label="Schedule sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`schedule-nav-btn${activeTab === tab.id ? ' is-active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
