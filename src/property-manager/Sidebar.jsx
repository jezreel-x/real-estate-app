// Sidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Home,
  Users,
  Anchor,
  Building2,
  Package,
  FileText,
  ClipboardList,
  Wrench,
  Layers,
  Briefcase,
  Menu,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom"; // optional, used if you have react-router

const MENU = [
  { id: "home", label: "Home", icon: Home, to: "/home" },
  { id: "dashboard", label: "Dashboard", icon: Home, to: "/dashboard" },
  { id: "users", label: "Users", icon: Users, to: "/users" },
  { id: "roles", label: "Roles", icon: Anchor, to: "/roles" },
  { id: "business", label: "Business Management", icon: Briefcase, to: "/business" },
  { id: "property", label: "Property", icon: Building2, to: "/property" },
  { id: "inquiries", label: "Inquiries", icon: Briefcase, to: "/inquiries" },
  { id: "tenant", label: "Tenant", icon: Package, to: "/tenant" },
  { id: "invoice", label: "Invoice", icon: FileText, to: "/invoice" },
  { id: "expense", label: "Expense", icon: ClipboardList, to: "/expense" },
  { id: "maintainer", label: "Maintainer", icon: Wrench, to: "/maintainer" },
  { id: "requests", label: "Maintenance Request", icon: Layers, to: "/requests" },
];

export default function Sidebar({
  // optional props to control behaviour externally
  initialExpanded = true,
//   collapseBelow = "md", // collapse at tailwind breakpoint name
}) {
  // expanded on mount
  const [expanded, setExpanded] = useState(initialExpanded);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = typeof window !== "undefined" ? window.location.pathname : "/";

  // If you use react-router uncomment:
  // const location = useLocation();

  useEffect(() => {
    setExpanded(initialExpanded);
  }, [initialExpanded]);

  // Helper for active route. If you use react-router, replace this with NavLink's isActive.
  const isActive = (to) => {
    // Basic heuristic: use pathname includes the `to`
    if (!to) return false;
    return location === to || location?.startsWith(to);
  };

  return (
    <>
      {/* Mobile top bar with toggle */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-3 py-2 border-b border-slate-700">
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
      </div>

      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside
          // Responsive: hide or translate on small screens when mobileOpen=false
          className={`
            fixed top-0 left-0 h-full z-30 transform bg-slate-900 text-slate-100 border-r border-slate-700
            transition-all duration-300 ease-in-out
            ${expanded ? "w-64" : "w-20"}
            md:static md:translate-x-0
            ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => {
            // collapse only on desktop and when user didn't explicitly expand
            // respects responsive collapseBelow prop via tailwind classes (see usage notes)
            setExpanded(false);
          }}
        >
          {/* Logo area */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
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
          </div>

          {/* Menu */}
          <nav className="mt-4 px-1">
            {MENU.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, item.id);

              return (
                <div key={item.id} className="relative group">
                  {/* Link: if you have react-router, wrap with <NavLink to={item.to}> */}
                  <a
                    href={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-3 mx-2 rounded-md transition-colors duration-200
                      ${active ? "bg-gradient-to-r from-slate-700/70 to-slate-700/40 ring-1 ring-slate-600" : "hover:bg-slate-800"}
                      ${expanded ? "justify-start" : "justify-center"}
                    `}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-sky-400" : "text-slate-300 group-hover:text-slate-100"}`} />
                    {/* label */}
                    <span
                      className={`text-sm font-medium transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                      {item.label}
                    </span>
                  </a>

                  {/* Tooltip when collapsed */}
                  {!expanded && (
                    <div
                      role="tooltip"
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-md py-1 px-2 text-sm bg-slate-800 text-slate-100 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      aria-hidden={!expanded}
                    >
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer / small controls */}
          <div className="mt-auto px-3 py-4 border-t border-slate-800">
            <div className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800 cursor-pointer ${expanded ? "" : "justify-center"}`}>
              <Settings className="w-5 h-5" />
              <span className={`text-sm ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>Settings</span>
            </div>
          </div>
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
      </div>
    </>
  );
}
