import React from 'react';
import { SimplifiedWidgemo } from 'widgemo-core';
import { teaserSampleData } from '../data/sampleData';

export const SimplifiedTest: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Simplified Widgemo Test</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Basic Simplified Widgemo</h5>
              <p className="card-text">Testing the new simplified component with basic data.</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                config={{
                  zones: {
                    header: { enabled: true, content: <h3>User Database</h3> },
                    content: { enabled: true, content: <p>This is the main content area.</p> },
                    footer: { enabled: true, content: <small className="text-muted">Footer content here</small> }
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