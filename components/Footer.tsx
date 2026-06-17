'use client';
import { GENERAL_INFO } from '@/lib/data';
import { useContactModal } from '@/components/ContactModalContext';

const Footer = () => {
    const { openContactModal } = useContactModal();

    return (
        <footer className="text-center pb-10 pt-5" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <button
                    onClick={openContactModal}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline text-primary cursor-pointer border-none bg-transparent outline-none"
                >
                    {GENERAL_INFO.email}
                </button>
            </div>
        </footer>
    );
};

export default Footer;
