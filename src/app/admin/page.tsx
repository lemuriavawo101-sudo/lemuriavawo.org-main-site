'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Activity,
    TrendingUp,
    ArrowUpRight,
    Clock,
    CheckCircle2
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="glass-card-transparent p-6 border-white/5 group hover:border-ancient-amber/20 transition-all duration-500"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-ancient-amber group-hover:bg-ancient-amber/10 transition-all duration-500">
                <Icon size={24} />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={10} />
                {trend}
            </div>
        </div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-3xl font-black text-white">{value}</h3>
    </motion.div>
);

export default function AdminDashboard() {
    const recentActivity = [
        { user: 'S. Karthi', action: 'Completed Varmam basics', time: '2 mins ago', status: 'success' },
        { user: 'M. Priya', action: 'New registration', time: '15 mins ago', status: 'info' },
        { user: 'System', action: 'Backup completed', time: '1 hour ago', status: 'success' },
        { user: 'Admin', action: 'Updated schedule', time: '3 hours ago', status: 'warning' },
    ];

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Dashboard</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Sanctuary Monitoring System</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-ancient-amber uppercase tracking-widest mb-1">Local Node Time</p>
                    <p className="text-xl font-mono text-white/60">10:45:22 AM</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value="1,284" icon={Users} trend="+12%" delay={0.1} />
                <StatCard title="Active Sessions" value="42" icon={Activity} trend="+8%" delay={0.2} />
                <StatCard title="Total Mastery" value="84%" icon={TrendingUp} trend="+3%" delay={0.3} />
                <StatCard title="System Health" value="100%" icon={CheckCircle2} trend="Steady" delay={0.4} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="lg:col-span-2 glass-card-transparent p-8 border-white/5"
                >
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <TrendingUp size={16} className="text-ancient-amber" />
                        Performance Analytics
                    </h3>
                    <div className="h-64 w-full bg-white/5 rounded-3xl flex items-center justify-center border border-dashed border-white/10">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic">Node visualization loading...</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="glass-card-transparent p-8 border-white/5"
                >
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Clock size={16} className="text-ancient-amber" />
                        Terminal Activity
                    </h3>
                    <div className="space-y-6">
                        {recentActivity.map((log, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-ancient-amber mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-white uppercase">{log.user}</span>
                                        <span className="text-[9px] font-bold text-white/20 uppercase">{log.time}</span>
                                    </div>
                                    <p className="text-[11px] text-white/40 font-medium">{log.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
