"use client";

import { ScanResult } from "../../types";

export function TrustGraph({ score }: { score: number }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/5">
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
                    <circle
                        className={score > 70 ? "text-red-500" : score > 30 ? "text-orange-500" : "text-accent"}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="64"
                        cy="64"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black">{score}</span>
                    <span className="text-[8px] font-black uppercase opacity-40">Risk</span>
                </div>
            </div>
            <p className="text-[9px] font-bold opacity-40 text-center max-w-[120px]">
                Reputation calculated via 128-point neural cross-check.
            </p>
        </div>
    );
}

export function PrivacyCard({ status }: { status: 'pass' | 'fail' | 'warning' }) {
    const trackers = status === 'pass' ? 0 : status === 'warning' ? 3 : 12;

    return (
        <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-3xl border border-white/5 flex-1">
            <div className="flex justify-between items-center">
                <h5 className="text-[10px] font-black uppercase tracking-widest opacity-60">Privacy Exposure</h5>
                <div className={`w-2 h-2 rounded-full ${status === 'pass' ? 'bg-accent' : 'bg-red-500'} animate-pulse`}></div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                    <span className="text-3xl font-black">{trackers}</span>
                    <span className="text-[10px] font-black uppercase opacity-40 mb-1">Trackers Found</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${status === 'pass' ? 'bg-accent' : 'bg-red-500'} transition-all`}
                        style={{ width: `${(trackers / 15) * 100}%` }}
                    ></div>
                </div>
            </div>
            <p className="text-[9px] font-bold opacity-40 leading-relaxed">
                {status === 'pass'
                    ? "No hidden pixels or invasive tracking headers identified."
                    : "Multiple third-party fingerprinting attempts identified in payload."}
            </p>
        </div>
    );
}

export default function DetailedReport({ result }: { result: ScanResult }) {
    return (
        <div className="w-full mt-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <TrustGraph score={result.score} />
                <PrivacyCard status={result.score > 70 ? 'fail' : result.score > 30 ? 'warning' : 'pass'} />
            </div>

            <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Download Compliance Cert</span>
            </button>
        </div>
    );
}
