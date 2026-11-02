import { useState, useEffect, useCallback, useMemo } from 'react';
import { RefreshCw, ExternalLink, Award, CheckCircle2, Flame, TrendingUp, Code2, Calendar } from 'lucide-react';

const USERNAME = 'madhanmohanreddyperam06';
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;
const PRIMARY_API = `https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`;

export interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: Submission[];
  acceptanceRate: number;
}

// Initial cached baseline so section renders immediately with zero layout shift
const INITIAL_DATA: LeetCodeData = {
  totalSolved: 17,
  totalQuestions: 4100,
  easySolved: 15,
  totalEasy: 975,
  mediumSolved: 2,
  totalMedium: 2138,
  hardSolved: 0,
  totalHard: 987,
  ranking: 4950077,
  contributionPoint: 23,
  reputation: 0,
  submissionCalendar: {
    "1791417600": 16,
    "1791504000": 1,
    "1793145600": 7
  },
  recentSubmissions: [
    { title: "To Lower Case", titleSlug: "to-lower-case", timestamp: "1793204981", statusDisplay: "Accepted", lang: "java" },
    { title: "Perfect Number", titleSlug: "perfect-number", timestamp: "1793204315", statusDisplay: "Accepted", lang: "java" },
    { title: "Find the Difference", titleSlug: "find-the-difference", timestamp: "1793202920", statusDisplay: "Accepted", lang: "python3" },
    { title: "Valid Perfect Square", titleSlug: "valid-perfect-square", timestamp: "1793202603", statusDisplay: "Accepted", lang: "java" },
    { title: "Contains Duplicate", titleSlug: "contains-duplicate", timestamp: "1793201856", statusDisplay: "Accepted", lang: "java" },
    { title: "Move Zeroes", titleSlug: "move-zeroes", timestamp: "1791521531", statusDisplay: "Accepted", lang: "java" },
    { title: "Reverse String", titleSlug: "reverse-string", timestamp: "1791486657", statusDisplay: "Accepted", lang: "java" },
    { title: "Single Number II", titleSlug: "single-number-ii", timestamp: "1791485781", statusDisplay: "Accepted", lang: "java" }
  ],
  acceptanceRate: 75.0,
};

const LeetCodeLogo = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

export default function LeetCodeAnalytics() {
  const [data, setData] = useState<LeetCodeData>(INITIAL_DATA);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'activity'>('submissions');
  const [syncStatus, setSyncStatus] = useState<'live' | 'syncing' | 'synced'>('live');

  // Fetch live stats from LeetCode
  const fetchStats = useCallback(async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    try {
      const res = await fetch(PRIMARY_API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      let acTotal = 0;
      let totalSub = 0;
      if (json.matchedUserStats?.acSubmissionNum && json.matchedUserStats?.totalSubmissionNum) {
        const acObj = json.matchedUserStats.acSubmissionNum.find((x: any) => x.difficulty === 'All');
        const totObj = json.matchedUserStats.totalSubmissionNum.find((x: any) => x.difficulty === 'All');
        acTotal = acObj?.submissions || 0;
        totalSub = totObj?.submissions || 0;
      }

      const acceptance = totalSub > 0 ? parseFloat(((acTotal / totalSub) * 100).toFixed(1)) : 75.0;

      setData({
        totalSolved: json.totalSolved ?? INITIAL_DATA.totalSolved,
        totalQuestions: json.totalQuestions ?? INITIAL_DATA.totalQuestions,
        easySolved: json.easySolved ?? INITIAL_DATA.easySolved,
        totalEasy: json.totalEasy ?? INITIAL_DATA.totalEasy,
        mediumSolved: json.mediumSolved ?? INITIAL_DATA.mediumSolved,
        totalMedium: json.totalMedium ?? INITIAL_DATA.totalMedium,
        hardSolved: json.hardSolved ?? INITIAL_DATA.hardSolved,
        totalHard: json.totalHard ?? INITIAL_DATA.totalHard,
        ranking: json.ranking ?? INITIAL_DATA.ranking,
        contributionPoint: json.contributionPoint ?? INITIAL_DATA.contributionPoint,
        reputation: json.reputation ?? INITIAL_DATA.reputation,
        submissionCalendar: json.submissionCalendar ?? INITIAL_DATA.submissionCalendar,
        recentSubmissions: Array.isArray(json.recentSubmissions) ? json.recentSubmissions : INITIAL_DATA.recentSubmissions,
        acceptanceRate: acceptance,
      });

      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setSyncStatus('synced');
    } catch {
      // Graceful fallback to initial or current state
      setSyncStatus('live');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial live sync on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Compute percentage solved for circle gauge
  const totalPercent = useMemo(() => {
    if (!data.totalQuestions) return 0;
    return Math.min(100, Math.max(0, (data.totalSolved / data.totalQuestions) * 100));
  }, [data.totalSolved, data.totalQuestions]);

  // Circle circumference for gauge
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (circ * Math.max(totalPercent, 0.4)) / 100;

  // Recent calendar heatmap days
  const calendarDays = useMemo(() => {
    const entries = Object.entries(data.submissionCalendar || {});
    const totalSubmissions = entries.reduce((acc, [, v]) => acc + (Number(v) || 0), 0);
    return { entries, totalSubmissions };
  }, [data.submissionCalendar]);

  return (
    <section id="leetcode" className="relative py-24 border-t border-[var(--border)] overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 7%, transparent) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-layout relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-medium">
                Programming
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              LeetCode Analytics
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Real-time competitive programming performance, difficulty breakdowns and algorithm practice synced live from LeetCode.
            </p>
          </div>

          {/* Action Bar: Live Sync Button & LeetCode Link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded border border-[var(--border-bright)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
              title="Fetch fresh real-time data from LeetCode"
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin text-[var(--accent)]' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Live Sync'}</span>
            </button>

            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded bg-[var(--accent)] text-[var(--bg-base)] hover:opacity-90 transition-opacity shadow-sm"
            >
              <LeetCodeLogo size={14} />
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Live sync status banner */}
        <div className="flex items-center justify-between text-xs border border-[var(--border)] bg-[var(--bg-elevated)]/60 backdrop-blur-sm px-4 py-2.5 rounded-lg mb-8 text-[var(--text-secondary)]">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">
              <strong className="text-[var(--text-primary)] font-mono">@{USERNAME}</strong>
            </span>
          </div>
          <div className="text-[11px] tracking-wider uppercase text-[var(--text-tertiary)] flex items-center gap-2">
            <span>Status:</span>
            <span className="text-[var(--accent)] font-medium">
              {syncStatus === 'syncing' ? 'Syncing with API...' : `Synced (${lastSyncTime})`}
            </span>
          </div>
        </div>

        {/* Detailed Analytics: Horizontal Difficulty Breakdown */}
        <div className="py-6 md:py-8">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border)]">
            <h3 className="text-base font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Difficulty Breakdown
            </h3>
            <span className="text-xs text-[var(--text-tertiary)] font-mono">
              {data.totalSolved} Solved
            </span>
          </div>

          {/* Horizontal Layout: Circular Gauge + Stacked Cards */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Circular Gauge */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  {/* Background track */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  {/* Active progress */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={circ}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                    {data.totalSolved}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
                    / {data.totalQuestions}
                  </span>
                  <span className="text-[9px] text-[var(--text-tertiary)] mt-1">
                    Total Solved
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stacked Difficulty Cards */}
            <div className="flex-1 flex flex-col justify-center gap-3">
              {/* Easy Card */}
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Easy</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[var(--text-secondary)]">
                    {data.easySolved} / {data.totalEasy}
                  </span>
                  <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max((data.easySolved / data.totalEasy) * 100, 2)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Medium Card */}
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Med.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[var(--text-secondary)]">
                    {data.mediumSolved} / {data.totalMedium}
                  </span>
                  <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max((data.mediumSolved / data.totalMedium) * 100, 1.5)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Hard Card */}
              <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#DC143C' }} />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Hard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[var(--text-secondary)]">
                    {data.hardSolved} / {data.totalHard}
                  </span>
                  <div className="w-24 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        backgroundColor: '#DC143C',
                        width: `${Math.max((data.hardSolved / data.totalHard) * 100, 0)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom link callout */}
          <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-tertiary)]">Continuous algorithmic growth</span>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Live Feed</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

