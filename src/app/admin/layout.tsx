'use client';

import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#0F0A09]">
            <AdminSidebar />
            <main className="flex-1 ml-72 p-10 min-h-screen relative">
                {/* Subtle background texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,184,0,0.02)_0%,transparent_50%)] pointer-events-none" />
                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
