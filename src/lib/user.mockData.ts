import { User, Request, WorkflowStage, RequestStatus } from '@/types/users.type';

export const currentUser: User = {
  id: 'user_001',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Initiator',
  department: 'IT Department',
  referenceId: 'EMP001',
  lineManager: 'Jane Smith',
  isActive: true
};

export const workflowStages: WorkflowStage[] = [
  {
    role: 'Initiator',
    name: 'Initiator',
    canEdit: true,
    canComment: false,
    actions: ['Cancel', 'Submit'],
    order: 1
  },
  {
    role: 'HOD',
    name: 'HOD Page',
    canEdit: false,
    canComment: true,
    actions: ['Approve', 'Rollback', 'Reject'],
    order: 2
  },
  {
    role: 'Manager',
    name: 'Manager',
    canEdit: false,
    canComment: false,
    actions: ['Approve', 'Reject'],
    order: 3
  },
  {
    role: 'Security',
    name: 'Security Page',
    canEdit: false,
    canComment: true,
    actions: ['Approve', 'Reject'],
    order: 4
  },
  {
    role: 'Travel Desk',
    name: 'Travel Desk Page',
    canEdit: false,
    canComment: false,
    actions: ['Approve', 'Reject'],
    order: 5
  },
  {
    role: 'Logistics Team',
    name: 'Logistics Team Page',
    canEdit: false,
    canComment: true,
    actions: ['Approve', 'Reject'],
    order: 6
  },
  {
    role: 'Travel Desk 2',
    name: 'Travel Desk 2 Page',
    canEdit: false,
    canComment: false,
    actions: ['Approve', 'Reject'],
    order: 7
  },
  {
    role: 'GMD',
    name: "GMD's Page",
    canEdit: false,
    canComment: true,
    actions: ['Approve', 'Reject'],
    order: 8
  }
];

export const cities = [
  'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna', 'Jos', 'Benin City',
  'London', 'New York', 'Dubai', 'Paris', 'Amsterdam', 'Frankfurt', 'Cairo', 'Johannesburg'
];

export const accommodationTypes = [
  'Hotel', 'Apartment', 'Guest House', 'Resort', 'Serviced Apartment'
];

export const vehicleTypes = [
  'Sedan', 'SUV', 'Bus', 'Van', 'Executive Car', 'Motorcycle'
];

export const meetingLocations = [
  'Lagos Office', 'Abuja Office', 'Port Harcourt Office', 'External Hotel', 'Conference Center'
];

export const meetingVenues = [
  'Board Room A', 'Board Room B', 'Conference Room 1', 'Conference Room 2', 'Training Hall', 'Auditorium'
];

export const guestHouses = [
  'Lagos Guest House', 'Abuja Guest House', 'Port Harcourt Guest House'
];

export const mockRequests: Request[] = [
  {
    id: 'REQ-001',
    requestType: 'Air Travel',
    status: 'HOD Review',
    currentStage: 'HOD',
    initiatorId: 'user_001',
    initiatorName: 'John Doe',
    owner: {
      id: 'owner_001',
      ownerType: 'Staff',
      staffId: 'user_001',
      isInitiator: true
    },
    airTravelData: {
      travelCategory: 'International',
      routeType: 'Round Trip',
      departureRoute: 'Lagos',
      arrivalRoute: 'London',
      departureDate: '2024-10-15',
      returnDate: '2024-10-22',
      flightClass: 'Business',
      purposeOfTravel: 'Business Meeting',
      visaRequired: true,
      notes: 'Urgent travel required'
    },
    comments: [
      {
        id: 'comment_001',
        userId: 'user_001',
        userName: 'John Doe',
        userRole: 'Initiator',
        comment: 'Request submitted for urgent business meeting',
        timestamp: '2024-09-15T10:00:00Z',
        action: 'Submit'
      }
    ],
    attachments: [],
    createdAt: '2024-09-15T09:30:00Z',
    updatedAt: '2024-09-15T10:00:00Z',
    submittedAt: '2024-09-15T10:00:00Z'
  },
  {
    id: 'REQ-002',
    requestType: 'Accommodation',
    status: 'Completed',
    currentStage: 'Completed',
    initiatorId: 'user_001',
    initiatorName: 'John Doe',
    owner: {
      id: 'owner_002',
      ownerType: 'External Stakeholder',
      externalStakeholderName: 'Alice Johnson',
      externalStakeholderEmail: 'alice.johnson@partner.com',
      externalStakeholderOrganization: 'Partner Corp',
      isInitiator: false
    },
    accommodationData: {
      location: 'Lagos',
      accommodationType: 'Hotel',
      checkInDate: '2024-09-20',
      checkOutDate: '2024-09-22',
      additionalInformation: '5-star hotel preferred'
    },
    comments: [
      {
        id: 'comment_002',
        userId: 'user_001',
        userName: 'John Doe',
        userRole: 'Initiator',
        comment: 'Accommodation request for external partner',
        timestamp: '2024-09-10T14:00:00Z',
        action: 'Submit'
      },
      {
        id: 'comment_003',
        userId: 'hod_001',
        userName: 'Jane Smith',
        userRole: 'HOD',
        comment: 'Approved for partner visit',
        timestamp: '2024-09-11T09:00:00Z',
        action: 'Approve'
      }
    ],
    attachments: [],
    createdAt: '2024-09-10T13:30:00Z',
    updatedAt: '2024-09-11T09:00:00Z',
    submittedAt: '2024-09-10T14:00:00Z',
    completedAt: '2024-09-11T16:00:00Z'
  }
];

export const getStatusColor = (status: RequestStatus): string => {
  const colors = {
    'Draft': 'bg-gray-100 text-gray-800',
    'Submitted': 'bg-blue-100 text-blue-800',
    'HOD Review': 'bg-yellow-100 text-yellow-800',
    'Manager Review': 'bg-yellow-100 text-yellow-800',
    'Security Review': 'bg-orange-100 text-orange-800',
    'Travel Desk Review': 'bg-purple-100 text-purple-800',
    'Logistics Review': 'bg-indigo-100 text-indigo-800',
    'Travel Desk 2 Review': 'bg-purple-100 text-purple-800',
    'GMD Review': 'bg-red-100 text-red-800',
    'Completed': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Cancelled': 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getRoleColor = (role: string): string => {
  const colors = {
    'Initiator': 'bg-blue-500',
    'HOD': 'bg-green-500',
    'Manager': 'bg-yellow-500',
    'Security': 'bg-orange-500',
    'Travel Desk': 'bg-purple-500',
    'Logistics Team': 'bg-indigo-500',
    'Travel Desk 2': 'bg-pink-500',
    'GMD': 'bg-red-500'
  };
  return colors[role] || 'bg-gray-500';
};