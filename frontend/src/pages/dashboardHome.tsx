
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, Mic, FileType, Users, 
  CheckCircle2, AlertCircle, TrendingUp
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Area, AreaChart 
} from 'recharts';

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-100 shadow-xl rounded-xl">
        <p className="text-sm font-bold text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="capitalize">{entry.name}:</span>
            <span className="font-bold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("This Week");

  const handleExport = () => {
    console.log("Exporting report...");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Here's what's happening with your projects today.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 font-semibold shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
              <span>{filter}</span> 
              <span className="text-slate-400">▼</span>
            </div>
            <button 
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-blue-200 shadow-lg transition-all active:scale-95"
            >
              Export Report
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card 
          onClick={() => navigate('/tasks/translation')}
          className="cursor-pointer group border-none bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-24 h-24 text-blue-600" />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-50/80 rounded-2xl group-hover:bg-blue-100 transition-colors">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                +12% <TrendingUp className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Translation</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">1,250</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="text-xs font-medium text-slate-500">
                  <span className="text-blue-600 font-bold">450</span> Pending
               </div>
               <div className="text-xs font-medium text-slate-500">
                  <span className="text-green-600 font-bold">800</span> Done
               </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => navigate('/tasks/recording')}
          className="cursor-pointer group border-none bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Mic className="w-24 h-24 text-red-500" />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-red-50/80 rounded-2xl group-hover:bg-red-100 transition-colors">
                <Mic className="h-6 w-6 text-red-500" />
              </div>
               <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                +5% <TrendingUp className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Recording</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">84 <span className="text-lg text-slate-400 font-medium">hrs</span></h3>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="text-xs font-medium text-slate-500">
                  <span className="text-blue-600 font-bold">12h</span> Active
               </div>
               <div className="text-xs font-medium text-slate-500">
                  <span className="text-green-600 font-bold">72h</span> Valid
               </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => navigate('/tasks/transcription')}
          className="cursor-pointer group border-none bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <FileType className="w-24 h-24 text-yellow-500" />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-yellow-50/80 rounded-2xl group-hover:bg-yellow-100 transition-colors">
                <FileType className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                 Stable
              </span>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Transcription</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">560</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 w-full">
               <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '96%' }}></div>
               </div>
               <p className="text-xs text-slate-500 text-right font-medium">96% Reviewed</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => navigate('/users')}
          className="cursor-pointer group border-none bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-24 h-24 text-purple-600" />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-50/80 rounded-2xl group-hover:bg-purple-100 transition-colors">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
               <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                +12 New
              </span>
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Workforce</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">1,204</h3>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="text-xs font-medium text-slate-500">
                  Active
               </div>
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">U{i}</div>
                  ))}
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Card className="col-span-2 border-none bg-white shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-8">
               <div>
                 <h3 className="text-lg font-bold text-slate-900">Weekly Task Completion</h3>
                 <p className="text-sm text-slate-400 font-medium">Task performance over the last 7 days</p>
               </div>
               
               <div className="flex items-center gap-4 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                 <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-sm"></span> Translation</div>
                 <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm"></span> Recording</div>
                 <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-yellow-500 shadow-sm"></span> Transcription</div>
               </div>
            </div>
            
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="translation" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrans)" activeDot={{r: 6, strokeWidth: 0}} />
                  <Area type="monotone" dataKey="recording" stroke="#EF4444" strokeWidth={3} fill="none" dot={false} />
                  <Area type="monotone" dataKey="transcription" stroke="#EAB308" strokeWidth={3} fill="none" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-none bg-white shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl">
          <CardContent className="p-6 flex flex-col h-full relative">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tasks by Language</h3>
            
            <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-slate-800">100%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Coverage</span>
               </div>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={languageData} 
                    cx="50%" cy="50%" 
                    innerRadius={75} 
                    outerRadius={95} 
                    paddingAngle={6} 
                    dataKey="value"
                    cornerRadius={6}
                    stroke="none"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
               {languageData.map((item) => (
                 <div key={item.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                       <span className="h-3 w-3 rounded-full ring-2 ring-white shadow-sm" style={{backgroundColor: item.color}}></span>
                       <span className="text-slate-600 font-semibold text-sm">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item.value}%</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-white shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
             <div>
                <h3 className="text-lg font-bold text-slate-900">Recent System Activity</h3>
                <p className="text-sm text-slate-400 mt-1">Real-time updates from your team</p>
             </div>
             <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50/60 font-bold">
                <tr>
                  <th className="px-8 py-5 tracking-wider">Reference ID</th>
                  <th className="px-6 py-5 tracking-wider">User</th>
                  <th className="px-6 py-5 tracking-wider">Action Type</th>
                  <th className="px-8 py-5 tracking-wider text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-700 font-mono group-hover:text-blue-600 transition-colors">#TR-8821</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-black text-sm shadow-sm">A</div>
                      <div>
                          <div className="font-bold text-slate-800">Abebe Kebede</div>
                          <div className="text-xs text-slate-400 font-medium">Translator</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Submitted Translation
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-right font-medium text-xs">2 min ago</td>
                </tr>

                <tr className="group hover:bg-green-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-700 font-mono group-hover:text-green-600 transition-colors">#REC-4092</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-green-700 font-black text-sm shadow-sm">S</div>
                      <div>
                          <div className="font-bold text-slate-800">Sara M.</div>
                          <div className="text-xs text-slate-400 font-medium">Supervisor</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approved Audio
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-right font-medium text-xs">15 min ago</td>
                </tr>

                 <tr className="group hover:bg-red-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-700 font-mono group-hover:text-red-600 transition-colors">#TXT-5501</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-red-700 font-black text-sm shadow-sm">C</div>
                      <div>
                          <div className="font-bold text-slate-800">Chala O.</div>
                          <div className="text-xs text-slate-400 font-medium">Reviewer</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Flagged for Review
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-400 text-right font-medium text-xs">3 hrs ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
