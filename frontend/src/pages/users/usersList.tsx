import { useState, useMemo } from "react";
import { 
  Users, Search, Filter, MoreHorizontal, 
  Shield, ShieldAlert, CheckCircle2, XCircle, 
  Mail, Phone, Calendar, BadgeCheck, Plus, 
  UserPlus, FileText, Activity, Clock, Trash2, Edit,
  MapPin, Briefcase, Lock, Key, History
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// --- TYPES ---
type UserRole = "ADMIN" | "SUPERVISOR" | "TRANSLATOR" | "RECORDER" | "REVIEWER";
type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  lastActive: string;
  avatar: string;
  tasksCompleted: number;
  earnings: number;
  accuracy: number;
}

// --- MOCK DATA ---
const INITIAL_USERS: User[] = [
  { id: "U-001", name: "Kebede Michael", email: "kebede@kulu.ai", phone: "0911223344", location: "Addis Ababa", role: "ADMIN", status: "ACTIVE", joinedDate: "Jan 10, 2024", lastActive: "Just now", avatar: "KM", tasksCompleted: 0, earnings: 0, accuracy: 100 },
  { id: "U-002", name: "Abebe Kebede", email: "abebe@kulu.ai", phone: "0922334455", location: "Adama", role: "TRANSLATOR", status: "ACTIVE", joinedDate: "Feb 15, 2024", lastActive: "2 mins ago", avatar: "AK", tasksCompleted: 45, earnings: 6750, accuracy: 98 },
  { id: "U-003", name: "Sara M.", email: "sara@kulu.ai", phone: "0933445566", location: "Hawassa", role: "REVIEWER", status: "ACTIVE", joinedDate: "Mar 01, 2024", lastActive: "1 hour ago", avatar: "SM", tasksCompleted: 120, earnings: 12000, accuracy: 99 },
  { id: "U-004", name: "Chala O.", email: "chala@kulu.ai", phone: "0944556677", location: "Addis Ababa", role: "RECORDER", status: "SUSPENDED", joinedDate: "Apr 20, 2024", lastActive: "5 days ago", avatar: "CO", tasksCompleted: 15, earnings: 750, accuracy: 85 },
  { id: "U-005", name: "Hanna B.", email: "hanna@kulu.ai", phone: "0955667788", location: "Bahir Dar", role: "TRANSLATOR", status: "PENDING", joinedDate: "Oct 25, 2025", lastActive: "Never", avatar: "HB", tasksCompleted: 0, earnings: 0, accuracy: 0 },
];

export default function UserList() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  
  // Modals State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form State for New User
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "TRANSLATOR" });

  // --- FILTERING LOGIC ---
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === "ALL") return matchesSearch;
      if (activeTab === "ADMINS") return matchesSearch && (user.role === "ADMIN" || user.role === "SUPERVISOR");
      if (activeTab === "WORKERS") return matchesSearch && (user.role !== "ADMIN" && user.role !== "SUPERVISOR");
      if (activeTab === "SUSPENDED") return matchesSearch && user.status === "SUSPENDED";
      
      return matchesSearch;
    });
  }, [users, searchTerm, activeTab]);

  // --- HANDLERS ---
  const handleAddUser = () => {
    const id = `U-${Math.floor(Math.random() * 1000)}`;
    const createdUser: User = {
        id,
        name: newUser.name,
        email: newUser.email,
        phone: "N/A",
        location: "Unknown",
        role: newUser.role as UserRole,
        status: "PENDING",
        joinedDate: new Date().toLocaleDateString(),
        lastActive: "Never",
        avatar: newUser.name.slice(0, 2).toUpperCase(),
        tasksCompleted: 0,
        earnings: 0,
        accuracy: 0
    };
    setUsers([...users, createdUser]);
    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "TRANSLATOR" });
    toast.success("User added successfully");
  };

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    toast.success(`Updated status to ${newStatus}`);
    if (selectedUser) setSelectedUser(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Management</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage users, roles, and access permissions.</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)} className="bg-slate-900 gap-2 shadow-lg hover:bg-slate-800">
           <UserPlus className="w-4 h-4" /> Add New User
        </Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-white rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Users className="w-5 h-5" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Total Users</p><h3 className="text-xl font-black text-slate-900">{users.length}</h3></div>
            </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><BadgeCheck className="w-5 h-5" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Active</p><h3 className="text-xl font-black text-slate-900">{users.filter(u => u.status === 'ACTIVE').length}</h3></div>
            </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600"><Shield className="w-5 h-5" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Admins</p><h3 className="text-xl font-black text-slate-900">{users.filter(u => u.role === 'ADMIN').length}</h3></div>
            </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600"><ShieldAlert className="w-5 h-5" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase">Suspended</p><h3 className="text-xl font-black text-slate-900">{users.filter(u => u.status === 'SUSPENDED').length}</h3></div>
            </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT TABS */}
      <Tabs defaultValue="ALL" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto flex flex-wrap">
                <TabsTrigger value="ALL" className="rounded-lg px-3 py-1.5 text-xs font-bold">All Users</TabsTrigger>
                <TabsTrigger value="WORKERS" className="rounded-lg px-3 py-1.5 text-xs font-bold">Workforce</TabsTrigger>
                <TabsTrigger value="ADMINS" className="rounded-lg px-3 py-1.5 text-xs font-bold">Admins</TabsTrigger>
                <TabsTrigger value="SUSPENDED" className="rounded-lg px-3 py-1.5 text-xs font-bold text-red-600">Suspended</TabsTrigger>
            </TabsList>

            <div className="relative flex-1 md:w-64 md:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search name..." className="pl-10 bg-white border-slate-200 rounded-xl" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow>
                            <TableHead className="font-bold text-slate-500">User Profile</TableHead>
                            <TableHead className="font-bold text-slate-500">Role</TableHead>
                            <TableHead className="font-bold text-slate-500">Status</TableHead>
                            <TableHead className="font-bold text-slate-500">Joined</TableHead>
                            <TableHead className="font-bold text-slate-500">Last Active</TableHead>
                            <TableHead className="text-right font-bold text-slate-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="hover:bg-slate-50/50 cursor-pointer" onClick={() => setSelectedUser(user)}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-slate-100">
                                            <AvatarFallback className="bg-slate-100 text-xs font-bold text-slate-700">{user.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                            <p className="text-[11px] text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell><Badge variant="outline" className="text-[10px] bg-slate-50">{user.role}</Badge></TableCell>
                                <TableCell>
                                    <div className={`flex items-center gap-1.5 text-xs font-bold ${user.status === 'ACTIVE' ? 'text-green-600' : user.status === 'SUSPENDED' ? 'text-red-600' : 'text-amber-600'}`}>
                                        {user.status === 'ACTIVE' ? <CheckCircle2 className="w-3.5 h-3.5" /> : user.status === 'SUSPENDED' ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                        {user.status}
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs font-medium text-slate-500">{user.joinedDate}</TableCell>
                                <TableCell className="text-xs font-medium text-slate-500">{user.lastActive}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreHorizontal className="w-4 h-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
      </Tabs>

      {/* --- ADD NEW USER DIALOG --- */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
         <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>Create a new account access.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
                <div className="space-y-2"><Label>Full Name</Label><Input value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} /></div>
                <div className="space-y-2"><Label>Email Address</Label><Input value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} /></div>
                <div className="space-y-2"><Label>Role</Label>
                    <Select value={newUser.role} onValueChange={(val) => setNewUser({...newUser, role: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TRANSLATOR">Translator</SelectItem>
                            <SelectItem value="RECORDER">Recorder</SelectItem>
                            <SelectItem value="REVIEWER">Reviewer</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
                <Button onClick={handleAddUser} className="bg-slate-900 text-white">Create Account</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* --- CENTERED DETAILED PROFILE MODAL --- */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden rounded-2xl border-none flex flex-col bg-white">
            {selectedUser && (
                <>
                    {/* 1. FIXED HEADER SECTION */}
                    <div className="shrink-0">
                        {/* Gradient Cover */}
                        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                            <Button 
                                variant="ghost" 
                                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20"
                                onClick={() => setSelectedUser(null)}
                            >
                                Close
                            </Button>
                        </div>
                        
                        {/* Profile Info */}
                        <div className="px-8 pb-6 bg-white border-b border-slate-200 relative">
                            <div className="flex justify-between items-end -mt-12 mb-4">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarFallback className="bg-slate-900 text-white text-3xl font-bold">{selectedUser.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2 mb-2">
                                    <Button size="sm" variant="outline" className="gap-2"><Mail className="w-3 h-3" /> Email</Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent><DropdownMenuItem>Edit Profile</DropdownMenuItem><DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem></DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-black text-slate-900">{selectedUser.name}</h2>
                                    <Badge variant="secondary" className="font-bold text-slate-600">{selectedUser.role}</Badge>
                                </div>
                                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedUser.location}</span>
                                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> ID: {selectedUser.id}</span>
                                    <span className={`flex items-center gap-1 font-bold ${selectedUser.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                        {selectedUser.status === 'ACTIVE' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />} {selectedUser.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. SCROLLABLE CONTENT BODY */}
                    <div className="flex-1 overflow-y-auto bg-slate-50/50">
                        <div className="p-6">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="bg-slate-200/50 p-1 rounded-xl mb-6 w-full justify-start">
                                    <TabsTrigger value="overview" className="gap-2 px-6 flex-1 sm:flex-none">Overview</TabsTrigger>
                                    <TabsTrigger value="activity" className="gap-2 px-6 flex-1 sm:flex-none">Activity Log</TabsTrigger>
                                    <TabsTrigger value="security" className="gap-2 px-6 flex-1 sm:flex-none">Security</TabsTrigger>
                                </TabsList>

                                {/* OVERVIEW TAB */}
                                <TabsContent value="overview" className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <Card className="shadow-sm border-slate-200">
                                            <CardContent className="p-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase">Total Earned</p>
                                                <p className="text-2xl font-black text-slate-900 mt-1">ETB {selectedUser.earnings.toLocaleString()}</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="shadow-sm border-slate-200">
                                            <CardContent className="p-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase">Tasks Done</p>
                                                <p className="text-2xl font-black text-slate-900 mt-1">{selectedUser.tasksCompleted}</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="shadow-sm border-slate-200">
                                            <CardContent className="p-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase">Accuracy</p>
                                                <p className="text-2xl font-black text-green-600 mt-1">{selectedUser.accuracy}%</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b pb-2">Contact Details</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between"><span className="text-slate-500">Email</span> <span className="font-medium">{selectedUser.email}</span></div>
                                                <div className="flex justify-between"><span className="text-slate-500">Phone</span> <span className="font-medium">{selectedUser.phone}</span></div>
                                                <div className="flex justify-between"><span className="text-slate-500">Joined Date</span> <span className="font-medium">{selectedUser.joinedDate}</span></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b pb-2">System Access</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between"><span className="text-slate-500">Role</span> <span className="font-medium">{selectedUser.role}</span></div>
                                                <div className="flex justify-between"><span className="text-slate-500">Last Login</span> <span className="font-medium">{selectedUser.lastActive}</span></div>
                                                <div className="flex justify-between"><span className="text-slate-500">2FA Status</span> <Badge variant="outline" className="text-green-600 bg-green-50">Enabled</Badge></div>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* ACTIVITY TAB */}
                                <TabsContent value="activity">
                                    <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200">
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600"><History className="w-4 h-4" /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">Completed translation task #{1024 + i}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">Submitted 15 pages for review. Quality check pending.</p>
                                                    <p className="text-[10px] text-slate-400 mt-2 font-mono">Oct 2{4-i}, 2025 at 14:30</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                {/* SECURITY TAB */}
                                <TabsContent value="security" className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center"><Key className="w-5 h-5 text-slate-500"/></div>
                                            <div><p className="font-bold text-sm text-slate-900">Reset Password</p><p className="text-xs text-slate-500">Send a password reset email to user.</p></div>
                                        </div>
                                        <Button variant="outline" size="sm">Send Link</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-red-100 rounded-xl bg-red-50/50">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center"><Lock className="w-5 h-5 text-red-500"/></div>
                                            <div><p className="font-bold text-sm text-red-900">Account Access</p><p className="text-xs text-red-600/70">Suspend or ban this user immediately.</p></div>
                                        </div>
                                        {selectedUser.status === 'ACTIVE' ? (
                                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleStatusChange(selectedUser.id, 'SUSPENDED')}>Suspend</Button>
                                        ) : (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusChange(selectedUser.id, 'ACTIVE')}>Activate</Button>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}