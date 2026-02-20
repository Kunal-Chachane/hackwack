"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Batch Scan", href: "/#batch", scroll: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-20 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-zinc-100" : "bg-transparent py-6 md:py-10"
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                        <Image
                            src="/app-logo.jpg"
                            alt="Hackwack Logo"
                            fill
                            className="object-contain rounded-full shadow-md"
                        />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-primary">LINK</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="font-bold text-primary/70 hover:text-primary transition-colors text-sm uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button className="pill bg-primary border-4 border-white/50 text-white px-8 py-2.5 font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
                        Sign In
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center bg-zinc-100 rounded-full"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="w-5 flex flex-col gap-1.5">
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-0.5 w-full bg-primary transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-6 right-6 bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl flex flex-col gap-6 items-center border border-zinc-100 animate-in fade-in zoom-in duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="font-bold text-primary text-lg uppercase tracking-widest"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button className="pill bg-primary text-white w-full py-4 font-bold shadow-lg uppercase tracking-widest">
                        Sign In
                    </button>
                </div>
            )}
        </nav>
    );
}
