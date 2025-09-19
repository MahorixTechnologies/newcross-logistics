'use client';

import { useState } from 'react';
import { Building, ArrowLeft, Upload, X } from 'lucide-react';
import { AccommodationType } from '@/types/users.type';
import { accommodationTypes, guestHouses, cities } from '@/lib/user.mockData';

interface AccommodationFormProps {
  onNavigate: (page: string) => void;
}

export default function AccommodationForm({ onNavigate }: AccommodationFormProps) {
  const [formData, setFormData] = useState({
    location: '',
    accommodationType: '' as AccommodationType | '',
    checkInDate: '',
    checkOutDate: '',
    additionalInformation: '',
    guestHouse: ''
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
    console.log('Accommodation form submitted:', { formData, attachments, comments, action });
    alert(`Request ${action === 'save' ? 'saved as draft' : 'submitted'} successfully!`);
    onNavigate('requests');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      onNavigate('landing');
    }
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
              <Building className="w-6 h-6 mr-3 text-green-600" />
              Accommodation Request
            </h1>
            <p className="text-gray-600">Reserve hotels and lodging</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Accommodation Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Location (City/Country) *</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select location</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Accommodation Type *</label>
              <select
                value={formData.accommodationType}
                onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value as AccommodationType })}
                className="form-select"
                required
              >
                <option value="">Select accommodation type</option>
                {accommodationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Check-in Date *</label>
              <input
                type="date"
                value={formData.checkInDate}
                onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Check-out Date *</label>
              <input
                type="date"
                value={formData.checkOutDate}
                onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Guest House Selection */}
          {formData.accommodationType === 'Guest House' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <label className="form-label">Select Guest House *</label>
              <select
                value={formData.guestHouse}
                onChange={(e) => setFormData({ ...formData, guestHouse: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select guest house</option>
                {guestHouses.map((house) => (
                  <option key={house} value={house}>{house}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-6">
            <label className="form-label">Additional Information</label>
            <textarea
              value={formData.additionalInformation}
              onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
              className="form-textarea"
              rows={4}
              placeholder="Special requests, preferences, dietary requirements, accessibility needs, etc."
            />
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="Add any additional comments or special requests..."
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
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-green-600" />
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

        {/* Duration Information */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Stay Information</h3>
          {formData.checkInDate && formData.checkOutDate && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-800">
              <div>
                <p className="font-medium">Check-in</p>
                <p>{new Date(formData.checkInDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Check-out</p>
                <p>{new Date(formData.checkOutDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Duration</p>
                <p>
                  {Math.ceil(
                    (new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / 
                    (1000 * 3600 * 24)
                  )} nights
                </p>
              </div>
            </div>
          )}
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
              className="btn btn-success"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}