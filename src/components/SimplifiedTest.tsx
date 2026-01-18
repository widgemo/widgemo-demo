import React from 'react';
import { SimplifiedWidgemo } from 'widgemo-core';
import type { ActionContext, Entity } from 'widgemo-core';
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

        <div className="col-12 mb-4">
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

        <div className="col-12 mb-4">
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

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mode System Test - Table Mode</h5>
              <p className="card-text">Testing ModeRenderer with table mode, sortable columns, and pagination.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 8)} // Limit to 8 items for demo
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Table Mode Demo',
                      subtitle: 'Sortable columns with pagination'
                    },
                    content: {
                      enabled: true,
                      mode: 'table',
                      columns: [
                        { field: 'name', header: 'Full Name', sortable: true, width: '200px' },
                        { field: 'email', header: 'Email Address', sortable: true, width: '250px' },
                        { field: 'role', header: 'Role', sortable: true, align: 'center' },
                        { field: 'department', header: 'Department', sortable: true },
                        { field: 'status', header: 'Active', align: 'center' }
                      ],
                      sort: { field: 'name', direction: 'asc' },
                      pagination: { page: 1, pageSize: 5 },
                      tableActions: {
                        item: [
                          {
                            id: 'edit',
                            label: 'Edit',
                            icon: 'edit',
                            variant: 'ghost',
                            handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
                          },
                          {
                            id: 'delete',
                            label: 'Delete',
                            icon: 'delete',
                            variant: 'danger',
                            handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
                          }
                        ]
                      },
                      actionsColumn: true,
                      hooks: {
                        onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`),
                        preRowRender: (entity: Entity) => ({ ...entity, status: entity.status ? 'Yes' : 'No' })
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

export default SimplifiedTest;

// Story testing export - TableMode example
export const TableModeExample = () => (
  <div style={{ padding: '20px' }}>
    <h3>TableMode Example</h3>
    <SimplifiedWidgemo
      data={teaserSampleData.slice(0, 5)}
      config={{
        zones: {
          header: {
            enabled: true,
            title: 'User Management',
            subtitle: 'Sortable table with actions'
          },
          content: {
            enabled: true,
            mode: 'table',
            columns: [
              { field: 'name', header: 'Name', sortable: true },
              { field: 'email', header: 'Email', sortable: true },
              { field: 'role', header: 'Role', align: 'center' },
              { field: 'status', header: 'Status', align: 'center' }
            ],
            tableActions: {
              item: [
                {
                  id: 'view',
                  label: 'View',
                  icon: 'view',
                  variant: 'ghost',
                  handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
                },
                {
                  id: 'edit',
                  label: 'Edit',
                  icon: 'edit',
                  variant: 'primary',
                  handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
                }
              ]
            },
            actionsColumn: true
          },
          footer: { enabled: false }
        }
      }}
    />
  </div>
);
