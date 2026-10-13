'use client';

import { usePathname } from 'next/navigation';
import { GENERAL_INFO, STATS } from '@/lib/data';

export default function Hero() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (pathname === '/' || pathname === '/home') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <section className="hero" id="home">
      <h1>{GENERAL_INFO.name}</h1>
      <p className="role">{GENERAL_INFO.title}</p>
      <div className="contact-line">
        <span>{GENERAL_INFO.location}</span>
        <span className="mono">{GENERAL_INFO.email}</span>
        <a href={GENERAL_INFO.github} target="_blank" rel="noopener noreferrer">
          github.com/vrlegacy
        </a>
        <a href={GENERAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin.com/in/vr26
        </a>
      </div>
      <p className="lead">
        Building scalable web applications, robust APIs, and intelligent AI workflows.
      </p>
      <div className="actions">
        <a
          className="btn btn-primary"
          href="#projects"
          onClick={(e) => handleNavClick(e, 'projects')}
        >
          View Projects
        </a>
        <a
          className="btn btn-glass"
          href="/resume.pdf"
          download="Vishwas_Rudramurthy_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="ic" aria-hidden="true">
            <use href="#i-download" />
          </svg>
          Download Resume
        </a>
      </div>
      <div className="stats">
        {STATS.map((stat, idx) => (
          <div className="stat" key={idx}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
