import { User, WorkflowStage, ModuleConfig, RequestData, AuditLog, DashboardMetrics } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT',
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2024-09-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'HOD',
    department: 'HR',
    isActive: true,
    createdAt: '2024-02-10',
    lastLogin: '2024-09-14',
    substitute: 'Mike Johnson'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    role: 'Manager',
    department: 'Finance',
    isActive: true,
    createdAt: '2024-03-05',
    lastLogin: '2024-09-13'
  }
];

export const workflowStages: WorkflowStage[] = [
  {
    id: '1',
    name: 'Initiator',
    role: 'Initiator',
    order: 1,
    actions: ['Comment'],
    isRequired: true
  },
  {
    id: '2',
    name: 'HOD Approval',
    role: 'HOD',
    order: 2,
    actions: ['Approve', 'Reject', 'Rollback', 'Comment'],
    isRequired: true,
    escalationDays: 3
  },
  {
    id: '3',
    name: 'Manager Approval',
    role: 'Manager',
    order: 3,
    actions: ['Approve', 'Reject', 'Rollback', 'Comment'],
    isRequired: true,
    escalationDays: 2
  },
  {
    id: '4',
    name: 'Security Check',
    role: 'Security',
    order: 4,
    actions: ['Approve', 'Reject', 'Comment'],
    isRequired: false
  },
  {
    id: '5',
    name: 'Travel Desk',
    role: 'Travel Desk',
    order: 5,
    actions: ['Approve', 'Reject', 'Comment'],
    isRequired: true
  },
  {
    id: '6',
    name: 'Logistics',
    role: 'Logistics Team',
    order: 6,
    actions: ['Approve', 'Reject', 'Comment'],
    isRequired: true
  },
  {
    id: '7',
    name: 'Travel Desk 2',
    role: 'Travel Desk',
    order: 7,
    actions: ['Approve', 'Reject', 'Comment'],
    isRequired: false
  },
  {
    id: '8',
    name: 'GMD Final Approval',
    role: 'GMD',
    order: 8,
    actions: ['Approve', 'Reject', 'Comment'],
    isRequired: true,
    escalationDays: 5
  }
];

export const moduleConfigs: ModuleConfig[] = [
  {
    id: 'air-travel',
    name: 'Air Travel',
    isActive: true,
    fields: [
      {
        id: 'departure-city',
        name: 'departureCity',
        label: 'Departure City',
        type: 'select',
        isRequired: true,
        isVisible: true,
        options: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano'],
        order: 1
      },
      {
        id: 'arrival-city',
        name: 'arrivalCity',
        label: 'Arrival City',
        type: 'select',
        isRequired: true,
        isVisible: true,
        options: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'London', 'New York'],
        order: 2
      },
      {
        id: 'route-type',
        name: 'routeType',
        label: 'Route Type',
        type: 'select',
        isRequired: true,
        isVisible: true,
        options: ['One Way', 'Round Trip'],
        order: 3
      },
      {
        id: 'departure-date',
        name: 'departureDate',
        label: 'Departure Date',
        type: 'date',
        isRequired: true,
        isVisible: true,
        order: 4
      },
      {
        id: 'return-date',
        name: 'returnDate',
        label: 'Return Date',
        type: 'date',
        isRequired: false,
        isVisible: true,
        dependencies: [
          {
            fieldId: 'route-type',
            value: 'Round Trip',
            condition: 'equals'
          }
        ],
        order: 5
      },
      {
        id: 'visa-required',
        name: 'visaRequired',
        label: 'Visa Required',
        type: 'checkbox',
        isRequired: false,
        isVisible: true,
        order: 6
      }
    ],
    attachmentConfig: {
      isRequired: true,
      allowedTypes: ['PDF', 'DOCX', 'JPG', 'PNG'],
      maxSize: 5,
      maxCount: 3
    }
  },
  {
    id: 'accommodation',
    name: 'Accommodation',
    isActive: true,
    fields: [
      {
        id: 'accommodation-type',
        name: 'accommodationType',
        label: 'Accommodation Type',
        type: 'select',
        isRequired: true,
        isVisible: true,
        options: ['Hotel', 'Guest House', 'Apartment'],
        order: 1
      },
      {
        id: 'check-in-date',
        name: 'checkInDate',
        label: 'Check-in Date',
        type: 'date',
        isRequired: true,
        isVisible: true,
        order: 2
      },
      {
        id: 'check-out-date',
        name: 'checkOutDate',
        label: 'Check-out Date',
        type: 'date',
        isRequired: true,
        isVisible: true,
        order: 3
      },
      {
        id: 'guest-count',
        name: 'guestCount',
        label: 'Number of Guests',
        type: 'text',
        isRequired: true,
        isVisible: true,
        validation: 'number',
        order: 4
      }
    ],
    attachmentConfig: {
      isRequired: false,
      allowedTypes: ['PDF', 'DOCX'],
      maxSize: 2,
      maxCount: 2
    }
  }
];

export const mockRequests: RequestData[] = [
  {
    id: 'REQ-001',
    type: 'Air Travel',
    status: 'Pending',
    initiator: 'Alice Johnson',
    currentStage: 'HOD Approval',
    createdAt: '2024-09-10',
    updatedAt: '2024-09-12',
    data: {
      departureCity: 'Lagos',
      arrivalCity: 'London',
      routeType: 'Round Trip',
      departureDate: '2024-10-15',
      returnDate: '2024-10-22',
      visaRequired: true
    }
  },
  {
    id: 'REQ-002',
    type: 'Accommodation',
    status: 'Approved',
    initiator: 'David Brown',
    currentStage: 'Completed',
    createdAt: '2024-09-08',
    updatedAt: '2024-09-14',
    data: {
      accommodationType: 'Hotel',
      checkInDate: '2024-10-10',
      checkOutDate: '2024-10-15',
      guestCount: '2'
    }
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User Created',
    userId: '1',
    userName: 'John Doe',
    timestamp: '2024-09-15T10:30:00Z',
    details: 'Created new user: Jane Smith',
    module: 'User Management'
  },
  {
    id: '2',
    action: 'Workflow Modified',
    userId: '1',
    userName: 'John Doe',
    timestamp: '2024-09-15T09:15:00Z',
    details: 'Added escalation rule to HOD stage',
    module: 'Workflow Configuration'
  },
  {
    id: '3',
    action: 'Request Approved',
    userId: '2',
    userName: 'Jane Smith',
    timestamp: '2024-09-14T16:45:00Z',
    details: 'Approved request REQ-002',
    module: 'Request Processing',
    requestId: 'REQ-002'
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalRequests: 150,
  pendingRequests: 25,
  approvedRequests: 110,
  rejectedRequests: 15,
  requestsByType: {
    'Air Travel': 60,
    'Accommodation': 40,
    'Transport': 30,
    'Meeting Venue': 20
  },
  requestsByDepartment: {
    'IT': 35,
    'HR': 30,
    'Finance': 25,
    'Sales': 40,
    'Operations': 20
  },
  averageProcessingTime: 4.5
};