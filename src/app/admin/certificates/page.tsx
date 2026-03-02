'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Download, Check, AlertCircle, Search, Trash2, Users, Plus } from 'lucide-react';
import { STUDENT_RECORDS } from '@/lib/constants';
import { importCertificatesExcelAction, importCertificatesCSVAction, saveToSeedsAction } from '@/lib/actions/data';
import * as XLSX from 'xlsx';

export default function AdminCertificatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState<'idle' | 'importing' | 'success'>('idle');
    const [importCount, setImportCount] = useState(0);
    const excelInputRef = useRef<HTMLInputElement>(null);
    const csvInputRef = useRef<HTMLInputElement>(null);

    const filteredRecords = STUDENT_RECORDS.filter(record =>
        record.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.la_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.university_id?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 50);


    const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus('importing');
        const formData = new FormData();
        formData.append('file', file);

        const result = await importCertificatesExcelAction(formData);

        if (result.success) {
            setImportCount(result.count || 0);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                window.location.reload();
            }, 2000);
        } else {
            alert('Excel Import failed: ' + result.error);
            setStatus('idle');
        }
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus('importing');
        const formData = new FormData();
        formData.append('file', file);

        const result = await importCertificatesCSVAction(formData);

        if (result.success) {
            setImportCount(result.count || 0);
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                window.location.reload();
            }, 2000);
        } else {
            alert('CSV Import failed: ' + result.error);
            setStatus('idle');
        }
    };


    const handleDownloadSampleExcel = () => {
        const data = [
            ["student_name", "la_number", "university_id", "issue_date", "course_title", "certificate_url"],
            ["John Doe", "LA-1234", "TPM440123", "2024-01-20", "Varma Foundation", "/uploads/john-doe-cert.jpg"]
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

        // Use binary write and blob for better browser compatibility in some setups
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = 'certificate_import_template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDownloadSampleCSV = () => {
        const headers = 'student_name,la_number,university_id,issue_date,course_title,certificate_url';
        const sampleRow = 'John Doe,LA-1234,TPM440123,2024-01-20,Varma Foundation,https://link-to-pdf.com';
        const csvContent = `${headers}\n${sampleRow}`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = 'certificate_import_template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleExportCSV = () => {
        if (STUDENT_RECORDS.length === 0) return;

        const headers = 'student_name,la_number,university_id,issue_date,course_title,certificate_url';
        const rows = STUDENT_RECORDS.map(r =>
            `"${r.student_name}","${r.la_number}","${r.university_id}","${r.issue_date}","${r.course_title}","${r.certificate_url}"`
        ).join('\n');

        const csvContent = `${headers}\n${rows}`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = `student_records_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleDeleteAll = async () => {
        if (confirm('Are you sure you want to clear all 10,000+ records? This cannot be undone.')) {
            setStatus('importing');
            const result = await saveToSeedsAction('student_records', []);
            if (result.success) window.location.reload();
        }
    };

    return (
        <div className="space-y-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Certificate Repository</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Lineage Verification Hub</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-end">
                    <div className="flex gap-2">
                        <button
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all hover:bg-white/10 hover:border-white/20"
                        >
                            <Download size={12} /> Export CSV
                        </button>
                        <button
                            onClick={handleDownloadSampleExcel}
                            className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all"
                        >
                            <Download size={12} /> Sample XLSX
                        </button>
                        <button
                            onClick={handleDownloadSampleCSV}
                            className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all"
                        >
                            <Download size={12} /> Sample CSV
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => csvInputRef.current?.click()}
                            className="flex items-center gap-3 px-6 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all border border-white/10"
                        >
                            <FileText size={14} /> Import CSV
                        </button>
                        <button
                            onClick={() => excelInputRef.current?.click()}
                            className="flex items-center gap-3 px-6 py-3 bg-ancient-amber rounded-xl text-[10px] font-black uppercase tracking-widest text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            <Plus size={14} /> Import Excel
                        </button>
                    </div>

                    <input
                        type="file"
                        ref={excelInputRef}
                        className="hidden"
                        accept=".xlsx, .xls"
                        onChange={handleImportExcel}
                    />
                    <input
                        type="file"
                        ref={csvInputRef}
                        className="hidden"
                        accept=".csv"
                        onChange={handleImportCSV}
                    />
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-start mb-4">
                        <Users className="text-ancient-amber" size={24} />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Database Size</span>
                    </div>
                    <h3 className="text-4xl font-black text-white">{STUDENT_RECORDS.length.toLocaleString()}</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase mt-2">Verified Practitioner Records</p>
                </div>
                <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02]">
                    <div className="flex justify-between items-start mb-4">
                        <Shield className="text-ancient-amber" size={24} />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">System Integrity</span>
                    </div>
                    <h3 className="text-4xl font-black text-white uppercase">Active</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase mt-2">All Node Bridges Functional</p>
                </div>
                <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02] flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <Trash2 className="text-red-500/40" size={24} />
                        <span className="text-[10px] font-black text-red-500/20 uppercase tracking-widest">Danger Zone</span>
                    </div>
                    <button
                        onClick={handleDeleteAll}
                        className="w-full py-2 rounded-lg border border-red-500/20 text-[9px] font-black text-red-500/40 uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                        Purge Repository
                    </button>
                </div>
            </div>

            {/* Search & List */}
            <div className="glass-card-transparent p-8 border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center mb-10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Name, LA Number, or University ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none focus:border-ancient-amber/40 transition-all placeholder:text-white/10"
                        />
                    </div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Showing top 50 results</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="pb-6 text-[10px] font-black text-white/40 uppercase tracking-widest">Student Practitioner</th>
                                <th className="pb-6 text-[10px] font-black text-white/40 uppercase tracking-widest">LA Number</th>
                                <th className="pb-6 text-[10px] font-black text-white/40 uppercase tracking-widest">University ID</th>
                                <th className="pb-6 text-[10px] font-black text-white/40 uppercase tracking-widest">Issue Date</th>
                                <th className="pb-6 text-[10px] font-black text-white/40 uppercase tracking-widest text-right">Certificate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filteredRecords.map((record) => (
                                <tr key={record.id} className="group hover:bg-white/[0.01] transition-all">
                                    <td className="py-6 font-bold text-white uppercase tracking-tighter">{record.student_name}</td>
                                    <td className="py-6 text-ancient-amber font-black">
                                        {record.la_number || <span className="text-white/10 text-[8px]">N/A</span>}
                                    </td>
                                    <td className="py-6 text-white/40 font-mono text-xs">
                                        {record.university_id || <span className="text-white/10 text-[8px]">N/A</span>}
                                    </td>
                                    <td className="py-6 text-white/20 text-[10px] font-black uppercase tracking-widest">{record.issue_date}</td>
                                    <td className="py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <a
                                                href={record.certificate_url}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-[9px] font-black text-white/40 uppercase tracking-widest hover:bg-ancient-amber hover:text-black transition-all"
                                            >
                                                <FileText size={12} /> View Document
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredRecords.length === 0 && (
                        <div className="py-20 text-center">
                            <AlertCircle className="mx-auto text-white/10 mb-4" size={32} />
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">No verified records found in this vector</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Import Overlay */}
            <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl"
                    >
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 border-t-2 border-r-2 border-ancient-amber rounded-full mx-auto mb-10 shadow-[0_0_40px_rgba(255,184,0,0.2)]"
                            />
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                                {status === 'importing' ? 'Syncing Node Clusters...' : 'Transmission Complete'}
                            </h2>
                            <p className="text-[10px] font-bold text-ancient-amber uppercase tracking-[0.4em]">
                                {status === 'importing' ? 'Processing Matrix Records' : `Successfully Imported ${importCount} Verified Certificates`}
                            </p>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="mt-10 mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"
                                >
                                    <Check />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
