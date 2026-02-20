"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [recentScans, setRecentScans] = useState<string[]>([]);

  const handleScan = () => {
    if (!url) return;
    setIsScanning(true);
    setResult(null);

    // Mock scan animation/logic
    setTimeout(() => {
      const riskScore = Math.floor(Math.random() * 100);
      setIsScanning(false);
      setResult({
        score: riskScore,
        status: riskScore < 30 ? "Safe" : riskScore < 70 ? "Warning" : "Dangerous",
        details: [
          { label: "SSL Certificate", value: "Valid", status: "pass" },
          { label: "Domain Age", value: "4 Years", status: "pass" },
          { label: "Blacklist Check", value: riskScore > 70 ? "Flagged" : "Clean", status: riskScore > 70 ? "fail" : "pass" },
        ]
      });
      setRecentScans(prev => [url, ...prev.slice(0, 4)]);
      setUrl("");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />

      {/* Decorative tall capsules */}
      <div className="absolute top-[-10%] right-[-5%] w-[15vw] h-[60vh] bg-primary opacity-5 capsule-shape -z-10"></div>
      <div className="absolute top-[20%] right-[12%] w-[12vw] h-[80vh] bg-secondary opacity-10 capsule-shape -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[18vw] h-[50vh] bg-accent opacity-20 pill -z-10"></div>

      <main className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-4xl flex flex-col items-center gap-12 text-center">

          {/* Logo / Title Section */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Anti Gravity</h2>
            <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tight leading-none">
              CO<br />FFEE<br />CRAFT
            </h1>
            <p className="mt-4 text-secondary font-medium tracking-wide uppercase text-xs tracking-[0.3em]">URL SCANNER & RISK ASSESSMENT</p>
          </div>

          {/* Main Action Area */}
          <div className="w-full max-w-xl bg-white/50 backdrop-blur-md p-8 rounded-[40px] shadow-2xl shadow-primary/5 flex flex-col gap-6 border border-white">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-16 px-8 rounded-full bg-[#F2F2F2] border-none focus:ring-2 focus:ring-primary outline-none text-foreground placeholder-zinc-400 font-medium"
              />
              <button
                onClick={handleScan}
                disabled={isScanning || !url}
                className="absolute right-2 top-2 h-12 px-8 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? "SCANNING..." : "SCAN"}
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-accent/30 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">Phishing Check</span>
              <span className="px-4 py-2 bg-accent/30 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">Malware Detection</span>
              <span className="px-4 py-2 bg-accent/30 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">AI Powered</span>
            </div>
          </div>

          {/* Scan Result Dashboard */}
          {result && (
            <div className="w-full max-w-xl bg-primary text-background p-10 rounded-[40px] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Risk Score</p>
                  <h3 className="text-5xl font-black leading-none">{result.score}/100</h3>
                </div>
                <div className={`px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest ${result.status === 'Safe' ? 'bg-[#A4AC86] text-primary' :
                    result.status === 'Warning' ? 'bg-[#E1EADD] text-primary' : 'bg-red-500 text-white'
                  }`}>
                  {result.status}
                </div>
              </div>

              <div className="space-y-4">
                {result.details.map((detail: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-background/10">
                    <span className="text-sm font-bold opacity-80">{detail.label}</span>
                    <span className="text-sm font-bold">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Scans */}
          {recentScans.length > 0 && (
            <div className="w-full max-w-md">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-6">Recent Reports</p>
              <div className="flex flex-col gap-3">
                {recentScans.map((scan, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/40 rounded-3xl border border-white/60 hover:bg-white/60 transition-colors cursor-pointer group">
                    <span className="text-sm font-bold text-primary truncate max-w-[200px]">{scan}</span>
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">→</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-20 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl tracking-tighter shadow-xl group-hover:scale-110 transition-all">AG</div>
              <h3 className="font-bold text-primary">Intelligent</h3>
              <p className="text-foreground/70 text-[10px] leading-relaxed max-w-[150px]">Detect subtle patterns of malicious intent in milliseconds.</p>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white shadow-xl shadow-secondary/20 group-hover:scale-110 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 className="font-bold text-primary">Advanced</h3>
              <p className="text-foreground/70 text-[10px] leading-relaxed max-w-[150px]">Multiple layers of heuristic protection for your safety.</p>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary shadow-xl shadow-accent/20 group-hover:scale-110 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3 className="font-bold text-primary">Real-time</h3>
              <p className="text-foreground/70 text-[10px] leading-relaxed max-w-[150px]">Get clear, actionable risk assessments immediately.</p>
            </div>
          </div>

        </div>
      </main>

      <footer className="w-full py-10 flex flex-col items-center gap-4 text-secondary/30">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase">&copy; 2026 Anti Gravity Coffee Craft</p>
      </footer>
    </div>
  );
}
