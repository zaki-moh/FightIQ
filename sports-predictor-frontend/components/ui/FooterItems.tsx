'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const FooterItems = () => {
    const [about, setAbout] = useState(false)

    return (
        <ul className="flex flex-col gap-2 font-light">
            <li className="font-bold mb-2 tracking-wide text-sm">Navigation</li>
        
            <li>
                <Link href="/" onClick={() => setAbout(false)} className="hover:text-gray-300 transition">
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
        </ul>
    );
};

export default FooterItems;
