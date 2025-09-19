export type UserRole = 
  | 'Initiator' 
  | 'HOD' 
  | 'Manager' 
  | 'Security' 
  | 'Travel Desk' 
  | 'Logistics Team'
  | 'Travel Desk 2'
  | 'GMD';

export type RequestStatus = 
  | 'Draft'
  | 'Submitted' 
  | 'HOD Review'
  | 'Manager Review'
  | 'Security Review'
  | 'Travel Desk Review'
  | 'Logistics Review'
  | 'Travel Desk 2 Review'
  | 'GMD Review'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled';

export type RequestAction = 'Approve' | 'Reject' | 'Rollback' | 'Comment' | 'Submit' | 'Cancel';

export type TravelCategory = 'Local' | 'International';
export type RouteType = 'One Way' | 'Round Trip' | 'Multiple Trip';
export type FlightClass = 'Economy' | 'Business';
export type OwnerType = 'Staff' | 'External Stakeholder';
export type AccommodationType = 'Hotel' | 'Apartment' | 'Guest House';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  referenceId: string;
  lineManager: string;
  isActive: boolean;
}

export interface RequestOwner {
  id: string;
  ownerType: OwnerType;
  staffId?: string;
  externalStakeholderName?: string;
  externalStakeholderEmail?: string;
  externalStakeholderOrganization?: string;
  isInitiator: boolean;
}

export interface AirTravelRequest {
  travelCategory: TravelCategory;
  routeType: RouteType;
  departureRoute: string;
  arrivalRoute: string;
  departureDate: string;
  returnDate?: string;
  flightClass: FlightClass;
  purposeOfTravel: string;
  visaRequired?: boolean;
  notes?: string;
  multipleTrips?: Array<{
    departure: string;
    arrival: string;
    date: string;
  }>;
}

export interface AccommodationRequest {
  location: string;
  accommodationType: AccommodationType;
  checkInDate: string;
  checkOutDate: string;
  additionalInformation?: string;
  guestHouse?: string;
}

export interface TransportSecurityRequest {
  vehicleType: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  escortRequired: boolean;
}

export interface MeetingVenueRequest {
  location: string;
  meetingVenue: string;
  meetingRoom?: string;
  startDate: string;
  endDate: string;
  purpose: string;
  otherRequirements?: string;
}

export interface RequestComment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  timestamp: string;
  action: RequestAction;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Request {
  id: string;
  requestType: 'Air Travel' | 'Accommodation' | 'Transport & Security' | 'Meeting Venue';
  status: RequestStatus;
  currentStage: UserRole | 'Completed';
  initiatorId: string;
  initiatorName: string;
  owner: RequestOwner;
  airTravelData?: AirTravelRequest;
  accommodationData?: AccommodationRequest;
  transportData?: TransportSecurityRequest;
  meetingData?: MeetingVenueRequest;
  comments: RequestComment[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  completedAt?: string;
}

export interface WorkflowStage {
  role: UserRole;
  name: string;
  canEdit: boolean;
  canComment: boolean;
  actions: RequestAction[];
  order: number;
}