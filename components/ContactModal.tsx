'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { useContactModal } from '@/components/ContactModalContext';
import { GENERAL_INFO } from '@/lib/data';
import Button from '@/components/Button';

const ContactModal = () => {
    const { isOpen, closeContactModal } = useContactModal();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [success, setSuccess] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setMessage('');
            setEmailError('');
            setMessageError('');
            setSubmitError('');
            setSuccess(false);
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isSubmitting) {
                closeContactModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isSubmitting, closeContactModal]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let hasError = false;
        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email address');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!message.trim()) {
            setMessageError('Message is required');
            hasError = true;
        } else {
            setMessageError('');
        }

        if (hasError) return;

        setIsSubmitting(true);
        setSubmitError('');

        const isMockMode = 
            !GENERAL_INFO.web3formsAccessKey || 
            GENERAL_INFO.web3formsAccessKey === 'YOUR_WEB3FORMS_ACCESS_KEY';

        if (isMockMode) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccess(true);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: GENERAL_INFO.web3formsAccessKey,
                    email: email,
                    message: message,
                    subject: 'New Portfolio Contact Submission',
                    from_name: 'Portfolio Contact Form',
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSuccess(true);
            } else {
                setSubmitError(result.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setSubmitError('Failed to send message. Please check your internet connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node) && !isSubmitting) {
            closeContactModal();
        }
    };

    const isKeyPlaceholder =
        !GENERAL_INFO.web3formsAccessKey ||
        GENERAL_INFO.web3formsAccessKey === 'YOUR_WEB3FORMS_ACCESS_KEY';

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300 animate-in fade-in"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalRef}
                className="bg-background-light border border-border rounded-xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl transition-all duration-300 scale-100 animate-in zoom-in-95 duration-200"
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors p-1 cursor-pointer"
                    onClick={closeContactModal}
                    disabled={isSubmitting}
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-3xl font-anton tracking-wide text-primary mb-3">
                            MESSAGE SENT!
                        </h3>
                        <p className="text-muted-foreground max-w-sm mb-8 font-sans">
                            Thank you for reaching out. I have received your message and will get back to you shortly.
                        </p>
                        <Button 
                            as="button" 
                            variant="primary" 
                            onClick={closeContactModal}
                            className="w-full"
                        >
                            CLOSE WINDOW
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-anton tracking-wide text-primary mb-2">
                            LET&apos;S COLLABORATE
                        </h2>
                        <p className="text-muted-foreground text-sm mb-6 font-sans">
                            Send a message detailing your project idea, questions, or just say hello!
                        </p>

                        {isKeyPlaceholder && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200/90 text-xs rounded-lg p-3.5 mb-5 flex gap-2 font-sans leading-relaxed">
                                <span className="shrink-0 text-base">💡</span>
                                <div className="text-left">
                                    <span className="font-semibold block mb-0.5 text-yellow-400">Mock Mode Active</span>
                                    To receive emails, please add your free Web3Forms Access Key in <code className="text-yellow-400 bg-black/40 px-1 py-0.5 rounded text-[10px]">lib/data.ts</code>. Submitting now will simulate a successful send.
                                </div>
                            </div>
                        )}

                        {submitError && (
                            <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm rounded-lg p-3.5 mb-5 font-sans text-left">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5 text-left">
                            <div>
                                <label className="block text-xs font-anton tracking-wider text-muted-foreground mb-2">
                                    YOUR EMAIL
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) setEmailError('');
                                    }}
                                    placeholder="email@example.com"
                                    className={`w-full h-12 px-4 rounded bg-background border ${
                                        emailError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                                    } text-foreground outline-none transition-colors duration-200 font-sans text-sm`}
                                    disabled={isSubmitting}
                                />
                                {emailError && (
                                    <p className="text-destructive text-xs mt-1 font-sans">{emailError}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-anton tracking-wider text-muted-foreground mb-2">
                                    YOUR MESSAGE
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                        if (messageError) setMessageError('');
                                    }}
                                    placeholder="Hi, I'd like to collaborate on..."
                                    rows={4}
                                    className={`w-full p-4 rounded bg-background border ${
                                        messageError ? 'border-destructive focus:border-destructive' : 'border-border focus:border-primary'
                                    } text-foreground outline-none transition-colors duration-200 font-sans text-sm resize-none`}
                                    disabled={isSubmitting}
                                />
                                {messageError && (
                                    <p className="text-destructive text-xs mt-1 font-sans">{messageError}</p>
                                )}
                            </div>

                            <Button
                                as="button"
                                type="submit"
                                loading={isSubmitting}
                                variant="primary"
                                className="w-full mt-2"
                            >
                                SEND MESSAGE
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
