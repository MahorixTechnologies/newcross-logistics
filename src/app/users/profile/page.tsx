'use client';

import { useState } from 'react';
import { User, ArrowRight, Users, Building } from 'lucide-react';
import { User as UserType, OwnerType } from '@/types/users.type';

interface ProfileOnboardingProps {
  user: UserType;
  onNavigate: (page: string) => void;
}

export default function ProfileOnboarding({ user, onNavigate }: ProfileOnboardingProps) {
  const [selectedOwnerType, setSelectedOwnerType] = useState<OwnerType>('Staff');
  const [externalDetails, setExternalDetails] = useState({
    name: '',
    email: '',
    organization: ''
  });

  const handleContinue = () => {
    // Here you would typically save the selection to context/state
    // and then navigate to the form selection page
    onNavigate('landing');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Request Setup</h1>
        <p className="text-gray-600">
          Configure your profile information and specify who you{"'"}re creating requests for
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Profile Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="form-label">Reference ID</label>
              <input
                type="text"
                value={user?.referenceId}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
            
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={user?.name}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
            
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Department</label>
              <input
                type="text"
                value={user?.department}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
            
            <div>
              <label className="form-label">Line Manager</label>
              <input
                type="text"
                value={user?.lineManager}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
            
            <div>
              <label className="form-label">Current Date</label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="form-input bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Request Owner Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Who are you creating this request for?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Staff Option */}
          <div
            onClick={() => setSelectedOwnerType('Staff')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedOwnerType === 'Staff'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedOwnerType === 'Staff' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Users className={`w-6 h-6 ${
                  selectedOwnerType === 'Staff' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Staff Member</h3>
                <p className="text-sm text-gray-600">Internal employee</p>
              </div>
              {selectedOwnerType === 'Staff' && (
                <div className="ml-auto">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              Creating a request for yourself or another internal staff member
            </p>
          </div>

          {/* External Stakeholder Option */}
          <div
            onClick={() => setSelectedOwnerType('External Stakeholder')}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              selectedOwnerType === 'External Stakeholder'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedOwnerType === 'External Stakeholder' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Building className={`w-6 h-6 ${
                  selectedOwnerType === 'External Stakeholder' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">External Stakeholder</h3>
                <p className="text-sm text-gray-600">Guest/Partner</p>
              </div>
              {selectedOwnerType === 'External Stakeholder' && (
                <div className="ml-auto">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              Creating a request for an external guest, partner, or visitor
            </p>
          </div>
        </div>

        {/* External Stakeholder Details */}
        {selectedOwnerType === 'External Stakeholder' && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">External Stakeholder Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  value={externalDetails.name}
                  onChange={(e) => setExternalDetails({ ...externalDetails, name: e.target.value })}
                  className="form-input"
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  value={externalDetails.email}
                  onChange={(e) => setExternalDetails({ ...externalDetails, email: e.target.value })}
                  className="form-input"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Organization *</label>
                <input
                  type="text"
                  value={externalDetails.organization}
                  onChange={(e) => setExternalDetails({ ...externalDetails, organization: e.target.value })}
                  className="form-input"
                  placeholder="Enter organization name"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => onNavigate('landing')}
          className="btn btn-secondary"
        >
          Back to Dashboard
        </button>
        
        <button
          onClick={handleContinue}
          disabled={
            selectedOwnerType === 'External Stakeholder' && 
            (!externalDetails.name || !externalDetails.email || !externalDetails.organization)
          }
          className="btn btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Requests
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Information Box */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>Staff Requests:</strong> Will be processed using your company credentials and policies</p>
          <p>• <strong>External Stakeholder Requests:</strong> May require additional approvals and documentation</p>
          <p>• <strong>Initiator Responsibility:</strong> You are responsible for the accuracy of all information provided</p>
          <p>• <strong>Approval Process:</strong> All requests go through the standard approval workflow regardless of request type</p>
        </div>
      </div>
    </div>
  );
}