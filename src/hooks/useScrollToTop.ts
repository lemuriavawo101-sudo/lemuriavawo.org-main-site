'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export function useScrollToTop() {
    const pathname = usePathname();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
        // Handle both absolute and hash links
        const targetPath = href.split('#')[0];

        if (pathname === targetPath || (pathname === '/' && targetPath === '')) {
            // Only scroll to top if we are already on that page and it's not a hash link
            // OR if it's a hash link on the same page, let normal browser behavior take over
            if (!href.includes('#')) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (callback) callback();
            }
        }
    };

    return { handleLinkClick };
}
