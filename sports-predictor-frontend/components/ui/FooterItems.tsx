import Link from 'next/link'
import React from 'react'

const FooterItems = () => {

    const navItems = [
        { title: "About", path: "/" },
        { title: "Privacy", path: "/" },
        { title: "Contact", path: "/" },
    ];

    return (
        <ul className="flex flex-col gap-2 font-light">
            <li className="font-bold mb-2 tracking-wide text-sm">Navigation</li>

            {navItems.map(({ title, path }) => (
                <li key={title}>
                    <Link href={path} className="hover:text-gray-300 transition">
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default FooterItems;
