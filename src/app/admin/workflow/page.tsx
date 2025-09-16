'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ArrowRight, Settings, Clock } from 'lucide-react';
import { WorkflowStage, UserRole, WorkflowAction } from '@/types';
import { workflowStages } from '@/lib/mockData';

export default function WorkflowConfiguration() {
  const [stages, setStages] = useState<WorkflowStage[]>(workflowStages);
  const [showModal, setShowModal] = useState(false);
  const [editingStage, setEditingStage] = useState<WorkflowStage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Initiator' as UserRole,
    order: 1,
    actions: [] as WorkflowAction[],
    isRequired: true,
    escalationDays: undefined as number | undefined
  });

  const roles: UserRole[] = ['Initiator', 'HOD', 'Manager', 'Security', 'Travel Desk', 'Logistics Team', 'GMD', 'Admin'];
  const actions: WorkflowAction[] = ['Approve', 'Reject', 'Rollback', 'Comment'];

  const handleCreateStage = () => {
    setEditingStage(null);
    setFormData({
      name: '',
      role: 'Initiator',
      order: stages.length + 1,
      actions: ['Comment'],
      isRequired: true,
      escalationDays: undefined
    });
    setShowModal(true);
  };

  const handleEditStage = (stage: WorkflowStage) => {
    setEditingStage(stage);
    setFormData({
      name: stage.name,
      role: stage.role,
      order: stage.order,
      actions: [...stage.actions],
      isRequired: stage.isRequired,
      escalationDays: stage.escalationDays
    });
    setShowModal(true);
  };

  const handleSaveStage = () => {
    if (editingStage) {
      // Update existing stage
      setStages(stages.map(stage => 
        stage.id === editingStage.id 
          ? { ...stage, ...formData }
          : stage
      ).sort((a, b) => a.order - b.order));
    } else {
      // Create new stage
      const newStage: WorkflowStage = {
        id: Date.now().toString(),
        ...formData
      };
      setStages([...stages, newStage].sort((a, b) => a.order - b.order));
    }
    setShowModal(false);
  };

  const deleteStage = (stageId: string) => {
    if (confirm('Are you sure you want to delete this workflow stage?')) {
      setStages(stages.filter(stage => stage.id !== stageId));
    }
  };

  const handleActionToggle = (action: WorkflowAction) => {
    if (formData.actions.includes(action)) {
      setFormData({
        ...formData,
        actions: formData.actions.filter(a => a !== action)
      });
    } else {
      setFormData({
        ...formData,
        actions: [...formData.actions, action]
      });
    }
  };

  const getRoleColor = (role: UserRole) => {
    const colors = {
      'Admin': 'bg-purple-500',
      'GMD': 'bg-red-500',
      'HOD': 'bg-blue-500',
      'Manager': 'bg-green-500',
      'Security': 'bg-yellow-500',
      'Travel Desk': 'bg-indigo-500',
      'Logistics Team': 'bg-pink-500',
      'Initiator': 'bg-gray-500'
    };
    return colors[role] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workflow Configuration</h1>
        <button
          onClick={handleCreateStage}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stage
        </button>
      </div>

      {/* Workflow Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Overview</h3>
        <div className="flex flex-wrap items-center gap-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <div className={`px-3 py-2 rounded-lg text-white text-sm font-medium ${getRoleColor(stage.role)}`}>
                {stage.name}
                {stage.escalationDays && (
                  <div className="flex items-center mt-1 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {stage.escalationDays}d
                  </div>
                )}
              </div>
              {index < stages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stages Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Required
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escalation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stages.map((stage) => (
                <tr key={stage.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-semibold">
                      {stage.order}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{stage.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getRoleColor(stage.role)}`}>
                      {stage.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {stage.actions.map(action => (
                        <span key={action} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                          {action}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      stage.isRequired ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {stage.isRequired ? 'Required' : 'Optional'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {stage.escalationDays ? `${stage.escalationDays} days` : 'None'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditStage(stage)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit Stage"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStage(stage.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete Stage"
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

      {/* Configuration Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Configuration Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Stages are processed in order. Lower order numbers execute first.</li>
          <li>• Required stages must be completed before the workflow can proceed.</li>
          <li>• Escalation rules automatically move requests to the next stage if no action is taken within the specified timeframe.</li>
          <li>• Each role can have multiple actions available (Approve, Reject, Rollback, Comment).</li>
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingStage ? 'Edit Workflow Stage' : 'Add New Workflow Stage'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Actions</label>
                <div className="grid grid-cols-2 gap-2">
                  {actions.map(action => (
                    <label key={action} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes(action)}
                        onChange={() => handleActionToggle(action)}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{action}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isRequired}
                    onChange={(e) => setFormData({...formData, isRequired: e.target.checked})}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">This stage is required</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Escalation Days (Optional)
                </label>
                <input
                  type="number"
                  value={formData.escalationDays || ''}
                  onChange={(e) => setFormData({...formData, escalationDays: e.target.value ? parseInt(e.target.value) : undefined})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of days before auto-escalation"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to disable auto-escalation for this stage
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingStage ? 'Update' : 'Create'} Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}