import Link from 'next/link';
import ContactSection from '../_components/ContactSection';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Contact | Vishwas Rudramurthy',
    description: 'Get in touch with Vishwas Rudramurthy for engineering opportunities or project collaborations.',
};

export default function ContactPage() {
    return (
        <main className="py-8 min-h-screen bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                    <ArrowLeft size={14} /> Back to Home
                </Link>
            </div>
            <ContactSection />
        </main>
    );
}
