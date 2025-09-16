'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { mockDashboardMetrics, mockRequests } from '@/lib/mockData';

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    start: '2024-09-01',
    end: '2024-09-16'
  });
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const metrics = mockDashboardMetrics;
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Sample data for different reports
  const departmentPerformanceData = [
    { department: 'IT', requests: 35, avgTime: 3.2, efficiency: 92 },
    { department: 'HR', requests: 30, avgTime: 4.1, efficiency: 88 },
    { department: 'Finance', requests: 25, avgTime: 3.8, efficiency: 90 },
    { department: 'Sales', requests: 40, avgTime: 5.2, efficiency: 85 },
    { department: 'Operations', requests: 20, avgTime: 3.5, efficiency: 94 }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', requests: 120, approved: 95, rejected: 25 },
    { month: 'Feb', requests: 135, approved: 110, rejected: 25 },
    { month: 'Mar', requests: 148, approved: 120, rejected: 28 },
    { month: 'Apr', requests: 142, approved: 115, rejected: 27 },
    { month: 'May', requests: 155, approved: 125, rejected: 30 },
    { month: 'Jun', requests: 162, approved: 135, rejected: 27 },
    { month: 'Jul', requests: 158, approved: 130, rejected: 28 },
    { month: 'Aug', requests: 170, approved: 140, rejected: 30 },
    { month: 'Sep', requests: 150, approved: 125, rejected: 25 }
  ];

  const workflowAnalysisData = [
    { stage: 'Initiator', avgDays: 0.1, bottleneck: false },
    { stage: 'HOD', avgDays: 2.3, bottleneck: true },
    { stage: 'Manager', avgDays: 1.8, bottleneck: false },
    { stage: 'Security', avgDays: 1.2, bottleneck: false },
    { stage: 'Travel Desk', avgDays: 2.1, bottleneck: false },
    { stage: 'Logistics', avgDays: 1.5, bottleneck: false },
    { stage: 'GMD', avgDays: 3.2, bottleneck: true }
  ];

  const requestTypeData = Object.entries(metrics.requestsByType).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / metrics.totalRequests) * 100).toFixed(1)
  }));

  const exportReport = (reportType: string) => {
    let data: any[] = [];
    let filename = '';
    
    switch (reportType) {
      case 'department':
        data = departmentPerformanceData;
        filename = 'department-performance-report';
        break;
      case 'trends':
        data = monthlyTrendsData;
        filename = 'monthly-trends-report';
        break;
      case 'workflow':
        data = workflowAnalysisData;
        filename = 'workflow-analysis-report';
        break;
      default:
        data = [metrics];
        filename = 'overview-report';
    }
    
    const csvContent = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="department">Department Performance</option>
            <option value="trends">Monthly Trends</option>
            <option value="workflow">Workflow Analysis</option>
          </select>
          <button
            onClick={() => exportReport(selectedReport)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Requests"
              value={metrics.totalRequests}
              icon={Users}
              color="bg-blue-500"
              change="+12%"
            />
            <StatCard
              title="Avg Processing Time"
              value={`${metrics.averageProcessingTime} days`}
              icon={Clock}
              color="bg-yellow-500"
              change="-8%"
            />
            <StatCard
              title="Approval Rate"
              value={`${((metrics.approvedRequests / metrics.totalRequests) * 100).toFixed(1)}%`}
              icon={CheckCircle}
              color="bg-green-500"
              change="+5%"
            />
            <StatCard
              title="Efficiency Score"
              value="92%"
              icon={TrendingUp}
              color="bg-purple-500"
              change="+3%"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Types Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={requestTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {requestTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Request Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrendsData.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Department Performance Report */}
      {selectedReport === 'department' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Requests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Processing Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Efficiency Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {departmentPerformanceData.map((dept) => (
                    <tr key={dept.department}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {dept.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {dept.requests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {dept.avgTime} days
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          dept.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                          dept.efficiency >= 85 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {dept.efficiency}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Comparison</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departmentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
                <Bar dataKey="efficiency" fill="#10b981" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Trends Report */}
      {selectedReport === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} name="Total Requests" />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} name="Approved" />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Growth Rate</h4>
              <div className="text-3xl font-bold text-green-600">+8.5%</div>
              <p className="text-sm text-gray-500">vs previous period</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Peak Month</h4>
              <div className="text-3xl font-bold text-blue-600">Aug</div>
              <p className="text-sm text-gray-500">170 requests</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Success Rate</h4>
              <div className="text-3xl font-bold text-purple-600">82%</div>
              <p className="text-sm text-gray-500">average approval</p>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Analysis Report */}
      {selectedReport === 'workflow' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Stage Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Workflow Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Processing Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workflowAnalysisData.map((stage) => (
                    <tr key={stage.stage}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {stage.stage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {stage.avgDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stage.bottleneck 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {stage.bottleneck ? 'Bottleneck' : 'Optimal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {stage.bottleneck 
                          ? 'Consider adding escalation rules or additional approvers' 
                          : 'Performance within acceptable range'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time by Stage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workflowAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar 
                  dataKey="avgDays" 
                  fill={(entry: any) => entry.bottleneck ? '#ef4444' : '#3b82f6'}
                  name="Average Days"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">Workflow Optimization Recommendations</h4>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• <strong>HOD Stage:</strong> Consider implementing auto-escalation after 2 days to reduce bottleneck</li>
              <li>• <strong>GMD Stage:</strong> Add deputy approver to handle requests during absence periods</li>
              <li>• <strong>Security Stage:</strong> Implement parallel processing for low-risk requests</li>
              <li>• <strong>Overall:</strong> Consider implementing express workflow for routine requests under certain thresholds</li>
            </ul>
          </div>
        </div>
      )}

      {/* Export Summary */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Export Options</h3>
            <p className="text-sm text-blue-700">Generate detailed reports for further analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => exportReport('overview')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export Overview
            </button>
            <button
              onClick={() => exportReport('department')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export Department Data
            </button>
            <button
              onClick={() => exportReport('trends')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Export Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}