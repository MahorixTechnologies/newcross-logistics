
'use client';

import { useState } from 'react';
import { Search, Filter, Plane, Building, Car, Calendar, Eye, Plus } from 'lucide-react';
import { RequestStatus } from '@/types/users.type';
import { mockRequests, getStatusColor } from '@/lib/user.mockData';

interface RequestsListProps {
  onNavigate: (page: string, requestId?: string) => void;
}

export default function RequestsList({ onNavigate }: RequestsListProps) {
  const [requests] = useState(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const statuses: (RequestStatus | 'all')[] = [
    'all', 'Draft', 'Submitted', 'HOD Review', 'Manager Review', 
    'Security Review', 'Travel Desk Review', 'Logistics Review', 
    'Travel Desk 2 Review', 'GMD Review', 'Completed', 'Rejected', 'Cancelled'
  ];

  const requestTypes = ['all', 'Air Travel', 'Accommodation', 'Transport & Security', 'Meeting Venue'];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.initiatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.requestType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'Air Travel':
        return <Plane className="w-5 h-5 text-blue-600" />;
      case 'Accommodation':
        return <Building className="w-5 h-5 text-green-600" />;
      case 'Transport & Security':
        return <Car className="w-5 h-5 text-orange-600" />;
      case 'Meeting Venue':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRequestSummary = (request: any) => {
    switch (request.requestType) {
      case 'Air Travel':
        if (request.airTravelData) {
          return `${request.airTravelData.departureRoute} → ${request.airTravelData.arrivalRoute}`;
        }
        break;
      case 'Accommodation':
        if (request.accommodationData) {
          return `${request.accommodationData.accommodationType} in ${request.accommodationData.location}`;
        }
        break;
      case 'Transport & Security':
        if (request.transportData) {
          return `${request.transportData.vehicleType} to ${request.transportData.destination}`;
        }
        break;
      case 'Meeting Venue':
        if (request.meetingData) {
          return `${request.meetingData.meetingVenue} at ${request.meetingData.location}`;
        }
        break;
    }
    return 'No details available';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-600 mt-1">View and manage all your requests</p>
        </div>
        
        <button
          onClick={() => onNavigate('landing')}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, type, or initiator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="form-label">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'all')}
              className="form-select"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="form-label">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-select"
            >
              {requestTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredRequests.length} of {requests.length} requests
          </p>
          
          {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500 mb-6">
              {requests.length === 0 
                ? "You haven't created any requests yet." 
                : "No requests match your current filters."}
            </p>
            <button
              onClick={() => onNavigate('landing')}
              className="btn btn-primary"
            >
              Create Your First Request
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getRequestIcon(request.requestType)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            by {request.initiatorName}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {request.requestType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getRequestSummary(request)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.currentStage}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Created: {new Date(request.createdAt).toLocaleDateString()}</div>
                      <div>Updated: {new Date(request.updatedAt).toLocaleDateString()}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onNavigate('request-details', request.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Air Travel</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.requestType === 'Air Travel').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Accommodation</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.requestType === 'Accommodation').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Transport</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.requestType === 'Transport & Security').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Meetings</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.requestType === 'Meeting Venue').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}