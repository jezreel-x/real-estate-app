// Sidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Home,
  Users,
  ListPlus,
  HandCoins,
  Package,
  FileText,
  ClipboardList,
  Wrench,
  Layers,
  Settings,
  MapPinHouse,
  Mail,
  CircleDollarSign,
} from "lucide-react";
import { FcCustomerSupport } from "react-icons/fc";
import { NavLink, useLocation } from "react-router-dom"; // optional, used if you have react-router

const MENU = [
  { id: "home", label: "Home", icon: Home },
  { id: "dashboard", label: "Dashboard", icon: Home, to: "/property-manager/dashboard" },
  { id: "users", label: "Users", icon: Users, to: "/property-manager/tenants" },
  { id: "property", label: "Property", icon: MapPinHouse, to: "/property-manager/properties" },
  // { id: "roles", label: "Roles", icon: Anchor, to: "/roles" },
  { id: "business", label: "Business Management", icon: HandCoins },
  // { id: "property", label: "Property", icon: Building2, to: "/property" },
  { id: "inquiries", label: "Inquiries", icon: Mail, to: "/inquiries" },
  { id: "tenant", label: "Tenant", icon: Package, to: "/property-manager/tenants" },
  { id: "invoice", label: "Invoice", icon: FileText, to: "/property-manager/invoice" },
  { id: "expense", label: "Expense", icon: CircleDollarSign, to: "/expense" },
  { id: "maintainer", label: "Maintainer", icon: Wrench, to: "/maintainer" },
  { id: "requests", label: "Maintenance Requests", icon: Layers, to: "/requests" },
  { id: "additional", label: "Additional Options", icon: ListPlus },
  { id: "reports", label: "Reports", icon: FileText, to: "/reports" },
  { id: "support", label: "Support", icon: FcCustomerSupport, to: "/support" },
  { id: "notes", label: "Notes", icon: ClipboardList, to: "/notes" },
  { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
  { id: "account", label: "Account", icon: Users, to: "/account" },
];

export default function Sidebar({ expanded, setExpanded }) {
  // expanded on mount
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = typeof window !== "undefined" ? window.location.pathname : "/";

  // If you use react-router uncomment:
  // const location = useLocation();

  // Helper for active route. If you use react-router, replace this with NavLink's isActive.
  const isActive = (to) => {
    // Basic heuristic: use pathname includes the `to`
    if (!to) return false;
    return location === to || location?.startsWith(to);
  };

  return (
    <>
        {/* Mobile top bar with toggle */}
        {/* <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-3 py-2 border-b border-slate-700">
            <div className="flex items-center gap-2">
                <button
                    aria-label="toggle sidebar"
                    className="p-2 rounded-md hover:bg-slate-800"
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="text-lg font-semibold">App Name</div>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-sm text-slate-300">Owner</div>
                <Settings className="w-5 h-5" />
            </div>
        </div> */}

        {/* Sidebar (desktop) */}
        <aside
          // Responsive: hide or translate on small screens when mobileOpen=false
            className={`
                fixed left-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden z-10 transform bg-[rgb(0,0,30)] text-amber-500 border-r border-slate-700
                transition-all duration-300 ease-in-out
                ${expanded ? "w-64" : "w-20"}
                md:translate-x-0
                
            `}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={
                // collapse only on desktop and when user didn't explicitly expand
                // respects responsive collapseBelow prop via tailwind classes (see usage notes)
                () => setExpanded(false)
            }
        >
            {/* Logo area */}
            {/* <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
                <img
                src="/mnt/data/Screenshot (774).png"
                alt="theme logo"
                className={`h-8 w-8 object-cover rounded ${expanded ? "mr-2" : "mx-auto"}`}
                // -- developer note: path points to uploaded screenshot; transform to URL in your environment
                />
                <div className={`flex-1 transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className="text-sm font-semibold">Air Housing</div>
                    <div className="text-xs text-slate-400">Owner admin</div>
                </div>
            </div> */}

            
            {/* Menu */}
            {MENU.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
                <div 
                    key={item.id} 
                    className="relative group"
                >
                {/* Link: if you have react-router, wrap with <NavLink to={item.to}> */}
                <a
                    href={item.to}
                    className={`
                    flex items-center gap-3 px-3 py-3 mx-2 rounded-md transition-colors duration-200
                    ${active ? "text-white" : "hover:bg-slate-800"}
                    ${item.label === "Home" || item.label === "Business Management" || 
                      item.label === "Additional Options" || item.label === "Settings"
                         ? "text-amber-500 border-l-2 border-amber-500 pointer-events-none bg-slate-500" : ""}
                    `}
                    // aria-current={active ? "page" : undefined}
                >
                    {item.label === "Home" || item.label === "Business Management" || item.label === "Additional Options" || 
                    item.label === "Settings" ? 
                      (
                      <>
                        {/* icon */}
                        {expanded === false ? (
                          <Icon 
                          className={`w-5 h-5 flex-shrink-0 
                              ${active ? "text-white" : "text-slate-300 group-hover:text-slate-100"}
                              ${expanded ? "" : "mx-auto"}`
                          } 
                          />
                        ) : null}
                        <span
                            className={`text-sm font-medium transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            {item.label}
                        </span>
                      </>
                      ) : (
                      <>
                        {/* icon */}
                        <Icon 
                          className={`w-5 h-5 flex-shrink-0 
                              ${active ? "text-white" : "text-slate-300 group-hover:text-slate-100"}
                              ${expanded ? "" : "mx-auto"}`
                          } 
                        />
                        <span
                            className={`text-sm font-medium transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        >
                            {item.label}
                        </span>
                      </>
                    )}
                </a>

                {/* Tooltip when collapsed */}
                {/* {expanded === "false" && (
                    <div
                        role="tooltip"
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-md py-1 px-2 text-sm bg-slate-800 text-slate-100 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                        // aria-hidden={!expanded}
                    >
                        {item.label}
                    </div>
                )} */}
                </div>
            );
            })}
        

            {/* Footer / small controls */}
            {/* <div className="mt-auto px-3 py-4 border-t border-slate-800">
                <div className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer ${expanded ? "" : "justify-center"}`}>
                    <Settings className={`w-5 h-5 flex-shrink-0 
                              ${active ? "text-white" : "text-slate-300 group-hover:text-slate-100"}
                              ${expanded ? "" : "mx-auto"}`} />
                    <span className={`text-sm ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>Settings</span>
                </div>
            </div> */}
        </aside>

        {/* Background overlay for mobile when sidebar open */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content wrapper (shifted right for sidebar on desktop)
        <main
          className={`
            flex-1 min-h-screen transition-margin duration-300
            ${expanded ? "md:ml-64" : "md:ml-20"}
            ${mobileOpen ? "blur-sm" : ""}
          `}
        >
          {/* Example main content header 
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-2xl font-semibold">Dashboard / Note</h1>
              <div className="flex items-center gap-3">
                <div className="bg-slate-800 text-slate-300 px-3 py-2 rounded-md">11:40:36 AM</div>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-md">+ Create Note</button>
              </div>
            </div>

            {/* content area 
            <div className="mt-6 bg-[#071127] rounded-md min-h-[60vh] border border-slate-800" />
          </div>
        </main> */}
    </>
  );
}
