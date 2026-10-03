'use client';

import { useState } from 'react';
import { GENERAL_INFO } from '@/lib/data';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function ContactSection() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('access_key', GENERAL_INFO.web3formsAccessKey);

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Network error. Please try sending directly via email.');
        }
    };

    return (
        <section id="contact" className="py-16 md:py-20 bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                    <Mail size={16} />
                    <span>07. Get In Touch</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-2">
                    Contact & Collaboration
                </h2>
                <p className="text-sm text-[#78716C] dark:text-[#A8A29E] mb-8 max-w-xl">
                    Have a project in mind, an engineering role, or a technical inquiry? Send a message below or email directly.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] space-y-4">
                            <h3 className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-base border-b border-[#E7E5E4] dark:border-[#292524] pb-2">
                                Direct Contact
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-mono uppercase">Email</div>
                                    <a
                                        href={`mailto:${GENERAL_INFO.email}`}
                                        className="font-medium text-[#C2410C] dark:text-[#FB923C] hover:underline"
                                    >
                                        {GENERAL_INFO.email}
                                    </a>
                                </div>

                                <div>
                                    <div className="text-xs text-[#78716C] dark:text-[#A8A29E] font-mono uppercase">Location</div>
                                    <div className="font-medium text-[#1C1917] dark:text-[#FAFAF9] flex items-center gap-1 mt-0.5">
                                        <MapPin size={14} className="text-[#C2410C]" />
                                        {GENERAL_INFO.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] space-y-3">
                            <h3 className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-sm font-mono uppercase">
                                Social Profiles
                            </h3>
                            <div className="flex flex-col space-y-2 text-sm">
                                <a
                                    href={GENERAL_INFO.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors"
                                >
                                    <GithubIcon size={16} />
                                    <span>github.com/vrlegacy</span>
                                </a>
                                <a
                                    href={GENERAL_INFO.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors"
                                >
                                    <LinkedinIcon size={16} />
                                    <span>linkedin.com/in/vr26</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-lg border border-[#E7E5E4] dark:border-[#292524]">
                        {status === 'success' ? (
                            <div className="py-12 text-center space-y-3">
                                <CheckCircle2 size={48} className="text-green-600 mx-auto" />
                                <h3 className="text-xl font-bold text-[#1C1917] dark:text-[#FAFAF9]">
                                    Message Delivered!
                                </h3>
                                <p className="text-sm text-[#57534E] dark:text-[#A8A29E] max-w-md mx-auto">
                                    Thank you for reaching out. I will review your message and respond promptly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-4 px-4 py-2 text-xs font-semibold text-[#C2410C] border border-[#C2410C] rounded-md hover:bg-[#FFEDD5] transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-semibold uppercase text-[#57534E] dark:text-[#A8A29E] mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Jane Doe"
                                            className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E5E4] dark:border-[#3F3F46] bg-[#FAFAF7] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold uppercase text-[#57534E] dark:text-[#A8A29E] mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="jane@example.com"
                                            className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E5E4] dark:border-[#3F3F46] bg-[#FAFAF7] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-semibold uppercase text-[#57534E] dark:text-[#A8A29E] mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder="Project Collaboration / Inquiries"
                                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E5E4] dark:border-[#3F3F46] bg-[#FAFAF7] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-semibold uppercase text-[#57534E] dark:text-[#A8A29E] mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Hello Vishwas, I would like to discuss..."
                                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E7E5E4] dark:border-[#3F3F46] bg-[#FAFAF7] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9] text-sm focus:outline-none focus:ring-2 focus:ring-[#C2410C] resize-y"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded border border-red-200">
                                        <AlertCircle size={16} />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium text-sm transition-colors disabled:opacity-50"
                                >
                                    {status === 'submitting' ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
