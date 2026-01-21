import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Layout/sidebar";
import Header from "@/components/Layout/header";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] flex font-sans text-[#334155]">
      
      <Sidebar />

      <main className="flex-1 md:ml-[260px] transition-all duration-300">
        
       
        <Header />

        <div className="p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>

      </main>
    </div>
  );
}