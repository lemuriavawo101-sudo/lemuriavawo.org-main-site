'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    MoreVertical,
    UserPlus,
    Filter,
    Mail,
    UserCheck,
    ShieldAlert
} from 'lucide-react';

const users = [
    { id: 1, name: 'S. Karthi', email: 'karthi@lemuria.com', role: 'Advanced', status: 'Active', joinDate: '2023-08-12' },
    { id: 2, name: 'M. Priya', email: 'priya@lemuria.com', role: 'Beginner', status: 'Pending', joinDate: '2024-02-15' },
    { id: 3, name: 'Master Arul', email: 'arul@lemuria.com', role: 'Instructor', status: 'Active', joinDate: '2020-05-20' },
    { id: 4, name: 'R. Vignesh', email: 'vignesh@lemuria.com', role: 'Intermediate', status: 'Inactive', joinDate: '2022-11-03' },
    { id: 5, name: 'A. Lakshmi', email: 'lakshmi@lemuria.com', role: 'Advanced', status: 'Active', joinDate: '2023-01-10' },
    { id: 6, name: 'K. Raja', email: 'raja@lemuria.com', role: 'Beginner', status: 'Active', joinDate: '2024-01-25' },
];

export default function UserManagement() {
    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Users</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Academy Member Directory</p>
                </div>
                <button className="neon-button flex items-center gap-3 py-4 text-[9px]">
                    <UserPlus size={16} />
                    Register New Member
                </button>
            </header>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative w-full md:w-96 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-ancient-amber transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-ancient-amber/40 transition-all font-medium"
                    />
                </div>
                <button className="glass-card-transparent px-6 py-3 border-white/5 flex items-center gap-3 text-white/40 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">
                    <Filter size={14} />
                    Advanced Filters
                </button>
            </div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-transparent border-white/5 overflow-hidden"
            >
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Member</th>
                            <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Rank</th>
                            <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Join Date</th>
                            <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-ancient-amber/10 border border-ancient-amber/20 flex items-center justify-center text-ancient-amber font-black text-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white uppercase tracking-tight">{user.name}</p>
                                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold">
                                                <Mail size={10} />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-full uppercase tracking-widest border border-white/10">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-400' :
                                                user.status === 'Pending' ? 'bg-ancient-amber' : 'bg-white/20'
                                            }`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'text-green-400' :
                                                user.status === 'Pending' ? 'text-ancient-amber' : 'text-white/20'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-mono text-white/40">{user.joinDate}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                                            <UserCheck size={18} />
                                        </button>
                                        <button className="p-2 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                                            <ShieldAlert size={18} />
                                        </button>
                                        <button className="p-2 text-white/20 hover:text-ancient-amber hover:bg-ancient-amber/10 rounded-lg transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
