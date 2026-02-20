"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";

export default function About() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            <Navbar />

            {/* Decorative tall capsules */}
            <div className="absolute top-[-10%] right-[-5%] w-[15vw] h-[60vh] bg-primary opacity-5 capsule-shape -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[18vw] h-[50vh] bg-accent opacity-20 pill -z-10"></div>

            <main className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center min-h-[80vh]">
                <div className="w-full max-w-4xl">
                    <div className="mb-20">
                        <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">The Mission</h2>
                        <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tight leading-none mb-10">
                            ANTI<br />GRAVITY
                        </h1>
                        <p className="text-xl text-foreground/80 leading-relaxed font-medium max-w-2xl">
                            We believe in a web where security isn't a hurdle, but a foundation.
                            LINK is an AI-powered intelligence layer designed to neutralize threats before they reach your screen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-primary uppercase">Coffee Craft Philosophy</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                Just like a perfect brew, security requires precision, patience, and the right blend of technology.
                                Our team of dedicated researchers meticulously analyzes millions of malicious signals daily to keep our detection models sharp.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-primary uppercase">Advanced Protection</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                From phishing detection to malware behavior analysis, we employ multiple layers of heuristic and semantic checks.
                                Our engine doesn't just look for matches; it understands intent.
                            </p>
                        </div>
                    </div>

                    <div className="bg-primary text-background p-12 rounded-[40px] shadow-2xl">
                        <h2 className="text-4xl font-black mb-8 leading-tight">SAFE BROWSING IS<br />A HUMAN RIGHT.</h2>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/" className="px-8 py-4 bg-accent text-primary rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
                                Start Scanning
                            </Link>
                            <Link href="/contact" className="px-8 py-4 border border-background/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-background/10 transition-all">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full py-20 flex flex-col items-center gap-4 text-secondary/30">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase">&copy; 2026 LINK Scanner</p>
            </footer>
        </div>
    );
}
