'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Settings,
    LogOut,
    Shield,
    Layers,
    Calendar,
    Activity,
    Image as ImageIcon
} from 'lucide-react';
import { logoutAction } from '@/lib/actions/auth';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/admin' },
    { name: 'Business Leads', icon: Activity, path: '/admin/leads' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Events & Memories', icon: Calendar, path: '/admin/events' },
    { name: 'Gallery Management', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Classes & Camps', icon: Layers, path: '/admin/classes' },
    { name: 'Certificate Repository', icon: Shield, path: '/admin/certificates' },
    { name: 'System Logs', icon: Layers, path: '/admin/logs' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-charcoal-deep border-r border-white/5 flex flex-col z-50">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-ancient-amber rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(255,184,0,0.2)]">
                        <Shield size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Lemuria</h2>
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Master Admin</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path}>
                                <div className={`
                  group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative
                  ${isActive ? 'bg-ancient-amber/10 text-ancient-amber' : 'text-white/40 hover:text-white hover:bg-white/5'}
                `}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav"
                                            className="absolute left-0 w-1 h-6 bg-ancient-amber rounded-r-full"
                                        />
                                    )}
                                    <item.icon size={20} className={isActive ? 'text-ancient-amber' : 'group-hover:text-white transition-colors'} />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-8 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
}
