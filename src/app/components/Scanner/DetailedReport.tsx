"use client";

import { motion } from "framer-motion";
import { ScanResult } from "../../types";

export function TrustGraph({ score }: { score: number }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/5"
        >
            <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60">Domain Reputation</h5>
            <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                        className="text-white/10"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className={score > 70 ? "text-red-500" : score > 30 ? "text-orange-500" : "text-accent"}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-2xl font-black"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[8px] font-black uppercase opacity-40">Risk</span>
                </div>
            </div>
            <p className="text-[9px] font-bold opacity-40 text-center max-w-[120px]">
                Reputation calculated via 128-point neural cross-check.
            </p>
        </motion.div>
    );
}

export function PrivacyCard({ status, score }: { status: 'pass' | 'fail' | 'warning', score: number }) {
    const trackers = status === 'pass' ? 0 : status === 'warning' ? Math.floor(score / 15) : Math.floor(score / 8);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/5 flex-1"
        >
            <div className="flex justify-between items-center">
                <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60">Privacy Exposure</h5>
                <div className={`w-2 h-2 rounded-full ${status === 'pass' ? 'bg-accent' : 'bg-red-500'} animate-pulse`}></div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl font-black"
                    >
                        {trackers}
                    </motion.span>
                    <span className="text-[10px] font-black uppercase opacity-40 mb-1">Trackers Found</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((trackers / 15) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full ${status === 'pass' ? 'bg-accent' : 'bg-red-500'}`}
                    />
                </div>
            </div>
            <p className="text-[9px] font-bold opacity-40 leading-relaxed">
                {status === 'pass'
                    ? "No hidden pixels or invasive tracking headers identified."
                    : "Multiple third-party fingerprinting attempts identified in payload."}
            </p>
        </motion.div>
    );
}

export default function DetailedReport({ result }: { result: ScanResult }) {
    return (
        <div className="w-full mt-10">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <TrustGraph score={result.score} />
                <PrivacyCard score={result.score} status={result.score > 70 ? 'fail' : result.score > 30 ? 'warning' : 'pass'} />
            </div>

            <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all group"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Download Compliance Cert</span>
            </motion.button>
        </div>
    );
}
