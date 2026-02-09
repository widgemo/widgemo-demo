import { teaserSampleData } from './sampleData';
import type { SampleData } from './types';
import type { Entity } from 'widgemo-core';
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twoUsersData = teaserSampleData.slice(0, 2);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const threeUsersData = teaserSampleData.slice(0, 3);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fourUsersData = teaserSampleData.slice(0, 4);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fiveUsersData = teaserSampleData.slice(0, 5);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const sixUsersData = teaserSampleData.slice(0, 6);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const eightUsersData = teaserSampleData.slice(0, 8);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twelveUsersData = teaserSampleData.slice(0, 12);
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.


// Array of examples for dynamic rendering in SimplifiedTest.
const widgemoExamples: Array<{
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: any;
}> = [
  {
    id: 'timeline-mode',
    title: 'Timeline Mode',
    description: 'Timeline mode displaying chronological events with dates, titles, and descriptions',
    data: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Project Kickoff',
        description: 'Initial project planning and team assembly completed. All stakeholders aligned on objectives.',
        category: 'Planning',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-02-01',
        title: 'Design Phase Complete',
        description: 'UI/UX designs finalized and approved. Wireframes and mockups delivered to development team.',
        category: 'Design',
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-02-15',
        title: 'Development Started',
        description: 'Frontend and backend development initiated. Core architecture implemented.',
        category: 'Development',
        status: 'in-progress'
      },
      {
        id: 4,
        date: '2024-03-01',
        title: 'First Prototype Demo',
        description: 'Internal demo of first working prototype. Feedback collected from key stakeholders.',
        category: 'Milestone',
        status: 'completed'
      },
      {
        id: 5,
        date: '2024-03-15',
        title: 'Testing Phase',
        description: 'Comprehensive testing begins including unit tests, integration tests, and user acceptance testing.',
        category: 'Testing',
        status: 'pending'
      },
      {
        id: 6,
        date: '2024-04-01',
        title: 'Beta Release',
        description: 'Beta version released to select users for real-world testing and feedback.',
        category: 'Release',
        status: 'pending'
      },
      {
        id: 7,
        date: '2024-04-15',
        title: 'Production Launch',
        description: 'Full production deployment and public launch of the application.',
        category: 'Release',
        status: 'pending'
      }
    ],
    config: {
      zones: {
        header: {
          title: 'Project Timeline',
          subtitle: 'Chronological view of project milestones and events',
          icon: { src: 'calendar', size: 24, color: '#2196f3' }
        },
        content: {
          mode: 'timeline',
          timeline: {
            dateField: 'date',
            sortOrder: 'asc' as const,
            orientation: 'horizontal' as const,
            showLines: true,
            color: '#2196f3',
            dateFormat: {
              year: 'numeric' as const, // 'numeric' | '2-digit'
              month: 'short' as const, // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
              day: 'numeric' as const, // 'numeric' | '2-digit'
              hour: 'numeric' as const, // 'numeric' | '2-digit'
              minute: 'numeric' as const, // 'numeric' | '2-digit'
              weekday: 'short', // 'long' | 'short' | 'narrow'
              era: undefined, // 'long' | 'short' | 'narrow'
              timeZoneName: 'short', // 'long' | 'short'
              hour12: undefined, // boolean
              minute12: undefined, // boolean
              second: undefined // 'numeric' | '2-digit'
            }
          }
        },
        footer: {
          subtitle: 'Timeline mode with horizontal orientation and connecting lines'
        }
      }
    }
  },
 
  {
    id: 'actions-overflow-demo',
    title: 'Actions Overflow Demo',
    description: 'Demonstrates responsive action overflow with tuck-to-menu functionality',
    data: twoUsersData,
    config: {
      zones: {
        header: {
          title: 'Actions Overflow Demo',
          subtitle: 'Resize the window to see actions tuck into overflow menu',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'always',
              onTrigger: () => alert('Add User clicked!')
            },
            {
              id: 'edit-user',
              label: 'Edit User',
              icon: 'edit',
              placement: 'always',
              pinned: true,
              onTrigger: () => alert('Edit User clicked!')
            },
            {
              id: 'delete-user',
              label: 'Delete User',
              icon: 'delete',
              placement: 'onHover',
              pinned: true,
              onTrigger: () => alert('Delete User clicked!')
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onTrigger: () => alert('View Profile clicked!')
            },
            {
              id: 'send-message',
              label: 'Send Message',
              icon: 'message',
              placement: 'menu',
              onTrigger: () => alert('Send Message clicked!')
            },
            {
              id: 'share-user',
              label: 'Share User',
              icon: 'share',
              placement: 'menu',
              onTrigger: () => alert('Share User clicked!')
            },
            {
              id: 'export-user',
              label: 'Export User',
              icon: 'export',
              placement: 'menu',
              onTrigger: () => alert('Export User clicked!')
            },
            {
              id: 'archive-user',
              label: 'Archive User',
              icon: 'archive',
              placement: 'menu',
              onTrigger: () => alert('Archive User clicked!')
            }
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 3 },
            menuLabel: 'More Actions',
            indicator: 'pulse'
          }
        },
        content: {
          mode: 'table',
          data: twoUsersData,
          layout: {},
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' }
            ]
          },
          itemActions: [
            {
              id: 'edit-item',
              label: 'Edit',
              icon: 'edit',
              placement: 'always',
              onClick: (entity: SampleData) => alert(`Edit ${entity.name}`)
            },
            {
              id: 'delete-item',
              label: 'Delete',
              icon: 'delete',
              placement: 'onHover',
              onClick: (entity: SampleData) => alert(`Delete ${entity.name}`)
            },
            {
              id: 'view-item',
              label: 'View Details',
              icon: 'view',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`View details for ${entity.name}`)
            },
            {
              id: 'duplicate-item',
              label: 'Duplicate',
              icon: 'duplicate',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`Duplicate ${entity.name}`)
            }
          ],
          actionOverflow: {
            maxInline: 2,
            menuLabel: 'More',
            indicator: 'scale'
          }
        }
      }
    }
  },

  {
    id: 'grid-mode',
    title: 'Grid Mode',
    description: 'Grid mode displaying data in a responsive card-based layout',
    data: teaserSampleData,
    config: {
      zones: {
        header: {
          title: 'User Grid',
          subtitle: 'Card-based grid layout with user profiles',
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
              variant: 'secondary',
              onTrigger: () => alert('Refresh clicked!')
            }
          ]
        },
        content: {
          mode: 'grid',
          columns: 3,
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' }
            ]
          }
        }
      },
      devMode: true
    }
  }
];
export default widgemoExamples;
