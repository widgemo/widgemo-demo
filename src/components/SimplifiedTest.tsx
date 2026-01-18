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
                      actions: [
                        {
                          id: 'add-user',
                          label: 'Add User',
                          icon: 'add',
                          variant: 'primary',
                          onTrigger: () => alert('Add User clicked!')
                        },
                        {
                          id: 'refresh',
                          label: 'Refresh',
                          icon: 'refresh',
                          onTrigger: () => alert('Refresh clicked!')
                        },
                        {
                          id: 'export',
                          label: 'Export Data',
                          icon: 'export',
                          onTrigger: () => alert('Export clicked!')
                        }
                      ]
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
              <h5 className="card-title">Actions System Test</h5>
              <p className="card-text">Testing ActionsRenderer with core actions registry and menu dropdown.</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Actions Demo',
                      subtitle: 'Core actions with menu',
                      actions: [
                        {
                          id: 'add',
                          label: 'Add Item',
                          icon: 'add',
                          variant: 'primary',
                          onTrigger: () => alert('Add Item clicked!')
                        },
                        {
                          id: 'refresh',
                          label: 'Refresh',
                          icon: 'refresh',
                          onTrigger: () => alert('Refresh clicked!')
                        },
                        {
                          id: 'export',
                          label: 'Export',
                          icon: 'export',
                          onTrigger: () => alert('Export clicked!'),
                          iconOnly: true
                        },
                        {
                          id: 'settings',
                          label: 'Settings',
                          icon: 'settings',
                          onTrigger: () => alert('Settings clicked!')
                        }
                      ]
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
              <h5 className="card-title">Mode System Test - Grid Mode with ItemRenderer</h5>
              <p className="card-text">Testing ModeRenderer with grid mode, configurable columns, and ItemRenderer templates.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 6)} // Limit to 6 items for better demo
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Grid Mode with Item Templates',
                      subtitle: 'ItemRenderer with custom field organization'
                    },
                    content: {
                      enabled: true,
                      mode: 'grid',
                      columns: 3, // 3 columns for the grid
                      item: {
                        style: 'card',
                        template: {
                          sections: [
                            {
                              title: 'Profile',
                              fields: [
                                { key: 'name', label: 'Name' },
                                { key: 'role', label: 'Role' }
                              ]
                            },
                            {
                              title: 'Contact',
                              fields: [
                                { key: 'email', label: 'Email' },
                                { key: 'department', label: 'Department' }
                              ]
                            }
                          ]
                        }
                      }
                    },
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
              <h5 className="card-title">Mode System Test - 2 Column Grid with Compact Items</h5>
              <p className="card-text">Testing ModeRenderer with 2-column grid and compact ItemRenderer style.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 4)} // Limit to 4 items
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Compact Item Style',
                      subtitle: 'Different ItemRenderer configuration'
                    },
                    content: {
                      enabled: true,
                      mode: 'grid',
                      columns: 2, // 2 columns for the grid
                      item: {
                        style: 'compact',
                        template: {
                          sections: [
                            {
                              fields: [
                                { key: 'name', label: 'Name' },
                                { key: 'email', label: 'Email' },
                                { key: 'role', label: 'Role' },
                                { key: 'status', label: 'Active' }
                              ]
                            }
                          ]
                        }
                      }
                    },
                    footer: { enabled: false }
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
