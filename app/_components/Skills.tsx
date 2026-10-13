'use client';

import { SKILL_CATEGORIES } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills">
      <h2 className="sh">Skills &amp; Technologies</h2>
      <dl className="dl">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <dt>{cat.title}</dt>
            <dd>{cat.skills.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
