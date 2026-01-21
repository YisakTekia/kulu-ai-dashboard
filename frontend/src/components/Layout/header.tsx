import { useState } from "react";
import { 
  Bell, Search, Menu, Sun, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

  return (
    <header className="h-16 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm/30 border-b border-gray-100">
      
      <div className="flex items-center flex-1 max-w-xl">
          {/* Mobile Menu Trigger */}
          <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden mr-4"><Menu/></Button></SheetTrigger>
          <SheetContent side="left">Sidebar Content...</SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50/50 border border-transparent rounded-full py-2 pl-10 pr-4 text-sm text-slate-600 focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
          <Sun className="h-4.5 w-4.5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full relative transition-colors">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full border border-white"></span>
        </Button>
        
        <div className="h-5 w-[1px] bg-slate-200 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-50 rounded-full transition-colors pr-3">
          <Avatar className="h-8 w-8 border border-slate-100 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-blue-600 text-white text-xs">
               {user.fullName ? user.fullName[0] : "A"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-700 leading-none">{user.fullName || "Moni Roy"}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{user.role || "Super Admin"}</p>
          </div>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </div>
      </div>
    </header>
  );
}