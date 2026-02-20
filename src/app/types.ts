export interface ScanDetail {
    label: string;
    value: string;
    status: 'pass' | 'fail' | 'warning' | 'neutral';
}

export interface ScanResult {
    score: number;
    status: 'Safe' | 'Warning' | 'Dangerous';
    details: ScanDetail[];
    aiReasoning: string[];
}

export interface RecentScan {
    url: string;
    timestamp: number;
}
