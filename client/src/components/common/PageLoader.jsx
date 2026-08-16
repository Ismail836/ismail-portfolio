import { useCallback, useEffect, useRef, useState } from 'react';

const DURATION_MS = 2200;
const TICK_MS = 40;
const FAILSAFE_MS = 4000;

export default function PageLoader({ onComplete }) {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setVisible(false);
    onCompleteRef.current?.();
    if (window.gsap?.from) {
      window.gsap.from('.page-header, .hero-title, .hero-card, .section-header, .project-card, .contact-grid, .dashboard-card', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }
  }, []);

  const hideLoader = useCallback(() => {
    const el = document.getElementById('pageLoader');
    if (window.gsap?.to && el) {
      window.gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        onComplete: finish,
      });
      return;
    }
    finish();
  }, [finish]);

  useEffect(() => {
    const started = performance.now();
    let tickId;
    let fadeId;
    let failsafeId;

    const runTick = () => {
      const elapsed = performance.now() - started;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setValue(pct);

      if (pct >= 100) {
        fadeId = setTimeout(hideLoader, 150);
        return;
      }
      tickId = setTimeout(runTick, TICK_MS);
    };

    tickId = setTimeout(runTick, TICK_MS);
    failsafeId = setTimeout(() => {
      setValue(100);
      hideLoader();
    }, FAILSAFE_MS);

    return () => {
      clearTimeout(tickId);
      clearTimeout(fadeId);
      clearTimeout(failsafeId);
    };
  }, [hideLoader]);

  if (!visible) return null;

  return (
    <div id="pageLoader" className="page-loader" aria-hidden={value >= 100}>
      <div className="loader-content">
        <span>LOADING</span>
        <span>{value}%</span>
      </div>
    </div>
  );
}
