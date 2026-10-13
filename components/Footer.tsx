'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
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
    <footer className="foot">
      <p>
        <b style={{ color: 'var(--fg)' }}>Vishwas Rudramurthy</b> · FullStack and AI Developer · Bengaluru, India
      </p>
      <p>Building high-performance APIs, web platforms, and automated AI workflows.</p>
      <nav aria-label="Footer">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
        <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
        <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
        <a href="#resume" onClick={(e) => handleNavClick(e, 'resume')}>Resume</a>
        <a href="/interactive">Interactive Resume</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
      </nav>
      <div className="legal">
        <span>© {new Date().getFullYear()} Vishwas Rudramurthy. All rights reserved.</span>
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Back to top</a>
      </div>
    </footer>
  );
}
