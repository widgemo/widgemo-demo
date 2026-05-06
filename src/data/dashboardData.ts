import type { Entity } from '@widgemo/widgemo-core';

export type DashboardPeriod = '30d' | 'quarter' | 'year';
export type DashboardTeam = 'all' | 'platform' | 'delivery' | 'growth';

export interface ThroughputPoint extends Entity {
  label: string;
  planned: number;
  completed: number;
  spillover: number;
  team: string;
  focus: string;
}

export interface AllocationPoint extends Entity {
  workstream: string;
  count: number;
}

export interface InitiativeRow extends Entity {
  initiative: string;
  teamKey: DashboardTeam;
  team: string;
  owner: string;
  phase: string;
  status: string;
  confidence: number;
  budget: number;
  dueDate: string;
  risk: string;
  milestone: string;
}

export interface BoardCard extends Entity {
  id: string;
  title: string;
  initiative: string;
  teamKey: DashboardTeam;
  team: string;
  owner: string;
  eta: string;
  lane: 'ready' | 'on-track' | 'watch' | 'blocked';
  priority: string;
}

export interface HighlightSlide extends Entity {
  headline: string;
  detail: string;
  owner: string;
  dueText: string;
  signal: string;
  initiative: string;
  teamKey: DashboardTeam;
}

const periodMultipliers: Record<DashboardPeriod, number> = {
  '30d': 0.92,
  quarter: 1,
  year: 1.08,
};

const periodPrefixes: Record<DashboardPeriod, string> = {
  '30d': 'W',
  quarter: 'S',
  year: 'Q',
};

const teamLabels: Record<DashboardTeam, string> = {
  all: 'All teams',
  platform: 'Platform',
  delivery: 'Delivery',
  growth: 'Growth',
};

const kpiSnapshot: Record<DashboardTeam, Record<DashboardPeriod, {
  streams: number;
  confidence: number;
  budgetVariance: number;
  blocked: number;
}>> = {
  all: {
    '30d': { streams: 11, confidence: 82, budgetVariance: -2, blocked: 4 },
    quarter: { streams: 14, confidence: 86, budgetVariance: -1, blocked: 3 },
    year: { streams: 17, confidence: 84, budgetVariance: 2, blocked: 5 },
  },
  platform: {
    '30d': { streams: 4, confidence: 88, budgetVariance: -1, blocked: 1 },
    quarter: { streams: 5, confidence: 91, budgetVariance: 0, blocked: 1 },
    year: { streams: 6, confidence: 89, budgetVariance: 1, blocked: 2 },
  },
  delivery: {
    '30d': { streams: 4, confidence: 79, budgetVariance: -3, blocked: 2 },
    quarter: { streams: 5, confidence: 83, budgetVariance: -2, blocked: 1 },
    year: { streams: 6, confidence: 80, budgetVariance: 3, blocked: 2 },
  },
  growth: {
    '30d': { streams: 3, confidence: 76, budgetVariance: -4, blocked: 1 },
    quarter: { streams: 4, confidence: 81, budgetVariance: -2, blocked: 1 },
    year: { streams: 5, confidence: 79, budgetVariance: 4, blocked: 1 },
  },
};

const throughputBase: Record<DashboardTeam, Array<{
  planned: number;
  completed: number;
  spillover: number;
  focus: string;
}>> = {
  all: [
    { planned: 44, completed: 39, spillover: 5, focus: 'Stabilize deployment automation' },
    { planned: 48, completed: 44, spillover: 4, focus: 'Launch approval cockpit' },
    { planned: 46, completed: 43, spillover: 3, focus: 'Harden vendor sync workflows' },
    { planned: 50, completed: 46, spillover: 4, focus: 'Reduce incident triage latency' },
    { planned: 52, completed: 49, spillover: 3, focus: 'Improve stakeholder reporting' },
    { planned: 55, completed: 51, spillover: 4, focus: 'Cut manual release handoffs' },
  ],
  platform: [
    { planned: 16, completed: 15, spillover: 1, focus: 'Control plane resiliency' },
    { planned: 17, completed: 16, spillover: 1, focus: 'CI queue balancing' },
    { planned: 18, completed: 16, spillover: 2, focus: 'Deployment guardrails' },
    { planned: 19, completed: 18, spillover: 1, focus: 'Observability refresh' },
    { planned: 20, completed: 19, spillover: 1, focus: 'Release automation' },
    { planned: 21, completed: 20, spillover: 1, focus: 'Schema drift prevention' },
  ],
  delivery: [
    { planned: 14, completed: 11, spillover: 3, focus: 'Partner onboarding queue' },
    { planned: 15, completed: 13, spillover: 2, focus: 'Migration control tower' },
    { planned: 15, completed: 12, spillover: 3, focus: 'Executive reporting export' },
    { planned: 16, completed: 13, spillover: 3, focus: 'Customer rollout checklist' },
    { planned: 17, completed: 15, spillover: 2, focus: 'Escalation automation' },
    { planned: 18, completed: 15, spillover: 3, focus: 'SLA breach routing' },
  ],
  growth: [
    { planned: 12, completed: 10, spillover: 2, focus: 'Expansion funnel instrumentation' },
    { planned: 13, completed: 11, spillover: 2, focus: 'Renewal assist prompts' },
    { planned: 13, completed: 10, spillover: 3, focus: 'Partner offer analytics' },
    { planned: 14, completed: 12, spillover: 2, focus: 'Forecast accuracy uplift' },
    { planned: 15, completed: 13, spillover: 2, focus: 'At-risk account routing' },
    { planned: 15, completed: 14, spillover: 1, focus: 'Marketing attribution repair' },
  ],
};

const allocationMix: Record<DashboardTeam, AllocationPoint[]> = {
  all: [
    { workstream: 'Delivery', count: 34 },
    { workstream: 'Platform', count: 29 },
    { workstream: 'Risk', count: 14 },
    { workstream: 'Growth', count: 23 },
  ],
  platform: [
    { workstream: 'Reliability', count: 12 },
    { workstream: 'Automation', count: 9 },
    { workstream: 'Observability', count: 7 },
    { workstream: 'Compliance', count: 5 },
  ],
  delivery: [
    { workstream: 'Rollouts', count: 13 },
    { workstream: 'Migrations', count: 9 },
    { workstream: 'Ops Support', count: 7 },
    { workstream: 'Escalations', count: 6 },
  ],
  growth: [
    { workstream: 'Expansion', count: 9 },
    { workstream: 'Forecasting', count: 7 },
    { workstream: 'Lifecycle', count: 5 },
    { workstream: 'Attribution', count: 4 },
  ],
};

const initiatives: InitiativeRow[] = [
  {
    initiative: 'Migration control tower',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Ava Chen',
    phase: 'Build',
    status: 'On Track',
    confidence: 91,
    budget: 640000,
    dueDate: '2026-06-28',
    risk: 'Low',
    milestone: 'Partner pilot wave',
  },
  {
    initiative: 'Executive reporting export',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Jordan Reed',
    phase: 'Pilot',
    status: 'Watch',
    confidence: 72,
    budget: 380000,
    dueDate: '2026-06-15',
    risk: 'Medium',
    milestone: 'CFO dry run',
  },
  {
    initiative: 'Release automation hardening',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Mina Patel',
    phase: 'Scale',
    status: 'On Track',
    confidence: 94,
    budget: 520000,
    dueDate: '2026-07-10',
    risk: 'Low',
    milestone: 'Global rollout gate',
  },
  {
    initiative: 'Control plane resiliency',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Theo Alvarez',
    phase: 'Build',
    status: 'Blocked',
    confidence: 58,
    budget: 710000,
    dueDate: '2026-06-22',
    risk: 'High',
    milestone: 'Failover rehearsal',
  },
  {
    initiative: 'Forecast accuracy uplift',
    teamKey: 'growth',
    team: 'Growth',
    owner: 'Naomi Brooks',
    phase: 'Pilot',
    status: 'On Track',
    confidence: 84,
    budget: 290000,
    dueDate: '2026-06-19',
    risk: 'Low',
    milestone: 'RevOps sign-off',
  },
  {
    initiative: 'At-risk account routing',
    teamKey: 'growth',
    team: 'Growth',
    owner: 'Leo Grant',
    phase: 'Build',
    status: 'At Risk',
    confidence: 63,
    budget: 345000,
    dueDate: '2026-06-11',
    risk: 'High',
    milestone: 'Playbook QA',
  },
  {
    initiative: 'Stakeholder SLA cockpit',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Priya Singh',
    phase: 'Discover',
    status: 'Watch',
    confidence: 69,
    budget: 210000,
    dueDate: '2026-07-02',
    risk: 'Medium',
    milestone: 'Design review',
  },
  {
    initiative: 'Schema drift prevention',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Samir Holt',
    phase: 'Scale',
    status: 'On Track',
    confidence: 89,
    budget: 410000,
    dueDate: '2026-07-18',
    risk: 'Low',
    milestone: 'Change guardrails enabled',
  },
];

const boardCards: BoardCard[] = [
  {
    id: 'board-1',
    title: 'Lock pilot migration checklist',
    initiative: 'Migration control tower',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Ava Chen',
    eta: '2 days',
    lane: 'ready',
    priority: 'High',
  },
  {
    id: 'board-2',
    title: 'Backfill export reconciliation cases',
    initiative: 'Executive reporting export',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Jordan Reed',
    eta: '4 days',
    lane: 'watch',
    priority: 'Medium',
  },
  {
    id: 'board-3',
    title: 'Finish deployment rollback automation',
    initiative: 'Release automation hardening',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Mina Patel',
    eta: '1 day',
    lane: 'on-track',
    priority: 'High',
  },
  {
    id: 'board-4',
    title: 'Complete failover dependency audit',
    initiative: 'Control plane resiliency',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Theo Alvarez',
    eta: 'Blocked',
    lane: 'blocked',
    priority: 'Critical',
  },
  {
    id: 'board-5',
    title: 'Finalize forecast confidence rubric',
    initiative: 'Forecast accuracy uplift',
    teamKey: 'growth',
    team: 'Growth',
    owner: 'Naomi Brooks',
    eta: '3 days',
    lane: 'on-track',
    priority: 'Medium',
  },
  {
    id: 'board-6',
    title: 'Repair churn signal false positives',
    initiative: 'At-risk account routing',
    teamKey: 'growth',
    team: 'Growth',
    owner: 'Leo Grant',
    eta: '5 days',
    lane: 'watch',
    priority: 'High',
  },
  {
    id: 'board-7',
    title: 'Align SLA thresholds with support ops',
    initiative: 'Stakeholder SLA cockpit',
    teamKey: 'delivery',
    team: 'Delivery',
    owner: 'Priya Singh',
    eta: '6 days',
    lane: 'ready',
    priority: 'Medium',
  },
  {
    id: 'board-8',
    title: 'Enable automatic schema rollback alerts',
    initiative: 'Schema drift prevention',
    teamKey: 'platform',
    team: 'Platform',
    owner: 'Samir Holt',
    eta: '2 days',
    lane: 'on-track',
    priority: 'Low',
  },
];

const highlights: HighlightSlide[] = [
  {
    headline: 'Pilot migration wave is ready to open',
    detail: 'Delivery has all launch blockers cleared except partner sign-off paperwork. Keep the cutover dry run on Thursday.',
    owner: 'Ava Chen',
    dueText: 'Dry run Thursday',
    signal: 'Green',
    initiative: 'Migration control tower',
    teamKey: 'delivery',
  },
  {
    headline: 'Reporting export needs executive review',
    detail: 'The finance QA pass found two reconciliation gaps. The team needs one more sprint before a confident CFO walkthrough.',
    owner: 'Jordan Reed',
    dueText: 'Review next Monday',
    signal: 'Amber',
    initiative: 'Executive reporting export',
    teamKey: 'delivery',
  },
  {
    headline: 'Resiliency program is blocked on vendor failover access',
    detail: 'Platform cannot complete the rehearsal until infra vendors unlock standby traffic replay in staging.',
    owner: 'Theo Alvarez',
    dueText: 'Escalation open',
    signal: 'Red',
    initiative: 'Control plane resiliency',
    teamKey: 'platform',
  },
  {
    headline: 'Release automation is compounding team velocity',
    detail: 'Rollback automation and schema guardrails are reducing manual handoffs. Platform is the healthiest workstream this quarter.',
    owner: 'Mina Patel',
    dueText: 'Scale window in 2 weeks',
    signal: 'Green',
    initiative: 'Release automation hardening',
    teamKey: 'platform',
  },
  {
    headline: 'Forecast accuracy uplift is ready for RevOps validation',
    detail: 'Growth has enough signal stability to put the revised model in front of leadership, assuming final dashboard QA holds.',
    owner: 'Naomi Brooks',
    dueText: 'Validation Friday',
    signal: 'Green',
    initiative: 'Forecast accuracy uplift',
    teamKey: 'growth',
  },
  {
    headline: 'At-risk routing still needs cleaner churn signals',
    detail: 'False positives are high for enterprise renewals. Until the routing model settles, keep escalation coverage staffed manually.',
    owner: 'Leo Grant',
    dueText: 'Model tuning in progress',
    signal: 'Amber',
    initiative: 'At-risk account routing',
    teamKey: 'growth',
  },
];

export const dashboardPeriodLabels: Record<DashboardPeriod, string> = {
  '30d': 'Last 30 days',
  quarter: 'This quarter',
  year: 'Rolling 12 months',
};

export const dashboardTeamLabels: Record<DashboardTeam, string> = teamLabels;

const clampPercent = (value: number): number => Math.max(0, Math.min(100, Math.round(value)));

export const getDashboardKpis = (period: DashboardPeriod, team: DashboardTeam): Entity[] => {
  const snapshot = kpiSnapshot[team][period];
  const blockedProgress = clampPercent(100 - snapshot.blocked * 18);
  const budgetProgress = clampPercent(100 + snapshot.budgetVariance * 6);

  return [
    {
      metric: 'Active streams',
      value: snapshot.streams.toString(),
      note: period === 'year' ? 'Programs shipping this year' : 'Programs shipping now',
      status: snapshot.streams >= 5 ? 'Healthy' : 'Focused',
      progress: clampPercent(snapshot.streams * 8),
    },
    {
      metric: 'Delivery confidence',
      value: `${snapshot.confidence}%`,
      note: 'Weighted by milestone confidence',
      status: snapshot.confidence >= 85 ? 'Healthy' : snapshot.confidence >= 72 ? 'Watch' : 'Attention',
      progress: snapshot.confidence,
    },
    {
      metric: 'Budget variance',
      value: `${snapshot.budgetVariance > 0 ? '+' : ''}${snapshot.budgetVariance}%`,
      note: 'Variance versus approved plan',
      status: Math.abs(snapshot.budgetVariance) <= 1 ? 'Healthy' : Math.abs(snapshot.budgetVariance) <= 3 ? 'Watch' : 'Attention',
      progress: budgetProgress,
    },
    {
      metric: 'Blocked work',
      value: `${snapshot.blocked}`,
      note: 'Items requiring escalation or external unblock',
      status: snapshot.blocked <= 1 ? 'Healthy' : snapshot.blocked <= 3 ? 'Watch' : 'Attention',
      progress: blockedProgress,
    },
  ];
};

export const getThroughputData = (period: DashboardPeriod, team: DashboardTeam): ThroughputPoint[] => {
  const sequence = throughputBase[team];
  const multiplier = periodMultipliers[period];
  const prefix = periodPrefixes[period];

  return sequence.map((item, index) => ({
    label: `${prefix}${index + 1}`,
    planned: Math.round(item.planned * multiplier),
    completed: Math.round(item.completed * multiplier),
    spillover: Math.max(0, Math.round(item.spillover * multiplier)),
    team: teamLabels[team],
    focus: item.focus,
  }));
};

export const getAllocationData = (team: DashboardTeam): AllocationPoint[] => allocationMix[team];

export const getPortfolioRows = (team: DashboardTeam): InitiativeRow[] =>
  initiatives.filter((item) => team === 'all' || item.teamKey === team);

export const getBoardCards = (team: DashboardTeam): BoardCard[] =>
  boardCards.filter((item) => team === 'all' || item.teamKey === team);

export const getHighlights = (team: DashboardTeam, focusedInitiative: string | null): HighlightSlide[] => {
  const byTeam = highlights.filter((item) => team === 'all' || item.teamKey === team);
  if (!focusedInitiative) {
    return byTeam;
  }

  const focused = byTeam.filter((item) => item.initiative === focusedInitiative);
  return focused.length > 0 ? focused : byTeam;
};