import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState({ text: '', color: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: '', color: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send message');
      setStatus({ text: 'Message sent — I will reply soon.', color: 'var(--accent)' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ text: err.message, color: '#ff6b6b' });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <span className="eyebrow">Get In Touch</span>
        <h2>Reach out for collaborations, product work, and new ideas.</h2>
      </div>
      <div className="contact-grid">
        <div className="glass-card contact-summary">
          <p>
            I build modern web apps, Java software, and game-driven interaction experiences. Open for internships, product work, and development partnerships.
          </p>
          <ul>
            <li>Web development with polished, responsive interfaces</li>
            <li>Java project engineering for backend, desktop, and service systems</li>
            <li>Game development with engaging interaction logic</li>
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--accent)' }}>
            Email:{' '}
            <a href="mailto:MIsmail1571440@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
              MIsmail1571440@gmail.com
            </a>
          </p>
        </div>
        <form className="glass-card contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input type="text" name="name" required placeholder="Your name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={5} required placeholder="Tell me about your next project" value={form.message} onChange={handleChange} />
          </label>
          <button type="submit" className="button button-primary">Send message</button>
          <p className="form-status" style={{ color: status.color }}>{status.text}</p>
        </form>
      </div>
    </section>
  );
}
