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
    escalationDays: undefined as number | undefined,
  });

  const roles: UserRole[] = [
    'Initiator',
    'HOD',
    'Manager',
    'Security',
    'Travel Desk',
    'Logistics Team',
    'GMD',
    'Admin',
  ];
  const actions: WorkflowAction[] = ['Approve', 'Reject', 'Rollback', 'Comment'];

  const handleCreateStage = () => {
    setEditingStage(null);
    setFormData({
      name: '',
      role: 'Initiator',
      order: stages.length + 1,
      actions: ['Comment'],
      isRequired: true,
      escalationDays: undefined,
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
      escalationDays: stage.escalationDays,
    });
    setShowModal(true);
  };

  const handleSaveStage = () => {
    if (editingStage) {
      // Update existing stage
      setStages(
        stages
          .map((stage) =>
            stage.id === editingStage.id ? { ...stage, ...formData } : stage,
          )
          .sort((a, b) => a.order - b.order),
      );
    } else {
      // Create new stage
      const newStage: WorkflowStage = {
        id: Date.now().toString(),
        ...formData,
      };
      setStages([...stages, newStage].sort((a, b) => a.order - b.order));
    }
    setShowModal(false);
  };

  const deleteStage = (stageId: string) => {
    if (confirm('Are you sure you want to delete this workflow stage?')) {
      setStages(stages.filter((stage) => stage.id !== stageId));
    }
  };

  const handleActionToggle = (action: WorkflowAction) => {
    if (formData.actions.includes(action)) {
      setFormData({
        ...formData,
        actions: formData.actions.filter((a) => a !== action),
      });
    } else {
      setFormData({
        ...formData,
        actions: [...formData.actions, action],
      });
    }
  };

  const getRoleColor = (role: UserRole) => {
    const colors = {
      Admin: 'bg-purple-500',
      GMD: 'bg-red-500',
      HOD: 'bg-blue-500',
      Manager: 'bg-green-500',
      Security: 'bg-yellow-500',
      'Travel Desk': 'bg-indigo-500',
      'Logistics Team': 'bg-pink-500',
      Initiator: 'bg-gray-500',
    };
    return colors[role] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
   

      {/* Workflow Overview */}
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
                    <div
                      className={`px-3 py-2 rounded-lg text-white text-sm font-medium ${getRoleColor(
                        stage.role,
                      )}`}
                    >
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
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getRoleColor(
                              stage.role,
                            )}`}
                          >
                            {stage.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {stage.actions.map((action) => (
                              <span
                                key={action}
                                className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800"
                              >
                                {action}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              stage.isRequired
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {stage.isRequired ? 'Required' : 'Optional'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
      
            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Configuration Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Stages are executed in order from Initiator to Completed.</li>
                <li>• Required stages must be approved before proceeding.</li>
                <li>• Actions include Approve, Reject, Roll back, and Comment.</li>
                <li>• Escalation rules can be added to auto-move requests if no action is taken.</li>
              </ul>
            </div>
          </div>
      {/* ... (your overview and table remain unchanged) ... */}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingStage ? 'Edit Workflow Stage' : 'Add New Workflow Stage'}
            </h2>

            <div className="space-y-4">
              {/* Stage Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stage Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Role & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as UserRole,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value, 10),
                      })
                    }
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actions
                </label>
                <div className="flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => handleActionToggle(action)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        formData.actions.includes(action)
                          ? 'bg-blue-100 border-blue-400 text-blue-700'
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirement
                </label>
                <select
                  value={formData.isRequired ? 'Required' : 'Optional'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isRequired: e.target.value === 'Required',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Required">Required</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              {/* Escalation Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Escalation (days)
                </label>
                <input
                  type="number"
                  value={formData.escalationDays ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      escalationDays: e.target.value
                        ? parseInt(e.target.value, 10)
                        : undefined,
                    })
                  }
                  min={0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
