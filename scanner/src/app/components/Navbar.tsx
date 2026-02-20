"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-20 md:py-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110 shadow-lg">
                        S
                    </div>
                    <span className="font-black text-xl tracking-tighter text-primary">SCANNER</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <Link href="#" className="font-bold text-primary/70 hover:text-primary transition-colors text-sm uppercase tracking-widest">Pricing</Link>
                    <Link href="#" className="font-bold text-primary/70 hover:text-primary transition-colors text-sm uppercase tracking-widest">About</Link>
                    <Link href="#" className="font-bold text-primary/70 hover:text-primary transition-colors text-sm uppercase tracking-widest">Contact</Link>
                    <button className="pill bg-primary border-4 border-white/50 text-white px-8 py-3 font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
                        Sign In
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-6 flex flex-col gap-1.5">
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-24 left-6 right-6 bg-white rounded-3xl p-8 shadow-2xl flex flex-col gap-6 items-center border border-zinc-100 slide-down">
                    <Link href="#" className="font-bold text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                    <Link href="#" className="font-bold text-primary text-lg" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link href="#" className="font-bold text-primary text-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <button className="pill bg-primary text-white w-full py-4 font-bold shadow-lg">
                        Sign In
                    </button>
                </div>
            )}
        </nav>
    );
}
