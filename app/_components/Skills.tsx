import { SKILL_CATEGORIES } from '@/lib/data';
import { Wrench } from 'lucide-react';

export default function Skills() {
    return (
        <section id="skills" className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#F3F1EA] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                    <Wrench size={16} />
                    <span>02. Technical Capabilities</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-8">
                    Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILL_CATEGORIES.map((category) => (
                        <div
                            key={category.title}
                            className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] card-hover"
                        >
                            <h3 className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-base mb-4 pb-2 border-b border-[#E7E5E4] dark:border-[#292524] flex items-center justify-between">
                                <span>{category.title}</span>
                                <span className="text-xs font-mono text-[#C2410C] dark:text-[#FB923C] font-normal">
                                    {category.skills.length} skills
                                </span>
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 text-xs font-medium rounded-md bg-[#F3F1EA] dark:bg-[#292524] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46] hover:border-[#C2410C] dark:hover:border-[#FB923C] hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
