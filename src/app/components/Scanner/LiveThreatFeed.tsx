"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const THREAT_LOGS = [
    "BLOCK: Malicious request from 185.23.xx.xx",
    "SCAN: Heuristic analysis depth +12",
    "ALERT: Punycode attempt detected on .com",
    "TRACE: SSL handshake verified for host",
    "KERNEL: Neural weights updated",
    "SHIELD: Active monitoring engaged",
    "CRYPTO: Entropy score 0.98 detected",
    "FILTER: Suspicious TLD .top filtered",
];

export function LiveThreatFeed() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const next = [...prev, THREAT_LOGS[Math.floor(Math.random() * THREAT_LOGS.length)]];
                if (next.length > 5) return next.slice(1);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed left-10 bottom-10 z-0 pointer-events-none opacity-20 hidden lg:block">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></div>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary">Live Neural Telemetry</span>
                </div>
                <div className="h-32 flex flex-col justify-end gap-1">
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.p
                                key={log + i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-[8px] font-mono font-bold text-primary/60"
                            >
                                {`> ${log}`}
                            </motion.p>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
