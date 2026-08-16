import { uid } from '@/lib/schedule';

export default function BucketList({ bucket, onChange }) {
  const done = bucket.filter((b) => b.done).length;
  const total = bucket.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const toggle = (id, checked) => {
    onChange(bucket.map((b) => (b.id === id ? { ...b, done: checked } : b)));
  };

  const remove = (id) => onChange(bucket.filter((b) => b.id !== id));

  const add = () => {
    const text = window.prompt('Something you want to do at least once in life:');
    if (!text?.trim()) return;
    onChange([...bucket, { id: uid(), text: text.trim(), done: false }]);
  };

  return (
    <section className="schedule-panel is-active">
      <div className="panel-toolbar panel-toolbar--split">
        <div>
          <h2>Bucket list</h2>
          <p className="panel-hint">Things to do at least once in life</p>
        </div>
        <button type="button" className="button button-primary btn-sm" onClick={add}>+ Add dream</button>
      </div>

      <div className="bucket-progress glass-card">
        <div className="bucket-progress-meta">
          <span>{done} / {total} completed</span>
          <strong>{pct}%</strong>
        </div>
        <div className="progress-bar progress-bar--lg">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="bucket-list">
        {bucket.map((item) => (
          <li key={item.id} className={`bucket-item${item.done ? ' is-done' : ''}`}>
            <input
              type="checkbox"
              className="bucket-check"
              checked={item.done}
              onChange={(e) => toggle(item.id, e.target.checked)}
              aria-label="Mark complete"
            />
            <span className="bucket-text">{item.text}</span>
            <button type="button" className="bucket-delete" onClick={() => remove(item.id)} title="Remove">×</button>
          </li>
        ))}
      </ul>

      {total === 0 && (
        <p className="bucket-empty is-visible">
          Add your first life goal — travel, create, experience something unforgettable.
        </p>
      )}
    </section>
  );
}
