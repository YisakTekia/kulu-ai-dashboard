import { useState } from "react";
import { Search, Filter } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import RecordingStats from "@/components/Layout/Tasks/recordingStats";
import RecordingTable from "@/components/Layout/Tasks/recordingTable";
import CreateRecordingSheet from "@/components/Layout/Tasks/createRecordingSheet";
import UserProfileDialog from "@/components/Layout/User/userProfile"; 

const RECORDING_DATA = [
  {
    id: "REC-101",
    script: "Please repeat the phrase: 'The quick brown fox jumps over...'",
    language: "Amharic",
    assignee: { name: "Dawit A.", avatar: "", role: "Voice Artist" },
    status: "Recorded",
    duration: "00:15"
  },
  {
    id: "REC-102",
    script: "Describe the image you see on the screen in detail.",
    language: "Oromiffa",
    assignee: { name: "Hanna B.", avatar: "", role: "Voice Artist" },
    status: "Approved",
    duration: "00:45"
  },
  {
    id: "REC-103",
    script: "Read the following news excerpt with a neutral tone.",
    language: "Tigrigna",
    assignee: null,
    status: "Pending",
    duration: ""
  },
  {
    id: "REC-104",
    script: "Imitate a customer service call asking for a refund.",
    language: "Amharic",
    assignee: { name: "Kirubel G.", avatar: "", role: "Voice Artist" },
    status: "Rejected",
    duration: "00:20"
  },
];

export default function RecordingTasks() {
  const [tasks, setTasks] = useState(RECORDING_DATA);
  const [searchTerm, setSearchTerm] = useState("");

  // --- USER PROFILE STATE ---
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserOpen, setIsUserOpen] = useState(false);

  // --- HANDLERS ---
  const handleView = (id: string) => {
    toast.info(`Viewing audio details for ${id}`);
  };

  const handleEdit = (id: string) => {
    toast.info(`Editing recording ${id}`);
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm("Are you sure? This will delete the audio file.");
    if (confirm) {
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.error(`Recording ${id} deleted`);
    }
  };

  
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserOpen(true);
  };

  const filteredTasks = tasks.filter(task => 
    task.script.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.assignee && task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Audio Recording</h1>
            <p className="text-slate-500 text-sm mt-1">Manage voice collection projects and quality assurance.</p>
          </div>
          <CreateRecordingSheet />
        </div>
        <RecordingStats />
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
          <Input 
            placeholder="Search script or assignee..." 
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-red-200 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:border-red-500 cursor-pointer">
            <option>All Status</option>
            <option>Recorded</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
          <Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:text-red-600">
             <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <RecordingTable 
        tasks={filteredTasks} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUserClick={handleUserClick} 
      />

     
      <UserProfileDialog 
        isOpen={isUserOpen} 
        onClose={setIsUserOpen} 
        user={selectedUser} 
      />

    </div>
  );
}