"use client";

import { useEffect, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "./components/Navbar";
import { useScanner } from "./hooks/useScanner";
import { ScannerHero, ScanResultCard } from "./components/Scanner/ScannerComponents";
import { RecentScans, FeatureGrid } from "./components/Scanner/MiscComponents";
import { BatchScanner } from "./components/Scanner/BatchScanner";
import SecurityGlossary from "./components/Scanner/SecurityGlossary";
import { LiveThreatFeed } from "./components/Scanner/LiveThreatFeed";

function ScannerContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'simple' | 'batch'>('simple');
  const {
    url,
    setUrl,
    isScanning,
    result,
    recentScans,
    scanStep,
    currentFact,
    handleScan
  } = useScanner();

  // Handle shared URLs
  useEffect(() => {
    const sharedUrl = searchParams.get("url") || searchParams.get("text");
    if (sharedUrl && !isScanning && !result) {
      setUrl(sharedUrl);
      setMode('simple');
      handleScan(sharedUrl);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-12 text-center">

      {/* Mode Toggle */}
      <div className="flex p-1.5 bg-zinc-100 rounded-full w-fit">
        <button
          onClick={() => setMode('simple')}
          className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'simple' ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:text-primary/60'
            }`}
        >
          Intelligence
        </button>
        <button
          onClick={() => setMode('batch')}
          className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'batch' ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:text-primary/60'
            }`}
        >
          Batch Engine
        </button>
      </div>

      {mode === 'simple' ? (
        <>
          <ScannerHero
            url={url}
            setUrl={setUrl}
            isScanning={isScanning}
            onScan={() => handleScan(url)}
            scanStep={scanStep}
            currentFact={currentFact}
          />
          {result && <ScanResultCard result={result} />}
          <RecentScans
            recentScans={recentScans}
            onSelect={(selectedUrl) => {
              setUrl(selectedUrl);
              handleScan(selectedUrl);
            }}
          />
        </>
      ) : (
        <BatchScanner />
      )}

      {/* Security Tips Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10 mt-32 text-left">
        <div className="bg-accent/10 p-12 rounded-[50px] border border-accent/20">
          <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tighter">Stay Safe Online</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-6">Our security experts recommend these simple steps to protect your data while browsing the web.</p>
          <ul className="space-y-3">
            {["Always check for HTTPS", "Never click unknown SMS links", "Verify sender identity twice"].map(tip => (
              <li key={tip} className="flex gap-3 text-xs font-bold text-primary uppercase tracking-widest">
                <span className="text-accent">●</span> {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center p-6">
          <h2 className="text-5xl font-black text-primary leading-tight mb-4">CYBER<br />RELIANCE</h2>
          <p className="text-sm text-foreground/60 mb-8 italic leading-relaxed">
            &quot;The best defense is a proactive mind. We provide the tools, you provide the intuition.&quot;
          </p>
          <button className="w-fit px-10 py-4 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-xl shadow-primary/10">
            Learn More
          </button>
        </div>
      </div>

      <FeatureGrid />
      <SecurityGlossary />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      <LiveThreatFeed />

      <div className="absolute top-[-10%] right-[-5%] w-[15vw] h-[60vh] bg-primary opacity-5 capsule-shape -z-10 animate-blob"></div>
      <div className="absolute top-[20%] right-[12%] w-[12vw] h-[80vh] bg-secondary opacity-10 capsule-shape -z-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[18vw] h-[50vh] bg-accent opacity-20 pill -z-10 animate-blob animation-delay-4000"></div>

      {/* Decorative Neural Grid */}
      <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #2D3E33 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>

      <main className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <Suspense fallback={<div className="text-primary font-bold animate-pulse uppercase tracking-widest text-xs">Initializing Neural Engine...</div>}>
          <ScannerContent />
        </Suspense>
      </main>

      <footer className="w-full py-32 flex flex-col items-center gap-4 text-secondary/30">
        <p className="text-[10px] font-black tracking-[0.8em] uppercase">&copy; 2026 LINK Security Engine</p>
      </footer>
    </div>
  );
}
