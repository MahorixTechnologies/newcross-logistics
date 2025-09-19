'use client';

import { Plane, Building, Car, Calendar, Plus, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockRequests, getStatusColor } from '@/lib/user.mockData';

interface LandingPageProps {
  onNavigate: (page: string, requestId?: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const recentRequests = mockRequests.slice(0, 3);
  
  const stats = {
    total: mockRequests.length,
    pending: mockRequests.filter(r => !['Completed', 'Rejected', 'Cancelled'].includes(r.status)).length,
    completed: mockRequests.filter(r => r.status === 'Completed').length,
    rejected: mockRequests.filter(r => r.status === 'Rejected').length
  };

  const quickActions = [
    {
      id: 'air-travel',
      title: 'Air Travel Request',
      description: 'Book local or international flights',
      icon: Plane,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      id: 'accommodation',
      title: 'Accommodation Request',
      description: 'Reserve hotels and lodging',
      icon: Building,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-600'
    },
    {
      id: 'transport-security',
      title: 'Transport & Security',
      description: 'Arrange vehicles and security',
      icon: Car,
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-orange-600'
    },
    {
      id: 'meeting-venue',
      title: 'Meeting Venue',
      description: 'Book meeting rooms and venues',
      icon: Calendar,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Logistics Management</h1>
        <p className="text-blue-100 text-lg">
          Streamline your business travel and meeting arrangements with our comprehensive platform
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-gray-600">Total Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              <p className="text-gray-600">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Request</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.color.replace('hover:bg-', 'bg-').replace('bg-', 'bg-opacity-10 bg-')}`}>
                  <Icon className={`w-6 h-6 ${action.textColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Request
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Requests */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Requests</h2>
          <button
            onClick={() => onNavigate('requests')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Requests
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {recentRequests.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No requests found</p>
              <p className="text-gray-400 text-sm mt-1">Create your first request using the options above</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onNavigate('request-details', request.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        request.requestType === 'Air Travel' ? 'bg-blue-100' :
                        request.requestType === 'Accommodation' ? 'bg-green-100' :
                        request.requestType === 'Transport & Security' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        {request.requestType === 'Air Travel' && <Plane className="w-5 h-5 text-blue-600" />}
                        {request.requestType === 'Accommodation' && <Building className="w-5 h-5 text-green-600" />}
                        {request.requestType === 'Transport & Security' && <Car className="w-5 h-5 text-orange-600" />}
                        {request.requestType === 'Meeting Venue' && <Calendar className="w-5 h-5 text-purple-600" />}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.requestType}</h3>
                        <p className="text-sm text-gray-600">Request ID: {request.id}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`status-badge ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Current: {request.currentStage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <p>Submit requests at least 5 business days in advance for international travel</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <p>Attach all required documents to avoid processing delays</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <p>Check your email regularly for approval notifications</p>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
            <p>Contact support if your request is urgent or time-sensitive</p>
          </div>
        </div>
      </div>
    </div>
  );
}