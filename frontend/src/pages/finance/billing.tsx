import { useState, useMemo } from "react";
import { 
  DollarSign, Download, CreditCard, 
  CheckCircle2, Clock, Wallet, 
  Search, Filter, MoreHorizontal, 
  Building2, Printer, Send, Loader2, 
  AlertTriangle, ArrowRight, Briefcase, Settings2, Save
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
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";


type RoleType = "Translator" | "Recorder" | "Reviewer";

interface Invoice {
  id: string;
  user: string;
  avatar: string;
  role: RoleType;
  email: string;
  phone: string;
  workVolume: number; 
  ratePerUnit: number; 
  amount: number;      
  status: "PENDING" | "PAID" | "PROCESSING";
  date: string;
  method: string;
  bankAccount: string;
  bankName: string;
}


const INITIAL_RATES = {
  Translator: 150,   // Per Page
  Recorder: 50,      // Per Minute
  Reviewer: 100,     // Per Task
};


const getUnitLabel = (role: RoleType) => {
    switch(role) {
        case "Translator": return "Pages";
        case "Recorder": return "Mins";
        case "Reviewer": return "Tasks";
        default: return "Units";
    }
};


const INITIAL_DATA: Invoice[] = [
  {
    id: "INV-2024-001",
    user: "Abebe Kebede",
    avatar: "AK",
    role: "Translator",
    email: "abebe@kulu.ai",
    phone: "+251 911 223 344",
    workVolume: 45, 
    ratePerUnit: 150,
    amount: 6750.00,
    status: "PENDING",
    date: "Oct 25, 2025",
    method: "Bank Transfer",
    bankName: "Commercial Bank of Ethiopia",
    bankAccount: "1000123456789"
  },
  {
    id: "INV-2024-002",
    user: "Sara Mohammed",
    avatar: "SM",
    role: "Reviewer",
    email: "sara@kulu.ai",
    phone: "+251 922 334 455",
    workVolume: 32, 
    ratePerUnit: 100,
    amount: 3200.00,
    status: "PAID",
    date: "Oct 24, 2025",
    method: "Telebirr",
    bankName: "Telebirr Wallet",
    bankAccount: "0922334455"
  },
  {
    id: "INV-2024-003",
    user: "Dawit T.",
    avatar: "DT",
    role: "Recorder",
    email: "dawit@kulu.ai",
    phone: "+251 933 445 566",
    workVolume: 120, 
    ratePerUnit: 50,
    amount: 6000.00,
    status: "PROCESSING",
    date: "Oct 23, 2025",
    method: "Bank Transfer",
    bankName: "Bank of Abyssinia",
    bankAccount: "89892323"
  },
  {
    id: "INV-2024-005",
    user: "Chala O.",
    avatar: "CO",
    role: "Reviewer",
    email: "chala@kulu.ai",
    phone: "+251 955 667 788",
    workVolume: 28, // 28 Tasks
    ratePerUnit: 100,
    amount: 2800.00,
    status: "PENDING",
    date: "Oct 26, 2025",
    method: "Bank Transfer",
    bankName: "Dashen Bank",
    bankAccount: "5050112233"
  },
];

export default function BillingPage() {
  const [rates, setRates] = useState(INITIAL_RATES);
  const [tempRates, setTempRates] = useState(INITIAL_RATES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_DATA);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  
  const processedInvoices = useMemo(() => {
    return invoices.map(inv => {
       
        if (inv.status === 'PENDING' || inv.status === 'PROCESSING') {
            const currentRate = rates[inv.role];
            return {
                ...inv,
                ratePerUnit: currentRate,
                amount: inv.workVolume * currentRate
            };
        }
        return inv;
    });
  }, [invoices, rates]);

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return processedInvoices.filter(item => {
      const matchesSearch = 
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = 
        activeTab === "all" ? true :
        activeTab === "pending" ? (item.status === "PENDING" || item.status === "PROCESSING") :
        item.status === "PAID";

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, processedInvoices]);

  const pendingInvoices = processedInvoices.filter(inv => inv.status === 'PENDING');
  const totalPendingAmount = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  // --- HANDLERS ---
  const handleMarkAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "PAID" } : inv));
    toast.success(`Invoice ${id} marked as PAID`);
    if (selectedInvoice?.id === id) setSelectedInvoice(null);
  };

  const handleDownloadInvoice = () => {
    toast.success("Downloading Invoice PDF...");
  };

  const handleSinglePayout = (id: string, amount: number) => {
    setProcessingId(id);
    setTimeout(() => {
      setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "PAID" } : inv));
      setProcessingId(null);
      toast.success(`Successfully transferred ETB ${amount.toLocaleString()}`);
    }, 1500);
  };

  const handleSaveRates = () => {
      setRates(tempRates);
      setIsRatesOpen(false);
      toast.success("Rates updated. Pending invoices recalculated.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Finance & Billing</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Review work logs and process payments.</p>
        </div>
        
        <div className="flex gap-3">
             <Button variant="outline" onClick={() => setIsRatesOpen(true)} className="gap-2 bg-white">
                 <Settings2 className="w-4 h-4" /> Manage Pricing
             </Button>

            <Button onClick={() => setIsPayoutOpen(true)} className="bg-slate-900 gap-2 shadow-lg">
                <Wallet className="w-4 h-4" /> Process Payouts
                {pendingInvoices.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                    {pendingInvoices.length}
                    </span>
                )}
            </Button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Paid</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-2">
                        ETB {processedInvoices.filter(i => i.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </h3>
                </div>
                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white rounded-2xl">
    <CardContent className="p-6 flex items-center justify-between">
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pending Payouts</p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
                
                ETB {(totalPendingAmount / 1000).toFixed(1)}k
            </h3>
        </div>
        <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
        </div>
    </CardContent>
</Card>

        <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Rates</p>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-[10px]">Trans: {rates.Translator}</Badge>
                        <Badge variant="secondary" className="text-[10px]">Rec: {rates.Recorder}</Badge>
                    </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <CreditCard className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
      </div>

      {/* MAIN TABLE */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto">
                <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-xs font-bold">All transactions</TabsTrigger>
                <TabsTrigger value="pending" className="rounded-lg px-4 py-2 text-xs font-bold">Pending Approval</TabsTrigger>
                <TabsTrigger value="paid" className="rounded-lg px-4 py-2 text-xs font-bold">Paid History</TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search invoices..." 
                        className="pl-10 bg-white border-slate-200 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
                    <Filter className="w-4 h-4 text-slate-600" />
                </Button>
            </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow>
                            <TableHead className="font-bold text-slate-500">User</TableHead>
                            <TableHead className="font-bold text-slate-500">Role & Bank</TableHead>
                            {/* HERE IS THE WORK CALCULATION COLUMN */}
                            <TableHead className="font-bold text-slate-500">Work Breakdown</TableHead>
                            <TableHead className="font-bold text-slate-500">Total</TableHead>
                            <TableHead className="font-bold text-slate-500">Status</TableHead>
                            <TableHead className="text-right font-bold text-slate-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.length > 0 ? filteredData.map((item) => (
                            <TableRow 
                                key={item.id} 
                                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                                onClick={() => setSelectedInvoice(item)}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-slate-100">
                                            <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
                                                {item.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{item.user}</p>
                                            <p className="text-[10px] text-slate-400 font-mono">{item.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <Badge variant="secondary" className="w-fit text-[10px] mb-1">{item.role}</Badge>
                                        <span className="text-[11px] text-slate-500">{item.bankName}</span>
                                    </div>
                                </TableCell>
                                
                                {/* WORK BREAKDOWN COLUMN */}
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800 text-sm">
                                            {item.workVolume} {getUnitLabel(item.role)}
                                        </span>
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            × {item.ratePerUnit} ETB/unit
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm font-black text-slate-900">
                                    ETB {item.amount.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={`
                                        rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide
                                        ${item.status === "PAID" ? "bg-green-50 text-green-700 border-green-200" : 
                                          item.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                          "bg-blue-50 text-blue-700 border-blue-200"}
                                    `}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-full">
                                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
      </Tabs>

      {/* --- INVOICE DETAIL MODAL --- */}
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
         <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
            {selectedInvoice && (
                <>
                    <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
                        <div className="flex gap-5 items-center">
                            <Avatar className="h-16 w-16 border-4 border-white/10 shadow-xl">
                                <AvatarFallback className="bg-slate-700 text-white font-bold text-xl">
                                    {selectedInvoice.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-bold">{selectedInvoice.user}</h2>
                                <div className="flex items-center gap-2 text-slate-300 text-sm mt-1">
                                    <Badge className="bg-slate-800 hover:bg-slate-800 text-white border-slate-700 text-[10px]">{selectedInvoice.role}</Badge>
                                    <span>•</span>
                                    <span>{selectedInvoice.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Net Payable</p>
                            <p className="text-3xl font-black mt-1">ETB {selectedInvoice.amount.toLocaleString()}</p>
                            <Badge className={`mt-2 ${
                                selectedInvoice.status === 'PAID' ? 'bg-green-500' : 'bg-amber-500'
                            } text-white border-none`}>
                                {selectedInvoice.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            {/* Payment Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">Payment Details</h3>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Bank Name</p>
                                    <div className="flex items-center gap-2 font-bold text-slate-800">
                                        <Building2 className="w-4 h-4 text-slate-400" /> {selectedInvoice.bankName}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Account Number</p>
                                    <p className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-600 w-fit">{selectedInvoice.bankAccount}</p>
                                </div>
                            </div>
                            
                            {/* Calculation Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">Work Calculation</h3>
                                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Volume</span>
                                        <span className="font-bold text-slate-900">{selectedInvoice.workVolume} {getUnitLabel(selectedInvoice.role)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Rate</span>
                                        <span className="font-bold text-slate-900">ETB {selectedInvoice.ratePerUnit} <span className="text-xs font-normal text-slate-400">/ unit</span></span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2 flex justify-between text-sm">
                                        <span className="font-bold text-slate-900">Total</span>
                                        <span className="font-black text-blue-600">ETB {selectedInvoice.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button className="flex-1 bg-slate-900 hover:bg-slate-800 h-12 text-base font-bold" onClick={handleDownloadInvoice}>
                                <Printer className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                            {selectedInvoice.status !== 'PAID' && (
                                <Button className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-base font-bold" onClick={() => handleMarkAsPaid(selectedInvoice.id)}>
                                    <Send className="w-4 h-4 mr-2" /> Mark as Paid
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
         </DialogContent>
      </Dialog>

      {/* --- RATES SETTINGS MODAL --- */}
      <Dialog open={isRatesOpen} onOpenChange={setIsRatesOpen}>
         <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-slate-900" /> Pricing Configuration
                </DialogTitle>
                <DialogDescription>
                    Update base rates. Pending invoices will be recalculated.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="grid gap-2">
                    <Label>Translator Rate (Per Page)</Label>
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">ETB</span>
                        <Input type="number" className="pl-12" value={tempRates.Translator} onChange={(e) => setTempRates({...tempRates, Translator: Number(e.target.value)})} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Recorder Rate (Per Minute)</Label>
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">ETB</span>
                        <Input type="number" className="pl-12" value={tempRates.Recorder} onChange={(e) => setTempRates({...tempRates, Recorder: Number(e.target.value)})} />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label>Reviewer Rate (Per Task)</Label>
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">ETB</span>
                        <Input type="number" className="pl-12" value={tempRates.Reviewer} onChange={(e) => setTempRates({...tempRates, Reviewer: Number(e.target.value)})} />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSaveRates} className="bg-blue-600 w-full"><Save className="w-4 h-4 mr-2" /> Save Rates</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* --- PAYOUT PROCESSING --- */}
      <Dialog open={isPayoutOpen} onOpenChange={setIsPayoutOpen}>
        <DialogContent className="max-w-3xl rounded-2xl h-[80vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-2 text-xl">
               <Wallet className="w-6 h-6 text-slate-900" /> Process Payouts
            </DialogTitle>
            <DialogDescription>
               Review calculations and pay beneficiaries.
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 flex gap-4">
             <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex-1">
                <span className="text-blue-500 text-[10px] font-bold uppercase">Pending</span>
                <p className="text-xl font-black text-blue-700">{pendingInvoices.length}</p>
             </div>
             <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 flex-1">
                <span className="text-green-600 text-[10px] font-bold uppercase">Total Payable</span>
                <p className="text-xl font-black text-green-700">ETB {totalPendingAmount.toLocaleString()}</p>
             </div>
          </div>

          <ScrollArea className="flex-1 bg-slate-50/50 p-6">
             <div className="space-y-3">
                 {pendingInvoices.length > 0 ? pendingInvoices.map((inv) => (
                    <div key={inv.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 border border-slate-100">
                                <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold">
                                    {inv.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{inv.user}</h4>
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                    <Briefcase className="w-3 h-3 text-slate-400" />
                                    <span>{inv.role}</span>
                                    <span className="text-slate-300">|</span>
                                    <Building2 className="w-3 h-3 text-slate-400" />
                                    <span>{inv.bankName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                             <div className="text-right mr-2">
                                <p className="text-sm font-black text-slate-900">ETB {inv.amount.toLocaleString()}</p>
                                <p className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                   {inv.workVolume} {getUnitLabel(inv.role)} × {inv.ratePerUnit}
                                </p>
                             </div>
                             
                             <Button 
                                size="sm" 
                                className={`min-w-[100px] font-bold ${processingId === inv.id ? 'bg-slate-100 text-slate-400' : 'bg-green-600 hover:bg-green-700'}`}
                                disabled={!!processingId}
                                onClick={() => handleSinglePayout(inv.id, inv.amount)}
                             >
                                {processingId === inv.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>Pay Now <ArrowRight className="w-3 h-3 ml-1" /></>
                                )}
                             </Button>
                        </div>
                    </div>
                 )) : (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                        <CheckCircle2 className="w-10 h-10 mb-2 text-green-500/50" />
                        <p className="font-medium">All caught up! No pending payments.</p>
                    </div>
                 )}
             </div>
          </ScrollArea>

          <DialogFooter className="p-6 border-t border-slate-100 bg-white">
             <Button variant="outline" onClick={() => setIsPayoutOpen(false)} className="w-full sm:w-auto">
                Close
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}