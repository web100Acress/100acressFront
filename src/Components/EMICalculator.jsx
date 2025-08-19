import React, { useMemo, useState, useEffect } from "react";

/*
  EMI Calculator (no external deps)
  - Inputs: Loan Amount, Interest Rate (annual %), Term (months/years)
  - Outputs: Monthly EMI, Total Interest, Total Payment
  - Visual: Simple donut (SVG) showing Principal vs Interest
*/

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function useEMICalc({ amount, annualRate, tenure, tenureUnit }) {
  return useMemo(() => {
    const P = Number(amount) || 0; // principal
    const r = (Number(annualRate) || 0) / 12 / 100; // monthly rate
    const n = tenureUnit === "years" ? (Number(tenure) || 0) * 12 : Number(tenure) || 0; // months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, months: n };
    }

    const pow = Math.pow(1 + r, n);
    const emi = (P * r * pow) / (pow - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalInterest, totalPayment, months: n };
  }, [amount, annualRate, tenure, tenureUnit]);
}

function formatINR(x) {
  if (!isFinite(x)) return "₹0";
  try {
    return x.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  } catch (_) {
    return `₹${Math.round(x)}`;
  }
}

function Donut({ principal, interest }) {
  const total = Math.max(principal + interest, 1);
  const pPct = (principal / total) * 100;
  const iPct = 100 - pPct;

  // SVG donut calculations
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const iStroke = (iPct / 100) * circumference;
  const pStroke = (pPct / 100) * circumference;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Payment breakup donut">
      <g transform="rotate(-90 60 60)">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="16" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#ef4444" // interest
          strokeWidth="16"
          strokeDasharray={`${iStroke} ${circumference - iStroke}`}
          strokeLinecap="butt"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#3b82f6" // principal
          strokeWidth="16"
          strokeDasharray={`${pStroke} ${circumference - pStroke}`}
          strokeDashoffset={iStroke}
          strokeLinecap="butt"
        />
      </g>
    </svg>
  );
}

export default function EMICalculator({
  defaultAmount = 1000000,
  defaultAnnualRate = 9,
  defaultTenure = 5,
  defaultTenureUnit = "years", // "months" | "years"
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [annualRate, setAnnualRate] = useState(defaultAnnualRate);
  const [tenure, setTenure] = useState(defaultTenure);
  const [tenureUnit, setTenureUnit] = useState(defaultTenureUnit);
  const [showSchedule, setShowSchedule] = useState(false);
  const [openYears, setOpenYears] = useState({}); // {year: boolean}

  // Keep sliders within sane ranges
  const minAmount = 100000; // 1L
  const maxAmount = 200000000; // 20Cr
  const minRate = 1;
  const maxRate = 20;
  const minYears = 1;
  const maxYears = 30;
  const minMonths = 6;
  const maxMonths = 360;

  useEffect(() => {
    setAmount((a) => clamp(Number(a) || 0, minAmount, maxAmount));
  }, []);

  const { emi, totalInterest, totalPayment, months } = useEMICalc({
    amount,
    annualRate,
    tenure,
    tenureUnit,
  });
  const [emiView, setEmiView] = useState('monthly'); // 'monthly' | 'yearly'

  // Build amortization schedule grouped by year
  const schedule = useMemo(() => {
    const items = [];
    const P = Number(amount) || 0;
    const r = (Number(annualRate) || 0) / 12 / 100;
    const n = tenureUnit === "years" ? (Number(tenure) || 0) * 12 : Number(tenure) || 0;
    if (P <= 0 || r <= 0 || n <= 0) return { years: [], summary: {} };

    let balance = P;
    const startYear = new Date().getFullYear();
    for (let i = 1; i <= n; i++) {
      const interestPart = balance * r;
      const principalPart = Math.min(emi - interestPart, balance);
      const endingBalance = Math.max(balance - principalPart, 0);
      const yearOffset = Math.floor((i - 1) / 12);
      const year = startYear + yearOffset;
      items.push({
        index: i,
        year,
        monthInYear: ((i - 1) % 12) + 1,
        interest: interestPart,
        principal: principalPart,
        emi,
        opening: balance,
        closing: endingBalance,
      });
      balance = endingBalance;
    }

    const map = new Map();
    for (const row of items) {
      if (!map.has(row.year)) map.set(row.year, []);
      map.get(row.year).push(row);
    }
    const years = Array.from(map.entries()).map(([year, rows]) => {
      const totalInterestYear = rows.reduce((s, r) => s + r.interest, 0);
      const totalPrincipalYear = rows.reduce((s, r) => s + r.principal, 0);
      return { year, rows, totalInterestYear, totalPrincipalYear };
    });
    return { years };
  }, [amount, annualRate, tenure, tenureUnit, emi]);

  const handleTenureChange = (val) => {
    const num = Number(val) || 0;
    if (tenureUnit === "years") {
      setTenure(clamp(num, minYears, maxYears));
    } else {
      setTenure(clamp(num, minMonths, maxMonths));
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.panelLeft}>
        <h2 style={styles.title}>Smart <span style={styles.titleAccent}>EMI Calculator</span> for Home Loan</h2>

        <div style={styles.field}> 
          <label style={styles.label}>Loan Amount</label>
          <div style={styles.inputRow}>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(clamp(Number(e.target.value), minAmount, maxAmount))}
              style={styles.slider}
            />
            <input
              type="number"
              value={amount}
              min={minAmount}
              max={maxAmount}
              step={10000}
              onChange={(e) => setAmount(clamp(Number(e.target.value), minAmount, maxAmount))}
              style={styles.number}
            />
          </div>
        </div>

        <div style={styles.field}> 
          <label style={styles.label}>Interest Rate (p.a.)</label>
          <div style={styles.inputRow}>
            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={annualRate}
              onChange={(e) => setAnnualRate(clamp(Number(e.target.value), minRate, maxRate))}
              style={styles.slider}
            />
            <input
              type="number"
              value={annualRate}
              min={minRate}
              max={maxRate}
              step={0.1}
              onChange={(e) => setAnnualRate(clamp(Number(e.target.value), minRate, maxRate))}
              style={styles.number}
            />
          </div>
        </div>

        <div style={styles.field}> 
          <label style={styles.label}>Loan Term</label>
          <div style={{ ...styles.inputRow, gap: 8, flexWrap: "wrap" }}>
            <div style={styles.segmented}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="tenureUnit"
                  checked={tenureUnit === "months"}
                  onChange={() => setTenureUnit("months")}
                />
                <span>Month</span>
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="tenureUnit"
                  checked={tenureUnit === "years"}
                  onChange={() => setTenureUnit("years")}
                />
                <span>Year</span>
              </label>
            </div>

            <input
              type="range"
              min={tenureUnit === "years" ? minYears : minMonths}
              max={tenureUnit === "years" ? maxYears : maxMonths}
              step={1}
              value={tenure}
              onChange={(e) => handleTenureChange(e.target.value)}
              style={{ ...styles.slider, flex: 1 }}
            />
            <input
              type="number"
              value={tenure}
              min={tenureUnit === "years" ? minYears : minMonths}
              max={tenureUnit === "years" ? maxYears : maxMonths}
              step={1}
              onChange={(e) => handleTenureChange(e.target.value)}
              style={styles.number}
            />
          </div>
        </div>
      </div>

      <div style={styles.panelRight}>
        <h3 style={styles.panelTitle}><span role="img" aria-label="chart">📊</span> Break-up of Total Payment</h3>
        <div style={styles.chartRow}>
          {/* Animated circular progress chart */}
          {(() => {
            const radius = 54;
            const C = 2 * Math.PI * radius;
            const principalPct = totalPayment > 0 ? amount / totalPayment : 0;
            const interestPct = totalPayment > 0 ? totalInterest / totalPayment : 0;
            const principalLen = principalPct * C;
            const interestLen = interestPct * C;
            return (
              <div style={styles.chartWrap}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <defs>
                    <linearGradient id="gradPrincipal" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="gradInterest" x1="0" x2="1" y1="1" y2="0">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(70,70)">
                    <circle r={radius} fill="none" stroke="#eee" strokeWidth="16" />
                    <circle
                      r={radius}
                      fill="none"
                      stroke="url(#gradPrincipal)"
                      strokeWidth="16"
                      strokeDasharray={`${principalLen} ${C}`}
                      strokeDashoffset={C * 0.25}
                      transform="rotate(-90)"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 600ms ease' }}
                    />
                    <circle
                      r={radius}
                      fill="none"
                      stroke="url(#gradInterest)"
                      strokeWidth="16"
                      strokeDasharray={`${interestLen} ${C}`}
                      strokeDashoffset={C * (0.25 + principalPct)}
                      transform="rotate(-90)"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 600ms ease' }}
                    />
                  </g>
                </svg>
                <div style={styles.chartCenter}>
                  <div style={styles.chartPct}><span style={{ color: '#3b82f6', fontWeight: 800 }}>{Math.round(principalPct * 100)}%</span> Principal</div>
                  <div style={styles.chartPct}><span style={{ color: '#ef4444', fontWeight: 800 }}>{Math.round(interestPct * 100)}%</span> Interest</div>
                </div>
              </div>
            );
          })()}
          {/* Right side KPIs */}
          <div style={styles.kpiBox}>
            {/* EMI display with calendar icon and Monthly/Yearly toggle */}
            <div style={styles.emiRow}>
              <span style={styles.calIcon}>📅</span>
              <span style={styles.emiBig}>
                {emiView === 'monthly' ? formatINR(emi) : formatINR(emi * 12)}
              </span>
              <span style={styles.emiSub}> per {emiView === 'monthly' ? 'month' : 'year'} for {months >= 12 ? `${Math.round(months / 12)} yrs` : `${months} mos`}</span>
            </div>
            <div style={styles.toggleWrap}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>EMI View:</span>
              <div style={styles.toggleSeg}>
                <button type="button" onClick={() => setEmiView('monthly')} style={{ ...styles.toggleBtn, ...(emiView==='monthly'?styles.toggleActive:{}) }}>Monthly</button>
                <button type="button" onClick={() => setEmiView('yearly')} style={{ ...styles.toggleBtn, ...(emiView==='yearly'?styles.toggleActive:{}) }}>Yearly</button>
              </div>
            </div>
            <div style={styles.twoCol}>
              <div style={styles.colItem}>
                <div style={styles.colLabel}>Principal</div>
                <div style={styles.colValue}>{formatINR(amount)}</div>
              </div>
              <div style={styles.vDivider} />
              <div style={styles.colItem}>
                <div style={styles.colLabel}>Interest</div>
                <div style={styles.colValue}>{formatINR(totalInterest)}</div>
              </div>
            </div>
            <div style={styles.totalChip}>Total Payable <strong style={{ marginLeft: 8 }}>{formatINR(totalPayment)}</strong></div>
          </div>
        </div>
        {/* Legend as pills */}
        <div style={styles.legendPills}>
          <span style={{ ...styles.pill, background: 'rgba(59,130,246,0.12)', color: '#1d4ed8' }}>🔵 Principal</span>
          <span style={{ ...styles.pill, background: 'rgba(239,68,68,0.12)', color: '#b91c1c' }}>🔴 Interest</span>
        </div>

        <button
          type="button"
          style={{ ...styles.cta, ...(showSchedule?styles.ctaActive:{}) }}
          onClick={() => setShowSchedule((v) => !v)}
          aria-expanded={showSchedule}
          aria-controls="emi-schedule"
        >
          <span>{showSchedule ? 'Hide' : 'View'} EMI Schedule</span>
          <span style={{ ...styles.chev, transform: showSchedule ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
        </button>
      </div>
      {showSchedule && (
        <div id="emi-schedule" style={styles.scheduleSection}>
          <div style={styles.scheduleWrap}>
            <div style={styles.scheduleHeader}>View Monthly and Yearly Payments</div>
            <div>
              {schedule.years.map(({ year, rows, totalInterestYear, totalPrincipalYear }) => {
                const open = !!openYears[year];
                return (
                  <div key={year} style={styles.yearCard}>
                    <div style={styles.yearRow}>
                      <div>
                        <div style={styles.yearTitle}>{year}</div>
                        <div style={styles.yearSub}>Monthly payment</div>
                      </div>
                      <div style={styles.yearRight}>
                        <div style={styles.yearTotals}>
                          <span style={{ color: '#3b82f6', fontWeight: 700 }}>{formatINR(totalPrincipalYear)}</span>
                          <span style={{ color: '#ef4444', fontWeight: 700, marginLeft: 10 }}>{formatINR(totalInterestYear)}</span>
                        </div>
                        <button type="button" onClick={() => setOpenYears(s => ({ ...s, [year]: !open }))} style={styles.yearToggle}>
                          {open ? 'Hide' : 'Show'} Monthly Breakup ▾
                        </button>
                      </div>
                    </div>
                    {open && (
                      <div style={styles.monthGrid}>
                        {rows.map(m => (
                          <div key={m.index} style={styles.monthItem}>
                            <div style={styles.monthTitle}>Month {m.monthInYear}</div>
                            <div style={styles.monthLine}><span>EMI</span><span>{formatINR(m.emi)}</span></div>
                            <div style={styles.monthLine}><span>Principal</span><span>{formatINR(m.principal)}</span></div>
                            <div style={styles.monthLine}><span>Interest</span><span>{formatINR(m.interest)}</span></div>
                            <div style={styles.monthLine}><span>Balance</span><span>{formatINR(m.closing)}</span></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 24,
    background: "#ffffff",
    color: "#111827",
    padding: 24,
    borderRadius: 16,
    border: "1px solid #eee",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },
  scheduleSection: {
    gridColumn: "1 / -1",
  },
  chartRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  chartWrap: {
    position: "relative",
    width: 160,
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chartCenter: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  chartPct: { fontSize: 12 },
  kpiBox: {
    flex: 1,
    minWidth: 260,
  },
  emiRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 6,
  },
  calIcon: { fontSize: 18 },
  emiBig: { fontSize: 28, fontWeight: 900, color: "#e53e3e" },
  emiSub: { fontSize: 13, color: "#6b7280", fontWeight: 600 },
  toggleWrap: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  toggleSeg: { display: "inline-flex", border: "1px solid #e5e7eb", borderRadius: 999, overflow: "hidden" },
  toggleBtn: { padding: "6px 10px", fontSize: 12, background: "#fff", border: "none", cursor: "pointer" },
  toggleActive: { background: "#fde8e8", color: "#b91c1c", fontWeight: 700 },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 8px 1fr",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  colItem: {},
  vDivider: { width: 1, height: "100%", background: "#eee", justifySelf: "center" },
  colLabel: { fontSize: 12, color: "#6b7280" },
  colValue: { fontWeight: 800, color: "#111827" },
  totalChip: {
    display: "inline-block",
    marginTop: 6,
    padding: "8px 12px",
    borderRadius: 999,
    background: "linear-gradient(90deg, rgba(229,62,62,0.12), rgba(245,158,11,0.12))",
    color: "#b91c1c",
    fontWeight: 700,
  },
  legendPills: { display: "flex", gap: 8, marginTop: 8, marginBottom: 8, flexWrap: "wrap" },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  panelLeft: {
    padding: 16,
    borderRadius: 12,
    background: "#ffffff",
    border: "1px solid #eee",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  panelRight: {
    padding: 16,
    borderRadius: 12,
    background: "#ffffff",
    border: "1px solid #eee",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    margin: "0 0 16px",
    color: "#111827",
  },
  titleAccent: {
    background: "linear-gradient(90deg, #ef4444, #f59e0b)",
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  },
  field: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111827",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  slider: {
    flex: 1,
  },
  number: {
    width: 160,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#ffffff",
    color: "#111827",
  },
  segmented: {
    display: "inline-flex",
    alignItems: "center",
    background: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 4,
    gap: 6,
  },
  radioLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: 800,
    margin: 0,
    color: "#111827",
  },
  donutRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  kpiPrimary: {
    fontSize: 22,
    fontWeight: 800,
    color: "#111827",
  },
  kpiSub: {
    fontSize: 12,
    opacity: 0.8,
    marginLeft: 6,
    fontWeight: 600,
    color: "#4b5563",
  },
  kpiText: {
    fontSize: 13,
    opacity: 0.9,
    color: "#374151",
  },
  kpiDivider: {
    height: 1,
    background: "#eee",
    margin: "8px 0",
  },
  kpiTotal: {
    fontSize: 16,
    fontWeight: 800,
    color: "#111827",
  },
  legend: {
    display: "flex",
    gap: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  legendItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#374151",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
  cta: {
    padding: "10px 14px",
    background: "linear-gradient(90deg, #ef4444, #f97316)",
    color: "white",
    border: "none",
    borderRadius: 999,
    fontWeight: 800,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(239,68,68,0.3)",
  },
  ctaActive: { boxShadow: "0 0 0 3px rgba(239,68,68,0.2) inset" },
  chev: { display: "inline-block", transition: "transform 200ms ease" },
  scheduleWrap: {
    marginTop: 16,
    border: "1px solid #eee",
    borderRadius: 12,
    overflow: "hidden",
  },
  scheduleHeader: {
    padding: "12px 14px",
    background: "#0f172a",
    color: "#e5e7eb",
    fontWeight: 800,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  yearCard: {
    background: "#0b1220",
    color: "#cbd5e1",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  yearRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
  },
  yearTitle: { fontWeight: 800, color: "#f1f5f9" },
  yearSub: { fontSize: 12, opacity: 0.8 },
  yearRight: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  yearTotals: { fontSize: 12 },
  yearToggle: {
    padding: "8px 10px",
    background: "#1f2937",
    color: "#e5e7eb",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    cursor: "pointer",
  },
  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 12,
    padding: "0 14px 14px",
  },
  monthItem: {
    background: "#111827",
    color: "#e5e7eb",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: 10,
  },
  monthTitle: { fontWeight: 700, marginBottom: 6 },
  monthLine: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginTop: 2,
  },
};
