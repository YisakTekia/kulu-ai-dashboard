import { useState } from "react";
import { 
  CheckCircle2, XCircle, Play, Pause, 
  FileText, Mic, Globe, AlertCircle, 
  Search, Filter, ChevronRight, Star,
  ThumbsUp, ThumbsDown, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// --- TYPES ---
interface Task {
  id: string;
  type: "TRANSLATION" | "RECORDING" | "TRANSCRIPTION";
  submittedBy: { name: string; avatar: string; role: string };
  date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  content: {
    source?: string;    // For Translation/Transcription
    target?: string;    // For Translation
    audioUrl?: string;  // For Recording
    duration?: string;
  };
  qualityScore?: number;
}

// --- MOCK DATA ---
const TASKS_DATA: Task[] = [
  {
    id: "REV-101",
    type: "TRANSLATION",
    submittedBy: { name: "Abebe K.", avatar: "AK", role: "Translator" },
    date: "2 mins ago",
    status: "PENDING",
    content: {
      source: "Artificial Intelligence is transforming healthcare in Africa.",
      target: "አርቴፊሻል ኢንተለጀንስ በአፍሪካ የጤና አጠባበቅን እየለወጠ ነው።"
    }
  },
  {
    id: "REV-102",
    type: "RECORDING",
    submittedBy: { name: "Chala O.", avatar: "CO", role: "Recorder" },
    date: "15 mins ago",
    status: "PENDING",
    content: {
      source: "Oromia region is known for its coffee production.",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo URL
      duration: "00:12"
    }
  },
  {
    id: "REV-103",
    type: "TRANSCRIPTION",
    submittedBy: { name: "Hanna B.", avatar: "HB", role: "Transcriber" },
    date: "1 hour ago",
    status: "REJECTED",
    content: {
      audioUrl: "...",
      target: "The quick brown fox jumps over the lazy dog."
    },
    qualityScore: 45
  }
];

export default function ReviewsPage() {
  const [tasks, setTasks] = useState<Task[]>(TASKS_DATA);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [qualityScore, setQualityScore] = useState([80]);
  const [feedback, setFeedback] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); // For Audio Player Simulation

  // Filtering
  const [activeTab, setActiveTab] = useState("PENDING");

  const filteredTasks = tasks.filter(t => 
    activeTab === "ALL" ? true : t.status === activeTab
  );

  // Handlers
  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    if (!selectedTask) return;

    // Simulate API update
    setTasks(prev => prev.map(t => 
      t.id === selectedTask.id 
        ? { ...t, status, qualityScore: qualityScore[0] } 
        : t
    ));

    const msg = status === "APPROVED" ? "Task Approved successfully!" : "Task Rejected and sent back.";
    toast[status === "APPROVED" ? "success" : "error"](msg);
    
    // Reset and Close
    setSelectedTask(null);
    setFeedback("");
    setQualityScore([80]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quality Control</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Review, validate, and grade submitted tasks.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white rounded-xl">
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"><AlertCircle className="w-6 h-6" /></div>
                 <div><p className="text-xs font-bold text-slate-400 uppercase">Pending Review</p><h3 className="text-2xl font-black text-slate-900">{tasks.filter(t => t.status === 'PENDING').length}</h3></div>
             </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-xl">
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 className="w-6 h-6" /></div>
                 <div><p className="text-xs font-bold text-slate-400 uppercase">Approved Today</p><h3 className="text-2xl font-black text-slate-900">145</h3></div>
             </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-xl">
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Star className="w-6 h-6" /></div>
                 <div><p className="text-xs font-bold text-slate-400 uppercase">Avg Quality Score</p><h3 className="text-2xl font-black text-slate-900">92%</h3></div>
             </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT */}
      <Tabs defaultValue="PENDING" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
               <TabsList className="bg-white border border-slate-200">
                   <TabsTrigger value="PENDING">Pending Queue</TabsTrigger>
                   <TabsTrigger value="APPROVED">Approved History</TabsTrigger>
                   <TabsTrigger value="REJECTED">Rejected Items</TabsTrigger>
               </TabsList>
               
               <div className="relative w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                   <Input placeholder="Search task ID..." className="pl-10 bg-white" />
               </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
             <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                 <Table>
                     <TableHeader className="bg-slate-50/50">
                         <TableRow>
                             <TableHead>Task Type</TableHead>
                             <TableHead>Submitted By</TableHead>
                             <TableHead>Preview</TableHead>
                             <TableHead>Time</TableHead>
                             <TableHead>Status</TableHead>
                             <TableHead className="text-right">Action</TableHead>
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                         {filteredTasks.length > 0 ? filteredTasks.map(task => (
                             <TableRow key={task.id} className="hover:bg-slate-50">
                                 <TableCell>
                                     <Badge variant="outline" className="gap-2 pl-1 pr-3 py-1">
                                         {task.type === 'TRANSLATION' && <Globe className="w-3.5 h-3.5 text-blue-500" />}
                                         {task.type === 'RECORDING' && <Mic className="w-3.5 h-3.5 text-red-500" />}
                                         {task.type === 'TRANSCRIPTION' && <FileText className="w-3.5 h-3.5 text-amber-500" />}
                                         {task.type}
                                     </Badge>
                                 </TableCell>
                                 <TableCell>
                                     <div className="flex items-center gap-3">
                                         <Avatar className="h-8 w-8"><AvatarFallback className="text-xs bg-slate-100">{task.submittedBy.avatar}</AvatarFallback></Avatar>
                                         <div>
                                             <p className="text-sm font-bold text-slate-900">{task.submittedBy.name}</p>
                                             <p className="text-[10px] text-slate-400">{task.submittedBy.role}</p>
                                         </div>
                                     </div>
                                 </TableCell>
                                 <TableCell className="max-w-xs truncate text-xs text-slate-500">
                                     {task.type === 'RECORDING' ? "Audio File (" + task.content.duration + ")" : task.content.source}
                                 </TableCell>
                                 <TableCell className="text-xs font-medium text-slate-500">{task.date}</TableCell>
                                 <TableCell>
                                     <Badge className={
                                         task.status === 'APPROVED' ? "bg-green-100 text-green-700" :
                                         task.status === 'REJECTED' ? "bg-red-100 text-red-700" :
                                         "bg-amber-100 text-amber-700"
                                     }>{task.status}</Badge>
                                 </TableCell>
                                 <TableCell className="text-right">
                                     <Button size="sm" onClick={() => setSelectedTask(task)} className="bg-slate-900 text-white hover:bg-slate-800">
                                         Review <ChevronRight className="w-4 h-4 ml-1" />
                                     </Button>
                                 </TableCell>
                             </TableRow>
                         )) : (
                             <TableRow><TableCell colSpan={6} className="text-center py-10 text-slate-500">No tasks found in this queue.</TableCell></TableRow>
                         )}
                     </TableBody>
                 </Table>
             </div>
          </TabsContent>
      </Tabs>

      {/* --- REVIEW MODAL (WORKBENCH) --- */}
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 bg-slate-50/50 overflow-hidden">
             
             {selectedTask && (
                 <>
                    {/* 1. Modal Header */}
                    <div className="p-6 bg-white border-b border-slate-200 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                Review Task <span className="text-slate-400 font-normal">#{selectedTask.id}</span>
                            </h2>
                            <div className="flex items-center gap-3 mt-2 text-sm">
                                <Badge variant="secondary">{selectedTask.type}</Badge>
                                <span className="text-slate-500">Submitted by <b>{selectedTask.submittedBy.name}</b></span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase">Current Status</p>
                            <Badge className="mt-1">{selectedTask.status}</Badge>
                        </div>
                    </div>

                    {/* 2. Work Area (The actual comparison) */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            
                            {/* SOURCE (Left Side) */}
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-slate-400 uppercase">Source Content</Label>
                                <div className="p-5 bg-white border border-slate-200 rounded-xl min-h-[200px] shadow-sm">
                                    {selectedTask.type === 'RECORDING' ? (
                                        <div className="flex flex-col items-center justify-center h-full gap-4">
                                            <div className="p-4 bg-slate-100 rounded-full">
                                                <Mic className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <p className="text-center text-slate-600 font-medium italic">"{selectedTask.content.source}"</p>
                                        </div>
                                    ) : (
                                        <p className="text-lg leading-relaxed text-slate-800">{selectedTask.content.source}</p>
                                    )}
                                </div>
                            </div>

                            {/* TARGET (Right Side) */}
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-slate-400 uppercase">
                                    {selectedTask.type === 'RECORDING' ? "Submitted Audio" : "Translation / Transcription"}
                                </Label>
                                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl min-h-[200px] relative">
                                    {selectedTask.type === 'RECORDING' ? (
                                        <div className="flex flex-col items-center justify-center h-full gap-4">
                                            <div className="w-full bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
                                                <Button 
                                                    size="icon" 
                                                    className="rounded-full h-12 w-12"
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                >
                                                    {isPlaying ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5 ml-1"/>}
                                                </Button>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className={`h-full bg-blue-600 transition-all duration-1000 ${isPlaying ? 'w-full' : 'w-1/3'}`}></div>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                                                        <span>00:04</span>
                                                        <span>{selectedTask.content.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500">Listen carefully to verify pronunciation and accuracy.</p>
                                        </div>
                                    ) : (
                                        <p className="text-lg leading-relaxed text-slate-800 font-medium">{selectedTask.content.target}</p>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* 3. Evaluation Tools */}
                        <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
                             <div>
                                 <div className="flex justify-between mb-4">
                                     <Label className="font-bold text-slate-900">Quality Score</Label>
                                     <span className={`font-black text-lg ${
                                         qualityScore[0] >= 90 ? "text-green-600" : 
                                         qualityScore[0] >= 70 ? "text-amber-600" : "text-red-600"
                                     }`}>{qualityScore[0]}%</span>
                                 </div>
                                 <Slider 
                                    defaultValue={[80]} 
                                    max={100} 
                                    step={1} 
                                    value={qualityScore} 
                                    onValueChange={setQualityScore}
                                    className="py-4"
                                 />
                                 <p className="text-xs text-slate-400 mt-2">Slide to grade the work. Below 70% should be considered for rejection.</p>
                             </div>

                             <div className="space-y-2">
                                 <Label>Reviewer Feedback (Optional for Approval)</Label>
                                 <Textarea 
                                    placeholder="e.g. Excellent grammar, but watch out for punctuation." 
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="bg-slate-50"
                                 />
                             </div>
                        </div>
                    </div>

                    {/* 4. Footer Actions */}
                    <div className="p-6 bg-white border-t border-slate-200 flex justify-between items-center">
                        <Button variant="ghost" onClick={() => setSelectedTask(null)}>Cancel</Button>
                        <div className="flex gap-3">
                             <Button 
                                variant="destructive" 
                                className="gap-2"
                                onClick={() => handleReviewAction("REJECTED")}
                             >
                                 <ThumbsDown className="w-4 h-4" /> Reject & Return
                             </Button>
                             <Button 
                                className="bg-green-600 hover:bg-green-700 gap-2"
                                onClick={() => handleReviewAction("APPROVED")}
                             >
                                 <ThumbsUp className="w-4 h-4" /> Approve & Pay
                             </Button>
                        </div>
                    </div>
                 </>
             )}
          </DialogContent>
      </Dialog>
      
    </div>
  );
}