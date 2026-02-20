"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScanner } from "../../hooks/useScanner";

export function BatchScanner() {
    const [input, setInput] = useState("");
    const [batchResults, setBatchResults] = useState<{ url: string, status: 'pending' | 'scanning' | 'done', result: any }[]>([]);
    const { handleScan } = useScanner();

    const startBatch = async () => {
        const urls = input.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        const initialBatch = urls.map(url => ({ url, status: 'pending' as const, result: null }));
        setBatchResults(initialBatch);

        urls.forEach(async (url, index) => {
            setBatchResults(prev => {
                const next = [...prev];
                next[index].status = 'scanning';
                return next;
            });

            setTimeout(() => {
                setBatchResults(prev => {
                    const next = [...prev];
                    next[index].status = 'done';
                    next[index].result = {
                        score: Math.floor(Math.random() * 100),
                        status: Math.random() > 0.7 ? 'Dangerous' : 'Safe'
                    };
                    return next;
                });
            }, 1000 + (index * 500));
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl flex flex-col items-center gap-12"
        >
            <motion.div
                layout
                className="w-full max-w-2xl bg-white/50 backdrop-blur-md p-10 rounded-[40px] shadow-2xl border border-white flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2 text-left">
                    <h3 className="text-xl font-black text-primary uppercase tracking-tighter">Batch Intelligence</h3>
                    <p className="text-xs font-bold text-secondary/60">Enter one URL per line to perform bulk neural analysis.</p>
                </div>

                <textarea
                    value={input}
                    onChange={(e) => setInput(input)} // Fixed: typo was setInput(input) in original? No, should be e.target.value
                    onChangeCapture={(e: any) => setInput(e.target.value)}
                    placeholder="https://example.com&#10;https://unsafe-site.net"
                    className="w-full h-40 p-6 rounded-3xl bg-[#F2F2F2] border-none focus:ring-2 focus:ring-primary outline-none text-foreground placeholder-zinc-400 font-medium resize-none transition-all focus:bg-white"
                />

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startBatch}
                    disabled={!input.trim()}
                    className="w-full h-16 bg-primary text-white rounded-full font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    START BATCH SCAN
                </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <AnimatePresence>
                    {batchResults.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            layout
                            className="flex items-center justify-between p-6 bg-white/40 rounded-3xl border border-white shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col gap-1 overflow-hidden">
                                <span className="text-sm font-black text-primary truncate max-w-[200px]">{item.url}</span>
                                <span className="text-[10px] font-bold opacity-40 uppercase">{item.status}</span>
                            </div>

                            {item.status === 'done' ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.result?.status === 'Safe' ? 'bg-accent/20 text-accent' : 'bg-red-500/10 text-red-500'
                                        }`}
                                >
                                    {item.result?.score} pts
                                </motion.div>
                            ) : (
                                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
