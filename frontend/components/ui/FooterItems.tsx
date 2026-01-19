'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import AboutModal from './aboutModal';
import ContactModal from './contactModal';

const FooterItems = () => {
    const [aboutOpen, setAboutOpen] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)

    return (
        <ul className="flex flex-col gap-2 font-light">
            <li className="font-bold mb-2 tracking-wide text-sm">Navigation</li>
        
            <li>
                <div onClick={() => setAboutOpen(true)} className="hover:text-gray-300 transition cursor-pointer">
                    About 
                </div>
            </li>

            <li>
                <Link href="/privacy" className="hover:text-gray-300 transition cursor-pointer">
                    Privacy 
                </Link>
            </li>

            <li>
                <div onClick={() => setContactOpen(true)} className="hover:text-gray-300 transition cursor-pointer">
                    Contact 
                </div>
            </li>

            <AboutModal
                open={aboutOpen}
                onClose={() => setAboutOpen(false)}
            />
            <ContactModal 
                open={contactOpen}
                onClose={() => setContactOpen(false)}
            />
            
        </ul>
    );
};

export default FooterItems;
