import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import TaskStats from "@/components/Layout/Tasks/taskStates";
import TaskTable from "@/components/Layout/Tasks/taskTable";
import CreateTaskSheet from "@/components/Layout/Tasks/createTaskSheet";


import ViewTaskDialog from "@/components/Layout/Tasks/viewTaskDialog";
import EditTaskSheet from "@/components/Layout/Tasks/EditTaskSheet";
import DeleteTaskAlert from "@/components/Layout/Tasks/DeleteTaskAlert";
import UserProfileDialog from "@/components/Layout/User/userProfile"; 

const INITIAL_DATA = [
  {
    id: "TR-8821",
    sourceText: "Artificial Intelligence is transforming healthcare...",
    languages: { from: "English", to: "Amharic" },
    assignee: { name: "Abebe Kebede", avatar: "https://github.com/shadcn.png", role: "Translator" },
    status: "In Progress",
    progress: 45,
    dueDate: "Oct 24, 2025"
  },
  {
    id: "TR-8822",
    sourceText: "Sustainable energy sources are vital for future...",
    languages: { from: "English", to: "Tigrigna" },
    assignee: { name: "Sara M.", avatar: "", role: "Translator" },
    status: "Completed",
    progress: 100,
    dueDate: "Oct 22, 2025"
  },
  {
    id: "TR-8823",
    sourceText: "The history of Adwa victory is a symbol of...",
    languages: { from: "English", to: "Oromiffa" },
    assignee: null,
    status: "Pending",
    progress: 0,
    dueDate: "Oct 30, 2025"
  },
  {
    id: "TR-8824",
    sourceText: "Machine learning algorithms require vast data...",
    languages: { from: "English", to: "Amharic" },
    assignee: { name: "Chala O.", avatar: "", role: "Reviewer" },
    status: "Flagged",
    progress: 80,
    dueDate: "Oct 25, 2025"
  },
];

export default function TranslationTasks() {
  const [tasks, setTasks] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [languageFilter, setLanguageFilter] = useState("All Languages");
  
  // --- STATE FOR ACTIONS ---
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null); 
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false); 
  // --- HANDLERS ---
  const handleView = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setSelectedTask(task);
    setIsViewOpen(true);
  };

  const handleEdit = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
      toast.success(`Task ${selectedTask.id} deleted successfully`);
      setIsDeleteOpen(false);
    }
  };

 
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsUserOpen(true);
  };

  // --- FILTERS ---
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignee && task.assignee.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "All Status" || task.status === statusFilter;
    const matchesLanguage = languageFilter === "All Languages" || task.languages.to === languageFilter;

    return matchesSearch && matchesStatus && matchesLanguage;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Translation Projects</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and track translation progress.</p>
          </div>
          <CreateTaskSheet />
        </div>
        <TaskStats />
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder="Search by ID, content or assignee..." 
            className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <select 
            className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Flagged</option>
          </select>
          
          <select 
            className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option>All Languages</option>
            <option>Amharic</option>
            <option>Tigrigna</option>
            <option>Oromiffa</option>
          </select>
           
          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

          <Button variant="outline" size="sm" className="text-slate-600 border-slate-200">
             <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <TaskTable 
        tasks={filteredTasks} 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onUserClick={handleUserClick} 
      />

      {/* --- MODALS & SHEETS --- */}
      
      <ViewTaskDialog 
        open={isViewOpen} 
        onOpenChange={setIsViewOpen} 
        task={selectedTask} 
      />

      <EditTaskSheet 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        task={selectedTask} 
      />

      <DeleteTaskAlert 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        onConfirm={confirmDelete} 
      />

     
      <UserProfileDialog
        isOpen={isUserOpen}
        onClose={setIsUserOpen}
        user={selectedUser}
      />

    </div>
  );
}