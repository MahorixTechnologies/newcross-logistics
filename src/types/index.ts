export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  substitute?: string;
}

export type UserRole = 
  | 'Initiator' 
  | 'HOD' 
  | 'Manager' 
  | 'Security' 
  | 'Travel Desk' 
  | 'Logistics Team' 
  | 'GMD' 
  | 'Admin';

export type WorkflowAction = 'Approve' | 'Reject' | 'Rollback' | 'Comment';

export interface WorkflowStage {
  id: string;
  name: string;
  role: UserRole;
  order: number;
  actions: WorkflowAction[];
  isRequired: boolean;
  escalationDays?: number;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'checkbox' | 'textarea' | 'file';
  isRequired: boolean;
  isVisible: boolean;
  options?: string[];
  validation?: string;
  dependencies?: FieldDependency[];
  order: number;
}

export interface FieldDependency {
  fieldId: string;
  value: string;
  condition: 'equals' | 'not_equals' | 'contains';
}

export interface ModuleConfig {
  id: string;
  name: string;
  fields: FormField[];
  attachmentConfig: AttachmentConfig;
  isActive: boolean;
}

export interface AttachmentConfig {
  isRequired: boolean;
  allowedTypes: string[];
  maxSize: number; // in MB
  maxCount: number;
}

export interface RequestData {
  id: string;
  type: 'Air Travel' | 'Accommodation' | 'Transport' | 'Meeting Venue';
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  initiator: string;
  currentStage: string;
  createdAt: string;
  updatedAt: string;
  data: Record<string, unknown>;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: string;
  module: string;
  requestId?: string;
}

export interface NotificationConfig {
  id: string;
  stage: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  appEnabled: boolean;
  recipients: string[];
  template: string;
}

export interface DashboardMetrics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  requestsByType: Record<string, number>;
  requestsByDepartment: Record<string, number>;
  averageProcessingTime: number;
}