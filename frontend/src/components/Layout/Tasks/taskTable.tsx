import { ArrowUpDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TaskActions from "./taskactions";

interface TaskTableProps {
  tasks: any[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUserClick: (user: any) => void; 
}

export default function TaskTable({ tasks, onView, onEdit, onDelete, onUserClick }: TaskTableProps) {
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-50 text-green-700 border-green-100";
      case "In Progress": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Flagged": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-orange-50 text-orange-700 border-orange-100";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Task ID</th>
              <th className="px-6 py-4 font-semibold w-1/3">Source Preview</th>
              <th className="px-6 py-4 font-semibold">Language Pair</th>
              <th className="px-6 py-4 font-semibold">Assigned To</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Progress</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-700">{task.id}</td>
                  
                  <td className="px-6 py-4">
                    <p className="text-slate-800 font-medium truncate max-w-[200px]">{task.sourceText}</p>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="bg-slate-100 text-[10px] px-1.5 py-0.5 rounded border border-slate-200">EN</span>
                      <ArrowUpDown className="h-3 w-3 text-slate-400 rotate-90" />
                      <span className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                        {task.languages.to.substring(0, 3)}
                      </span>
                    </div>
                  </td>

                  
                  <td className="px-6 py-4">
                    {task.assignee ? (
                      <div 
                        onClick={() => onUserClick(task.assignee)} // 👈 Click Event
                        className="flex items-center gap-3 cursor-pointer p-1.5 -ml-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100 group/user"
                      >
                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-bold">{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-700 group-hover/user:text-blue-600 transition-colors">{task.assignee.name}</p>
                          <p className="text-[10px] text-slate-400">{task.assignee.role}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-slate-400 border border-dashed border-slate-300 bg-slate-50">
                        <AlertCircle className="h-3 w-3" /> Unassigned
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 align-middle">
                    <div className="w-24">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] font-medium text-slate-500">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${task.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${task.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <TaskActions 
                      id={task.id} 
                      type="translation"
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  <p className="text-base font-medium">No tasks found</p>
                  <p className="text-sm">Try adjusting your filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing {tasks.length} results</p>
          <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-slate-200" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-slate-200" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}