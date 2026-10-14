'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavCat from '@/components/NavCat';

const SECTIONS = [
  { id: 'home', label: 'Home', icon: '#i-home' },
  { id: 'about', label: 'About', icon: '#i-user' },
  { id: 'skills', label: 'Skills', icon: '#i-layers' },
  { id: 'experience', label: 'Experience', icon: '#i-briefcase' },
  { id: 'projects', label: 'Projects', icon: '#i-folder' },
  { id: 'resume', label: 'Resume', icon: '#i-doc' },
  { id: 'contact', label: 'Contact', icon: '#i-mail' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [currentSec, setCurrentSec] = useState(SECTIONS[0]);
  const [state, setState] = useState<'open' | 'compact' | 'alert'>('open');
  const [isAlerting, setIsAlerting] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(true);

  const measureRef = useRef<HTMLSpanElement>(null);
  const islandRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const lastYRef = useRef(0);
  const alertTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Measure text width and update pill width variable --wc
  const fit = useCallback((textLabel: string) => {
    if (!measureRef.current || !islandRef.current) return;
    measureRef.current.textContent = textLabel;
    const tw = measureRef.current.getBoundingClientRect().width;
    const catW = 36;
    const w = Math.ceil(7 + 34 + 10 + (isAlerting ? 16 : 7) + 8 + tw + 10 + catW + 8 + 6);
    islandRef.current.style.setProperty('--wc', Math.max(140, w) + 'px');
  }, [isAlerting]);

  // Compute island open/compact state
  useEffect(() => {
    if (isAlerting) {
      setState('alert');
    } else if (hovered || focused || pinned || scrollOpen) {
      setState('open');
    } else {
      setState('compact');
    }
  }, [isAlerting, hovered, focused, pinned, scrollOpen]);

  // Update pill fit when section or alert changes
  useEffect(() => {
    fit(isAlerting ? alertMsg : currentSec.label);
  }, [currentSec, isAlerting, alertMsg, fit]);

  // Listen for scroll to handle collapsible pill behavior
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const d = y - lastYRef.current;
      if (y < 48) {
        setScrollOpen(true);
      } else if (d < -6) {
        setScrollOpen(true);
      } else if (d > 6) {
        setScrollOpen(false);
        setPinned(false);
      }
      lastYRef.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for main page sections
  useEffect(() => {
    if (pathname !== '/' && pathname !== '/home') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = SECTIONS.find((s) => s.id === entry.target.id);
            if (matched) setCurrentSec(matched);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Global event listener for custom dynamic island notifications (e.g. email copy)
  useEffect(() => {
    const handleNotify = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const msg = customEvent.detail || 'Copied';
      setAlertMsg(msg);
      setIsAlerting(true);
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
      alertTimerRef.current = setTimeout(() => {
        setIsAlerting(false);
      }, 2400);
    };

    window.addEventListener('island-notify', handleNotify);
    return () => {
      window.removeEventListener('island-notify', handleNotify);
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, []);

  // Handle glass spotlight hover movement
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const g = target?.closest ? (target.closest('.btn-glass, .btn-primary, .island') as HTMLElement) : null;
      if (!g) return;
      const r = g.getBoundingClientRect();
      g.style.setProperty('--mx', `${e.clientX - r.left}px`);
      g.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const toggleOpen = () => {
    if (state === 'open') {
      setPinned(false);
      setHovered(false);
      setFocused(false);
      setScrollOpen((window.scrollY || 0) < 48);
    } else {
      setPinned(true);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sec: typeof SECTIONS[0]) => {
    e.preventDefault();
    setCurrentSec(sec);
    if (pathname === '/' || pathname === '/home') {
      const el = document.getElementById(sec.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sec.id}`);
      }
    } else {
      window.location.href = `/#${sec.id}`;
    }
  };

  return (
    <header
      ref={islandRef}
      className="island"
      id="island"
      data-state={state}
      data-alert={isAlerting ? 'true' : 'false'}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setHovered(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!islandRef.current?.contains(e.relatedTarget as Node)) {
          setFocused(false);
        }
      }}
    >
      <div className="isl-row">
        <button
          className="isl-toggle"
          id="islandBtn"
          type="button"
          aria-expanded={state === 'open'}
          aria-label="Toggle navigation"
          onClick={toggleOpen}
        >
          <span className="isl-avatar" aria-hidden="true">
            VR
          </span>
          <span className="isl-label">
            <i className="isl-dot" id="islandDot"></i>
            <svg className="ic isl-check" aria-hidden="true">
              <use href="#i-check" />
            </svg>
            <span className="isl-text" id="islandText">
              <span className="t">{isAlerting ? alertMsg : currentSec.label}</span>
            </span>
          </span>
        </button>

        <nav ref={navRef} className="isl-nav" aria-label="Sections">
          {SECTIONS.map((sec) => {
            const isActive = currentSec.id === sec.id;
            return (
              <a
                key={sec.id}
                className="isl-item"
                data-sec={sec.id}
                href={`#${sec.id}`}
                title={sec.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, sec)}
              >
                <svg className="ic" aria-hidden="true">
                  <use href={sec.icon} />
                </svg>
                <span className="lbl">{sec.label}</span>
              </a>
            );
          })}
        </nav>

        <span ref={measureRef} className="isl-measure" id="islandMeasure" aria-hidden="true"></span>
        <NavCat islandRef={islandRef} />
      </div>
    </header>
  );
}
