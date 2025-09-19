'use client';

import { useState } from 'react';
import { Plus, Minus, Plane, ArrowLeft, Upload, X } from 'lucide-react';
import { TravelCategory, RouteType, FlightClass } from '@/types/users.type';
import { cities } from '@/lib/user.mockData';

interface AirTravelFormProps {
  onNavigate: (page: string) => void;
}

interface MultipleTrip {
  id: string;
  departure: string;
  arrival: string;
  date: string;
}

export default function AirTravelForm({ onNavigate }: AirTravelFormProps) {
  const [formData, setFormData] = useState({
    travelCategory: 'Local' as TravelCategory,
    routeType: 'One Way' as RouteType,
    departureRoute: '',
    arrivalRoute: '',
    departureDate: '',
    returnDate: '',
    flightClass: 'Economy' as FlightClass,
    purposeOfTravel: '',
    visaRequired: false,
    notes: ''
  });

  const [multipleTrips, setMultipleTrips] = useState<MultipleTrip[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [comments, setComments] = useState('');

  const addMultipleTrip = () => {
    const newTrip: MultipleTrip = {
      id: Date.now().toString(),
      departure: '',
      arrival: '',
      date: ''
    };
    setMultipleTrips([...multipleTrips, newTrip]);
  };

  const removeMultipleTrip = (id: string) => {
    setMultipleTrips(multipleTrips.filter(trip => trip.id !== id));
  };

  const updateMultipleTrip = (id: string, field: keyof Omit<MultipleTrip, 'id'>, value: string) => {
    setMultipleTrips(multipleTrips.map(trip => 
      trip.id === id ? { ...trip, [field]: value } : trip
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    // Here you would typically validate and save/submit the form
    console.log('Form submitted:', { formData, multipleTrips, attachments, comments, action });
    
    // Show success message and navigate
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
              <Plane className="w-6 h-6 mr-3 text-blue-600" />
              Air Travel Request
            </h1>
            <p className="text-gray-600">Book local or international flights</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Travel Category */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel Category</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="travelCategory"
                value="Local"
                checked={formData.travelCategory === 'Local'}
                onChange={(e) => setFormData({ ...formData, travelCategory: e.target.value as TravelCategory })}
                className="form-radio mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">Local</div>
                <div className="text-sm text-gray-600">Domestic travel within the country</div>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
              <input
                type="radio"
                name="travelCategory"
                value="International"
                checked={formData.travelCategory === 'International'}
                onChange={(e) => setFormData({ ...formData, travelCategory: e.target.value as TravelCategory })}
                className="form-radio mr-3"
              />
              <div>
                <div className="font-medium text-gray-900">International</div>
                <div className="text-sm text-gray-600">Travel outside the country</div>
              </div>
            </label>
          </div>
        </div>

        {/* Route Type */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Type</h2>
          <div className="grid grid-cols-3 gap-4">
            {(['One Way', 'Round Trip', 'Multiple Trip'] as RouteType[]).map((type) => (
              <label key={type} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50">
                <input
                  type="radio"
                  name="routeType"
                  value={type}
                  checked={formData.routeType === type}
                  onChange={(e) => setFormData({ ...formData, routeType: e.target.value as RouteType })}
                  className="form-radio mr-3"
                />
                <div className="font-medium text-gray-900">{type}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Departure City/Airport *</label>
              <select
                value={formData.departureRoute}
                onChange={(e) => setFormData({ ...formData, departureRoute: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select departure city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Arrival City/Airport *</label>
              <select
                value={formData.arrivalRoute}
                onChange={(e) => setFormData({ ...formData, arrivalRoute: e.target.value })}
                className="form-select"
                required
              >
                <option value="">Select arrival city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Departure Date *</label>
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="form-input"
                required
              />
            </div>

            {formData.routeType === 'Round Trip' && (
              <div>
                <label className="form-label">Return Date *</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            )}

            <div>
              <label className="form-label">Flight Class</label>
              <select
                value={formData.flightClass}
                onChange={(e) => setFormData({ ...formData, flightClass: e.target.value as FlightClass })}
                className="form-select"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        </div>

        {/* Multiple Trips Section */}
        {formData.routeType === 'Multiple Trip' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Multiple Trip Details</h2>
              <button
                type="button"
                onClick={addMultipleTrip}
                className="btn btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Trip
              </button>
            </div>

            {multipleTrips.map((trip, index) => (
              <div key={trip.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Trip {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeMultipleTrip(trip.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">Departure</label>
                    <select
                      value={trip.departure}
                      onChange={(e) => updateMultipleTrip(trip.id, 'departure', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select departure</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Arrival</label>
                    <select
                      value={trip.arrival}
                      onChange={(e) => updateMultipleTrip(trip.id, 'arrival', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select arrival</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      value={trip.date}
                      onChange={(e) => updateMultipleTrip(trip.id, 'date', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ))}

            {multipleTrips.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No trips added yet. Click {"\"Add Trip\""} to get started.</p>
              </div>
            )}
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="form-label">Purpose of Travel *</label>
              <textarea
                value={formData.purposeOfTravel}
                onChange={(e) => setFormData({ ...formData, purposeOfTravel: e.target.value })}
                className="form-textarea"
                rows={3}
                placeholder="Please describe the purpose of your travel"
                required
              />
            </div>

            {formData.travelCategory === 'International' && (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="visaRequired"
                    checked={formData.visaRequired}
                    onChange={(e) => setFormData({ ...formData, visaRequired: e.target.checked })}
                    className="form-checkbox mr-3"
                  />
                  <label htmlFor="visaRequired" className="text-sm font-medium text-gray-700">
                    Visa Required
                  </label>
                </div>

                <div>
                  <label className="form-label">Notes (International Travel)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-textarea"
                    rows={3}
                    placeholder="Any additional notes or special requirements for international travel"
                  />
                </div>
              </>
            )}
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
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Upload className="w-4 h-4 text-blue-600" />
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
              className="btn btn-primary"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}