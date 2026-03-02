'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { loginAction } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await loginAction(formData);

        if (result?.success) {
            router.push('/admin');
            router.refresh();
        } else {
            setError(result?.error || 'Authentication sequence failed');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0F0A09] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_50%)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-ancient-amber rounded-2xl mx-auto flex items-center justify-center shadow-[0_20px_40px_rgba(212,175,55,0.2)] mb-8"
                    >
                        <Shield size={40} className="text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Sanctuary Access</h1>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Master Administrative Terminal</p>
                </div>

                {/* Login Form */}
                <div className="glass-card-transparent p-8 md:p-10 border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ancient-amber/40 to-transparent" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Identity Signature</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-ancient-amber transition-colors">
                                    <Mail size={16} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="admin@lemuria.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-ancient-amber/5 focus:border-ancient-amber/40 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Cipher Key</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-ancient-amber transition-colors">
                                    <Key size={16} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-ancient-amber/5 focus:border-ancient-amber/40 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 text-[11px] font-bold"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-ancient-amber text-charcoal-deep py-5 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_15px_30px_rgba(212,175,55,0.1)]"
                        >
                            {loading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Initialize Session <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                    Restricted Access — Authorized Personnel Only
                </p>
            </motion.div>
        </main>
    );
}
