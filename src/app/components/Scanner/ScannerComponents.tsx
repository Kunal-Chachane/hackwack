"use client";

import Image from "next/image";
import { ScanResult } from "../../types";
import { SCAN_STEPS } from "../../constants";
import DetailedReport from "./DetailedReport";

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
        <div className="w-full max-w-4xl flex flex-col items-center gap-12 text-center">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none">LINK</h1>
                <p className="mt-4 text-secondary font-medium tracking-wide uppercase text-xs tracking-[0.3em]">AI URL SCANNER & RISK ASSESSMENT</p>
            </div>

            <div className="w-full max-w-xl bg-white/50 backdrop-blur-md p-10 rounded-[40px] shadow-2xl shadow-primary/5 flex flex-col gap-6 border border-white">
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
                    <button
                        onClick={onScan}
                        disabled={isScanning || !url}
                        className="absolute right-2 top-2 h-14 px-10 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    >
                        {isScanning ? "SCANNING..." : "SCAN"}
                    </button>
                </div>

                {isScanning && (
                    <div className="transition-all duration-300">
                        <p className="text-[10px] font-black uppercase text-primary animate-pulse tracking-[0.3em] mb-3">
                            {SCAN_STEPS[scanStep]}
                        </p>
                        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden mb-6">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${((scanStep + 1) / SCAN_STEPS.length) * 100}%` }}
                            ></div>
                        </div>
                        <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 animate-in fade-in zoom-in duration-500">
                            <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] mb-2">Did You Know?</p>
                            <p className="text-xs font-bold text-primary/80 leading-relaxed italic">&quot;{currentFact}&quot;</p>
                        </div>
                    </div>
                )}

                {!isScanning && (
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Phishing Check", "Malware Detection", "AI Powered"].map((label) => (
                            <span key={label} className="px-4 py-2 bg-accent/30 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">{label}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ScanResultCard({ result }: { result: ScanResult }) {
    return (
        <div className="w-full max-w-xl bg-primary text-background p-10 rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Risk Analysis</p>
                    <h3 className="text-5xl font-black leading-none">{result.score}<span className="text-xl opacity-40 ml-1">pts</span></h3>
                </div>
                <div className={`px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest ${result.status === 'Safe' ? 'bg-[#A4AC86] text-primary' :
                    result.status === 'Warning' ? 'bg-[#CC7E4C] text-white' : 'bg-red-500 text-white'
                    }`}>
                    {result.status}
                </div>
            </div>

            <div className="space-y-4 mb-8">
                {result.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-background/10">
                        <span className="text-sm font-bold opacity-80">{detail.label}</span>
                        <span className="text-sm font-bold">{detail.value}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white/10 p-6 rounded-3xl text-left border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">AI Reasoning Layer</h4>
                </div>
                <ul className="space-y-3">
                    {result.aiReasoning.map((reason, idx) => (
                        <li key={idx} className="text-xs font-medium opacity-80 leading-relaxed">● {reason}</li>
                    ))}
                </ul>
            </div>

            <DetailedReport result={result} />
        </div>
    );
}
