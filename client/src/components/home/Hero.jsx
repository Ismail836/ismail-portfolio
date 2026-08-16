import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '@/components/home/SocialLinks';

export default function Hero() {
  const heroCardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = heroCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    card.style.transform = `translate3d(${x * 18}px, ${y * 18}px, 0) rotateX(${y * 6}deg) rotateY(${x * 6}deg)`;
  };

  const handleMouseLeave = () => {
    const card = heroCardRef.current;
    if (card) card.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section className="hero-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="hero-copy">
        <span className="eyebrow">Comsats University Islamabad</span>
        <h2 className="hero-title">Creating immersive web experiences, scalable Java systems, and gameplay logic that feels polished.</h2>
        <p className="hero-description">
          I’m Muhammad Ismail — a web developer, Java project engineer, and game developer. I build responsive web products, backend Java applications, and interactive game-ready systems with clean UI, strong performance, and product-first thinking.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="button button-primary">See Projects</a>
          <a href="#contact" className="button button-secondary">Contact Me</a>
          <Link to="/schedule" className="button button-secondary">Schedule</Link>
        </div>
        <SocialLinks />
      </div>

      <div className="hero-sidebar">
        <div className="profile-card glass-card interactive-card">
          <div className="profile-card-tag">Profile</div>
          <div className="profile-frame">
            <img src="/profile.jpg" alt="Muhammad Ismail" className="profile-image" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <p className="profile-copy">Your professional image is the first impression. Add a clear portrait here to personalize this portfolio.</p>
        </div>

        <div className="hero-card glass-card interactive-card" ref={heroCardRef}>
          <div className="hero-card-header">
            <span>Skills</span>
            <strong>Unity · Blender · Java · Full-Stack Web</strong>
          </div>
          <div className="hero-card-body">
            <p>Experience in game systems, 3D asset workflows, Java applications, and polished web products that combine both client and server logic.</p>
            <div className="skill-grid">
              {['Unity', 'Blender', 'Java Dev', 'Frontend + Backend'].map((skill) => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="hero-card-meta">
            <span>Game & interactive design</span>
            <span>Web app architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
