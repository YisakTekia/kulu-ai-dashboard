import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Globe, Mic, FileType, UploadCloud,
  FolderKanban, Users, CheckSquare, PieChart, 
  Settings, LogOut, ChevronDown, ChevronRight 
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sidebar State
  const [openGroups, setOpenGroups] = useState<{[key: string]: boolean}>({ 
    "projects": true, 
    "users": true 
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-white h-screen fixed left-0 top-0 z-30 border-r border-gray-100 shadow-[2px_0_20px_rgba(0,0,0,0.02)] overflow-y-auto no-scrollbar">
      
      {/* 1. BRAND LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-gray-50/50">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
              <span className="text-blue-600 text-3xl font-black tracking-tighter">K</span>
              <div className="absolute -right-1 top-0 h-2 w-2 bg-orange-400 rounded-full ring-2 ring-white"></div>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">KULU AI</span>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 px-4 space-y-6 py-6">
        
        {/* Dashboard Hero Button */}
        <Link to="/dashboard">
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
              isLinkActive("/dashboard") 
              ? "bg-blue-50 text-blue-700 shadow-sm" 
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}>
              <LayoutDashboard className={`h-5 w-5 ${isLinkActive("/dashboard") ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              <span className="font-semibold text-sm">Dashboard</span>
          </div>
        </Link>

        {/* GROUP 1: PROJECTS */}
        <div>
          <div className="px-4 mb-2 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Projects</span>
          </div>
          
          <div className="space-y-1">
            <button 
              onClick={() => toggleGroup("projects")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 group"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                <span>Tasks</span>
              </div>
              {openGroups["projects"] ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
            </button>
            
            {openGroups["projects"] && (
              <div className="relative ml-4 pl-4 border-l border-slate-100 space-y-1 mt-1">
                  <SidebarLink to="/tasks/translation" icon={Globe} label="Translation" color="text-blue-500" isActive={isLinkActive("/tasks/translation")} />
                  <SidebarLink to="/tasks/recording" icon={Mic} label="Recording" color="text-red-500" isActive={isLinkActive("/tasks/recording")} />
                  <SidebarLink to="/tasks/transcription" icon={FileType} label="Transcription" color="text-orange-500" isActive={isLinkActive("/tasks/transcription")} />
                  <SidebarLink to="/tasks/bulk" icon={UploadCloud} label="Bulk Uploads" color="text-purple-500" isActive={isLinkActive("/tasks/bulk")} />
              </div>
            )}
          </div>
        </div>

        {/* GROUP 2: WORKFORCE */}
        <div>
          <div className="px-4 mb-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Team</span>
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => toggleGroup("users")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 group"
            >
              <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                <span>User Management</span>
              </div>
              {openGroups["users"] ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
            </button>
            
            {openGroups["users"] && (
              <div className="relative ml-4 pl-4 border-l border-slate-100 space-y-1 mt-1">
                  <SidebarLink to="/users" label="All Users" isActive={isLinkActive("/users")} isDot dotColor="bg-slate-400" />
                  <SidebarLink to="/users/supervisors" label="Supervisors" isActive={isLinkActive("/users/supervisors")} isDot dotColor="bg-blue-400" />
                  <SidebarLink to="/users/admins" label="Admins" isActive={isLinkActive("/users/admins")} isDot dotColor="bg-purple-400" />
                  <SidebarLink to="/users/suspended" label="Suspended" isActive={isLinkActive("/users/suspended")} isDot dotColor="bg-red-400" />
              </div>
            )}
          </div>
        </div>

        {/* GROUP 3: QUALITY */}
        <div>
          <div className="px-4 mb-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Quality</span>
          </div>
          <SidebarLink to="/reviews" icon={CheckSquare} label="Reviews & Approvals" color="text-green-500" isActive={isLinkActive("/reviews")} />
          <SidebarLink to="/reports" icon={PieChart} label="Reports & Analysis" color="text-indigo-500" isActive={isLinkActive("/reports")} />
        </div>
        
      </nav>

      {/* BOTTOM: LOGOUT */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
          <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 group transition-colors rounded-lg hover:bg-white hover:shadow-sm">
                <Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                Settings
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 group transition-colors mt-1 rounded-lg hover:bg-red-50">
                <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-500" />
                Logout
          </button>
      </div>
    </aside>
  );
}

// Reusable Link Component (To keep code clean)
function SidebarLink({ to, icon: Icon, label, color, isActive, isDot, dotColor }: any) {
  return (
    <Link to={to} className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition-colors ${isActive ? "bg-slate-50 text-slate-900 font-medium" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}>
      {isDot ? (
        <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></div>
      ) : (
        <Icon className={`h-4 w-4 ${color}`} />
      )}
      {label}
    </Link>
  );
}