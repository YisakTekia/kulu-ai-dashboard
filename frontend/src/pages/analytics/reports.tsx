import { useState, useEffect, useMemo } from "react";
import { 
  Calendar, Download, Filter, TrendingUp, Users, Clock, 
  CheckCircle2, DollarSign, Printer, ArrowRight, Activity, 
  X, MapPin, Mail, Phone
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// --- 1. MOCK DATA & TYPES ---


interface Agent {
  name: string;
  role: string;
  tasks: number;
  quality: number;
  earnings: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
}

const getPerformanceData = (range: string) => {
  const multiplier = range === "Last 30 Days" ? 4 : range === "This Quarter" ? 12 : 1;
  return [
    { name: 'Mon', submitted: 145 * multiplier, approved: 120 * multiplier, cost: 4500 * multiplier },
    { name: 'Tue', submitted: 230 * multiplier, approved: 210 * multiplier, cost: 6200 * multiplier },
    { name: 'Wed', submitted: 180 * multiplier, approved: 160 * multiplier, cost: 5100 * multiplier },
    { name: 'Thu', submitted: 290 * multiplier, approved: 270 * multiplier, cost: 7800 * multiplier },
    { name: 'Fri', submitted: 350 * multiplier, approved: 330 * multiplier, cost: 9000 * multiplier },
    { name: 'Sat', submitted: 400 * multiplier, approved: 380 * multiplier, cost: 9500 * multiplier },
    { name: 'Sun', submitted: 120 * multiplier, approved: 110 * multiplier, cost: 3000 * multiplier },
  ];
};

const CONTRIBUTORS: Agent[] = [
  { name: "Abebe Kebede", role: "Translator", tasks: 1240, quality: 98, earnings: "4,500", email: "abebe@kulu.ai", phone: "+251 911 234 567", status: "Top Rated", avatar: "AK" },
  { name: "Sara Mohammed", role: "Reviewer", tasks: 1100, quality: 96, earnings: "3,900", email: "sara@kulu.ai", phone: "+251 922 345 678", status: "Consistent", avatar: "SM" },
  { name: "Dawit Tadesse", role: "Recorder", tasks: 980, quality: 94, earnings: "3,200", email: "dawit@kulu.ai", phone: "+251 933 456 789", status: "Rising Star", avatar: "DT" },
  { name: "Hanna Bekele", role: "Translator", tasks: 850, quality: 99, earnings: "3,100", email: "hanna@kulu.ai", phone: "+251 944 567 890", status: "Perfect Score", avatar: "HB" },
];

// Heatmap Labels
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM"];

export default function Reports() {
  // --- STATE ---
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(getPerformanceData("Last 7 Days"));
  const [selectedMetric, setSelectedMetric] = useState("performance"); 
  
  // Profile Modal State
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // --- EFFECTS ---
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setChartData(getPerformanceData(dateRange));
      setLoading(false);
      toast.success(`Data updated: ${dateRange}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [dateRange]);

  // --- HANDLERS ---
  const handleExportCSV = () => {
    toast.success("Downloading CSV report...");
  };

  const handlePrint = () => {
    window.print();
  };

  // --- TOTALS ---
  const totalSubmitted = useMemo(() => chartData.reduce((acc, curr) => acc + curr.submitted, 0), [chartData]);
  const totalCost = useMemo(() => chartData.reduce((acc, curr) => acc + curr.cost, 0), [chartData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 max-w-[1600px] mx-auto p-2 sm:p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
             </div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1 ml-11">
            Real-time workforce insights and financial metrics.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
            {/* Custom Date Filter */}
            <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                {["Last 7 Days", "Last 30 Days", "This Quarter"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      dateRange === range 
                        ? "bg-slate-900 text-white shadow-md" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {range}
                  </button>
                ))}
            </div>

            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

            <Button onClick={handlePrint} variant="outline" className="hidden sm:flex border-slate-200 text-slate-600 hover:text-blue-600">
               <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button onClick={handleExportCSV} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
               <Download className="w-4 h-4 mr-2" /> Export
            </Button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {/* Quality */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Avg Quality</p>
                  <h3 className="text-4xl font-black text-slate-900 mt-2">96.5%</h3>
               </div>
               <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full">
               <TrendingUp className="w-3 h-3" /> +2.4% Improvement
            </div>
         </div>

         {/* Spend */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Spend</p>
                  <h3 className="text-4xl font-black text-slate-900 mt-2">
                      ETB {(totalCost / 1000).toFixed(1)}k
                  </h3>
               </div>
               <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <DollarSign className="w-6 h-6" />
               </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-medium">65% of monthly budget</p>
         </div>

         {/* Handle Time */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Avg Time</p>
                  <h3 className="text-4xl font-black text-slate-900 mt-2">4m 12s</h3>
               </div>
               <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <Clock className="w-6 h-6" />
               </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full">
               -10s Faster than avg
            </div>
         </div>

         {/* Workforce */}
         <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Workforce</p>
                  <h3 className="text-4xl font-black text-slate-900 mt-2">142</h3>
               </div>
               <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <Users className="w-6 h-6" />
               </div>
            </div>
            <div className="mt-4 flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500">U{i}</div>
                ))}
                <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">+130</div>
            </div>
         </div>
      </div>

      {/* CHARTS & LEADERBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
               <div>
                  <h3 className="text-xl font-bold text-slate-900">Performance Trends</h3>
                  <p className="text-sm text-slate-500 font-medium">Task volume vs financials over time.</p>
               </div>
               <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setSelectedMetric("performance")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedMetric === 'performance' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Volume</button>
                  <button onClick={() => setSelectedMetric("financial")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${selectedMetric === 'financial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Financials</button>
               </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   {selectedMetric === 'performance' ? (
                       <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                             <linearGradient id="colorSubmit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                             </linearGradient>
                             <linearGradient id="colorApprove" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} />
                          <RechartsTooltip contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '16px', color: '#fff' }} />
                          <Legend verticalAlign="top" height={36} iconType="circle" />
                          <Area type="monotone" dataKey="submitted" stroke="#3B82F6" strokeWidth={4} fill="url(#colorSubmit)" name="Tasks Submitted" />
                          <Area type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={4} fill="url(#colorApprove)" name="Tasks Approved" />
                       </AreaChart>
                   ) : (
                       <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 600}} />
                          <RechartsTooltip cursor={{fill: '#F1F5F9'}} contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '16px', color: '#fff' }} />
                          <Legend verticalAlign="top" height={36} />
                          <Bar dataKey="cost" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Cost (ETB)" barSize={40} />
                       </BarChart>
                   )}
                </ResponsiveContainer>
            </div>
         </div>

         {/* Top Contributors */}
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Leaderboard</h3>
                <Filter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-900" />
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
               {CONTRIBUTORS.map((agent, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedAgent(agent)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all group cursor-pointer"
                  >
                     <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                           <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`} />
                           <AvatarFallback>{agent.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{agent.name}</p>
                           <p className="text-[11px] font-bold text-slate-400 uppercase">{agent.role}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{agent.tasks}</p>
                        <p className="text-[10px] font-bold text-emerald-600">{agent.quality}% Quality</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all flex items-center justify-center gap-2">
               View All Agents <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* --- NEW HEATMAP DESIGN (Dot Matrix) --- */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
         <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
               <h3 className="text-xl font-bold text-slate-900">Workforce Activity Matrix</h3>
               <p className="text-sm text-slate-500 font-medium">Activity density by hour and day.</p>
            </div>
            <div className="flex gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Idle</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-400"></div> Active</span>
                <span className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-blue-700 shadow-lg shadow-blue-500/40"></div> Peak</span>
            </div>
         </div>
         
         <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
               {/* Header Row (Days) */}
               <div className="flex mb-4">
                  <div className="w-16"></div> 
                  <div className="flex-1 grid grid-cols-7 text-center">
                     {days.map(d => <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>)}
                  </div>
               </div>
               
               <div className="flex flex-col gap-3">
                  {/* Rows (Hours) */}
                  {hours.map((h, hIndex) => (
                     <div key={h} className="flex items-center">
                        <div className="w-16 text-[11px] font-bold text-slate-400 text-right pr-4">{h}</div>
                        <div className="flex-1 grid grid-cols-7 place-items-center">
                           {days.map((_, dIndex) => {
                              // Generate deterministic pattern
                              const val = (hIndex * 7 + dIndex + 2) % 5; 
                              const size = val === 0 ? "w-1.5 h-1.5 bg-slate-100" : 
                                           val <= 2 ? "w-2.5 h-2.5 bg-blue-200" : 
                                           val === 3 ? "w-3.5 h-3.5 bg-blue-500" : 
                                           "w-5 h-5 bg-blue-700 shadow-lg shadow-blue-600/30";
                              
                              return (
                                 <div 
                                    key={dIndex} 
                                    className={`rounded-full transition-all duration-300 hover:scale-150 cursor-pointer ${size}`}
                                    title={`${val * 10} active users`}
                                 ></div>
                              );
                           })}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* --- AGENT PROFILE DIALOG --- */}
      <Dialog open={!!selectedAgent} onOpenChange={(open) => !open && setSelectedAgent(null)}>
        <DialogContent className="max-w-md bg-white p-0 overflow-hidden rounded-3xl border-0">
           {selectedAgent && (
             <>
               <div className="bg-slate-900 p-6 text-white relative">
                  <button 
                    onClick={() => setSelectedAgent(null)} 
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-4">
                     <Avatar className="h-16 w-16 border-4 border-white/10 shadow-xl">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAgent.name}`} />
                        <AvatarFallback>{selectedAgent.avatar}</AvatarFallback>
                     </Avatar>
                     <div>
                        <h2 className="text-xl font-bold">{selectedAgent.name}</h2>
                        <p className="text-blue-200 text-sm font-medium uppercase tracking-wide">{selectedAgent.role}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded border border-emerald-500/30">
                           {selectedAgent.status}
                        </span>
                     </div>
                  </div>
               </div>
               
               <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 rounded-2xl text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">Total Tasks</p>
                        <p className="text-2xl font-black text-slate-900">{selectedAgent.tasks}</p>
                     </div>
                     <div className="p-4 bg-slate-50 rounded-2xl text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">Quality</p>
                        <p className="text-2xl font-black text-emerald-600">{selectedAgent.quality}%</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" /> {selectedAgent.email}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" /> {selectedAgent.phone}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" /> Addis Ababa, Ethiopia
                     </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                     <div>
                        <p className="text-xs text-slate-400 font-bold">Total Earnings</p>
                        <p className="text-lg font-black text-slate-900">ETB {selectedAgent.earnings}</p>
                     </div>
                     <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">View Full Profile</Button>
                  </div>
               </div>
             </>
           )}
        </DialogContent>
      </Dialog>

    </div>
  );
}