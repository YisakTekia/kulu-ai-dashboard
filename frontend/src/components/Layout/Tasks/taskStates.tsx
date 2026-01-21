import { FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1 */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Total Sentences</p>
            <h3 className="text-xl font-bold text-slate-900">50,240</h3>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
               <p className="text-xs font-medium text-slate-500 uppercase">Overall Progress</p>
               <span className="text-xs font-bold text-green-600">64%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '64%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="border-none shadow-sm bg-white">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-xl">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Flagged Issues</p>
            <h3 className="text-xl font-bold text-slate-900">12</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}