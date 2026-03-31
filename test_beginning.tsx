import type { ActionContext, Entity, WidgemoConfig, ColumnConfig, BoardColumnConfig } from 'widgemo-core';
import { FaPlus, FaEdit, FaSync, FaDownload, FaWifi } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa6';
import { currencyDecimalSampleData, currencyCompactSampleData, currencyEdgeCasesSampleData, currencyExamplesSampleData, currencyInternationalSampleData, currencyPositioningSampleData, currencyPrecisionSampleData, teaserSampleData, actionLinksSampleData, actionOptionsSampleData, currencyDynamicSampleData, linkTestData, kanbanSampleData, swatchesSampleData, ratingsSampleData, progressSampleData, progressVariantsSampleData, progressExampleSampleData, badgeSampleData, projectExampleSampleData } from './sampleData';
import type { SampleData } from './types';
interface TaskEntity {
  id: number;
  name: string;
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  size: 'small' | 'medium' | 'large';
}
interface LinkDemoEntity {
  id: number;
  name: string;
  url: string;
  displayText: string;
  category: 'internal' | 'external';
}
interface ActionLinkEntity {
  id: number;
  name: string;
  action: string;
  target: string;
  url: string;
  text: string;
}
interface CurrencyDemoEntity {
  id: number;
  name: string;
  price: number;
  currency: string;
  locale: string;
  country?: string;
  amount?: number;
  description?: string;
  position?: string;
  minFrac?: number;
  maxFrac?: number;
  threshold?: number;
  category?: string;
  product?: string;
  region?: string;
  discount?: number;
  value?: number;
}
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
export const collapsibleHeaderConfig: WidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: true,
      collapse: { initialState: 'expanded', button: true },
      icon: { src: 'database', size: 24, color: '#c4530d' },
      title: 'User Database',
      subtitle: (data) => `Manage your ${data.length} team member(s)`,
      actions: [
        {
          id: 'add-user',
          label: 'Add User',
          icon: 'add',
          variant: 'primary',
          onClick: () => alert('Add User clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
        },
        {
          id: 'export',
          label: 'Export Data',
          icon: 'download',
          onClick: () => alert('Export clicked!'),
          iconOnly: true,
          placement: 'onHover'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'grid'
    },
