import { Link } from 'react-router-dom';

const cards = [
  {
    to: '/schedule',
    featured: true,
    icon: '📅',
    title: 'Schedule',
    description: 'Weekly timetable, habit tracker, and bucket list — turn your life into a game.',
    link: 'Open hub →',
  },
  {
    to: '#projects',
    icon: '◆',
    title: 'Projects',
    description: 'Portfolio gallery and case studies.',
    link: 'View →',
  },
  {
    to: '#contact',
    icon: '✉',
    title: 'Contact',
    description: 'Reach out for collaborations.',
    link: 'Message →',
  },
  {
    to: '#social',
    icon: '🔗',
    title: 'Social',
    description: 'GitHub, LinkedIn, email, and more.',
    link: 'View links →',
  },
];

export default function Dashboard() {
  return (
    <section className="dashboard-section" id="dashboard">
      <div className="section-header">
        <span className="eyebrow">Dashboard</span>
        <h2>Life & productivity hub</h2>
      </div>
      <div className="dashboard-grid">
        {cards.map((card) => {
          const className = `glass-card dashboard-card${card.featured ? ' dashboard-card--featured' : ''}`;
          const inner = (
            <>
              <span className="dashboard-card-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="dashboard-card-link">{card.link}</span>
            </>
          );
          return card.to.startsWith('/') ? (
            <Link key={card.title} to={card.to} className={className}>{inner}</Link>
          ) : (
            <a key={card.title} href={card.to} className={className}>{inner}</a>
          );
        })}
      </div>
    </section>
  );
}
