'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { ProjectStatus } from '@/types';
import { ExternalLink, FileText, ArrowLeft, FolderGit2, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export default function ProjectsPage() {
    const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

    const filteredProjects = selectedStatus === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.status === selectedStatus);

    const counts = {
        all: PROJECTS.length,
        completed: PROJECTS.filter((p) => p.status === 'completed').length,
        ongoing: PROJECTS.filter((p) => p.status === 'ongoing').length,
        planning: PROJECTS.filter((p) => p.status === 'planning').length,
    };

    const getStatusBadge = (status?: ProjectStatus) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Completed
                    </span>
                );
            case 'ongoing':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-[#FFEDD5] dark:bg-[#431407] text-[#C2410C] dark:text-[#FB923C] border border-[#FED7AA] dark:border-[#7C2D12]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] animate-pulse"></span>
                        Ongoing
                    </span>
                );
            case 'planning':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                        In Planning
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <main className="py-12 md:py-20 min-h-screen bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8 pb-8 border-b border-[#E7E5E4] dark:border-[#292524]">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline mb-4"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>

                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-2">
                        <FolderGit2 size={16} />
                        <span>Project Directory</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-3">
                        Software & AI Projects
                    </h1>
                    <p className="text-[#57534E] dark:text-[#A8A29E] text-base max-w-2xl">
                        Filter across completed applications, active ongoing software, and upcoming AI automation workflows in planning.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#E7E5E4] dark:border-[#292524]">
                    <button
                        onClick={() => setSelectedStatus('all')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            selectedStatus === 'all'
                                ? 'bg-[#C2410C] text-white shadow-xs'
                                : 'bg-[#F3F1EA] dark:bg-[#1C1917] text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#292524]'
                        }`}
                    >
                        <span>All Projects</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedStatus === 'all' ? 'bg-white/20 text-white' : 'bg-[#E7E5E4] dark:bg-[#292524]'}`}>
                            {counts.all}
                        </span>
                    </button>

                    <button
                        onClick={() => setSelectedStatus('completed')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            selectedStatus === 'completed'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-[#F3F1EA] dark:bg-[#1C1917] text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#292524]'
                        }`}
                    >
                        <CheckCircle2 size={14} />
                        <span>Completed</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedStatus === 'completed' ? 'bg-white/20 text-white' : 'bg-[#E7E5E4] dark:bg-[#292524]'}`}>
                            {counts.completed}
                        </span>
                    </button>

                    <button
                        onClick={() => setSelectedStatus('ongoing')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            selectedStatus === 'ongoing'
                                ? 'bg-[#C2410C] text-white shadow-xs'
                                : 'bg-[#F3F1EA] dark:bg-[#1C1917] text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#292524]'
                        }`}
                    >
                        <Clock size={14} />
                        <span>Ongoing</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedStatus === 'ongoing' ? 'bg-white/20 text-white' : 'bg-[#E7E5E4] dark:bg-[#292524]'}`}>
                            {counts.ongoing}
                        </span>
                    </button>

                    <button
                        onClick={() => setSelectedStatus('planning')}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            selectedStatus === 'planning'
                                ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-xs'
                                : 'bg-[#F3F1EA] dark:bg-[#1C1917] text-[#57534E] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#292524]'
                        }`}
                    >
                        <Sparkles size={14} />
                        <span>In Planning</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${selectedStatus === 'planning' ? 'bg-white/20 text-white' : 'bg-[#E7E5E4] dark:bg-[#292524]'}`}>
                            {counts.planning}
                        </span>
                    </button>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="py-16 text-center text-[#78716C]">
                        No projects found in this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.slug}
                                className="bg-white dark:bg-[#1C1917] rounded-lg border border-[#E7E5E4] dark:border-[#292524] p-6 flex flex-col justify-between card-hover"
                            >
                                <div>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                        <h2 className="text-xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                                            {project.title}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(project.status)}
                                            {project.type && (
                                                <span className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-full bg-[#F3F1EA] dark:bg-[#292524] text-[#57534E] dark:text-[#A8A29E] border border-[#E7E5E4] dark:border-[#3F3F46]">
                                                    {project.type}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mb-4 leading-relaxed font-normal">
                                        {project.summary}
                                    </p>

                                    {project.highlight && (
                                        <div className="mb-4 text-xs font-medium text-[#C2410C] dark:text-[#FB923C] flex items-center gap-1.5 bg-[#FFEDD5]/60 dark:bg-[#431407]/40 px-3 py-1.5 rounded border border-[#FED7AA] dark:border-[#7C2D12]/40">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] dark:bg-[#FB923C]"></span>
                                            <span>Highlight: {project.highlight}</span>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <div className="text-[11px] font-mono text-[#78716C] dark:text-[#A8A29E] uppercase tracking-wider mb-2">
                                            Tech Stack
                                        </div>
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
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E7E5E4] dark:border-[#292524]">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-medium transition-colors"
                                        >
                                            <ExternalLink size={13} />
                                            Live Demo
                                        </a>
                                    )}

                                    {project.sourceCode && (
                                        <a
                                            href={project.sourceCode}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F3F1EA] dark:bg-[#292524] hover:bg-[#E7E5E4] dark:hover:bg-[#3F3F46] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46] text-xs font-medium transition-colors"
                                        >
                                            <GithubIcon size={13} />
                                            GitHub
                                        </a>
                                    )}

                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[#57534E] dark:text-[#A8A29E] hover:text-[#C2410C] dark:hover:text-[#FB923C] text-xs font-medium transition-colors ml-auto"
                                    >
                                        <FileText size={13} />
                                        Case Study
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
