import type { Entity } from '@widgemo/widgemo-core';

export type AccountScope = 'all' | 'personal' | 'business' | 'joint';
export type ForecastHorizon = '7d' | '30d' | '90d';
export type RiskPosture = 'conservative' | 'expected' | 'aggressive';

export const accountScopeLabels: Record<AccountScope, string> = {
  all: 'All Accounts',
  personal: 'Personal',
  business: 'Business',
  joint: 'Joint',
};

export const forecastHorizonLabels: Record<ForecastHorizon, string> = {
  '7d': '7 Days',
  '30d': '30 Days',
  '90d': '90 Days',
};

export const riskPostureLabels: Record<RiskPosture, string> = {
  conservative: 'Conservative',
  expected: 'Expected',
  aggressive: 'Aggressive',
};

type AccountRecord = {
  id: string;
  scope: Exclude<AccountScope, 'all'>;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'brokerage';
  institution: string;
  currentBalance: number;
  availableBalance: number;
  reserveTarget: number;
  dailyBurn: number;
  confidence: number;
};

const BASE_ACCOUNTS: AccountRecord[] = [
  {
    id: 'acc-main-checking',
    scope: 'personal',
    name: 'Main Checking',
    type: 'checking',
    institution: 'North Pine Bank',
    currentBalance: 6420,
    availableBalance: 5910,
    reserveTarget: 4500,
    dailyBurn: 98,
    confidence: 86,
  },
  {
    id: 'acc-high-yield',
    scope: 'personal',
    name: 'High Yield Savings',
    type: 'savings',
    institution: 'Cedar Credit',
    currentBalance: 21340,
    availableBalance: 21340,
    reserveTarget: 18000,
    dailyBurn: 24,
    confidence: 93,
  },
  {
    id: 'acc-ops-checking',
    scope: 'business',
    name: 'Operations Checking',
    type: 'checking',
    institution: 'Foundry Financial',
    currentBalance: 18450,
    availableBalance: 15780,
    reserveTarget: 14000,
    dailyBurn: 210,
    confidence: 78,
  },
  {
    id: 'acc-joint-household',
    scope: 'joint',
    name: 'Joint Household',
    type: 'checking',
    institution: 'North Pine Bank',
    currentBalance: 9150,
    availableBalance: 8725,
    reserveTarget: 7000,
    dailyBurn: 140,
    confidence: 82,
  },
];

type CashEvent = {
  id: string;
  date: string;
  label: string;
  direction: 'inflow' | 'outflow';
  amount: number;
  accountName: string;
  status: 'scheduled' | 'pending' | 'overdue' | 'posted';
  recurring: boolean;
};

const BASE_EVENTS: CashEvent[] = [
  { id: 'evt-payroll-a', date: '2026-05-07', label: 'Payroll Deposit', direction: 'inflow', amount: 3100, accountName: 'Main Checking', status: 'scheduled', recurring: true },
  { id: 'evt-rent', date: '2026-05-08', label: 'Rent + Utilities', direction: 'outflow', amount: -1850, accountName: 'Joint Household', status: 'scheduled', recurring: true },
  { id: 'evt-aws', date: '2026-05-09', label: 'Cloud Subscription', direction: 'outflow', amount: -420, accountName: 'Operations Checking', status: 'pending', recurring: true },
  { id: 'evt-client-invoice', date: '2026-05-10', label: 'Client Invoice #844', direction: 'inflow', amount: 2700, accountName: 'Operations Checking', status: 'scheduled', recurring: false },
  { id: 'evt-credit-card', date: '2026-05-11', label: 'Card Payment AutoPay', direction: 'outflow', amount: -980, accountName: 'Main Checking', status: 'scheduled', recurring: true },
  { id: 'evt-insurance', date: '2026-05-12', label: 'Insurance Premium', direction: 'outflow', amount: -265, accountName: 'Joint Household', status: 'posted', recurring: true },
  { id: 'evt-failed-transfer', date: '2026-05-13', label: 'Reserve Transfer Retry', direction: 'inflow', amount: 750, accountName: 'High Yield Savings', status: 'overdue', recurring: false },
  { id: 'evt-tax-hold', date: '2026-05-14', label: 'Quarterly Tax Hold', direction: 'outflow', amount: -1250, accountName: 'Operations Checking', status: 'pending', recurring: true },
];

type Transaction = {
  id: string;
  postedAt: string;
  merchant: string;
  category: string;
  accountName: string;
  amountSigned: number;
  flowType: 'inflow' | 'outflow' | 'transfer' | 'recurring';
  recurrence: 'none' | 'monthly' | 'biweekly' | 'weekly';
  confidence: number;
  anomalyScore: number;
  tags: string;
};

const BASE_TRANSACTIONS: Transaction[] = [
  { id: 'tx-001', postedAt: '2026-05-06', merchant: 'Metro Grocery', category: 'Food', accountName: 'Joint Household', amountSigned: -142.33, flowType: 'outflow', recurrence: 'weekly', confidence: 92, anomalyScore: 24, tags: 'household, groceries' },
  { id: 'tx-002', postedAt: '2026-05-06', merchant: 'City Transit', category: 'Commute', accountName: 'Main Checking', amountSigned: -58.0, flowType: 'recurring', recurrence: 'monthly', confidence: 88, anomalyScore: 18, tags: 'transport' },
  { id: 'tx-003', postedAt: '2026-05-05', merchant: 'Acme Payroll', category: 'Income', accountName: 'Main Checking', amountSigned: 3100.0, flowType: 'inflow', recurrence: 'biweekly', confidence: 97, anomalyScore: 8, tags: 'salary' },
  { id: 'tx-004', postedAt: '2026-05-05', merchant: 'CloudHost', category: 'Infrastructure', accountName: 'Operations Checking', amountSigned: -420.0, flowType: 'recurring', recurrence: 'monthly', confidence: 83, anomalyScore: 31, tags: 'business, cloud' },
  { id: 'tx-005', postedAt: '2026-05-04', merchant: 'Oak Pharmacy', category: 'Health', accountName: 'Joint Household', amountSigned: -73.25, flowType: 'outflow', recurrence: 'none', confidence: 79, anomalyScore: 44, tags: 'medical' },
  { id: 'tx-006', postedAt: '2026-05-04', merchant: 'InvoiceWire', category: 'Receivables', accountName: 'Operations Checking', amountSigned: 2700.0, flowType: 'inflow', recurrence: 'none', confidence: 75, anomalyScore: 27, tags: 'client-payment' },
  { id: 'tx-007', postedAt: '2026-05-03', merchant: 'Rocket ISP', category: 'Utilities', accountName: 'Main Checking', amountSigned: -86.4, flowType: 'recurring', recurrence: 'monthly', confidence: 93, anomalyScore: 15, tags: 'internet' },
  { id: 'tx-008', postedAt: '2026-05-03', merchant: 'Reserve Sweep', category: 'Transfer', accountName: 'High Yield Savings', amountSigned: 500.0, flowType: 'transfer', recurrence: 'weekly', confidence: 71, anomalyScore: 52, tags: 'savings-transfer' },
  { id: 'tx-009', postedAt: '2026-05-02', merchant: 'Fuel Depot', category: 'Transport', accountName: 'Joint Household', amountSigned: -64.12, flowType: 'outflow', recurrence: 'none', confidence: 84, anomalyScore: 29, tags: 'fuel' },
  { id: 'tx-010', postedAt: '2026-05-02', merchant: 'Studio Software', category: 'Software', accountName: 'Operations Checking', amountSigned: -199.0, flowType: 'recurring', recurrence: 'monthly', confidence: 90, anomalyScore: 23, tags: 'saas' },
];

type AlertRecord = {
  id: string;
  lane: 'Critical' | 'Watch' | 'Info';
  title: string;
  accountName: string;
  severity: 'critical' | 'watch' | 'info';
  predictedImpact: number;
  dueAt: string;
  recommendation: string;
};

const BASE_ALERTS: AlertRecord[] = [
  {
    id: 'al-1',
    lane: 'Critical',
    title: 'Projected dip below reserve floor',
    accountName: 'Main Checking',
    severity: 'critical',
    predictedImpact: -620,
    dueAt: '2026-05-11',
    recommendation: 'Move $900 from savings by Friday.',
  },
  {
    id: 'al-2',
    lane: 'Watch',
    title: 'Recurring spend increased 18% month-over-month',
    accountName: 'Joint Household',
    severity: 'watch',
    predictedImpact: -240,
    dueAt: '2026-05-14',
    recommendation: 'Review grocery and dining subscriptions.',
  },
  {
    id: 'al-3',
    lane: 'Info',
    title: 'Payroll timing drift detected',
    accountName: 'Operations Checking',
    severity: 'info',
    predictedImpact: 0,
    dueAt: '2026-05-10',
    recommendation: 'Shift invoice reminder window by 2 days.',
  },
  {
    id: 'al-4',
    lane: 'Watch',
    title: 'Two transfers failed in 14 days',
    accountName: 'High Yield Savings',
    severity: 'watch',
    predictedImpact: -300,
    dueAt: '2026-05-09',
    recommendation: 'Verify external transfer limit.',
  },
];

type ScenarioRecord = {
  id: string;
  title: string;
  summary: string;
  impactAmount: number;
  confidence: number;
  effort: 'Low' | 'Medium' | 'High';
  status: 'recommended' | 'optional' | 'watch';
};

const BASE_SCENARIOS: ScenarioRecord[] = [
  {
    id: 'sc-1',
    title: 'Shift card autopay by 3 days',
    summary: 'Moves major outflow after payroll deposit and lowers minimum projected balance risk.',
    impactAmount: 980,
    confidence: 88,
    effort: 'Low',
    status: 'recommended',
  },
  {
    id: 'sc-2',
    title: 'Temporarily reduce reserve sweep',
    summary: 'Keeps additional liquidity in checking for 2 weeks while preserving reserve trend.',
    impactAmount: 450,
    confidence: 81,
    effort: 'Medium',
    status: 'optional',
  },
  {
    id: 'sc-3',
    title: 'Pause two non-essential subscriptions',
    summary: 'Reduces recurring monthly burn and improves 30-day runway confidence.',
    impactAmount: 140,
    confidence: 76,
    effort: 'Low',
    status: 'watch',
  },
];

const horizonDaysMap: Record<ForecastHorizon, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

const postureMultiplierMap: Record<RiskPosture, number> = {
  conservative: 1.2,
  expected: 1,
  aggressive: 0.85,
};

const scopeFilter = <T extends { scope?: Exclude<AccountScope, 'all'>; accountName?: string }>(
  rows: T[],
  accountScope: AccountScope,
): T[] => {
  if (accountScope === 'all') return rows;

  const accountNamesForScope = BASE_ACCOUNTS.filter((account) => account.scope === accountScope).map((account) => account.name);
  return rows.filter((row) => {
    if ('scope' in row && row.scope) return row.scope === accountScope;
    if ('accountName' in row && row.accountName) return accountNamesForScope.includes(row.accountName);
    return true;
  });
};

export const getCashflowKpis = (
  accountScope: AccountScope,
  horizon: ForecastHorizon,
  riskPosture: RiskPosture,
): Entity[] => {
  const accounts = scopeFilter(BASE_ACCOUNTS, accountScope);
  const postureMultiplier = postureMultiplierMap[riskPosture];
  const horizonDays = horizonDaysMap[horizon];

  const availableCash = accounts.reduce((sum, account) => sum + account.availableBalance, 0);
  const reserveTarget = accounts.reduce((sum, account) => sum + account.reserveTarget, 0);
  const dailyBurn = accounts.reduce((sum, account) => sum + account.dailyBurn, 0) * postureMultiplier;
  const runwayDays = dailyBurn > 0 ? Math.max(1, Math.floor(availableCash / dailyBurn)) : 99;
  const reserveGap = availableCash - reserveTarget;
  const confidence = Math.round(accounts.reduce((sum, account) => sum + account.confidence, 0) / Math.max(accounts.length, 1));
  const projectedHorizonBuffer = availableCash - dailyBurn * Math.min(horizonDays, 30);

  return [
    {
      id: 'kpi-available-cash',
      title: 'Available Cash',
      value: Math.round(availableCash),
      delta: Math.round(projectedHorizonBuffer / 30),
      healthScore: availableCash > reserveTarget ? 84 : 62,
      confidence,
      status: availableCash > reserveTarget ? 'healthy' : 'watch',
    },
    {
      id: 'kpi-runway',
      title: 'Runway',
      value: runwayDays,
      delta: reserveGap,
      healthScore: Math.min(100, Math.max(12, runwayDays)),
      confidence: Math.min(98, confidence + 4),
      status: runwayDays >= 45 ? 'healthy' : runwayDays >= 25 ? 'watch' : 'critical',
      unit: 'days',
    },
    {
      id: 'kpi-reserve-gap',
      title: 'Reserve Gap',
      value: reserveGap,
      delta: Math.round(reserveGap / Math.max(1, accounts.length)),
      healthScore: reserveGap >= 0 ? 88 : 48,
      confidence: Math.max(52, confidence - 6),
      status: reserveGap >= 0 ? 'healthy' : 'critical',
    },
    {
      id: 'kpi-daily-burn',
      title: 'Daily Burn',
      value: Math.round(dailyBurn),
      delta: -Math.round(dailyBurn * 0.08),
      healthScore: 100 - Math.min(95, Math.round(dailyBurn / 12)),
      confidence,
      status: dailyBurn <= 250 ? 'healthy' : 'watch',
    },
  ];
};

export const getForecastPoints = (
  accountScope: AccountScope,
  horizon: ForecastHorizon,
  riskPosture: RiskPosture,
): Entity[] => {
  const accounts = scopeFilter(BASE_ACCOUNTS, accountScope);
  const postureMultiplier = postureMultiplierMap[riskPosture];
  const horizonDays = horizonDaysMap[horizon];
  const pointCount = horizon === '7d' ? 7 : horizon === '30d' ? 10 : 14;
  const stride = Math.max(1, Math.floor(horizonDays / pointCount));

  const checkingBase = accounts.filter((a) => a.type === 'checking').reduce((sum, a) => sum + a.currentBalance, 0);
  const savingsBase = accounts.filter((a) => a.type === 'savings').reduce((sum, a) => sum + a.currentBalance, 0);
  const reserveFloor = accounts.reduce((sum, a) => sum + a.reserveTarget, 0);

  return Array.from({ length: pointCount }).map((_, index) => {
    const day = (index + 1) * stride;
    const seasonalWave = Math.sin(index / 2.2) * 220;
    const outflowPulse = (index % 4 === 2 ? -360 : 0) * postureMultiplier;

    const checkingProjected = Math.round(checkingBase - day * 58 * postureMultiplier + seasonalWave + outflowPulse);
    const savingsProjected = Math.round(savingsBase - day * 12 * postureMultiplier + seasonalWave * 0.25);
    const reserveProjected = Math.round(reserveFloor - day * 7 * postureMultiplier + seasonalWave * 0.15);

    return {
      id: `forecast-${day}`,
      label: `D${day}`,
      checkingProjected,
      savingsProjected,
      reserveFloor: reserveProjected,
      confidence: Math.max(52, 94 - index * 2 - (riskPosture === 'aggressive' ? 6 : 0)),
      projectedMin: Math.min(checkingProjected, reserveProjected),
    };
  });
};

export const getCashEvents = (
  accountScope: AccountScope,
  horizon: ForecastHorizon,
): Entity[] => {
  const horizonDays = horizonDaysMap[horizon];
  const rows = scopeFilter(BASE_EVENTS, accountScope)
    .map((event) => ({ ...event }))
    .slice(0, horizonDays <= 7 ? 5 : horizonDays <= 30 ? 8 : BASE_EVENTS.length);

  let runningBalance = 9200;
  return rows.map((event, index) => {
    runningBalance += event.amount;
    return {
      ...event,
      id: `${event.id}-${index}`,
      runningBalance,
      dayOffset: index + 1,
    };
  });
};

export const getTransactions = (
  accountScope: AccountScope,
  riskPosture: RiskPosture,
): Entity[] => {
  const postureAdjustment = riskPosture === 'aggressive' ? 9 : riskPosture === 'conservative' ? -6 : 0;

  return scopeFilter(BASE_TRANSACTIONS, accountScope).map((tx, index) => ({
    ...tx,
    id: `${tx.id}-${index}`,
    anomalyScore: Math.max(0, Math.min(100, tx.anomalyScore + postureAdjustment)),
  }));
};

export const getAlerts = (
  accountScope: AccountScope,
  riskPosture: RiskPosture,
): Entity[] => {
  const rows = scopeFilter(BASE_ALERTS, accountScope).map((alert, index) => ({
    ...alert,
    id: `${alert.id}-${index}`,
  }));

  if (riskPosture === 'aggressive') {
    rows.push({
      id: 'al-extra-aggressive',
      lane: 'Critical',
      title: 'Forecast confidence dropped below 60%',
      accountName: 'Main Checking',
      severity: 'critical',
      predictedImpact: -410,
      dueAt: '2026-05-12',
      recommendation: 'Reduce discretionary spend window this week.',
    });
  }

  return rows;
};

export const getScenarios = (
  _accountScope: AccountScope,
  horizon: ForecastHorizon,
  riskPosture: RiskPosture,
): Entity[] => {
  const horizonBoost = horizon === '90d' ? 1.15 : horizon === '30d' ? 1 : 0.9;
  const postureBoost = riskPosture === 'aggressive' ? 1.1 : riskPosture === 'conservative' ? 0.85 : 1;

  return BASE_SCENARIOS.map((scenario, index) => ({
    ...scenario,
    id: `${scenario.id}-${index}`,
    impactAmount: Math.round(scenario.impactAmount * horizonBoost * postureBoost),
    confidence: Math.max(52, Math.min(98, scenario.confidence + (horizon === '7d' ? 4 : 0))),
  }));
};
