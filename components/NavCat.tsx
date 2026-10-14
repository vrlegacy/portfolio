'use client';

import { useState, useEffect, useRef, useId, useCallback } from 'react';

interface NavCatProps {
  islandRef?: React.RefObject<HTMLElement | null>;
}

type CatPose = 'sleeping' | 'walking' | 'running' | 'standing';

export default function NavCat({ islandRef }: NavCatProps) {
  const [pose, setPose] = useState<CatPose>('sleeping');
  const [dir, setDir] = useState<'right' | 'left'>('left');
  const [walkDuration, setWalkDuration] = useState(0.42);
  const [prowlX, setProwlX] = useState(0);
  const [prowlTransition, setProwlTransition] = useState('transform 0.4s ease');

  const uid = useId().replace(/:/g, '');
  const lbId = `cat-lb-${uid}`;
  const lhId = `cat-lh-${uid}`;
  const stId = `cat-st-${uid}`;
  const shId = `cat-sh-${uid}`;

  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTenSecTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prowlTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const runUntilRef = useRef(0);
  const isProwlingRef = useRef(false);
  const prowlXRef = useRef(0);

  // Helper to clear all timeouts in the prowl sequence
  const clearProwlChain = useCallback(() => {
    prowlTimeoutsRef.current.forEach(clearTimeout);
    prowlTimeoutsRef.current = [];
    isProwlingRef.current = false;
  }, []);

  // Update ref whenever state changes
  useEffect(() => {
    prowlXRef.current = prowlX;
  }, [prowlX]);

  // Prowl across the navbar like a tiger in the forest
  const startProwl = useCallback(() => {
    clearProwlChain();
    isProwlingRef.current = true;

    // Calculate maximum available wander distance
    const islandEl = islandRef?.current || document.getElementById('island');
    const islandWidth = islandEl ? islandEl.offsetWidth : 700;
    // Keep within navbar bounds: from 0 (slot) to -(islandWidth - 85)
    const maxDistance = Math.max(70, islandWidth - 85);
    const minX = -maxDistance;

    // Phase 1: Cat wakes up, stands on the ledge, tail wags, looking around
    setPose('standing');
    setDir('left');

    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      prowlTimeoutsRef.current.push(id);
      return id;
    };

    // Stalking walk speed in px/sec (~65px/s = steady, stealthy feline pace)
    const SPEED = 65;

    // Step 1: Wakes up and prowls deep into the navbar
    addTimeout(() => {
      if (!isProwlingRef.current) return;
      // First waypoint: roughly 35% - 55% across the navbar
      const target1 = Math.round(minX * (0.35 + Math.random() * 0.2));
      const dist1 = Math.abs(target1 - prowlXRef.current);
      const time1 = Math.max(1.5, Number((dist1 / SPEED).toFixed(2)));

      setDir('left');
      setPose('walking');
      setWalkDuration(0.42);
      setProwlTransition(`transform ${time1}s cubic-bezier(0.25, 0.1, 0.25, 1)`);
      setProwlX(target1);

      // Step 2: Reached Waypoint 1 -> Pause, investigate, look around
      addTimeout(() => {
        if (!isProwlingRef.current) return;
        setPose('standing');

        // Step 3: Stalk further left towards the avatar (70% - 92% across)
        addTimeout(() => {
          if (!isProwlingRef.current) return;
          const target2 = Math.round(minX * (0.7 + Math.random() * 0.22));
          const dist2 = Math.abs(target2 - prowlXRef.current);
          const time2 = Math.max(1.4, Number((dist2 / SPEED).toFixed(2)));

          setDir('left');
          setPose('walking');
          setProwlTransition(`transform ${time2}s cubic-bezier(0.25, 0.1, 0.25, 1)`);
          setProwlX(target2);

          // Step 4: Reached Waypoint 2 -> Pause and survey the territory
          addTimeout(() => {
            if (!isProwlingRef.current) return;
            setPose('standing');

            // Step 5: Turn around to face home, pause for a moment
            addTimeout(() => {
              if (!isProwlingRef.current) return;
              setDir('right');

              // Step 6: Walk halfway back or make a brief midway stop
              addTimeout(() => {
                if (!isProwlingRef.current) return;
                const target3 = Math.round(minX * 0.25);
                const dist3 = Math.abs(target3 - prowlXRef.current);
                const time3 = Math.max(1.5, Number((dist3 / SPEED).toFixed(2)));

                setDir('right');
                setPose('walking');
                setProwlTransition(`transform ${time3}s cubic-bezier(0.25, 0.1, 0.25, 1)`);
                setProwlX(target3);

                // Step 7: Midway pause
                addTimeout(() => {
                  if (!isProwlingRef.current) return;
                  setPose('standing');

                  // Step 8: Walk all the way back to home ledge (x = 0)
                  addTimeout(() => {
                    if (!isProwlingRef.current) return;
                    const distHome = Math.abs(0 - prowlXRef.current);
                    const timeHome = Math.max(1.2, Number((distHome / SPEED).toFixed(2)));

                    setDir('right');
                    setPose('walking');
                    setProwlTransition(`transform ${timeHome}s cubic-bezier(0.25, 0.1, 0.25, 1)`);
                    setProwlX(0);

                    // Step 9: Reached home ledge -> turn back to left and curl up to sleep!
                    addTimeout(() => {
                      if (!isProwlingRef.current) return;
                      setDir('left');
                      setPose('standing');

                      addTimeout(() => {
                        if (!isProwlingRef.current) return;
                        setPose('sleeping');
                        isProwlingRef.current = false;

                        // Start next 10-second sleep countdown
                        scheduleTenSecTimer();
                      }, 400);
                    }, Math.round(timeHome * 1000));
                  }, 1800);
                }, Math.round(time3 * 1000));
              }, 400);
            }, 1800);
          }, Math.round(time2 * 1000));
        }, 1800);
      }, Math.round(time1 * 1000));
    }, 800);
  }, [islandRef, clearProwlChain]);

  // Schedule the 10-second idle countdown for wandering
  const scheduleTenSecTimer = useCallback(() => {
    if (sleepTenSecTimerRef.current) clearTimeout(sleepTenSecTimerRef.current);
    sleepTenSecTimerRef.current = setTimeout(() => {
      startProwl();
    }, 10000); // 10 seconds of peaceful sleep
  }, [startProwl]);

  // Scroll listener: interrupts wandering immediately, responds to scroll speed & direction
  useEffect(() => {
    lastYRef.current = window.scrollY || 0;
    lastTimeRef.current = performance.now();

    // Start initial 10s timer
    scheduleTenSecTimer();

    const RUN_V = 0.6;
    const SLEEP_MS = 450;

    const handleScroll = () => {
      const now = performance.now();
      const y = window.scrollY || 0;
      const dy = y - lastYRef.current;
      const dt = Math.max(1, now - lastTimeRef.current);

      if (Math.abs(dy) >= 1) {
        // Cancel any active prowling and reset 10s timer
        clearProwlChain();
        if (sleepTenSecTimerRef.current) clearTimeout(sleepTenSecTimerRef.current);

        // If cat was away from home slot, smoothly glide it back home
        if (prowlXRef.current !== 0) {
          setProwlTransition('transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)');
          setProwlX(0);
        }

        const currentDir = dy > 0 ? 'right' : 'left';
        setDir(currentDir);

        const velocity = Math.abs(dy) / dt;

        if (velocity >= RUN_V) {
          runUntilRef.current = now + 600;
        }

        if (velocity >= RUN_V || now < runUntilRef.current) {
          setPose('running');
          const clampedDur = Math.min(0.2, Math.max(0.11, 0.26 / (1 + velocity)));
          setWalkDuration(Number(clampedDur.toFixed(2)));
        } else {
          setPose('walking');
          const clampedDur = Math.min(0.55, Math.max(0.2, 0.42 / (1 + velocity * 1.5)));
          setWalkDuration(Number(clampedDur.toFixed(2)));
        }

        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          setPose('sleeping');
          setDir('left');
          // Reset prowl timer to trigger 10 seconds from now
          scheduleTenSecTimer();
        }, SLEEP_MS);
      }

      lastYRef.current = y;
      lastTimeRef.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (sleepTenSecTimerRef.current) clearTimeout(sleepTenSecTimerRef.current);
      clearProwlChain();
    };
  }, [clearProwlChain, scheduleTenSecTimer]);

  // Click on cat: wakes it up, or if clicked while sleeping, initiates prowling / walking immediately!
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pose === 'sleeping') {
      // User tapped sleeping cat -> wake it up immediately to go explore!
      startProwl();
    } else if (pose === 'standing') {
      setPose('walking');
    } else if (pose === 'walking') {
      setPose('running');
      setWalkDuration(0.16);
    } else {
      clearProwlChain();
      setProwlTransition('transform 0.4s ease');
      setProwlX(0);
      setPose('sleeping');
      setDir('left');
      scheduleTenSecTimer();
    }
  };

  // Art faces left; an awake cat faces the scroll/walk direction, a sleeping cat turns back to face left.
  const flip = pose !== 'sleeping' && dir === 'right' ? -1 : 1;

  return (
    <div
      className="cat-slot"
      title="Tuxedo Cat (Sleeps, wanders across navbar every 10s, reacts to scroll)"
    >
      <div
        className="cat-prowler"
        style={{
          transform: `translateX(${prowlX}px)`,
          transition: prowlTransition,
        }}
        onClick={handleClick}
      >
        <div
          className={`nav-cat-anchor is-${pose}`}
          style={{
            transform: `scaleX(${flip})`,
            ['--cat-walk-speed' as string]: `${walkDuration}s`,
          }}
          aria-hidden="true"
        >
          <svg
            className="nav-cat-svg"
            viewBox="0 0 72 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id={lbId}>
                <path d="M 14 34 C 14 22, 26 14, 40 15 C 54 16, 62 24, 62 34 Z" />
              </clipPath>
              <clipPath id={lhId}>
                <ellipse cx="17" cy="27" rx="10" ry="7" />
              </clipPath>
              <clipPath id={stId}>
                <ellipse cx="40" cy="21" rx="18" ry="8.5" />
              </clipPath>
              <clipPath id={shId}>
                <ellipse cx="19" cy="16" rx="8.5" ry="7.5" />
              </clipPath>
            </defs>

            {/* ---- sleeping pose: curled loaf, head on the ledge, tail hanging ---- */}
            <g className="cat-lie">
              <path
                d="M 60 29 C 66 29, 67.5 33, 66.5 37.5 C 66 40.5, 64.5 42, 62 42"
                stroke="#15151b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g className="lie-loaf">
                <path
                  d="M 14 34 C 14 22, 26 14, 40 15 C 54 16, 62 24, 62 34 Z"
                  fill="#15151b"
                  stroke="rgba(255,255,255,.3)"
                  strokeWidth=".7"
                />
              </g>
              <ellipse
                cx="17"
                cy="27"
                rx="10"
                ry="7"
                fill="#15151b"
                stroke="rgba(255,255,255,.3)"
                strokeWidth=".7"
              />
              <g clipPath={`url(#${lhId})`}>
                <path d="M 17 20 L 18.8 26 L 15.2 26 Z" fill="#f5f3ef" />
              </g>
              <ellipse cx="25.5" cy="32.6" rx="4" ry="1.6" fill="#f5f3ef" />
              <polygon
                points="8.8,22 9.6,12 16.6,19"
                fill="#15151b"
                stroke="rgba(255,255,255,.3)"
                strokeWidth=".7"
              />
              <polygon points="10.6,20 11.2,14.6 15,18.6" fill="#ff9ebd" />
              <polygon
                points="17.4,19 24.4,12 25.2,22"
                fill="#15151b"
                stroke="rgba(255,255,255,.3)"
                strokeWidth=".7"
              />
              <polygon points="19,18.6 22.8,14.6 23.4,20" fill="#ff9ebd" />
              <ellipse cx="17" cy="31.2" rx="4.6" ry="2.8" fill="#f5f3ef" />
              <path
                d="M 11.4 27 q 2.2 2.6 4.4 0 M 18.2 27 q 2.2 2.6 4.4 0"
                stroke="#8a8a99"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <polygon points="17,30.4 15.9,29.2 18.1,29.2" fill="#ff9ebd" />
              <path
                d="M 15.2 31.4 q 1 1.2 1.8 0 q .8 1.2 1.8 0"
                stroke="#8a8a99"
                strokeWidth=".6"
                strokeLinecap="round"
              />
              <path
                d="M 8.4 30 l -6.4 -1.2 M 8.6 31.6 l -6.6 1.6"
                stroke="rgba(255,255,255,.7)"
                strokeWidth=".5"
                strokeLinecap="round"
              />
              <text className="z z1" x="24" y="14" fontSize="11">
                z
              </text>
              <text className="z z2" x="30" y="9" fontSize="13">
                z
              </text>
              <text className="z z3" x="36" y="4" fontSize="16">
                Z
              </text>
            </g>

            {/* ---- standing pose: used for walking, running, and paused surveying ---- */}
            <g className="cat-stand">
              <g className="stand-tail">
                <path
                  d="M 57 21 C 64 20, 67 14, 64 9 C 63 7, 60.5 8, 61.5 10.5"
                  stroke="#15151b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
              {/* back legs */}
              <g className="leg leg-b" style={{ transformOrigin: '33px 25px' }}>
                <path d="M 33 25 L 33 32" stroke="#0e0e13" strokeWidth="3.8" strokeLinecap="round" />
              </g>
              <g className="leg leg-a" style={{ transformOrigin: '47px 25px' }}>
                <path d="M 47 25 L 47 32" stroke="#0e0e13" strokeWidth="3.8" strokeLinecap="round" />
              </g>
              <g className="cat-bob">
                <g className="cat-torso">
                  <ellipse
                    cx="40"
                    cy="21"
                    rx="18"
                    ry="8.5"
                    fill="#15151b"
                    stroke="rgba(255,255,255,.3)"
                    strokeWidth=".7"
                  />
                  <g clipPath={`url(#${stId})`}>
                    <ellipse cx="25" cy="25" rx="4.5" ry="5.5" fill="#f5f3ef" />
                  </g>
                </g>
                <ellipse
                  cx="19"
                  cy="16"
                  rx="8.5"
                  ry="7.5"
                  fill="#15151b"
                  stroke="rgba(255,255,255,.3)"
                  strokeWidth=".7"
                />
                <g clipPath={`url(#${shId})`}>
                  <path d="M 19 9.5 L 20.6 16 L 17.4 16 Z" fill="#f5f3ef" />
                </g>
                <polygon
                  points="12.5,11 13.2,3 19,8.8"
                  fill="#15151b"
                  stroke="rgba(255,255,255,.3)"
                  strokeWidth=".7"
                />
                <polygon points="14,9.8 14.4,5.6 17.4,8.8" fill="#ff9ebd" />
                <polygon
                  points="19,8.8 24.8,3 25.5,11"
                  fill="#15151b"
                  stroke="rgba(255,255,255,.3)"
                  strokeWidth=".7"
                />
                <polygon points="20.6,8.8 23.6,5.6 24,9.8" fill="#ff9ebd" />
                <ellipse cx="19" cy="20.2" rx="3.6" ry="2.2" fill="#f5f3ef" />
                <g className="cat-eyes-open">
                  <ellipse cx="15.6" cy="15.5" rx="1.5" ry="2" fill="#7fd957" />
                  <ellipse cx="15.7" cy="15.5" rx="0.5" ry="1.6" fill="#0b0b10" />
                  <ellipse cx="22.4" cy="15.5" rx="1.5" ry="2" fill="#7fd957" />
                  <ellipse cx="22.5" cy="15.5" rx="0.5" ry="1.6" fill="#0b0b10" />
                </g>
                <polygon points="19,19.6 18,18.4 20,18.4" fill="#ff9ebd" />
                <path
                  d="M 12 19.6 l -5 -1 M 12 20.8 l -5 1.2 M 26 19.6 l 5 -1 M 26 20.8 l 5 1.2"
                  stroke="rgba(255,255,255,.7)"
                  strokeWidth=".5"
                  strokeLinecap="round"
                />
              </g>
              {/* near legs with white paws */}
              <g className="leg leg-a" style={{ transformOrigin: '28px 25px' }}>
                <path d="M 28 25 L 28 32" stroke="#15151b" strokeWidth="3.8" strokeLinecap="round" />
                <path d="M 28 29.4 L 28 32" stroke="#f5f3ef" strokeWidth="3.8" strokeLinecap="round" />
              </g>
              <g className="leg leg-b" style={{ transformOrigin: '52px 25px' }}>
                <path d="M 52 25 L 52 32" stroke="#15151b" strokeWidth="3.8" strokeLinecap="round" />
                <path d="M 52 29.4 L 52 32" stroke="#f5f3ef" strokeWidth="3.8" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
