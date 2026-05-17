import { useState } from "react";
import { 
  Search, Filter, Download, DollarSign, 
  Calendar, User, FileText, CheckCircle2, 
  AlertCircle, Clock, MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- TYPES (እንደ አለቃህ ትዕዛዝ) ---
type TaskType = "TRANSLATION" | "RECORDING" | "TRANSCRIPTION";

interface ActivityLog {
  id: string;
  userId: string | null; // User ID Nullable
  userName: string;
  userAvatar: string;
  taskType: TaskType;
  description: string; // Description
  statusGlobal: "COMPLETED" | "PENDING" | "FLAGGED"; // Global Status
  statusSpecific: string; // Specific Status (e.g., "Audio Validated")
  unit: number; // Unit (e.g., Minutes, Words)
  unitType: "words" | "minutes" | "hours";
  unitPayment: number; // Unit Payment (Rate)
  totalPayment: number;
  quality: number | null; // Quality Nullable
  date: string; // History
}

// --- MOCK DATA ---
const MOCK_DATA: ActivityLog[] = [
  {
    id: "ACT-001",
    userId: "U-101",
    userName: "Abebe Kebede",
    userAvatar: "AK",
    taskType: "TRANSLATION",
    description: "Medical text translation from English to Amharic",
    statusGlobal: "COMPLETED",
    statusSpecific: "Proofread & Approved",
    unit: 500,
    unitType: "words",
    unitPayment: 1.5, // 1.5 ETB per word
    totalPayment: 750,
    quality: 98,
    date: "2025-10-24 10:30 AM",
  },
  {
    id: "ACT-002",
    userId: "U-102",
    userName: "Sara M.",
    userAvatar: "SM",
    taskType: "RECORDING",
    description: "Voice recording for AI training set B",
    statusGlobal: "PENDING",
    statusSpecific: "Audio Uploaded",
    unit: 15,
    unitType: "minutes",
    unitPayment: 50, // 50 ETB per minute
    totalPayment: 750,
    quality: null, // Not graded yet
    date: "2025-10-24 11:15 AM",
  },
  {
    id: "ACT-003",
    userId: null, // User ID Null (System or Unassigned)
    userName: "System / Unassigned",
    userAvatar: "SYS",
    taskType: "TRANSCRIPTION",
    description: "Automated transcription correction",
    statusGlobal: "FLAGGED",
    statusSpecific: "Low Confidence Score",
    unit: 10,
    unitType: "minutes",
    unitPayment: 20,
    totalPayment: 200,
    quality: 45, // Bad quality
    date: "2025-10-23 09:00 AM",
  },
  {
    id: "ACT-004",
    userId: "U-101",
    userName: "Abebe Kebede",
    userAvatar: "AK",
    taskType: "TRANSLATION",
    description: "Legal document translation",
    statusGlobal: "COMPLETED",
    statusSpecific: "Final Approval",
    unit: 1200,
    unitType: "words",
    unitPayment: 2.0,
    totalPayment: 2400,
    quality: 99,
    date: "2025-10-22 02:45 PM",
  },
];

export default function GlobalActivities() {
  // --- STATE FOR ADVANCED SEARCH ---
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [financeView, setFinanceView] = useState(false); // Finance Role Toggle

  // --- FILTER LOGIC ---
  const filteredData = MOCK_DATA.filter((item) => {
    const matchesSearch = 
      item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.userId && item.userId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "ALL" || item.taskType === typeFilter;
    const matchesStatus = statusFilter === "ALL" || item.statusGlobal === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 p-4 sm:p-6 bg-slate-50/50 min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Activities</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Master log for Translation, Recording, and Transcription history.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
             {/* Finance View Toggle */}
            <Button 
                variant={financeView ? "default" : "outline"}
                onClick={() => setFinanceView(!financeView)}
                className={`gap-2 ${financeView ? "bg-green-600 hover:bg-green-700" : ""}`}
            >
                <DollarSign className="w-4 h-4" /> 
                {financeView ? "Finance Mode: ON" : "Finance View"}
            </Button>
            <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
            </Button>
        </div>
      </div>

      {/* --- ADVANCED SEARCH & FILTERS --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        
        {/* Advanced User Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Advanced Search by User ID, Name or Description..." 
            className="pl-10 bg-slate-50 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] bg-slate-50">
                    <SelectValue placeholder="Task Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Types</SelectItem>
                    <SelectItem value="TRANSLATION">Translation</SelectItem>
                    <SelectItem value="RECORDING">Recording</SelectItem>
                    <SelectItem value="TRANSCRIPTION">Transcription</SelectItem>
                </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-slate-50">
                    <SelectValue placeholder="Global Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="FLAGGED">Flagged</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      {/* --- MAIN TABLE --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[250px]">User & ID</TableHead>
              <TableHead>Task & Description</TableHead>
              <TableHead>Status (Global / Specific)</TableHead>
              {financeView && (
                 <>
                    <TableHead>Unit & Rate</TableHead>
                    <TableHead className="text-right text-green-700 font-bold">Billing</TableHead>
                 </>
              )}
              <TableHead>Quality</TableHead>
              <TableHead className="text-right">History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} className="hover:bg-slate-50/50">
                {/* 1. USER & ID */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src="" />
                        <AvatarFallback className={row.userId ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}>
                            {row.userAvatar}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-bold text-slate-900">{row.userName}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                           <User className="w-3 h-3" />
                           {row.userId ? row.userId : <span className="text-red-400 italic">No ID (Null)</span>}
                        </div>
                    </div>
                  </div>
                </TableCell>

                {/* 2. TASK TYPE & DESCRIPTION */}
                <TableCell>
                    <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={`w-fit text-[10px] font-bold ${
                            row.taskType === "TRANSLATION" ? "border-blue-200 text-blue-700 bg-blue-50" :
                            row.taskType === "RECORDING" ? "border-red-200 text-red-700 bg-red-50" :
                            "border-amber-200 text-amber-700 bg-amber-50"
                        }`}>
                            {row.taskType}
                        </Badge>
                        <p className="text-xs text-slate-600 font-medium line-clamp-1 max-w-[200px]" title={row.description}>
                            {row.description}
                        </p>
                    </div>
                </TableCell>

                {/* 3. STATUS (Global & Specific) */}
                <TableCell>
                    <div className="space-y-1">
                        {/* Global Status */}
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${
                            row.statusGlobal === "COMPLETED" ? "text-green-600" :
                            row.statusGlobal === "PENDING" ? "text-blue-600" :
                            "text-red-600"
                        }`}>
                            {row.statusGlobal === "COMPLETED" && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {row.statusGlobal === "PENDING" && <Clock className="w-3.5 h-3.5" />}
                            {row.statusGlobal === "FLAGGED" && <AlertCircle className="w-3.5 h-3.5" />}
                            {row.statusGlobal}
                        </div>
                        {/* Specific Status */}
                        <div className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
                            {row.statusSpecific}
                        </div>
                    </div>
                </TableCell>

                {/* 4. BILLING (Visible only in Finance Mode) */}
                {financeView && (
                    <>
                        <TableCell>
                            <div className="text-xs">
                                <p><span className="font-bold">{row.unit}</span> {row.unitType}</p>
                                <p className="text-slate-400">@ {row.unitPayment} ETB/{row.unitType.slice(0,3)}</p>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <p className="font-black text-green-700">
                                {row.totalPayment.toLocaleString()} ETB
                            </p>
                        </TableCell>
                    </>
                )}

                {/* 5. QUALITY (Nullable) */}
                <TableCell>
                    {row.quality !== null ? (
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${
                                        row.quality >= 90 ? "bg-green-500" : 
                                        row.quality >= 70 ? "bg-yellow-500" : "bg-red-500"
                                    }`} 
                                    style={{ width: `${row.quality}%` }}
                                ></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{row.quality}%</span>
                        </div>
                    ) : (
                        <span className="text-xs text-slate-400 italic">Not graded</span>
                    )}
                </TableCell>

                {/* 6. HISTORY/DATE */}
                <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-700">{row.date.split(' ')[0]}</span>
                        <span className="text-[10px] text-slate-400">{row.date.split(' ')[1]} {row.date.split(' ')[2]}</span>
                    </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredData.length === 0 && (
            <div className="p-8 text-center text-slate-500">
                No activities found matching your search.
            </div>
        )}
      </div>
    </div>
  );
}