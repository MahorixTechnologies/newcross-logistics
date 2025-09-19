'use client';

import { useState } from 'react';
import { Car, ArrowLeft, Upload, X, Shield } from 'lucide-react';
import { vehicleTypes } from '@/lib/user.mockData';

interface TransportSecurityFormProps {
  onNavigate: (page: string) => void;
}

export default function TransportSecurityForm({ onNavigate }: TransportSecurityFormProps) {
  const [formData, setFormData] = useState({
    vehicleType: '',
    destination: '',
    startDate: '',
    endDate: '',
    purpose: '',
    escortRequired: false
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Transport & Security form submitted:', { formData, attachments, comments, action });
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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

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
              <Car className="w-6 h-6 mr-3 text-orange-600" />
              Transport & Security Request
            </h1>
            <p className="text-gray-600">Arrange vehicle and security services</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Transport Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transport Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Vehicle Type *</label>
              <select
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Destination *</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="form-input"
                placeholder="Enter destination address or location"
                required
              />
            </div>

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
          </div>

          <div className="mt-6">
            <label className="form-label">Purpose *</label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="form-textarea"
              rows={3}
              placeholder="Please describe the purpose of transport (e.g., business meeting, site visit, airport transfer)"
              required
            />
          </div>
        </div>

        {/* Security Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-600" />
            Security Options
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <input
                type="checkbox"
                id="escortRequired"
                checked={formData.escortRequired}
                onChange={(e) => setFormData({ ...formData, escortRequired: e.target.checked })}
                className="form-checkbox mr-4"
              />
              <div className="flex-1">
                <label htmlFor="escortRequired" className="font-medium text-gray-900 cursor-pointer">
                  Security Escort Required
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Request security personnel to accompany the transport
                </p>
              </div>
            </div>

            {formData.escortRequired && (
              <div className="ml-8 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Security Escort Information</h3>
                <p className="text-sm text-orange-800">
                  Your request will be forwarded to the Security team for escort assignment and coordination.
                  Additional security clearance may be required based on the destination and nature of travel.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Duration Information */}
        {formData.startDate && formData.endDate && (
          <div className="bg-orange-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Transport Duration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-orange-800">
              <div>
                <p className="font-medium">Start Date</p>
                <p>{new Date(formData.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p>{new Date(formData.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Duration</p>
                <p>{calculateDuration()} day{calculateDuration() !== 1 ? 's' : ''}</p>
              </div>
            </div>
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
            placeholder="Add any additional comments, special requirements, or instructions..."
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
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
              <p className="text-gray-500 text-sm mt-1">
                PDF, DOC, DOCX, JPG, PNG files up to 10MB each
              </p>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-orange-600" />
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

        {/* Important Notes */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• <strong>Advance Notice:</strong> Submit transport requests at least 24-48 hours in advance</p>
            <p>• <strong>Security Escort:</strong> Required for certain high-risk locations or VIP transport</p>
            <p>• <strong>Vehicle Availability:</strong> Subject to fleet availability and prior bookings</p>
            <p>• <strong>Route Planning:</strong> Driver will contact you for detailed route and timing coordination</p>
            <p>• <strong>Emergency Contact:</strong> Ensure your contact information is up to date</p>
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
              className="btn btn-warning"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}