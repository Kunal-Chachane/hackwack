"use client";

import Navbar from "../components/Navbar";

export default function Contact() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            <Navbar />

            {/* Decorative tall capsules */}
            <div className="absolute top-[-10%] right-[-5%] w-[15vw] h-[60vh] bg-secondary opacity-5 capsule-shape -z-10"></div>

            <main className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="w-full max-w-2xl bg-white/50 backdrop-blur-md p-12 rounded-[40px] shadow-2xl border border-white">
                    <div className="text-center mb-10">
                        <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2">Connect</h2>
                        <h1 className="text-5xl font-black text-primary tracking-tighter">GET IN TOUCH</h1>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-4">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full h-14 px-8 rounded-full bg-[#F2F2F2] border-none focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-4">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full h-14 px-8 rounded-full bg-[#F2F2F2] border-none focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-4">Message</label>
                            <textarea
                                rows={4}
                                placeholder="How can we help you stay secure?"
                                className="w-full p-8 rounded-[30px] bg-[#F2F2F2] border-none focus:ring-2 focus:ring-primary outline-none resize-none"
                            ></textarea>
                        </div>
                        <button className="w-full h-16 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-xl active:scale-[0.98]">
                            Send Message
                        </button>
                    </form>

                    <div className="mt-12 pt-12 border-t border-primary/5 flex flex-col items-center gap-6">
                        <p className="text-xs font-bold text-secondary tracking-widest uppercase">Or follow our updates</p>
                        <div className="flex gap-8">
                            <span className="text-primary font-black cursor-pointer hover:text-accent transition-colors">TW</span>
                            <span className="text-primary font-black cursor-pointer hover:text-accent transition-colors">GH</span>
                            <span className="text-primary font-black cursor-pointer hover:text-accent transition-colors">LI</span>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full py-10 flex flex-col items-center gap-4 text-secondary/30">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase">&copy; 2026 LINK Scanner</p>
            </footer>
        </div>
    );
}
