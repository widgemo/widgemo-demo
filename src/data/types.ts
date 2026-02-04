// Shared data types for widgemo-demo
export interface SampleData extends Record<string, unknown> {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  department?: string;
  status?: boolean | string;
  lastLogin?: string;
  value?: number | string | null | undefined;
  category?: string;
  metric?: string;
  month?: string;
  sales?: number;
  tasks?: number;
  rating?: string | number;
  feedback?: string;
  activeUsers?: number;
  totalUsers?: number;
}