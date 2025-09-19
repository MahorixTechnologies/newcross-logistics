'use client';

import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import {
  LayoutDashboard,
  Hotel,
  Plane,
  Users,
  Calendar,
  FileText,
  Shield,
  User,
} from 'lucide-react';

export default function UserLayout({ children }: { children: ReactNode }) {
  type ActiveTab =
    | ''
    | 'accommodation-request'
    | 'air-travel'
    | 'meeting-management'
    | 'requests'
    | 'request-details'
    | 'transport-security'
    | 'profile';

  const menuItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'requests', label: 'Requests', icon: LayoutDashboard },
    { id: 'accommodation-request', label: 'Accommodation Request', icon: Hotel },
    { id: 'air-travel', label: 'Air Travel Request', icon: Plane },
    { id: 'transport-security', label: 'Transport & Security', icon: Shield },
    { id: 'meeting-management', label: 'Meeting Venue', icon: Calendar },
    { id: 'request-details', label: 'Request Details', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        title="Logistics Request"
        desc="Request Portal"
        type="users"
      />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
