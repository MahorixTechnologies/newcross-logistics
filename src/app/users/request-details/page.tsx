'use client';

import { useState } from 'react';
import { ArrowLeft, MessageSquare, CheckCircle, XCircle, RotateCcw, User, Calendar, Plane, Building, Car, FileText, Paperclip } from 'lucide-react';
import { Request, RequestAction, UserRole } from '@/types/users.type';
import { mockRequests, getStatusColor, getRoleColor, workflowStages, currentUser } from '@/lib/user.mockData';

interface RequestDetailsProps {
  requestId: string;
  onNavigate: (page: string, requestId?: string) => void;
}

export default function RequestDetails({ requestId, onNavigate }: RequestDetailsProps) {
  const [request] = useState<Request | undefined>(
    mockRequests.find(r => r.id === requestId)
  );
  const [newComment, setNewComment] = useState('');
  const [selectedAction, setSelectedAction] = useState<RequestAction | ''>('');

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Not Found</h1>
        <p className="text-gray-600 mb-6">The request you{"'"}re looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => onNavigate('requests')}
          className="btn btn-primary"
        >
          Back to Requests
        </button>
      </div>
    );
  }

  const currentStage = workflowStages.find(stage => stage.role === request.currentStage);
  const canTakeAction = currentUser.role === request.currentStage && 
                       !['Completed', 'Rejected', 'Cancelled'].includes(request.status);

  const handleSubmitAction = () => {
    if (!selectedAction) return;
    
    // Here you would typically submit the action to your API
    console.log('Submitting action:', {
      requestId: request.id,
      action: selectedAction,
      comment: newComment,
      userId: currentUser.id
    });

    alert(`Action "${selectedAction}" submitted successfully!`);
    setNewComment('');
    setSelectedAction('');
  };

  const getRequestIcon = () => {
    switch (request.requestType) {
      case 'Air Travel':
        return <Plane className="w-6 h-6 text-blue-600" />;
      case 'Accommodation':
        return <Building className="w-6 h-6 text-green-600" />;
      case 'Transport & Security':
        return <Car className="w-6 h-6 text-orange-600" />;
      case 'Meeting Venue':
        return <Calendar className="w-6 h-6 text-purple-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-600" />;
    }
  };

  const renderRequestDetails = () => {
    switch (request.requestType) {
      case 'Air Travel':
        if (!request.airTravelData) return null;
        const airData = request.airTravelData;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Travel Category</p>
              <p className="font-medium">{airData.travelCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Route Type</p>
              <p className="font-medium">{airData.routeType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-medium">{airData.departureRoute}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-medium">{airData.arrivalRoute}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Departure Date</p>
              <p className="font-medium">{new Date(airData.departureDate).toLocaleDateString()}</p>
            </div>
            {airData.returnDate && (
              <div>
                <p className="text-sm text-gray-600">Return Date</p>
                <p className="font-medium">{new Date(airData.returnDate).toLocaleDateString()}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600">Flight Class</p>
              <p className="font-medium">{airData.flightClass}</p>
            </div>
            {airData.visaRequired !== undefined && (
              <div>
                <p className="text-sm text-gray-600">Visa Required</p>
                <p className="font-medium">{airData.visaRequired ? 'Yes' : 'No'}</p>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Purpose of Travel</p>
              <p className="font-medium">{airData.purposeOfTravel}</p>
            </div>
            {airData.notes && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Notes</p>
                <p className="font-medium">{airData.notes}</p>
              </div>
            )}
          </div>
        );

      case 'Accommodation':
        if (!request.accommodationData) return null;
        const accData = request.accommodationData;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">{accData.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Accommodation Type</p>
              <p className="font-medium">{accData.accommodationType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-in Date</p>
              <p className="font-medium">{new Date(accData.checkInDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-out Date</p>
              <p className="font-medium">{new Date(accData.checkOutDate).toLocaleDateString()}</p>
            </div>
            {accData.guestHouse && (
              <div>
                <p className="text-sm text-gray-600">Guest House</p>
                <p className="font-medium">{accData.guestHouse}</p>
              </div>
            )}
            {accData.additionalInformation && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Additional Information</p>
                <p className="font-medium">{accData.additionalInformation}</p>
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-600">Request details not available</p>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('requests')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            {getRequestIcon()}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{request.requestType}</h1>
              <p className="text-gray-600">Request ID: {request.id}</p>
            </div>
          </div>
        </div>
        
        <span className={`status-badge text-sm ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h2>
            
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Request Owner</p>
                  <p className="font-medium">
                    {request.owner.ownerType === 'Staff' 
                      ? request.initiatorName 
                      : request.owner.externalStakeholderName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {request.owner.ownerType} 
                    {request.owner.ownerType === 'External Stakeholder' && request.owner.externalStakeholderOrganization && 
                      ` - ${request.owner.externalStakeholderOrganization}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Initiator</p>
                  <p className="font-medium">{request.initiatorName}</p>
                  <p className="text-sm text-gray-500">
                    {request.owner.isInitiator ? 'Self-requested' : 'Requested on behalf'}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Request Details</h3>
              {renderRequestDetails()}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments & Actions</h2>
            
            {/* Existing Comments */}
            <div className="space-y-4 mb-6">
              {request.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {comment.userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.userName}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getRoleColor(comment.userRole)}`}>
                        {comment.userRole}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()} at {new Date(comment.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                    <div className="flex items-center mt-2">
                      {comment.action === 'Approve' && <CheckCircle className="w-4 h-4 text-green-600 mr-1" />}
                      {comment.action === 'Reject' && <XCircle className="w-4 h-4 text-red-600 mr-1" />}
                      {comment.action === 'Rollback' && <RotateCcw className="w-4 h-4 text-yellow-600 mr-1" />}
                      {comment.action === 'Comment' && <MessageSquare className="w-4 h-4 text-blue-600 mr-1" />}
                      <span className="text-sm font-medium text-gray-600">Action: {comment.action}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {request.comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No comments yet</p>
              )}
            </div>

            {/* Add Comment/Action */}
            {canTakeAction && currentStage && (
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Take Action</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Action *</label>
                    <select
                      value={selectedAction}
                      onChange={(e) => setSelectedAction(e.target.value as RequestAction)}
                      className="form-select"
                      required
                    >
                      <option value="">Select an action</option>
                      {currentStage.actions.map((action) => (
                        <option key={action} value={action}>{action}</option>
                      ))}
                    </select>
                  </div>

                  {(currentStage.canComment || selectedAction === 'Reject' || selectedAction === 'Rollback') && (
                    <div>
                      <label className="form-label">
                        Comment {(selectedAction === 'Reject' || selectedAction === 'Rollback') && '*'}
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="form-textarea"
                        rows={3}
                        placeholder="Add your comment..."
                        required={selectedAction === 'Reject' || selectedAction === 'Rollback'}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleSubmitAction}
                    disabled={!selectedAction || ((selectedAction === 'Reject' || selectedAction === 'Rollback') && !newComment.trim())}
                    className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit {selectedAction}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workflow Progress</h2>
            
            <div className="space-y-3">
              {workflowStages.map((stage, index) => {
                const isCompleted = stage.order < (workflowStages.find(s => s.role === request.currentStage)?.order || 0);
                const isCurrent = stage.role === request.currentStage;
                
                return (
                  <div key={stage.role} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      isCompleted ? 'bg-green-500' :
                      isCurrent ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isCurrent ? 'text-blue-600' : 
                        isCompleted ? 'text-green-600' : 
                        'text-gray-500'
                      }`}>
                        {stage.name}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Request Metadata */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Created</p>
                <p className="font-medium">{new Date(request.createdAt).toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="font-medium">{new Date(request.updatedAt).toLocaleString()}</p>
              </div>
              
              {request.submittedAt && (
                <div>
                  <p className="text-gray-600">Submitted</p>
                  <p className="font-medium">{new Date(request.submittedAt).toLocaleString()}</p>
                </div>
              )}
              
              {request.completedAt && (
                <div>
                  <p className="text-gray-600">Completed</p>
                  <p className="font-medium">{new Date(request.completedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {request.attachments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
              
              <div className="space-y-2">
                {request.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{attachment.fileName}</p>
                      <p className="text-xs text-gray-500">
                        {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}