'use client';

import { useState } from 'react';
import { Calendar, ArrowLeft, Upload, X, Clock, Users, MapPin } from 'lucide-react';
import { meetingLocations, meetingVenues } from '@/lib/user.mockData';

interface MeetingVenueFormProps {
  onNavigate: (page: string) => void;
}

export default function MeetingVenueForm({ onNavigate }: MeetingVenueFormProps) {
  const [formData, setFormData] = useState({
    location: '',
    meetingVenue: '',
    meetingRoom: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    purpose: '',
    otherRequirements: '',
    expectedAttendees: ''
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState('');

  const hotelRooms = [
    'Conference Room A', 'Conference Room B', 'Executive Boardroom', 
    'Meeting Room 1', 'Meeting Room 2', 'Banquet Hall'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Meeting Venue form submitted:', { formData, attachments, comments, action });
    alert(`Request ${action === 'save' ? 'saved as draft' : 'submitted'} successfully!`);
    onNavigate('requests');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      onNavigate('landing');
    }
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const calculateHours = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      return diffHours > 0 ? diffHours : 0;
    }
    return 0;
  };

  const isHotelSelected = formData.meetingVenue.toLowerCase().includes('hotel') || 
                         formData.location === 'External Hotel';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('landing')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-purple-600" />
              Meeting Venue Request
            </h1>
            <p className="text-gray-600">Book meeting rooms and conference venues</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Venue Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-purple-600" />
            Venue Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Location *</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value, meetingVenue: '', meetingRoom: '' })}
                className="form-select"
                required
              >
                <option value="">Select location</option>
                {meetingLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Meeting Venue *</label>
              <select
                value={formData.meetingVenue}
                onChange={(e) => setFormData({ ...formData, meetingVenue: e.target.value, meetingRoom: '' })}
                className="form-select"
                required
                disabled={!formData.location}
              >
                <option value="">Select meeting venue</option>
                {meetingVenues.map((venue) => (
                  <option key={venue} value={venue}>{venue}</option>
                ))}
              </select>
            </div>

            {/* Hotel Meeting Room Selection */}
            {isHotelSelected && (
              <div className="md:col-span-2">
                <label className="form-label">Meeting Room *</label>
                <select
                  value={formData.meetingRoom}
                  onChange={(e) => setFormData({ ...formData, meetingRoom: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="">Select meeting room</option>
                  {hotelRooms.map((room) => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Hotel meeting rooms may have additional charges
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            Schedule Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="form-input"
                min={formData.startDate}
                required
              />
            </div>

            <div>
              <label className="form-label">Start Time *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">End Time *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Expected Attendees</label>
              <input
                type="number"
                value={formData.expectedAttendees}
                onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })}
                className="form-input"
                placeholder="Number of expected attendees"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Meeting Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Purpose *</label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="form-textarea"
                rows={3}
                placeholder="Please describe the purpose of the meeting (e.g., board meeting, training session, client presentation)"
                required
              />
            </div>

            <div>
              <label className="form-label">Other Requirements</label>
              <textarea
                value={formData.otherRequirements}
                onChange={(e) => setFormData({ ...formData, otherRequirements: e.target.value })}
                className="form-textarea"
                rows={4}
                placeholder="Specify any additional requirements (e.g., projector, microphone, catering, seating arrangement, technical equipment, accessibility needs)"
              />
            </div>
          </div>
        </div>

        {/* Meeting Summary */}
        {(formData.startDate && formData.endDate && formData.startTime && formData.endTime) && (
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Meeting Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-purple-800">
              <div>
                <p className="font-medium">Duration</p>
                <p>{calculateDuration()} day{calculateDuration() !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="font-medium">Daily Hours</p>
                <p>{calculateHours()} hours</p>
              </div>
              <div>
                <p className="font-medium">Start</p>
                <p>{new Date(formData.startDate).toLocaleDateString()} at {formData.startTime}</p>
              </div>
              <div>
                <p className="font-medium">End</p>
                <p>{new Date(formData.endDate).toLocaleDateString()} at {formData.endTime}</p>
              </div>
            </div>
            
            {formData.expectedAttendees && (
              <div className="mt-4 p-3 bg-purple-100 rounded">
                <p className="text-sm text-purple-800">
                  <strong>Expected Attendees:</strong> {formData.expectedAttendees} people
                </p>
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="Add any additional comments, special requests, or instructions..."
          />
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  Click to upload files
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx"
                />
              </label>
              <p className="text-gray-500 text-sm mt-1">
                PDF, DOC, DOCX, PPT, PPTX, JPG, PNG files up to 10MB each
              </p>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Guidelines */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Booking Guidelines</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>Advance Booking:</strong> Submit venue requests at least 3-5 business days in advance</p>
            <p>• <strong>Availability:</strong> All bookings are subject to venue availability and prior reservations</p>
            <p>• <strong>Equipment:</strong> Technical equipment requests should be specified in requirements</p>
            <p>• <strong>Catering:</strong> Food and beverage services require separate arrangement</p>
            <p>• <strong>Setup Time:</strong> Allow additional time for room setup and technical testing</p>
            <p>• <strong>Cancellation:</strong> Notify at least 24 hours in advance for cancellations</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel Request
          </button>

          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit('save')}
              className="btn btn-secondary"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('submit')}
              className="btn btn-primary bg-purple-600 hover:bg-purple-700"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}