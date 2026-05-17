import { useState } from "react";
import { 
  Users, Search, Plus, MoreHorizontal, 
  CheckCircle2, Globe, BarChart3, 
  Briefcase, MessageSquare, Star, UserPlus,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// --- TYPES ---
interface Supervisor {
  id: string;
  name: string;
  email: string;
  assignedLanguage: string;
  teamSize: number;
  activeProjects: number;
  approvalRate: number;
  status: "ACTIVE" | "ON LEAVE";
  avatar: string;
}

const SUPERVISORS_DATA: Supervisor[] = [
  { id: "SUP-001", name: "Almaz Bekele", email: "almaz@kulu.ai", assignedLanguage: "Amharic", teamSize: 24, activeProjects: 5, approvalRate: 98, status: "ACTIVE", avatar: "AB" },
  { id: "SUP-002", name: "Gemechu T.", email: "gemechu@kulu.ai", assignedLanguage: "Afan Oromo", teamSize: 18, activeProjects: 3, approvalRate: 95, status: "ACTIVE", avatar: "GT" },
  { id: "SUP-003", name: "Hagos M.", email: "hagos@kulu.ai", assignedLanguage: "Tigrigna", teamSize: 12, activeProjects: 2, approvalRate: 92, status: "ON LEAVE", avatar: "HM" },
];

export default function SupervisorsList() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>(SUPERVISORS_DATA);
  const [selectedSup, setSelectedSup] = useState<Supervisor | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSup, setNewSup] = useState({ name: "", email: "", language: "Amharic" });

  const filteredData = supervisors.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddSup = () => {
     const newId = `SUP-${Math.floor(Math.random() * 1000)}`;
     setSupervisors([...supervisors, {
         id: newId,
         name: newSup.name,
         email: newSup.email,
         assignedLanguage: newSup.language,
         teamSize: 0,
         activeProjects: 0,
         approvalRate: 100,
         status: "ACTIVE",
         avatar: newSup.name.slice(0, 2).toUpperCase()
     }]);
     setIsAddOpen(false);
     toast.success("Supervisor assigned successfully");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Supervisors</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage language team leaders and assignments.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="bg-blue-600 hover:bg-blue-700 gap-2 shadow-lg">
           <UserPlus className="w-4 h-4" /> Assign New Supervisor
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white rounded-xl">
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Briefcase className="w-6 h-6" /></div>
                 <div><p className="text-xs font-bold text-slate-400 uppercase">Total Leads</p><h3 className="text-2xl font-black text-slate-900">{supervisors.length}</h3></div>
             </CardContent>
          </Card>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100">
             <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search supervisors..." className="pl-10 bg-slate-50" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
             </div>
         </div>
         <Table>
            <TableHeader className="bg-slate-50/50">
               <TableRow>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Assigned Team</TableHead>
                  <TableHead className="text-center">Team Size</TableHead>
                  <TableHead className="text-center">Approval Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredData.map(sup => (
                   <TableRow key={sup.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedSup(sup)}>
                       <TableCell>
                           <div className="flex items-center gap-3">
                               <Avatar className="h-10 w-10 border border-slate-100"><AvatarFallback className="bg-blue-100 text-blue-700 font-bold">{sup.avatar}</AvatarFallback></Avatar>
                               <div><p className="font-bold text-slate-900">{sup.name}</p><p className="text-xs text-slate-500">{sup.email}</p></div>
                           </div>
                       </TableCell>
                       <TableCell>
                           <Badge variant="outline" className="bg-slate-50 border-slate-200 gap-1 pl-1">
                               <Globe className="w-3 h-3 text-blue-500" /> {sup.assignedLanguage}
                           </Badge>
                       </TableCell>
                       <TableCell className="text-center font-bold text-slate-700">{sup.teamSize}</TableCell>
                       <TableCell className="text-center">
                           <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-sm">
                               <Star className="w-3 h-3 fill-current" /> {sup.approvalRate}%
                           </div>
                       </TableCell>
                       <TableCell>
                           <Badge className={sup.status === 'ACTIVE' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>{sup.status}</Badge>
                       </TableCell>
                       <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal className="w-4 h-4" /></Button>
                       </TableCell>
                   </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>

      {/* --- ADD SUPERVISOR DIALOG --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
         <DialogContent>
             <DialogHeader><DialogTitle>Assign New Supervisor</DialogTitle></DialogHeader>
             <div className="space-y-4 py-2">
                 <div className="space-y-2"><Label>Full Name</Label><Input value={newSup.name} onChange={e => setNewSup({...newSup, name: e.target.value})} /></div>
                 <div className="space-y-2"><Label>Email</Label><Input value={newSup.email} onChange={e => setNewSup({...newSup, email: e.target.value})} /></div>
                 <div className="space-y-2"><Label>Assigned Language</Label>
                    <Select value={newSup.language} onValueChange={v => setNewSup({...newSup, language: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Amharic">Amharic</SelectItem>
                            <SelectItem value="Afan Oromo">Afan Oromo</SelectItem>
                            <SelectItem value="Tigrigna">Tigrigna</SelectItem>
                            <SelectItem value="Somali">Somali</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
             </div>
             <DialogFooter><Button onClick={handleAddSup} className="bg-blue-600">Assign Role</Button></DialogFooter>
         </DialogContent>
      </Dialog>

      {/* --- DETAILED SUPERVISOR MODAL --- */}
      <Dialog open={!!selectedSup} onOpenChange={(open) => !open && setSelectedSup(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden rounded-2xl border-none flex flex-col bg-white">
            {selectedSup && (
                <>
                    {/* Header with Blue Gradient */}
                    <div className="shrink-0">
                        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-cyan-500">
                            <Button variant="ghost" className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20" onClick={() => setSelectedSup(null)}>Close</Button>
                        </div>
                        <div className="px-8 pb-6 bg-white border-b border-slate-200 relative">
                            <div className="flex justify-between items-end -mt-12 mb-4">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">{selectedSup.avatar}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{selectedSup.name}</h2>
                                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {selectedSup.assignedLanguage} Team Lead</span>
                                    <span className={`flex items-center gap-1 font-bold ${selectedSup.status === 'ACTIVE' ? 'text-green-600' : 'text-amber-600'}`}>
                                        <CheckCircle2 className="w-3.5 h-3.5" /> {selectedSup.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="bg-slate-200/50 p-1 rounded-xl mb-6 w-full justify-start">
                                <TabsTrigger value="overview" className="gap-2 px-6 flex-1 sm:flex-none">Overview</TabsTrigger>
                                <TabsTrigger value="team" className="gap-2 px-6 flex-1 sm:flex-none">Team Members</TabsTrigger>
                                <TabsTrigger value="tasks" className="gap-2 px-6 flex-1 sm:flex-none">Tasks</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="shadow-sm border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Team Size</p>
                                            <p className="text-xl font-black text-slate-900 mt-1">{selectedSup.teamSize} <span className="text-sm font-normal text-slate-500">translators</span></p>
                                        </CardContent>
                                    </Card>
                                    <Card className="shadow-sm border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Quality Score</p>
                                            <p className="text-xl font-black text-green-600 mt-1">{selectedSup.approvalRate}%</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400"/> Current Focus</h4>
                                    <ul className="space-y-2 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200">
                                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Managing {selectedSup.assignedLanguage} audio validation batch #4.</li>
                                        <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Onboarding 3 new translators.</li>
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="team">
                                <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                    <p>List of {selectedSup.teamSize} translators would appear here.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}