"use client";

import { RecentScan } from "../../types";

export function RecentScans({
    recentScans,
    onSelect
}: {
    recentScans: RecentScan[],
    onSelect: (url: string) => void
}) {
    if (recentScans.length === 0) return null;

    return (
        <div className="w-full max-w-md">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6 opacity-40">Security History</p>
            <div className="flex flex-col gap-3">
                {recentScans.map((scan, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/40 rounded-3xl border border-white/60 hover:bg-white/60 transition-colors cursor-pointer group"
                        onClick={() => onSelect(scan.url)}
                    >
                        <span className="text-sm font-bold text-primary truncate max-w-[200px]">{scan.url}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold opacity-30 uppercase">
                                {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">→</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FeatureGrid() {
    const features = [
        {
            title: "Intelligent",
            desc: "Detect subtle patterns of malicious intent in milliseconds using Neural Protection.",
            icon: <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-black text-3xl tracking-tighter">AG</div>
        },
        {
            title: "Advanced",
            desc: "Multiple layers of heuristic protection continuously updated by global security feeds.",
            icon: (
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
            )
        },
        {
            title: "Real-time",
            desc: "Get clear, actionable risk assessments immediately with zero latency overhead.",
            icon: (
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                </div>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-40 opacity-40 hover:opacity-100 transition-opacity">
            {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-5 group">
                    <div className="transition-all group-hover:scale-110 shadow-2xl">
                        {f.icon}
                    </div>
                    <h3 className="font-black text-primary text-[10px] uppercase tracking-[0.3em]">{f.title}</h3>
                    <p className="text-foreground/70 text-[10px] leading-relaxed max-w-[180px]">{f.desc}</p>
                </div>
            ))}
        </div>
    );
}
