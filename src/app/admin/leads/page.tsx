'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Download,
    ExternalLink
} from 'lucide-react';
import leadsData from '@/lib/seeds/leads.json';

const STATUS_CONFIG: any = {
    NEW: { color: 'text-blue-400', bg: 'bg-blue-400/10', icon: AlertCircle },
    CONTACTED: { color: 'text-ancient-amber', bg: 'bg-ancient-amber/10', icon: Clock },
    CONVERTED: { color: 'text-green-400', bg: 'bg-green-400/10', icon: CheckCircle2 },
    ARCHIVED: { color: 'text-white/20', bg: 'bg-white/5', icon: XCircle },
};

const TYPE_LABELS: any = {
    ASSOCIATION: 'Join Association',
    SEAT_APPLICATION: 'Seat Application',
    CAMP_REGISTRATION: 'Camp Registration',
};

export default function LeadsPage() {
    const [leads, setLeads] = useState(leadsData);
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLeads = leads.filter(lead => {
        const matchesFilter = filter === 'ALL' || lead.type === filter;
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleExport = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Type', 'Status', 'Timestamp', 'Details'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(lead => [
                lead.id,
                `"${lead.name}"`,
                lead.email,
                lead.phone,
                lead.type,
                lead.status,
                lead.timestamp,
                `"${lead.details.replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `lemuria_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Business Leads</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Enquiry & Registration Management</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <Download size={14} />
                        Export leads
                    </button>
                    <div className="h-10 w-px bg-white/5 mx-2" />
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        {['ALL', 'ASSOCIATION', 'SEAT_APPLICATION', 'CAMP_REGISTRATION'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-ancient-amber text-charcoal-deep shadow-lg' : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {t === 'ALL' ? 'Everything' : t.split('_')[0]}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-ancient-amber transition-colors">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search by name, email or initiate deep scan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:outline-none focus:ring-4 focus:ring-ancient-amber/5 focus:border-ancient-amber/20 transition-all placeholder:text-white/10"
                />
            </div>

            {/* Leads Table */}
            <div className="glass-card-transparent overflow-hidden border-white/5">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Contact</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Enquiry Type</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Details</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Received</th>
                            <th className="px-8 py-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode="popLayout">
                            {filteredLeads.map((lead, i) => {
                                const StatusIcon = STATUS_CONFIG[lead.status].icon;
                                return (
                                    <motion.tr
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group hover:bg-white/[0.01] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-white mb-1">{lead.name}</span>
                                                <div className="flex items-center gap-3 text-[10px] text-white/40 font-medium">
                                                    <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                                                    <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-ancient-amber uppercase tracking-widest">
                                                {TYPE_LABELS[lead.type]}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[11px] text-white/50 font-medium max-w-xs line-clamp-1 group-hover:line-clamp-none transition-all">
                                                {lead.details}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${STATUS_CONFIG[lead.status].bg} ${STATUS_CONFIG[lead.status].color}`}>
                                                <StatusIcon size={12} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{lead.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-white/20">
                                                <Clock size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">
                                                    {new Date(lead.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 rounded-lg hover:bg-white/5 text-white/20 hover:text-white transition-all">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredLeads.length === 0 && (
                    <div className="py-20 text-center">
                        <AlertCircle size={40} className="text-white/10 mx-auto mb-4" />
                        <h4 className="text-white/20 font-black uppercase tracking-[0.3em]">No signals detected</h4>
                        <p className="text-[10px] text-white/10 uppercase tracking-widest mt-2">Adjust your filters or initiate refreshing protocols</p>
                    </div>
                )}
            </div>
        </div>
    );
}
