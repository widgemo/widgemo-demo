import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Widgemo } from 'widgemo-core';
import { teaserSampleData } from '../data/sampleData';
import { mergeThemeIntoConfig, getThemeBackgroundColor } from '../utils/themeUtils';
import { DemoSection } from './DemoSection';

interface SampleData {
  id?: number;
  name: string;
  email?: string;
  role?: string;
  department?: string;
  status?: boolean;
  lastLogin?: string;
  value?: number;
  category?: string;
  metric?: string;
  month?: string;
  sales?: number;
  tasks?: number;
  rating?: string;
  feedback?: string;
  activeUsers?: number;
  totalUsers?: number;
}

interface AdvancedExamplesSectionProps {
  currentTheme: string;
}

export const AdvancedExamplesSection: React.FC<AdvancedExamplesSectionProps> = ({ currentTheme }) => (
  <DemoSection
    id="advanced"
    title="Advanced Examples"
    subtitle="Complex compositions and future capabilities"
    className="bg-light"
  >
    <Row>
      <Col lg={6} className="mb-4">
        <Card className="shadow theme-aware-card">
          <Card.Body className='p-1'>
            <h5 className="card-title">Dashboard Layout</h5>
            <p className="text-muted">Multiple Widgemos in a dashboard configuration</p>
            <div className="row g-3">
              <div className="col-6">
                <Widgemo
                  config={mergeThemeIntoConfig({
                    title: 'Summary',
                    mode: 'board',
                    dataSource: { type: 'static' },
                    fields: [
                      { name: 'department', label: 'Department', type: 'text' },
                      { name: 'activeUsers', label: 'Active Users', type: 'number' },
                      { name: 'totalUsers', label: 'Total Users', type: 'number' },
                    ],
                    styling: { compact: true },
                  }, currentTheme)}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { department: 'Engineering', activeUsers: 3, totalUsers: 4 },
                        { department: 'Design', activeUsers: 0, totalUsers: 1 },
                        { department: 'Business', activeUsers: 1, totalUsers: 1 },
                      ] as SampleData[],
                    }),
                  }}
                  showConfigDetails={false}
                  baseColor={getThemeBackgroundColor(currentTheme)}
                />
              </div>
              <div className="col-6">
                <Widgemo
                  config={mergeThemeIntoConfig({
                    title: 'Chart',
                    mode: 'chart',
                    dataSource: { type: 'static' },
                    fields: [
                      { name: 'department', label: 'Department', type: 'text' },
                      { name: 'activeUsers', label: 'Active Users', type: 'number' },
                    ],
                    chartConfig: { type: 'bar', xAxis: 'department', yAxis: 'activeUsers' },
                    styling: { compact: true },
                  }, currentTheme)}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { department: 'Engineering', activeUsers: 3 },
                        { department: 'Design', activeUsers: 0 },
                        { department: 'Business', activeUsers: 1 },
                      ] as SampleData[],
                    }),
                  }}
                  showConfigDetails={false}
                  baseColor={getThemeBackgroundColor(currentTheme)}
                />
              </div>
            </div>
            <small className="text-muted mt-2 d-block">
              Coming: Parent-controlled capabilities propagation via CapabilitiesProvider
            </small>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6} className="mb-4">
        <Card className="shadow theme-aware-card">
          <Card.Body className='p-1'>
            <h5 className="card-title">Team Directory</h5>
            <p className="text-muted">Browse users by department and role</p>
            <Widgemo
              config={mergeThemeIntoConfig({
                title: 'Team Members',
                mode: 'table',
                dataSource: { type: 'static' },
                fields: [
                  { name: 'name', label: 'Name', type: 'text' },
                  {
                    name: 'department', label: 'Department', type: 'select', options: [
                      { value: 'Engineering', label: 'Engineering' },
                      { value: 'Design', label: 'Design' },
                      { value: 'Business', label: 'Business' },
                    ]
                  },
                  { name: 'role', label: 'Role', type: 'text' },
                  { name: 'status', label: 'Active', type: 'boolean' },
                ],
                actions: { view: true },
                styling: { compact: true },
              }, currentTheme)}
              adapters={{
                fetchData: async () => ({
                  data: teaserSampleData,
                }),
              }}
              showConfigDetails={false}
              baseColor={getThemeBackgroundColor(currentTheme)}
            />
            <small className="text-muted mt-2 d-block">
              Coming: Drill-down navigation and nested Widgemo rendering
            </small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </DemoSection>
);