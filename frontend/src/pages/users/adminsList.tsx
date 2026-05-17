import { useState } from "react";
import { 
  ShieldAlert, Shield, Search, Plus, 
  MoreHorizontal, Lock, CheckCircle2, 
  XCircle, Mail, Key, Activity, History,
  LayoutDashboard, UserCog
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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// --- TYPES ---
interface Admin {
  id: string;
  name: string;
  email: string;
  role: "SUPER ADMIN" | "ADMIN";
  permissions: string[]; 
  status: "ACTIVE" | "SUSPENDED";
  lastLogin: string;
  avatar: string;
}

// --- MOCK DATA ---
const ADMINS_DATA: Admin[] = [
  { id: "ADM-001", name: "Kebede Michael", email: "kebede@kulu.ai", role: "SUPER ADMIN", permissions: ["ALL ACCESS"], status: "ACTIVE", lastLogin: "Just now", avatar: "KM" },
  { id: "ADM-002", name: "Tigist A.", email: "tigist@kulu.ai", role: "ADMIN", permissions: ["Finance", "Users"], status: "ACTIVE", lastLogin: "2 hours ago", avatar: "TA" },
  { id: "ADM-003", name: "Robel K.", email: "robel@kulu.ai", role: "ADMIN", permissions: ["Content Monitoring"], status: "SUSPENDED", lastLogin: "3 days ago", avatar: "RK" },
];

export default function AdminsList() {
  const [admins, setAdmins] = useState<Admin[]>(ADMINS_DATA);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "ADMIN" });

  const filteredAdmins = admins.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddAdmin = () => {
    const newId = `ADM-${Math.floor(Math.random() * 1000)}`;
    const created: Admin = {
        id: newId,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role as "ADMIN",
        permissions: ["Users", "Reports"], // Default
        status: "ACTIVE",
        lastLogin: "Never",
        avatar: newAdmin.name.slice(0, 2).toUpperCase()
    };
    setAdmins([...admins, created]);
    setIsAddOpen(false);
    toast.success("New Admin assigned successfully");
  };

  const toggleStatus = (id: string, currentStatus: string) => {
      const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
      setAdmins(prev => prev.map(a => a.id === id ? {...a, status: newStatus as any} : a));
      toast.success(`Admin status updated to ${newStatus}`);
      if (selectedAdmin) setSelectedAdmin(prev => prev ? {...prev, status: newStatus as any} : null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Admins</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage high-level access and system permissions.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="bg-purple-700 hover:bg-purple-800 gap-2 shadow-lg">
           <ShieldAlert className="w-4 h-4" /> Add New Admin
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white rounded-xl">
             <CardContent className="p-6 flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><Shield className="w-6 h-6" /></div>
                 <div><p className="text-xs font-bold text-slate-400 uppercase">Total Admins</p><h3 className="text-2xl font-black text-slate-900">{admins.length}</h3></div>
             </CardContent>
          </Card>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex gap-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search admins..." className="pl-10 bg-slate-50 border-slate-200" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
             </div>
         </div>
         <Table>
            <TableHeader className="bg-slate-50/50">
               <TableRow>
                  <TableHead>Admin Profile</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {filteredAdmins.map(admin => (
                   <TableRow key={admin.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedAdmin(admin)}>
                       <TableCell>
                           <div className="flex items-center gap-3">
                               <Avatar className="h-10 w-10 border border-slate-100"><AvatarFallback className="bg-purple-100 text-purple-700 font-bold">{admin.avatar}</AvatarFallback></Avatar>
                               <div><p className="font-bold text-slate-900">{admin.name}</p><p className="text-xs text-slate-500">{admin.email}</p></div>
                           </div>
                       </TableCell>
                       <TableCell>
                           <Badge variant="outline" className={admin.role === 'SUPER ADMIN' ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-slate-100 text-slate-700 border-slate-200"}>{admin.role}</Badge>
                       </TableCell>
                       <TableCell>
                           <div className="flex gap-1 flex-wrap">
                               {admin.permissions.map(p => <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>)}
                           </div>
                       </TableCell>
                       <TableCell>
                           <div className={`flex items-center gap-1.5 text-xs font-bold ${admin.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                               {admin.status === 'ACTIVE' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} {admin.status}
                           </div>
                       </TableCell>
                       <TableCell className="text-right text-xs font-medium text-slate-500">{admin.lastLogin}</TableCell>
                       <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal className="w-4 h-4" /></Button>
                       </TableCell>
                   </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>

      {/* --- ADD ADMIN DIALOG --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
         <DialogContent>
             <DialogHeader><DialogTitle>Grant Admin Access</DialogTitle></DialogHeader>
             <div className="space-y-4 py-2">
                 <div className="space-y-2"><Label>Full Name</Label><Input value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} /></div>
                 <div className="space-y-2"><Label>Email</Label><Input value={newAdmin.email} onChange={e => setNewAdmin({...newAdmin, email: e.target.value})} /></div>
                 <div className="space-y-2"><Label>Role</Label>
                    <Select value={newAdmin.role} onValueChange={v => setNewAdmin({...newAdmin, role: v})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="ADMIN">Standard Admin</SelectItem><SelectItem value="SUPER ADMIN">Super Admin</SelectItem></SelectContent>
                    </Select>
                 </div>
             </div>
             <DialogFooter><Button onClick={handleAddAdmin} className="bg-purple-700">Grant Access</Button></DialogFooter>
         </DialogContent>
      </Dialog>

      {/* --- DETAILED ADMIN MODAL --- */}
      <Dialog open={!!selectedAdmin} onOpenChange={(open) => !open && setSelectedAdmin(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden rounded-2xl border-none flex flex-col bg-white">
            {selectedAdmin && (
                <>
                    {/* Header with Purple Gradient */}
                    <div className="shrink-0">
                        <div className="relative h-32 bg-gradient-to-r from-purple-700 to-pink-600">
                            <Button variant="ghost" className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20" onClick={() => setSelectedAdmin(null)}>Close</Button>
                        </div>
                        <div className="px-8 pb-6 bg-white border-b border-slate-200 relative">
                            <div className="flex justify-between items-end -mt-12 mb-4">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarFallback className="bg-purple-900 text-white text-3xl font-bold">{selectedAdmin.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2 mb-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent><DropdownMenuItem className="text-red-600">Revoke Access</DropdownMenuItem></DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{selectedAdmin.name}</h2>
                                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {selectedAdmin.email}</span>
                                    <span className={`flex items-center gap-1 font-bold ${selectedAdmin.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                        {selectedAdmin.status === 'ACTIVE' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} {selectedAdmin.status}
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
                                <TabsTrigger value="audit" className="gap-2 px-6 flex-1 sm:flex-none">Audit Logs</TabsTrigger>
                                <TabsTrigger value="security" className="gap-2 px-6 flex-1 sm:flex-none">Security</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="shadow-sm border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Role Level</p>
                                            <p className="text-xl font-black text-purple-700 mt-1">{selectedAdmin.role}</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="shadow-sm border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Last Login</p>
                                            <p className="text-xl font-black text-slate-900 mt-1">{selectedAdmin.lastLogin}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Key className="w-4 h-4 text-slate-400"/> Permissions</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAdmin.permissions.map(p => (
                                            <Badge key={p} className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 py-2 px-4 text-sm">{p}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="audit">
                                <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><History className="w-4 h-4 text-slate-500" /></div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Updated System Settings</p>
                                                <p className="text-xs text-slate-500 mt-0.5">Changed default language configuration.</p>
                                                <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-4">
                                <div className="p-4 border border-red-100 rounded-xl bg-red-50/50 flex justify-between items-center">
                                    <div><p className="font-bold text-red-900">Revoke Access</p><p className="text-xs text-red-600/70">Temporarily disable this admin account.</p></div>
                                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => toggleStatus(selectedAdmin.id, selectedAdmin.status)}>
                                        {selectedAdmin.status === 'ACTIVE' ? "Suspend" : "Activate"}
                                    </Button>
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