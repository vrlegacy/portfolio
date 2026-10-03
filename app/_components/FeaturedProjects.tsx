import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { FolderGit2, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export default function FeaturedProjects() {
    const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

    return (
        <section id="projects" className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#F3F1EA] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                            <FolderGit2 size={16} />
                            <span>04. Portfolio Showcase</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                            Featured Projects
                        </h2>
                    </div>

                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline"
                    >
                        View All Projects <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <div
                            key={project.slug}
                            className="bg-white dark:bg-[#1C1917] rounded-lg border border-[#E7E5E4] dark:border-[#292524] p-6 flex flex-col justify-between card-hover"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h3 className="text-xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                                        {project.title}
                                    </h3>
                                    {project.type && (
                                        <span className="px-2.5 py-0.5 text-[11px] font-medium font-mono rounded-full bg-[#FFEDD5] dark:bg-[#431407] text-[#C2410C] dark:text-[#FB923C] border border-[#FED7AA] dark:border-[#7C2D12] shrink-0">
                                            {project.type}
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mb-4 leading-relaxed font-normal">
                                    {project.summary}
                                </p>

                                {project.highlight && (
                                    <div className="mb-4 text-xs font-medium text-[#C2410C] dark:text-[#FB923C] flex items-center gap-1.5 bg-[#FFEDD5]/60 dark:bg-[#431407]/40 px-3 py-1.5 rounded border border-[#FED7AA] dark:border-[#7C2D12]/40">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] dark:bg-[#FB923C]"></span>
                                        <span>Impact: {project.highlight}</span>
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
            </div>
        </section>
    );
}
