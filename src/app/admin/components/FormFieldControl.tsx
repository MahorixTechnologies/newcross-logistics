'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Settings, FileText } from 'lucide-react';
import { ModuleConfig, FormField } from '@/types';
import { moduleConfigs } from '@/lib/mockData';

export default function FormFieldControl() {
  const [modules, setModules] = useState<ModuleConfig[]>(moduleConfigs);
  const [selectedModule, setSelectedModule] = useState<string>(modules[0]?.id || '');
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [fieldFormData, setFieldFormData] = useState({
    name: '',
    label: '',
    type: 'text' as FormField['type'],
    isRequired: false,
    isVisible: true,
    options: [] as string[],
    validation: '',
    order: 1
  });

  const currentModule = modules.find(m => m.id === selectedModule);
  const fieldTypes = ['text', 'select', 'date', 'checkbox', 'textarea', 'file'];

  const handleCreateField = () => {
    setEditingField(null);
    setFieldFormData({
      name: '',
      label: '',
      type: 'text',
      isRequired: false,
      isVisible: true,
      options: [],
      validation: '',
      order: (currentModule?.fields.length || 0) + 1
    });
    setShowFieldModal(true);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setFieldFormData({
      name: field.name,
      label: field.label,
      type: field.type,
      isRequired: field.isRequired,
      isVisible: field.isVisible,
      options: field.options || [],
      validation: field.validation || '',
      order: field.order
    });
    setShowFieldModal(true);
  };

  const handleSaveField = () => {
    if (!currentModule) return;

    const newField: FormField = {
      id: editingField?.id || Date.now().toString(),
      ...fieldFormData,
      options: fieldFormData.options.length > 0 ? fieldFormData.options : undefined
    };

    setModules(modules.map(module => {
      if (module.id === selectedModule) {
        const updatedFields = editingField
          ? module.fields.map(f => f.id === editingField.id ? newField : f)
          : [...module.fields, newField];
        
        return {
          ...module,
          fields: updatedFields.sort((a, b) => a.order - b.order)
        };
      }
      return module;
    }));

    setShowFieldModal(false);
  };

  const deleteField = (fieldId: string) => {
    if (!currentModule) return;
    if (confirm('Are you sure you want to delete this field?')) {
      setModules(modules.map(module => {
        if (module.id === selectedModule) {
          return {
            ...module,
            fields: module.fields.filter(f => f.id !== fieldId)
          };
        }
        return module;
      }));
    }
  };

  const toggleFieldVisibility = (fieldId: string) => {
    if (!currentModule) return;
    setModules(modules.map(module => {
      if (module.id === selectedModule) {
        return {
          ...module,
          fields: module.fields.map(f => 
            f.id === fieldId ? { ...f, isVisible: !f.isVisible } : f
          )
        };
      }
      return module;
    }));
  };

  const updateAttachmentConfig = (
    config: Partial<ModuleConfig['attachmentConfig']>
  ) => {
    if (!currentModule) return;
    setModules(modules.map(module => {
      if (module.id === selectedModule) {
        return {
          ...module,
          attachmentConfig: { ...module.attachmentConfig, ...config }
        };
      }
      return module;
    }));
    setShowAttachmentModal(false);
  };

  const getFieldTypeIcon = (type: FormField['type']) => {
    const icons = {
      'text': '📝',
      'select': '📋',
      'date': '📅',
      'checkbox': '☑️',
      'textarea': '📄',
      'file': '📁'
    };
    return icons[type] || '📝';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Form Field Control</h1>
        <button
          onClick={handleCreateField}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </button>
      </div>

      {/* Module Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Module</h3>
          <button
            onClick={() => setShowAttachmentModal(true)}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FileText className="w-4 h-4 mr-1" />
            Attachment Settings
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module.id)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedModule === module.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium">{module.name}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {module.fields.length} fields
              </p>
              <div className={`mt-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                module.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {module.isActive ? 'Active' : 'Inactive'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fields List */}
      {currentModule && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentModule.name} Fields
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Configure form fields for the {currentModule.name} module
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Field
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visible
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Options/Validation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentModule.fields.map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                        {field.order}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getFieldTypeIcon(field.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{field.label}</div>
                          <div className="text-sm text-gray-500">{field.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {field.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        field.isRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {field.isRequired ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFieldVisibility(field.id)}
                        className={`p-1 rounded ${
                          field.isVisible ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
                        }`}
                      >
                        {field.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {field.options && field.options.length > 0 && (
                          <div>Options: {field.options.slice(0, 2).join(', ')}{field.options.length > 2 && '...'}</div>
                        )}
                        {field.validation && (
                          <div>Validation: {field.validation}</div>
                        )}
                        {field.dependencies && field.dependencies.length > 0 && (
                          <div className="text-xs text-blue-600">Has dependencies</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditField(field)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Edit Field"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteField(field.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete Field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attachment Configuration */}
      {currentModule && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Required:</span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                currentModule.attachmentConfig.isRequired 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {currentModule.attachmentConfig.isRequired ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Max Size:</span>
              <span className="ml-2 text-gray-900">{currentModule.attachmentConfig.maxSize}MB</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Max Count:</span>
              <span className="ml-2 text-gray-900">{currentModule.attachmentConfig.maxCount}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Allowed Types:</span>
              <span className="ml-2 text-gray-900">{currentModule.attachmentConfig.allowedTypes.join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Field Modal */}
      {showFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingField ? 'Edit Field' : 'Add New Field'}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                  <input
                    type="text"
                    value={fieldFormData.name}
                    onChange={(e) => setFieldFormData({...fieldFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., departureCity"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Label</label>
                  <input
                    type="text"
                    value={fieldFormData.label}
                    onChange={(e) => setFieldFormData({...fieldFormData, label: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Departure City"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                  <select
                    value={fieldFormData.type}
                    onChange={(e) => setFieldFormData({...fieldFormData, type: e.target.value as FormField['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fieldTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    value={fieldFormData.order}
                    onChange={(e) => setFieldFormData({...fieldFormData, order: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {fieldFormData.type === 'select' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Options (comma-separated)</label>
                  <textarea
                    value={fieldFormData.options.join(', ')}
                    onChange={(e) => setFieldFormData({
                      ...fieldFormData, 
                      options: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Option 1, Option 2, Option 3"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validation Rule (Optional)</label>
                <input
                  type="text"
                  value={fieldFormData.validation}
                  onChange={(e) => setFieldFormData({...fieldFormData, validation: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., number, email, min:1, max:100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={fieldFormData.isRequired}
                    onChange={(e) => setFieldFormData({...fieldFormData, isRequired: e.target.checked})}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">This field is required</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={fieldFormData.isVisible}
                    onChange={(e) => setFieldFormData({...fieldFormData, isVisible: e.target.checked})}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">This field is visible</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowFieldModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveField}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingField ? 'Update' : 'Create'} Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment Configuration Modal */}
      {showAttachmentModal && currentModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Attachment Settings - {currentModule.name}
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentModule.attachmentConfig.isRequired}
                  onChange={(e) => updateAttachmentConfig({isRequired: e.target.checked})}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Attachments are required</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum File Size (MB)</label>
                <input
                  type="number"
                  value={currentModule.attachmentConfig.maxSize}
                  onChange={(e) => updateAttachmentConfig({maxSize: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum File Count</label>
                <input
                  type="number"
                  value={currentModule.attachmentConfig.maxCount}
                  onChange={(e) => updateAttachmentConfig({maxCount: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowed File Types (comma-separated)</label>
                <input
                  type="text"
                  value={currentModule.attachmentConfig.allowedTypes.join(', ')}
                  onChange={(e) => updateAttachmentConfig({
                    allowedTypes: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="PDF, DOCX, JPG, PNG"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAttachmentModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}