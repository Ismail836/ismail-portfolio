import ThemeToggle from '@/components/common/ThemeToggle';

export default function Header({ backLink, title, eyebrow = 'Muhammad Ismail', subtitle }) {
  return (
    <header className="page-header container">
      {backLink || (
        <div className="brand-wrap">
          <span className="brand-mark">MI</span>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{subtitle || 'Web Developer • Java Project Developer • Game Developer'}</h1>
          </div>
        </div>
      )}
      {title && (
        <div className="schedule-header-main" style={{ gridColumn: backLink ? '2' : undefined }}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
        </div>
      )}
      <ThemeToggle />
    </header>
  );
}
