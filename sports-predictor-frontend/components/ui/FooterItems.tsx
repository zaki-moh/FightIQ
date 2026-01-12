'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import AboutModal from './aboutModal';

const FooterItems = () => {
    const [aboutOpen, setAboutOpen] = useState(false)

    return (
        <ul className="flex flex-col gap-2 font-light">
            <li className="font-bold mb-2 tracking-wide text-sm">Navigation</li>
        
            <li>
                <Link href="/" onClick={() => setAboutOpen(true)} className="hover:text-gray-300 transition">
                    About 
                </Link>
            </li>

            <li>
                <Link href="/" className="hover:text-gray-300 transition">
                    Privacy 
                </Link>
            </li>

            <li>
                <Link href="/" className="hover:text-gray-300 transition">
                    Contact 
                </Link>
            </li>

            <AboutModal
                open={aboutOpen}
                onClose={() => setAboutOpen(false)}
            />
        </ul>
    );
};

export default FooterItems;
