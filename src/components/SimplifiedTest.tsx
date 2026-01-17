import React from 'react';
import { SimplifiedWidgemo } from 'widgemo-core';
import { teaserSampleData } from '../data/sampleData';

export const SimplifiedTest: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">ZoneRenderer Test - Widgemo Product Primitive</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Collapsible Header Zone</h5>
              <p className="card-text">Testing ZoneRenderer with collapse functionality, icon, and dynamic title.</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      collapse: { initialState: 'expanded', button: true },
                      icon: { src: 'database', size: 24 },
                      title: (data) => `User Database (${data.length} users)`,
                      subtitle: 'Manage your team members',
                      actions: [{ id: 'add-user', label: 'Add User' }]
                    },
                    content: {
                      enabled: true,
                      title: 'Data Overview'
                    },
                    footer: {
                      enabled: true,
                      collapse: { initialState: 'fixed' },
                      title: 'Footer Information'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Fixed Header Zone</h5>
              <p className="card-text">Testing ZoneRenderer with fixed (non-collapsible) header.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 2)}
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      collapse: { initialState: 'fixed' },
                      icon: { src: 'users', size: 20 },
                      title: 'Team Overview',
                      subtitle: 'Quick stats and actions'
                    },
                    content: { enabled: true },
                    footer: { enabled: false }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Minimal Configuration</h5>
              <p className="card-text">Testing ZoneRenderer with minimal configuration (compassionate defaults).</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                config={{
                  zones: {
                    header: { enabled: true },
                    content: { enabled: true },
                    footer: { enabled: true }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};