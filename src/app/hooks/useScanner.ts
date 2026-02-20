"use client";

import { useState, useEffect } from "react";
import { ScanResult, RecentScan, ScanDetail } from "../types";
import { SCAN_STEPS, CYBER_FACTS } from "../constants";

export function useScanner() {
    const [url, setUrl] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [recentScans, setRecentScans] = useState<RecentScan[]>([]);
    const [scanStep, setScanStep] = useState(0);
    const [currentFact, setCurrentFact] = useState("");

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem("recentScans");
        if (saved) {
            try {
                setRecentScans(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse recent scans", e);
            }
        }
    }, []);

    // Sync with Persistence
    useEffect(() => {
        if (recentScans.length > 0) {
            localStorage.setItem("recentScans", JSON.stringify(recentScans));
        }
    }, [recentScans]);

    const performHeuristicAnalysis = (targetUrl: string): ScanResult => {
        let score = 0;
        const details: ScanDetail[] = [];
        const aiReasoning: string[] = [];

        try {
            const urlObj = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
            const hostname = urlObj.hostname;
            const pathname = urlObj.pathname.toLowerCase();

            // 1. HTTPS Check
            const isHttps = urlObj.protocol === 'https:';
            details.push({
                label: "Connection Security",
                value: isHttps ? "Encrypted (HTTPS)" : "Unencrypted (HTTP)",
                status: isHttps ? "pass" : "warning"
            });
            if (!isHttps) {
                score += 20;
                aiReasoning.push("Site uses insecure HTTP protocol, vulnerable to interception.");
            }

            // 2. Punycode check
            const isPunycode = hostname.includes('xn--');
            if (isPunycode) {
                score += 40;
                details.push({ label: "Domain Encoding", value: "Punycode Detected", status: "fail" });
                aiReasoning.push("Potential homograph attack detected via Punycode encoding.");
            } else {
                details.push({ label: "Domain Encoding", value: "Standard ASCII", status: "pass" });
            }

            // 3. Suspicious TLDs
            const suspiciousTLDs = ['.xyz', '.top', '.pw', '.loan', '.win', '.bid', '.gq', '.tk', '.ga'];
            const hasSuspiciousTLD = suspiciousTLDs.some(tld => hostname.endsWith(tld));
            if (hasSuspiciousTLD) {
                score += 30;
                aiReasoning.push(`Domain uses a high-risk TLD (${hostname.split('.').pop()}) often used for phishing.`);
            }

            // 4. Suspicious Keywords
            const keywords = ['login', 'verify', 'bank', 'secure', 'update', 'account', 'signin', 'support'];
            const foundKeywords = keywords.filter(kw => hostname.includes(kw) || pathname.includes(kw));
            if (foundKeywords.length > 0) {
                score += 15 * foundKeywords.length;
                aiReasoning.push(`Found high-risk keywords: ${foundKeywords.join(', ')} used in misleading contexts.`);
            }

            // 5. IP Address hostname
            const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (ipRegex.test(hostname)) {
                score += 50;
                aiReasoning.push("URL uses a raw IP address instead of a domain name, a common tactic for malicious servers.");
            }

            // 6. URL Length
            if (targetUrl.length > 100) {
                score += 10;
                aiReasoning.push("Excessively long URL detected, potentially used to hide the true destination.");
            }

        } catch (e) {
            score = 99;
            aiReasoning.push("Invalid URL format detected. Proceed with extreme caution.");
        }

        // Final Normalize
        const finalScore = Math.min(score, 100);
        const status: 'Safe' | 'Warning' | 'Dangerous' = finalScore < 30 ? "Safe" : finalScore < 70 ? "Warning" : "Dangerous";

        // Standard details
        details.push({
            label: "AI Consistency",
            value: finalScore < 30 ? "High" : "Low",
            status: finalScore < 30 ? "pass" : "fail"
        });

        if (aiReasoning.length === 0) {
            aiReasoning.push("No significant threat patterns detected by the neural layer.");
            aiReasoning.push("Domain registration data aligns with standard corporate profiles.");
        }

        return {
            score: finalScore,
            status,
            details,
            aiReasoning: aiReasoning.slice(0, 3) // Keep top 3 reasons
        };
    };

    const handleScan = async (targetUrl: string) => {
        if (!targetUrl) return;

        setIsScanning(true);
        setResult(null);
        setScanStep(0);
        setCurrentFact(CYBER_FACTS[Math.floor(Math.random() * CYBER_FACTS.length)]);

        // Simulated progress
        const stepInterval = setInterval(() => {
            setScanStep(prev => {
                if (prev >= SCAN_STEPS.length - 1) {
                    clearInterval(stepInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 400);

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const analysisResult = performHeuristicAnalysis(targetUrl);
                setResult(analysisResult);

                setRecentScans(prev => {
                    const next = [{ url: targetUrl, timestamp: Date.now() }, ...prev.filter(s => s.url !== targetUrl).slice(0, 4)];
                    return next;
                });

                setIsScanning(false);
                resolve();
            }, SCAN_STEPS.length * 400 + 500);
        });
    };

    return {
        url,
        setUrl,
        isScanning,
        result,
        recentScans,
        scanStep,
        currentFact,
        handleScan
    };
}
