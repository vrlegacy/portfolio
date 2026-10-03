'use client';

import parse from 'html-react-parser';
import Link from 'next/link';
import { IProject } from '@/types';
import { ArrowLeft, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

interface Props {
    project: IProject;
}

export default function ProjectDetails({ project }: Props) {
    return (
        <main className="py-12 md:py-20 min-h-screen bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline mb-8"
                >
                    <ArrowLeft size={14} /> Back to Projects
                </Link>

                <div className="border-b border-[#E7E5E4] dark:border-[#292524] pb-8 mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        {project.type && (
                            <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-[#FFEDD5] dark:bg-[#431407] text-[#C2410C] dark:text-[#FB923C] border border-[#FED7AA] dark:border-[#7C2D12]">
                                {project.type}
                            </span>
                        )}
                        <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#F3F1EA] dark:bg-[#292524] text-[#57534E] dark:text-[#A8A29E] border border-[#E7E5E4] dark:border-[#3F3F46] flex items-center gap-1">
                            <Calendar size={12} />
                            {project.year}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-4">
                        {project.title}
                    </h1>

                    <p className="text-lg text-[#57534E] dark:text-[#A8A29E] max-w-3xl leading-relaxed mb-6 font-normal">
                        {project.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium text-xs transition-colors shadow-xs"
                            >
                                <ExternalLink size={14} />
                                Live Demo
                            </a>
                        )}

                        {project.sourceCode && (
                            <a
                                href={project.sourceCode}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#F3F1EA] dark:bg-[#292524] hover:bg-[#E7E5E4] dark:hover:bg-[#3F3F46] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46] font-medium text-xs transition-colors"
                            >
                                <GithubIcon size={14} />
                                {project.sourceCodeBackend ? 'Frontend Repo' : 'GitHub Repository'}
                            </a>
                        )}

                        {project.sourceCodeBackend && (
                            <a
                                href={project.sourceCodeBackend}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#F3F1EA] dark:bg-[#292524] hover:bg-[#E7E5E4] dark:hover:bg-[#3F3F46] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46] font-medium text-xs transition-colors"
                            >
                                <GithubIcon size={14} />
                                Backend Repo
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-[#1C1917] dark:text-[#FAFAF9] mb-3 border-b border-[#E7E5E4] dark:border-[#292524] pb-2">
                                Project Overview
                            </h2>
                            <div className="text-[#57534E] dark:text-[#A8A29E] text-sm leading-relaxed markdown-text">
                                {parse(project.description)}
                            </div>
                        </div>

                        {project.role && (
                            <div className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524]">
                                <h2 className="text-lg font-bold text-[#1C1917] dark:text-[#FAFAF9] mb-3 border-b border-[#E7E5E4] dark:border-[#292524] pb-2">
                                    Engineering Role & Responsibilities
                                </h2>
                                <div className="text-[#57534E] dark:text-[#A8A29E] text-sm leading-relaxed markdown-text">
                                    {parse(project.role)}
                                </div>
                            </div>
                        )}

                        {project.video && (
                            <div>
                                <h2 className="text-xl font-bold text-[#1C1917] dark:text-[#FAFAF9] mb-3">
                                    Demonstration Video
                                </h2>
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#E7E5E4] dark:border-[#292524] bg-black">
                                    <iframe
                                        src={project.video}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="w-full h-full border-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] space-y-4">
                            <h3 className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-sm font-mono uppercase tracking-wider pb-2 border-b border-[#E7E5E4] dark:border-[#292524] flex items-center gap-2">
                                <Code2 size={16} className="text-[#C2410C] dark:text-[#FB923C]" />
                                <span>Technologies</span>
                            </h3>

                            <div className="flex flex-wrap gap-1.5">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-xs font-medium rounded bg-[#F3F1EA] dark:bg-[#292524] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {project.highlight && (
                            <div className="bg-[#FFEDD5]/60 dark:bg-[#431407]/40 p-6 rounded-lg border border-[#FED7AA] dark:border-[#7C2D12]/40 space-y-2">
                                <div className="text-xs font-mono font-bold text-[#C2410C] dark:text-[#FB923C] uppercase">
                                    Key Highlight
                                </div>
                                <div className="text-sm font-semibold text-[#1C1917] dark:text-[#FAFAF9]">
                                    {project.highlight}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
