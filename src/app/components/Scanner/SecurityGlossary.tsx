"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const GLOSSARY_DATA: Record<string, { title: string, description: string }> = {
    "punycode": {
        title: "Punycode (Homograph Attack)",
        description: "A way of representing Unicode characters using ASCII. Attackers use look-alike characters (like 'googIe.com' with an 'I') to trick users into visiting malicious sites."
    },
    "tld": {
        title: "Suspicious TLD",
        description: "Top-Level Domains like .xyz, .top, or .pw are frequently used by bad actors because they are cheap to register and often have less oversight."
    },
    "entropy": {
        title: "Entropy Analysis",
        description: "Measures the randomness of data in a URL. Malicious URLs often contain high-entropy strings (random characters) which are used for tracking or obfuscation."
    },
    "ip_hostname": {
        title: "IP-Based Hostname",
        description: "Legitimate sites use domain names. URLs that use raw IP addresses (e.g., http://192.168.1.1) are highly suspicious as they bypass domain reputation systems."
    },
    "https": {
        title: "SSL/TLS Encryption",
        description: "Ensures data sent between your browser and the server is encrypted. Lack of HTTPS means any data you enter can be seen by attackers on the network."
    },
    "tracking": {
        title: "Tracking Parameters",
        description: "Extra bits added to the URL (like ?utm_source=...) used to follow your behavior across the web. Excess parameters can impact privacy."
    }
};

export function InfoBadge({ term, label }: { term: string, label?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const data = GLOSSARY_DATA[term.toLowerCase()];

    return (
        <div className="relative inline-block ml-2 group">
            <motion.button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                className="w-4 h-4 rounded-full border border-current opacity-30 flex items-center justify-center text-[8px] font-black hover:opacity-100 transition-opacity"
            >
                i
            </motion.button>

            <AnimatePresence>
                {isOpen && data && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-5 bg-primary text-background rounded-2xl shadow-2xl z-50 pointer-events-none"
                    >
                        <h6 className="text-[10px] font-black uppercase tracking-widest mb-2 border-b border-background/10 pb-2">{data.title}</h6>
                        <p className="text-[10px] font-medium leading-relaxed opacity-70 italic">{data.description}</p>
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SecurityGlossary() {
    return (
        <div className="w-full max-w-4xl mt-32 p-12 bg-zinc-50 rounded-[60px] border border-zinc-100">
            <div className="flex flex-col gap-2 mb-10">
                <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Security Lexicon</h3>
                <p className="text-sm text-secondary/60 max-w-md font-medium">Decode the technical metrics used by the LINK Intelligence engine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(GLOSSARY_DATA).map(([key, data]) => (
                    <div key={key} className="flex flex-col gap-3 group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {data.title}
                        </h4>
                        <p className="text-[11px] font-medium text-secondary/50 leading-relaxed group-hover:text-secondary/80 transition-colors">
                            {data.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
