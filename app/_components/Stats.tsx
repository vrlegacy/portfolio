import { STATS } from '@/lib/data';

export default function Stats() {
    return (
        <section className="py-8 bg-[#F3F1EA] dark:bg-[#1C1917]/50 border-b border-[#E7E5E4] dark:border-[#292524]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#E7E5E4] dark:divide-[#292524]">
                    {STATS.map((stat, idx) => (
                        <div key={stat.label} className={`pt-4 md:pt-0 ${idx !== 0 ? 'md:pl-6' : ''}`}>
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#C2410C] dark:text-[#FB923C] tracking-tight font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-[#57534E] dark:text-[#A8A29E] mt-1 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
