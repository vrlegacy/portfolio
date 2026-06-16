import { GENERAL_INFO } from '@/lib/data';
import Link from 'next/link';
import React from 'react';

const StickyEmail = () => {
    return (
        <div className="max-xl:hidden fixed bottom-32 left-0 block">
            <a
                href={`mailto:${GENERAL_INFO.email}`}
                className="px-3 text-muted-foreground tracking-[1px] transition-all !bg-bottom hover:text-foreground hover:!bg-center"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                }}
            >
                {GENERAL_INFO.email}
            </a>
            {/* Play Chess link placed just below the email */}
            <Link
                href="/chess"
                className="px-3 block mt-6 text-white hover:text-primary transition-all no-underline hover:underline tracking-[1.5px] font-sans font-semibold uppercase text-xs"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                }}
            >
                Play Chess
            </Link>
        </div>
    );
};

export default StickyEmail;
