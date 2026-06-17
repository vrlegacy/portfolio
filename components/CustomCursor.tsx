'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { Pointer } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const CustomCursor = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useGSAP((context, contextSafe) => {
        if (window.innerWidth < 768) return;

        const handleMouseMove = contextSafe?.((e: MouseEvent) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = e;

            gsap.to(containerRef.current, {
                x: clientX,
                y: clientY,
                ease: 'power2.out',
                duration: 0.25,
                opacity: 1,
            });
        }) as any;

        const handleMouseOver = contextSafe?.((e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const isClickable = 
                target.closest('a') || 
                target.closest('button') || 
                target.closest('[role="button"]') || 
                target.closest('.cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isClickable) {
                setIsHovering(true);
            }
        }) as any;

        const handleMouseOut = contextSafe?.((e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            const relatedTarget = e.relatedTarget as HTMLElement | null;
            if (relatedTarget) {
                const isClickable = 
                    relatedTarget.closest('a') || 
                    relatedTarget.closest('button') || 
                    relatedTarget.closest('[role="button"]') || 
                    relatedTarget.closest('.cursor-pointer') ||
                    window.getComputedStyle(relatedTarget).cursor === 'pointer';
                
                if (!isClickable) {
                    setIsHovering(false);
                }
            } else {
                setIsHovering(false);
            }
        }) as any;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    });

    return (
        <div
            ref={containerRef}
            className="hidden md:block fixed top-0 left-0 opacity-0 z-[200] pointer-events-none"
            id="cursor"
        >
            {isHovering ? (
                <div className="text-foreground drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] scale-125 transition-transform duration-200">
                    <Pointer size={24} fill="currentColor" className="stroke-background/60" />
                </div>
            ) : (
                <svg
                    width="27"
                    height="30"
                    viewBox="0 0 27 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                >
                    <path
                        d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
                        className="fill-current stroke-background/50"
                    />
                </svg>
            )}
        </div>
    );
};

export default CustomCursor;
