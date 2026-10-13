'use client';

import Link from 'next/link';
import { MY_EXPERIENCE } from '@/lib/data';

export default function ExperienceTimeline() {
  return (
    <section id="experience">
      <h2 className="sh">Work Experience</h2>
      {MY_EXPERIENCE.map((exp) => (
        <article className="entry" key={exp.id}>
          <div className="when">
            {exp.duration}
            <span className="where">{exp.location}</span>
          </div>
          <div>
            <h3>{exp.title}</h3>
            <p className="org">{exp.company}</p>
            <p>{exp.description}</p>
            <ul className="pts">
              {exp.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p className="tech">{exp.skills.join(' · ')}</p>
          </div>
        </article>
      ))}
      <div className="actions more">
        <Link className="btn btn-glass btn-sm" href="/experience">
          View Full Experience
          <svg className="ic" aria-hidden="true">
            <use href="#i-up-right" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
