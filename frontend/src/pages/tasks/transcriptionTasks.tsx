import { useState } from "react";
import { Search, Filter, FileAudio } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import TranscriptionStats from "@/components/Layout/Tasks/TranscriptionStats";
import TranscriptionTable from "@/components/Layout/Tasks/TranscriptionTable";
import UserProfileDialog from "@/components/Layout/User/userProfile";


const TRANSCRIPTION_DATA = [
  {
    id: "TS-501",
    duration: "02:15",
    text: "The patient complained of severe headache...",
    assignee: { name: "Meron K.", avatar: "", role: "Transcriber" },
    status: "Approved",
    accuracy: 98
  },
  {
    id: "TS-502",
    duration: "05:00",
    text: "Market analysis shows a significant trend...",
    assignee: { name: "Bereket T.", avatar: "", role: "Transcriber" },
    status: "Submitted",
    accuracy: 85
  },
  {
    id: "TS-503",
    duration: "01:30",
    text: "Please hold the line while I connect you...",
    assignee: null,
    status: "Pending",
    accuracy: 0
  },
  {
    id: "TS-504",
    duration: "03:45",
    text: "In today's lecture we will discuss quantum...",
    assignee: { name: "Lydia M.", avatar: "", role: "Reviewer" },
    status: "Correction",
    accuracy: 76
  },
];

export default function TranscriptionTasks() {
  const [tasks, setTasks] = useState(TRANSCRIPTION_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  
  // States for Dialogs
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // Handlers
  const handleView = (id: string) => toast.info(`Reviewing transcription ${id}`);
  const handleEdit = (id: string) => toast.info(`Editing text for ${id}`);
  const handleDelete = (id: string) => {
    if(window.confirm("Delete this transcription?")) {
        setTasks(prev => prev.filter(t => t.id !== id));
        toast.error(`Deleted ${id}`);
    }
  };
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserOpen(true);
  };

  const filteredTasks = tasks.filter(task => 
    task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.assignee && task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Transcription</h1>
            <p className="text-slate-500 text-sm mt-1">Convert audio to text and review accuracy.</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2 shadow-lg shadow-orange-200">
            <FileAudio className="h-4 w-4" /> New Transcription
          </Button>
        </div>
        <TranscriptionStats />
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
          <Input 
            placeholder="Search content or transcriber..." 
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-orange-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
             <Button variant="outline" size="sm" className="hover:text-orange-600"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </div>

      {/* TABLE */}
      <TranscriptionTable 
        tasks={filteredTasks}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUserClick={handleUserClick}
      />

      {/* USER PROFILE */}
      <UserProfileDialog 
        isOpen={isUserOpen} 
        onClose={setIsUserOpen} 
        user={selectedUser} 
      />

    </div>
  );
}