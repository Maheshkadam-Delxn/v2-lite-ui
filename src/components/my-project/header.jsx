"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Package,
  CheckCircle,
  BarChart3,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const MyProjectHeader = ({ id }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpandedItem = (name) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const tabs = [
    {
      name: "Dashboard",
      icon: Home,
      href: `/admin/my-projects/${id}/dashboard`,
    },
    {
      name: "Resources",
      icon: Users,
      href: `/admin/my-projects/${id}/project-resources/boq`,
      children: [
        { name: "BOQ", href: `/admin/my-projects/${id}/project-resources/boq` },
        { name: "Drawings", href: `/admin/my-projects/${id}/project-resources/drawings` },
        { name: "Files", href: `/admin/my-projects/${id}/project-resources/files` },
      ],
    },
    {
      name: "Planning",
      icon: Calendar,
      href: `/admin/my-projects/${id}/project-planning/activity`,
      children: [
        { name: "Activity", href: `/admin/my-projects/${id}/project-planning/activity` },
        { name: "Resources", href: `/admin/my-projects/${id}/project-planning/resources` },
        { name: "Timeline", href: `/admin/my-projects/${id}/project-planning/timeline` },
      ],
    },
    {
      name: "Payment",
      icon: CreditCard,
      href: `/admin/my-projects/${id}/payment/bill-Payment`,
      children: [
        { name: "Bill Payment", href: `/admin/my-projects/${id}/payment/bill-Payment` },
        { name: "Expense", href: `/admin/my-projects/${id}/payment/expense` },
        { name: "Indent", href: `/admin/my-projects/${id}/payment/indent` },
        { name: "Purchase Order", href: `/admin/my-projects/${id}/payment/purchase-order` },
        { name: "Receive Note", href: `/admin/my-projects/${id}/payment/receive-note` },
      ],
    },
    {
      name: "Approvals",
      icon: CheckCircle,
      href: `/admin/my-projects/${id}/approvals/rfi`,
      children: [
        { name: "Inspection", href: `/admin/my-projects/${id}/approvals/inspection-report` },
        { name: "RFI", href: `/admin/my-projects/${id}/approvals/rfi` },
        { name: "Snagging", href: `/admin/my-projects/${id}/approvals/snagging` },
        { name: "Submittal", href: `/admin/my-projects/${id}/approvals/submittal` },
      ],
    },
    {
      name: "Reports",
      icon: BarChart3,
      href: `/admin/my-projects/${id}/reports/daily-progress-report`,
      children: [
        { name: "Daily Progress", href: `/admin/my-projects/${id}/reports/daily-progress-report` },
        { name: "Material", href: `/admin/my-projects/${id}/reports/material-consumption-report` },
        { name: "Timeline", href: `/admin/my-projects/${id}/reports/timeline-report` },
      ],
    },
    {
      name: "Work Order",
      icon: FileText,
      href: `/admin/my-projects/${id}/work-order`,
      children: [
        { name: "Adv Payments", href: `/admin/my-projects/${id}/work-order/Adv-payments` },
        { name: "Bill", href: `/admin/my-projects/${id}/work-order/bill` },
        { name: "Bill Payments", href: `/admin/my-projects/${id}/work-order/bill-payments` },
      ],
    },
    {
      name: "Inventory",
      icon: Package,
      href: `/admin/my-projects/${id}/inventory`,
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between font-sans shadow-sm">
      <div className="flex items-center gap-4 w-full">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Project
        </h1>
        <button
          className="sm:hidden ml-auto p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
        </button>
        <nav className="hidden sm:flex gap-1">
          {tabs.map(({ name, icon: Icon, href, children }) => {
            const isActive = pathname.startsWith(href);
            return (
              <div key={name} className="relative group">
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-md transition-all duration-200 ${
                    isActive 
                      ? "text-blue-700 bg-blue-50 shadow-sm" 
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"} />
                  <span>{name}</span>
                  {children && <ChevronDown size={14} className="text-gray-400 group-hover:text-blue-400" />}
                </Link>
                {children && (
                  <div className="absolute left-0 top-full mt-1 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50 py-1 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 ease-out">
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`px-4 py-2 text-sm whitespace-nowrap hover:bg-blue-50 transition-colors duration-150 ${
                          pathname === child.href 
                            ? "text-blue-700 font-medium bg-blue-50" 
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        {isMobileMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-white border-t border-gray-200 sm:hidden z-50 shadow-lg">
            <ul className="flex flex-col p-2 gap-1">
              {tabs.map(({ name, icon: Icon, href, children }) => {
                const isActive = pathname.startsWith(href);
                const isExpanded = expandedItems[name];
                
                return (
                  <li key={name} className="relative">
                    <div className="flex items-center">
                      <Link
                        href={href}
                        className={`flex items-center gap-2 flex-1 px-3 py-2.5 text-base font-medium rounded-md transition-colors duration-200 ${
                          isActive 
                            ? "text-blue-700 bg-blue-50" 
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (!children) setIsMobileMenuOpen(false);
                        }}
                      >
                        <Icon size={18} className={isActive ? "text-blue-600" : "text-gray-500"} />
                        <span className="whitespace-nowrap">{name}</span>
                      </Link>
                      {children && (
                        <button 
                          className="p-2 mr-1 rounded-md hover:bg-gray-100"
                          onClick={() => toggleExpandedItem(name)}
                        >
                          <ChevronDown 
                            size={16} 
                            className={`text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} 
                          />
                        </button>
                      )}
                    </div>
                    {children && isExpanded && (
                      <ul className="ml-6 mt-1 flex flex-col gap-1 border-l border-gray-200 pl-2">
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-3 py-2.5 text-sm rounded-md transition-colors duration-150 ${
                                pathname === child.href 
                                  ? "text-blue-700 font-medium bg-blue-50" 
                                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default MyProjectHeader;