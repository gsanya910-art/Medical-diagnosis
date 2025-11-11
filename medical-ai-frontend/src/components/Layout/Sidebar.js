import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  FileText,
  Activity,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navigation = [
    // { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Diagnosis", href: "/dashboard/diagnosis", icon: Stethoscope },
    // { name: "Results", href: "/dashboard/results", icon: FileText },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <nav className="mt-8 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700 border-r-2 border-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
