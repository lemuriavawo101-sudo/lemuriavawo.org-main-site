'use client';

import { useEffect } from "react";

export default function ScrollRestoration() {
    useEffect(() => {
        // Disable automatic scroll restoration by the browser
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force scroll to top on mount/reload
        window.scrollTo(0, 0);
    }, []);

    return null;
}
