import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Globe } from "lucide-react";

export default function ViewTaskDialog({ open, onOpenChange, task }: any) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    {task.id}
                    <Badge variant="outline" className="ml-2">{task.status}</Badge>
                </DialogTitle>
                <DialogDescription className="mt-1">Task Details and Progress</DialogDescription>
              </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
            {/* Source Text */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Source Text</h4>
                <p className="text-slate-700 font-medium leading-relaxed">"{task.sourceText}"</p>
            </div>

            {/* Meta Data */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-full"><Globe className="h-4 w-4 text-blue-600"/></div>
                    <div>
                        <p className="text-xs text-slate-400">Language Pair</p>
                        <p className="text-sm font-bold text-slate-700">{task.languages.from} ➔ {task.languages.to}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-full"><User className="h-4 w-4 text-purple-600"/></div>
                    <div>
                        <p className="text-xs text-slate-400">Assignee</p>
                        <p className="text-sm font-bold text-slate-700">{task.assignee?.name || "Unassigned"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-full"><Calendar className="h-4 w-4 text-orange-600"/></div>
                    <div>
                        <p className="text-xs text-slate-400">Due Date</p>
                        <p className="text-sm font-bold text-slate-700">{task.dueDate}</p>
                    </div>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}