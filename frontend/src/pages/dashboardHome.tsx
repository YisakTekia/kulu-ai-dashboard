import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, Mic, FileType, Users, 
  CheckCircle2, AlertCircle, TrendingUp, Download, 
  Activity, Clock, Target
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Area, AreaChart 
} from 'recharts';
import CountUp from "react-countup";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- DATA ---
const weeklyData = [
  { name: 'Mon', translation: 120, recording: 80, transcription: 40 },
  { name: 'Tue', translation: 180, recording: 100, transcription: 60 },
  { name: 'Wed', translation: 240, recording: 140, transcription: 90 },
  { name: 'Thu', translation: 300, recording: 120, transcription: 120 },
  { name: 'Fri', translation: 280, recording: 160, transcription: 150 },
  { name: 'Sat', translation: 340, recording: 190, transcription: 180 },
  { name: 'Sun', translation: 380, recording: 220, transcription: 200 },
];

const languageData = [
  { name: 'Amharic', value: 40, color: '#3B82F6' },
  { name: 'Oromiffa', value: 25, color: '#EF4444' },
  { name: 'Tigrigna', value: 35, color: '#EAB308' },
];

const targetData = [
  { name: "Completed", value: 320, color: "#22c55e" }, // Green
  { name: "Remaining", value: 180, color: "#f3f4f6" }, // Gray
];

const activities = [
  { id: 1, user: "Abebe Kebede", role: "Translator", action: "submitted translation #TR-8821", time: "2 mins ago", avatar: "AK", color: "bg-blue-100 text-blue-600" },
  { id: 2, user: "Sara M.", role: "Supervisor", action: "approved audio #REC-4092", time: "15 mins ago", avatar: "SM", color: "bg-green-100 text-green-600" },
  { id: 3, user: "Chala O.", role: "Reviewer", action: "flagged transcription #TXT-5501", time: "1 hr ago", avatar: "CO", color: "bg-red-100 text-red-600" },
  { id: 4, user: "System", role: "Admin", action: "Daily backup completed", time: "3 hrs ago", avatar: "SY", color: "bg-slate-100 text-slate-600" },
  { id: 5, user: "Hanna B.", role: "Translator", action: "started new task #TR-9900", time: "4 hrs ago", avatar: "HB", color: "bg-yellow-100 text-yellow-600" },
];

// --- COMPONENTS ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 border border-slate-800 shadow-xl rounded-xl text-xs">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="capitalize">{entry.name}:</span>
            <span className="font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardHome() {
  const navigate = useNavigate();

  // --- EXPORT FUNCTION ---
  const handleExport = () => {
    try {
      const headers = ["Day,Translation,Recording,Transcription"];
      const rows = weeklyData.map(row => 
        `${row.name},${row.translation},${row.recording},${row.transcription}`
      );
      const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "kulu_dashboard_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Report exported successfully!");
    } catch (error) {
      toast.error("Failed to export report.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time production insights.</p>
        </div>
        
        <button 
          onClick={handleExport}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Translation */}
        <Card onClick={() => navigate('/tasks/translation')} className="cursor-pointer hover:shadow-md transition-all border-slate-100 shadow-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Globe className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Translation</p>
            <h3 className="text-2xl font-bold text-slate-900">
              <CountUp end={1250} duration={2} separator="," />
            </h3>
            <div className="mt-2 text-xs text-slate-400">450 Pending • <span className="text-emerald-600 font-bold">800 Done</span></div>
          </CardContent>
        </Card>

        {/* Recording */}
        <Card onClick={() => navigate('/tasks/recording')} className="cursor-pointer hover:shadow-md transition-all border-slate-100 shadow-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-red-50 rounded-xl text-red-500"><Mic className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5%</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Recording</p>
            <h3 className="text-2xl font-bold text-slate-900">
              <CountUp end={84} duration={2} /> <span className="text-sm text-slate-400 font-normal">hrs</span>
            </h3>
            <div className="mt-2 text-xs text-slate-400">12h Active • <span className="text-emerald-600 font-bold">72h Valid</span></div>
          </CardContent>
        </Card>

        {/* Transcription */}
        <Card onClick={() => navigate('/tasks/transcription')} className="cursor-pointer hover:shadow-md transition-all border-slate-100 shadow-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-yellow-50 rounded-xl text-yellow-500"><FileType className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Stable</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Transcription</p>
            <h3 className="text-2xl font-bold text-slate-900"><CountUp end={560} duration={2} /></h3>
            <div className="mt-2 text-xs text-slate-400 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
               <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Users */}
        <Card onClick={() => navigate('/users')} className="cursor-pointer hover:shadow-md transition-all border-slate-100 shadow-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600"><Users className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12 New</span>
            </div>
            <p className="text-sm font-medium text-slate-500">Workforce</p>
            <h3 className="text-2xl font-bold text-slate-900"><CountUp end={1204} duration={2} separator="," /></h3>
            <div className="mt-2 flex -space-x-2">
               {[1,2,3].map(i => <div key={i} className="h-5 w-5 rounded-full border border-white bg-slate-200 flex items-center justify-center text-[8px]">U{i}</div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- MIDDLE SECTION: Charts & Targets --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Chart */}
        <Card className="col-span-2 border-none shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="translation" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrans)" />
                  <Area type="monotone" dataKey="recording" stroke="#EF4444" strokeWidth={3} fill="none" dot={false} />
                  <Area type="monotone" dataKey="transcription" stroke="#EAB308" strokeWidth={3} fill="none" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Targets Gauge (New Feature) */}
        <Card className="col-span-1 border-none shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
          <CardHeader>
             <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Daily Target
             </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center relative">
             <div className="h-[200px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={targetData}
                      cx="50%" cy="70%"
                      innerRadius={60} outerRadius={80}
                      startAngle={180} endAngle={0}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell key="completed" fill="#22c55e" />
                      <Cell key="remaining" fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                   <span className="text-4xl font-black text-slate-900">64%</span>
                   <p className="text-xs text-slate-400 font-bold uppercase mt-1">Met</p>
                </div>
             </div>
             <div className="w-full mt-4 flex justify-between text-sm px-4">
                <div className="text-center">
                   <p className="text-xs text-slate-400 font-bold uppercase">Completed</p>
                   <p className="text-lg font-bold text-green-600">320</p>
                </div>
                <div className="text-center">
                   <p className="text-xs text-slate-400 font-bold uppercase">Target</p>
                   <p className="text-lg font-bold text-slate-700">500</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* --- BOTTOM SECTION: Activity Feed & Language Split --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Live Activity Feed (New Feature) */}
         <Card className="col-span-1 lg:col-span-2 border-none shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
            <CardHeader>
               <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" /> Live Activity Feed
               </CardTitle>
            </CardHeader>
            <CardContent>
               <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-6">
                     {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 relative group">
                           {/* Connector Line */}
                           <div className="absolute left-[19px] top-10 bottom-[-20px] w-[2px] bg-slate-100 group-last:hidden"></div>
                           
                           <Avatar className={`h-10 w-10 border-2 border-white shadow-sm ${activity.color} flex items-center justify-center font-bold text-xs`}>
                              <AvatarFallback>{activity.avatar}</AvatarFallback>
                           </Avatar>
                           
                           <div className="flex-1">
                              <div className="flex justify-between items-center">
                                 <p className="text-sm font-bold text-slate-900">{activity.user}</p>
                                 <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {activity.time}
                                 </span>
                              </div>
                              <p className="text-sm text-slate-500 mt-0.5">
                                 {activity.action} <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500 ml-1">{activity.role}</span>
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </ScrollArea>
            </CardContent>
         </Card>

         {/* Tasks by Language (Kept for balance) */}
         <Card className="col-span-1 border-none shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
            <CardHeader>
               <CardTitle className="text-lg font-bold text-slate-900">By Language</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie 
                           data={languageData} 
                           cx="50%" cy="50%" 
                           innerRadius={60} outerRadius={80} 
                           paddingAngle={5} 
                           dataKey="value" stroke="none"
                        >
                           {languageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-full space-y-2 mt-4">
                  {languageData.map((item) => (
                     <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                           <span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></span>
                           <span className="text-slate-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">{item.value}%</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

      </div>
    </div>
  );
}