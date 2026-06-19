import React, { useEffect, useMemo, useState } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { Widgemo } from '@widgemo/widgemo-core';
import widgemoExamples from '../../data/widgemoExamples';

interface CuratedTeaserSpec {
  id: string;
  scenario: string;
  modeLabel: string;
  headerTitle: string;
  headerSubtitle?: string;
  footerSubtitle?: string;
  collapseInitialState?: 'expanded';
  fontFamily: string;
  accent: string;
  titleColor: string;
  subtitleColor: string;
  bodyColor: string;
  mutedColor: string;
  headerBackground: string;
  contentBackground: string;
  footerBackground?: string;
  borderColor: string;
  frameBorderRadius: 'square' | 'rounded' | string;
  zoneBorderRadius: string;
  titleFontSize: string;
  bodyFontSize: string;
  cardBackground?: string;
  tableHeaderBackground?: string;
  tableBodyBackground?: string;
  rowAltBackground?: string;
  rowHoverBackground?: string;
  boardBackground?: string;
  columnBackground?: string;
  swimlaneHeaderBackground?: string;
  swimlaneRowBackground?: string;
  actionButtonBackground?: string;
  actionButtonColor?: string;
  actionButtonBorder?: string;
  actionButtonHoverBackground?: string;
  actionButtonHoverBorder?: string;
  centerHeaderTitle?: boolean;
}

const ROTATION_MS = 4200;

const TEASER_CURATION: CuratedTeaserSpec[] = [
  {
    id: 'chart-throughput-mixed',
    scenario: 'Product Delivery Command Center',
    modeLabel: 'Chart',
    headerTitle: 'Release Velocity Snapshot',
    headerSubtitle: 'Weekly completion, commitments, and spillover by squad',
    footerSubtitle: 'Updated 6 minutes ago',
    collapseInitialState: 'expanded',
    fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
    accent: '#2563eb',
    titleColor: '#f8fbff',
    subtitleColor: '#bfdbfe',
    bodyColor: '#e5efff',
    mutedColor: '#9fb3d9',
    headerBackground: '#12233f',
    contentBackground: '#0b1220',
    footerBackground: '#162947',
    borderColor: '#2d4b78',
    frameBorderRadius: 'square',
    zoneBorderRadius: '0px',
    titleFontSize: '1.05rem',
    bodyFontSize: '0.9rem',
    cardBackground: '#101a2d',
    tableHeaderBackground: '#12233f',
    tableBodyBackground: '#0b1220',
    rowAltBackground: '#132038',
    rowHoverBackground: '#1b2d4e',
    actionButtonBackground: '#1d355d',
    actionButtonColor: '#e6f0ff',
    actionButtonBorder: '#4f79b4',
    actionButtonHoverBackground: '#274674',
    actionButtonHoverBorder: '#6c9ade',
  },
  {
    id: 'board-basic',
    scenario: 'Cross-Team Sprint Board',
    modeLabel: 'Board',
    headerTitle: 'Q3 Launch Workboard',
    headerSubtitle: 'Execution lanes across product, design, and GTM',
    collapseInitialState: 'expanded',
    fontFamily: 'Trebuchet MS, Lucida Sans Unicode, Lucida Grande, sans-serif',
    accent: '#0f766e',
    titleColor: '#134e4a',
    subtitleColor: '#1f3f3a',
    bodyColor: '#08201d',
    mutedColor: '#3f6b64',
    headerBackground: '#9ef3de',
    contentBackground: '#e3fbf4',
    footerBackground: '#d2f7ed',
    borderColor: '#5eead4',
    frameBorderRadius: '4px',
    zoneBorderRadius: '4px',
    titleFontSize: '1.02rem',
    bodyFontSize: '0.92rem',
    cardBackground: '#eefcf7',
    tableHeaderBackground: '#c9f5e9',
    tableBodyBackground: '#ebfbf6',
    rowAltBackground: '#ddf5ee',
    rowHoverBackground: '#cdeee4',
    boardBackground: '#e7faf5',
    columnBackground: '#f6fffd',
    swimlaneHeaderBackground: '#d7f5ec',
    swimlaneRowBackground: '#e9fcf6',
    actionButtonBackground: '#eafff8',
    actionButtonColor: '#0f4c46',
    actionButtonBorder: '#4cbcab',
    actionButtonHoverBackground: '#d6f9ef',
    actionButtonHoverBorder: '#26a08f',
  },
  {
    id: 'rich-cells-table',
    scenario: 'Client Portfolio Operations',
    modeLabel: 'Table',
    headerTitle: 'Enterprise Account Health',
    centerHeaderTitle: true,
    footerSubtitle: 'Prioritized by renewal risk and expansion upside',
    collapseInitialState: 'expanded',
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    accent: '#b45309',
    titleColor: '#7c2d12',
    subtitleColor: '#44403c',
    bodyColor: '#33261b',
    mutedColor: '#685746',
    headerBackground: '#ffedd5',
    contentBackground: '#fff4df',
    footerBackground: '#fffbeb',
    borderColor: '#fdba74',
    frameBorderRadius: '2px',
    zoneBorderRadius: '2px',
    titleFontSize: '1.08rem',
    bodyFontSize: '0.94rem',
    cardBackground: '#fff2dd',
    tableHeaderBackground: '#ecd8b9',
    tableBodyBackground: '#fff7e8',
    rowAltBackground: '#f5e5cf',
    rowHoverBackground: '#ecd8b9',
    actionButtonBackground: '#fff4e3',
    actionButtonColor: '#7c2d12',
    actionButtonBorder: '#e8a868',
    actionButtonHoverBackground: '#fee7c7',
    actionButtonHoverBorder: '#d5882f',
  },
  {
    id: 'basic-grid-layout',
    scenario: 'Retail Workforce Directory',
    modeLabel: 'Grid',
    headerTitle: 'Store Team Roster',
    headerSubtitle: 'Coverage for weekend staffing and manager escalation',
    collapseInitialState: 'expanded',
    fontFamily: 'Arial Black, Arial, sans-serif',
    accent: '#7c3aed',
    titleColor: '#f3e8ff',
    subtitleColor: '#ede9fe',
    bodyColor: '#f8f5ff',
    mutedColor: '#e9d5ff',
    headerBackground: '#4c1d95',
    contentBackground: '#1a093f',
    footerBackground: '#2b0d63',
    borderColor: '#a78bfa',
    frameBorderRadius: 'square',
    zoneBorderRadius: '0px',
    titleFontSize: '0.96rem',
    bodyFontSize: '0.88rem',
    cardBackground: '#2a1460',
    tableHeaderBackground: '#4c1d95',
    tableBodyBackground: '#1a093f',
    rowAltBackground: '#25104f',
    rowHoverBackground: '#311867',
    actionButtonBackground: '#3b1e79',
    actionButtonColor: '#f3e8ff',
    actionButtonBorder: '#8b5cf6',
    actionButtonHoverBackground: '#4a2795',
    actionButtonHoverBorder: '#a78bfa',
  },
  {
    id: 'carousel-full',
    scenario: 'Marketing Asset Review',
    modeLabel: 'Carousel',
    headerTitle: 'Campaign Creative Picks',
    headerSubtitle: 'Regional teams shortlisting hero visuals for launch',
    collapseInitialState: 'expanded',
    fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif',
    accent: '#be123c',
    titleColor: '#2b1016',
    subtitleColor: '#4b2330',
    bodyColor: '#3b1c27',
    mutedColor: '#6b3b49',
    headerBackground: '#ffd6df',
    contentBackground: '#ffe9ee',
    footerBackground: '#ffe0e7',
    borderColor: '#f472b6',
    frameBorderRadius: 'rounded',
    zoneBorderRadius: '14px',
    titleFontSize: '1.03rem',
    bodyFontSize: '0.91rem',
    cardBackground: '#ffe6ee',
    tableHeaderBackground: '#ffd6df',
    tableBodyBackground: '#ffeef3',
    rowAltBackground: '#ffdfe8',
    rowHoverBackground: '#ffd4e2',
    actionButtonBackground: '#ffd9e5',
    actionButtonColor: '#6a1a33',
    actionButtonBorder: '#e678a7',
    actionButtonHoverBackground: '#ffcadd',
    actionButtonHoverBorder: '#cf4d8c',
  },
  {
    id: 'zone-dynamic-renderers',
    scenario: 'Support Queue Triage',
    modeLabel: 'Composable Zones',
    headerTitle: 'Priority Inbox Console',
    collapseInitialState: 'expanded',
    fontFamily: 'Century Gothic, Futura, Trebuchet MS, sans-serif',
    accent: '#0f766e',
    titleColor: '#0f172a',
    subtitleColor: '#334155',
    bodyColor: '#10233a',
    mutedColor: '#4a6076',
    headerBackground: '#e2e8f0',
    contentBackground: '#f8fafc',
    footerBackground: '#eef2f7',
    borderColor: '#94a3b8',
    frameBorderRadius: '8px',
    zoneBorderRadius: '8px',
    titleFontSize: '1.06rem',
    bodyFontSize: '0.9rem',
    cardBackground: '#f2f7fb',
    tableHeaderBackground: '#e0e8f1',
    tableBodyBackground: '#f8fafc',
    rowAltBackground: '#edf3f8',
    rowHoverBackground: '#dce7f1',
    actionButtonBackground: '#e6eef6',
    actionButtonColor: '#12314f',
    actionButtonBorder: '#7c93aa',
    actionButtonHoverBackground: '#d8e4ef',
    actionButtonHoverBorder: '#5a7898',
  },
];

const buildTeaserConfig = (baseConfig: any, spec: CuratedTeaserSpec): any => {
  const zones = { ...(baseConfig?.zones ?? {}) };

  const headerZone = {
    ...(zones.header ?? {}),
    layout: {
      ...(zones.header?.layout ?? {}),
      ...(spec.centerHeaderTitle ? { titlePosition: 'center' as const } : {}),
    },
    themeOverrides: {
      ...(zones.header?.themeOverrides ?? {}),
      titleColor: spec.titleColor,
      subtitleColor: spec.subtitleColor,
      titleFontSize: spec.titleFontSize,
      backgroundColor: spec.headerBackground,
      borderColor: spec.borderColor,
      borderRadius: `${spec.zoneBorderRadius} ${spec.zoneBorderRadius} 0 0`,
      padding: '0.9rem 1rem 0.75rem',
    },
    title: spec.headerTitle,
  };

  if (spec.headerSubtitle) {
    headerZone.subtitle = spec.headerSubtitle;
  } else {
    delete headerZone.subtitle;
  }

  const contentZone = {
    ...(zones.content ?? {}),
    themeOverrides: {
      ...(zones.content?.themeOverrides ?? {}),
      backgroundColor: spec.contentBackground,
      borderColor: spec.borderColor,
      borderRadius: `0 0 ${spec.zoneBorderRadius} ${spec.zoneBorderRadius}`,
      padding: '0.9rem 1rem 1rem',
    },
    style: {
      ...(zones.content?.style ?? {}),
      fontFamily: spec.fontFamily,
      color: spec.bodyColor,
      fontSize: spec.bodyFontSize,
      lineHeight: 1.45,
    },
  };

  let footerZone = zones.footer ? { ...zones.footer } : undefined;
  if (spec.footerSubtitle || footerZone) {
    footerZone = {
      ...(footerZone ?? {}),
      themeOverrides: {
        ...(footerZone?.themeOverrides ?? {}),
        subtitleColor: spec.subtitleColor,
        backgroundColor: spec.footerBackground ?? spec.contentBackground,
        borderColor: spec.borderColor,
        padding: '0.55rem 1rem 0.85rem',
      },
    };

    if (spec.footerSubtitle) {
      footerZone.subtitle = spec.footerSubtitle;
    } else {
      delete footerZone.subtitle;
    }
  }

  const nextConfig = {
    ...baseConfig,
    style: {
      ...(baseConfig?.style ?? {}),
      fontFamily: spec.fontFamily,
      color: spec.bodyColor,
      ['--widgemo-color-text' as string]: spec.bodyColor,
      ['--widgemo-color-textMuted' as string]: spec.mutedColor,
      ['--widgemo-color-titleText' as string]: spec.titleColor,
      ['--widgemo-color-subtitleText' as string]: spec.subtitleColor,
      ['--widgemo-color-iconColor' as string]: spec.subtitleColor,
      ['--widgemo-color-border' as string]: spec.borderColor,
      ['--widgemo-color-cardBorder' as string]: spec.borderColor,
      ['--widgemo-color-background' as string]: spec.contentBackground,
      ['--widgemo-color-surfaceBg' as string]: spec.contentBackground,
      ['--widgemo-color-cardBg' as string]: spec.cardBackground ?? spec.contentBackground,
      ['--widgemo-color-tableBg' as string]: spec.tableBodyBackground ?? spec.contentBackground,
      ['--widgemo-color-tableHeaderBg' as string]: spec.tableHeaderBackground ?? spec.headerBackground,
      ['--widgemo-color-tableBodyBg' as string]: spec.tableBodyBackground ?? spec.contentBackground,
      ['--widgemo-color-rowAltBg' as string]: spec.rowAltBackground ?? spec.contentBackground,
      ['--widgemo-color-rowHoverBg' as string]: spec.rowHoverBackground ?? spec.headerBackground,
      ['--widgemo-color-boardBg' as string]: spec.boardBackground ?? spec.contentBackground,
      ['--widgemo-color-columnBg' as string]: spec.columnBackground ?? spec.cardBackground ?? spec.contentBackground,
      ['--widgemo-color-swimlaneHeaderBg' as string]: spec.swimlaneHeaderBackground ?? spec.headerBackground,
      ['--widgemo-color-swimlaneRowBg' as string]: spec.swimlaneRowBackground ?? spec.contentBackground,
      ['--widgemo-color-actionButtonBg' as string]: spec.actionButtonBackground ?? 'transparent',
      ['--widgemo-color-actionButtonColor' as string]: spec.actionButtonColor ?? spec.bodyColor,
      ['--widgemo-color-actionButtonBorder' as string]: spec.actionButtonBorder ?? spec.borderColor,
      ['--widgemo-color-actionButtonHoverBg' as string]: spec.actionButtonHoverBackground ?? spec.contentBackground,
      ['--widgemo-color-actionButtonHoverBorder' as string]: spec.actionButtonHoverBorder ?? spec.borderColor,
      ['--widgemo-borderRadius' as string]: spec.zoneBorderRadius,
    },
    containerFrame: {
      ...(baseConfig?.containerFrame ?? {}),
      borderRadius: spec.frameBorderRadius,
      borderColor: spec.borderColor,
      borderWidth: 1,
    },
    zones: {
      ...zones,
      header: headerZone,
      content: contentZone,
      ...(footerZone ? { footer: footerZone } : {}),
    },
  };

  nextConfig.collapse = {
    ...(baseConfig?.collapse ?? {}),
    initialState: 'expanded',
  };

  return nextConfig;
};

interface TeaserSectionProps {
  onExploreExamples: () => void;
  onJumpToSandbox: () => void;
  shouldHaveDarkText: boolean;
}

export const TeaserSection: React.FC<TeaserSectionProps> = ({
  onExploreExamples,
  onJumpToSandbox,
  shouldHaveDarkText
}) => {
  const curatedTeaserItems = useMemo(() => {
    const examplesById = new Map(widgemoExamples.map((item) => [item.id, item]));
    const curated = TEASER_CURATION
      .map((spec) => {
        const example = examplesById.get(spec.id);
        if (!example) {
          return null;
        }
        return {
          ...spec,
          example,
          teaserConfig: buildTeaserConfig(example.config, spec),
        };
      })
      .filter((item): item is CuratedTeaserSpec & { example: (typeof widgemoExamples)[number]; teaserConfig: any } => Boolean(item));

    if (curated.length > 0) {
      return curated;
    }

    return [
      {
        ...TEASER_CURATION[0],
        example: widgemoExamples[0],
        teaserConfig: buildTeaserConfig(widgemoExamples[0].config, TEASER_CURATION[0]),
      },
    ];
  }, []);

  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const configsLength = curatedTeaserItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConfigIndex(prev => (prev + 1) % configsLength);
      setProgress(0); // Reset progress when changing config
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, [configsLength]);

  // Progress bar animation - synchronized with config changes
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 1;
        return nextProgress >= 100 ? 0 : nextProgress;
      });
    }, ROTATION_MS / 100);
    return () => clearInterval(progressInterval);
  }, []);

  const currentTeaserItem = curatedTeaserItems[currentConfigIndex];
  // const teaserConfig = mergeThemeIntoConfig(currentTeaserItem.config, currentTheme);
  
  return (
    <section id="teaser" className="theme-aware-section" style={{
      color: shouldHaveDarkText ? '#161616' : 'white'
    }}>
      <div className="max-w-screen-2xl mx-auto px-4 pt-5 pb-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 xl:px-12 xl:pt-12 2xl:px-16 2xl:pt-16">
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="display-1 fw-bold mb-4">
              Experience <span className="text-warning">Widgemo</span>
            </h1>
            <h2 className="mb-3 fw-light" style={{ fontSize: '1.125rem' }}>
              One Configurable React Primitive for Infinite UIs
            </h2>
            <p className="mb-4" style={{ fontSize: '1rem', color: shouldHaveDarkText ? '#161616' : 'white' }}>
              Configuration over custom code. Render boards, tables, grids, charts, and more—from a single component,
              data-agnostic and themeable.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button
                variant="secondary"
                className="px-3 py-2 fw-bold"
                onClick={onExploreExamples}
              >
                Explore Examples
              </Button>
              <Button
                variant="primary"
                className="px-3 py-2 fw-bold shadow"
                onClick={onJumpToSandbox}
              >
                Jump to Sandbox
              </Button>
            </div>
          </Col>
          <Col lg={8}>
            <Card className="shadow-lg border-0 theme-aware-card" style={{ height: '500px', overflow: 'hidden' }}>
              <Card.Body className="p-3 d-flex flex-column h-100">
                <div className="mb-3 flex-shrink-0">
                  <small
                    className="d-flex justify-content-between align-items-center ms-2"
                    style={{ color: shouldHaveDarkText ? '#334155' : '#cbd5e1' }}
                  >
                    <span style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <strong>{currentTeaserItem.scenario}</strong>
                      <span
                        style={{
                          display: 'inline-block',
                          borderRadius: '999px',
                          padding: '0.1rem 0.55rem',
                          fontSize: '0.72rem',
                          letterSpacing: '0.02em',
                          backgroundColor: `${currentTeaserItem.accent}22`,
                          color: currentTeaserItem.accent,
                          fontWeight: 600,
                        }}
                      >
                        {currentTeaserItem.modeLabel}
                      </span>
                    </span>
                    <div style={{ width: '120px' }}>
                      <div className="progress" style={{ height: '4px' }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${progress}%`,
                            transition: 'none',
                            backgroundColor: currentTeaserItem.accent,
                          }}
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </small>
                </div>
                <div
                  inert
                  className="flex-grow-1 overflow-auto"
                  style={{
                    padding: '8px',
                  }}
                >
                  <Widgemo
                    key={currentConfigIndex}
                    data={currentTeaserItem.example.data}
                    config={currentTeaserItem.teaserConfig}
                    className="my-custom-widgemo"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};