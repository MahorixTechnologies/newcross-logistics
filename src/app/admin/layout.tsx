
'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

import {
    LayoutDashboard,
    Users,
    GitBranch,
    FileText,
    History,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';

type ActiveTab = '' | 'users' | 'workflow' | 'forms' | 'audit' | 'reports';

  const menuItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
        { id: '', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'workflow', label: 'Workflow Config', icon: GitBranch },
        { id: 'forms', label: 'Form Fields', icon: FileText },
        { id: 'audit', label: 'Audit Trail', icon: History },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
    ];

export default function AdminLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar menuItems={menuItems} title='Logistics Admin' desc='Management Portal' type='admin'/>
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}