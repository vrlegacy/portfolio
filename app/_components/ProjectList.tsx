'use client';
import SectionTitle from '@/components/SectionTitle';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef, useState, MouseEvent } from 'react';
import { ExternalLink } from 'lucide-react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectListRef = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pb-section" id="selected-projects">
            <div className="container">
                <SectionTitle title="SELECTED PROJECTS" />

                <div className="group/projects relative" ref={containerRef}>
                    <div
                        className="flex flex-col max-md:gap-10"
                        ref={projectListRef}
                    >
                        {PROJECTS.map((project, index) => (
                            <Project
                                index={index}
                                project={project}
                                key={project.slug}
                            />
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16 flex justify-center">
                        <a
                            href="https://github.com/vrlegacy?tab=repositories"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-anton uppercase tracking-wider border border-border bg-background-light text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                        >
                            <span>See More Projects</span>
                            <ExternalLink className="size-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
