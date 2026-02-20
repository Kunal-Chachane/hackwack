"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScanResult } from "../../types";
import { SCAN_STEPS } from "../../constants";
import DetailedReport from "./DetailedReport";
import { InfoBadge } from "./SecurityGlossary";

export function ScannerHero({
    url,
    setUrl,
    isScanning,
    onScan,
    scanStep,
    currentFact
}: {
    url: string,
    setUrl: (u: string) => void,
    isScanning: boolean,
    onScan: () => void,
    scanStep: number,
    currentFact: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex flex-col items-center gap-12 text-center"
        >
            <div className="flex flex-col items-center gap-2">
                <motion.h1
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none"
                >
                    LINK
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-secondary font-medium tracking-wide uppercase text-xs tracking-[0.3em]"
                >
                    AI URL SCANNER & RISK ASSESSMENT
                </motion.p>
            </div>

            <motion.div
                layout
                className="w-full max-w-xl bg-white/50 backdrop-blur-md p-10 rounded-[40px] shadow-2xl shadow-primary/5 flex flex-col gap-6 border border-white"
            >
                <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </div>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        onKeyDown={(e) => e.key === 'Enter' && onScan()}
                        className="w-full h-18 pl-16 pr-44 rounded-full bg-[#F2F2F2] border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none text-foreground placeholder-zinc-400 font-medium transition-all"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onScan}
                        disabled={isScanning || !url}
                        className="absolute right-2 top-2 h-14 px-10 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    >
                        {isScanning ? "SCANNING..." : "SCAN"}
                    </motion.button>
                </div>

                <AnimatePresence mode="wait">
                    {isScanning && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="text-[10px] font-black uppercase text-primary animate-pulse tracking-[0.3em] mb-3">
                                {SCAN_STEPS[scanStep]}
                            </p>
                            <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden mb-6">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((scanStep + 1) / SCAN_STEPS.length) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                />
                            </div>
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-primary/5 p-6 rounded-3xl border border-primary/10"
                            >
                                <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2">Did You Know?</p>
                                <p className="text-xs font-bold text-primary/80 leading-relaxed italic">&quot;{currentFact}&quot;</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {["Phishing Check", "Malware Detection", "AI Powered"].map((label, idx) => (
                            <motion.span
                                key={label}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 * idx }}
                                className="px-4 py-2 bg-accent/30 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider"
                            >
                                {label}
                            </motion.span>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

export function ScanResultCard({ result }: { result: ScanResult }) {
    const getGlossaryKey = (label: string) => {
        if (label.includes("Connection")) return "https";
        if (label.includes("Encoding")) return "punycode";
        if (label.includes("AI Consistency")) return "entropy";
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-xl bg-primary text-background p-10 rounded-[40px] shadow-2xl"
        >
            <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Risk Analysis</p>
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black leading-none"
                    >
                        {result.score}<span className="text-xl opacity-40 ml-1">pts</span>
                    </motion.h3>
                </div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest ${result.status === 'Safe' ? 'bg-[#A4AC86] text-primary' :
                        result.status === 'Warning' ? 'bg-[#CC7E4C] text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    {result.status}
                </motion.div>
            </div>

            <div className="space-y-4 mb-8">
                {result.details.map((detail, idx) => {
                    const glossaryKey = getGlossaryKey(detail.label);
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex justify-between items-center py-3 border-b border-background/10"
                        >
                            <span className="text-sm font-bold opacity-80 flex items-center">
                                {detail.label}
                                {glossaryKey && <InfoBadge term={glossaryKey} />}
                            </span>
                            <div className="flex items-center gap-2">
                                {detail.status === 'fail' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
                                <span className="text-sm font-bold">{detail.value}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 p-6 rounded-3xl text-left border border-white/5"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">AI Reasoning Layer</h4>
                </div>
                <ul className="space-y-3">
                    {result.aiReasoning.map((reason, idx) => {
                        let term = null;
                        if (reason.toLowerCase().includes("punycode")) term = "punycode";
                        if (reason.toLowerCase().includes("tld")) term = "tld";
                        if (reason.toLowerCase().includes("raw ip")) term = "ip_hostname";
                        if (reason.toLowerCase().includes("entropy")) term = "entropy";
                        if (reason.toLowerCase().includes("http protocol")) term = "https";

                        return (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                                className="text-xs font-medium opacity-80 leading-relaxed flex items-start"
                            >
                                <span className="mr-2">●</span>
                                <span className="flex-1">
                                    {reason}
                                    {term && <InfoBadge term={term} />}
                                </span>
                            </motion.li>
                        );
                    })}
                </ul>
            </motion.div>

            <DetailedReport result={result} />
        </motion.div>
    );
}
