import { useCallback, useState } from 'react';
import PageLoader from '@/components/common/PageLoader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Dashboard from '@/components/home/Dashboard';
import Projects from '@/components/home/Projects';
import Contact from '@/components/home/Contact';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <PageLoader onComplete={handleLoaded} />}
      <div className="page-shell">
        <Header />
        <main className="page-main container">
          <Hero />
          <Dashboard />
          <section className="projects-section" id="projects">
            <div className="section-header">
              <span className="eyebrow">Products</span>
              <h2>Live Project Gallery</h2>
            </div>
            <div className="section-decor">PROJECTS</div>
            <Projects />
          </section>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
