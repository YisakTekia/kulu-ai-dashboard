import { FileAudio, CheckCircle2, Keyboard, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TranscriptionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Total Transcribed */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-xl">
            <FileAudio className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Transcribed Audio</p>
            <h3 className="text-xl font-bold text-slate-900">1,240 <span className="text-sm font-medium text-slate-400">mins</span></h3>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Accuracy Rate */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
               <p className="text-xs font-medium text-slate-500 uppercase">Avg. Accuracy</p>
               <span className="text-xs font-bold text-green-600">92%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Pending Review */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl">
            <Keyboard className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Pending Review</p>
            <h3 className="text-xl font-bold text-slate-900">45 <span className="text-sm font-medium text-slate-400">tasks</span></h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}