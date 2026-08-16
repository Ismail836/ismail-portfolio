import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let res = await fetch('/api/projects');
        if (!res.ok) res = await fetch('/projects.json');
        if (!res.ok) throw new Error('unavailable');
        setProjects(await res.json());
      } catch {
        setError(true);
      }
    };
    load();
  }, []);

  const trackClick = (slug) => {
    fetch('/api/project-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {});
  };

  if (error) {
    return <p className="form-status">Unable to load projects right now.</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article key={project.slug} className="glass-card project-card">
          <div>
            <p className="project-label">{project.category}</p>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
          <div className="project-footer">
            <a href={project.link} className="project-link" target="_blank" rel="noreferrer">View case</a>
            <button type="button" className="button button-secondary project-action" onClick={() => trackClick(project.slug)}>
              Track
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
