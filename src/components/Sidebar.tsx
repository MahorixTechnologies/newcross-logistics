'use client';

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
import { usePathname, useRouter } from 'next/navigation';


type ActiveTab = '' | 'users' | 'workflow' | 'forms' | 'audit' | 'reports';

interface SidebarProps {
    // activeTab: ActiveTab;
    // setActiveTab: (tab: ActiveTab) => void;
    title: string;
    desc: string;
    menuItems: { id: ActiveTab; label: string; icon: React.ElementType }[] ;
    type:'admin'|'users'
}

export default function Sidebar(props: SidebarProps) {
    // const menuItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    //     { id: '', label: 'Dashboard', icon: LayoutDashboard },
    //     { id: 'users', label: 'User Management', icon: Users },
    //     { id: 'workflow', label: 'Workflow Config', icon: GitBranch },
    //     { id: 'forms', label: 'Form Fields', icon: FileText },
    //     { id: 'audit', label: 'Audit Trail', icon: History },
    //     { id: 'reports', label: 'Reports', icon: BarChart3 },
    // ];

    // const menuItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    //     { id: '', label: 'Dashboard', icon: LayoutDashboard },
    //     { id: 'users', label: 'User Management', icon: Users },
    //     { id: 'workflow', label: 'Workflow Config', icon: GitBranch },
    //     { id: 'forms', label: 'Form Fields', icon: FileText },
    //     { id: 'audit', label: 'Audit Trail', icon: History },
    //     { id: 'reports', label: 'Reports', icon: BarChart3 },
    // ];
    const router = useRouter()
    const pathname = usePathname()
    // console.log(pathname.split("/")[2])
    return (
        <div className="w-64 bg-white shadow-lg">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-gray-800">
                    {props.title}
                </h1>
                <p className="text-sm text-gray-500">{props.desc}</p>
            </div>

            <nav className="mt-6">
                {props.menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                router.push(`/${props.type}/${item.id}`)
                            }}
                            className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${pathname.split("/")[2] === item.id
                                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 w-64 p-6 border-t">
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        JD
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">John Doe</p>
                        <p className="text-xs text-gray-500">System Admin</p>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-gray-800">
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                    </button>
                    <button className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-gray-800">
                        <LogOut className="w-4 h-4 mr-1" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}