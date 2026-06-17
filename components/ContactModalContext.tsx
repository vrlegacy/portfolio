'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactModalContextType {
    isOpen: boolean;
    openContactModal: () => void;
    closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openContactModal = () => setIsOpen(true);
    const closeContactModal = () => setIsOpen(false);

    return (
        <ContactModalContext.Provider value={{ isOpen, openContactModal, closeContactModal }}>
            {children}
        </ContactModalContext.Provider>
    );
};

export const useContactModal = () => {
    const context = useContext(ContactModalContext);
    if (context === undefined) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
};
