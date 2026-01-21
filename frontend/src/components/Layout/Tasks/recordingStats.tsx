import { Mic, CheckCircle2, Music, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RecordingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Total Duration */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-xl">
            <Timer className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Total Duration</p>
            <h3 className="text-xl font-bold text-slate-900">120 <span className="text-sm font-medium text-slate-400">hrs</span></h3>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Validated Audio */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <Music className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
               <p className="text-xs font-medium text-slate-500 uppercase">Validated Audio</p>
               <span className="text-xs font-bold text-green-600">85%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Active Recording */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Mic className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Active Recorders</p>
            <h3 className="text-xl font-bold text-slate-900">42</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}