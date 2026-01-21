import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TaskActions from "./taskactions";

interface RecordingTableProps {
  tasks: any[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUserClick: (user: any) => void; 
}

export default function RecordingTable({ tasks, onView, onEdit, onDelete, onUserClick }: RecordingTableProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleAudio = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-50 text-green-700 border-green-100";
      case "Recorded": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Rejected": return "bg-red-50 text-red-700 border-red-100";
      default: return "bg-orange-50 text-orange-700 border-orange-100";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Audio ID</th>
              <th className="px-6 py-4 font-semibold w-1/3">Script Preview</th>
              <th className="px-6 py-4 font-semibold">Assignee</th>
              <th className="px-6 py-4 font-semibold">Audio</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.map((task) => (
              <tr key={task.id} className="group hover:bg-red-50/10 transition-colors">
                
                <td className="px-6 py-4 font-mono font-medium text-slate-700">{task.id}</td>

                <td className="px-6 py-4">
                  <p className="text-slate-800 font-medium truncate max-w-[200px]">{task.script}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{task.language}</p>
                </td>

                
                <td className="px-6 py-4">
                    {task.assignee ? (
                      <div 
                        onClick={() => onUserClick(task.assignee)} 
                        className="flex items-center gap-3 cursor-pointer p-1.5 -ml-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100 group/user"
                      >
                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="bg-red-100 text-red-600 text-xs font-bold">{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-700 group-hover/user:text-red-600 transition-colors">{task.assignee.name}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Unassigned</span>
                    )}
                </td>

                <td className="px-6 py-4">
                    {task.status !== "Pending" ? (
                        <button 
                          onClick={() => toggleAudio(task.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors group/btn ${
                            playingId === task.id 
                              ? "bg-red-100 text-red-600 ring-2 ring-red-200" 
                              : "bg-slate-100 hover:bg-red-100 hover:text-red-600"
                          }`}
                        >
                            {playingId === task.id ? (
                              <Pause className="h-3 w-3 fill-current" />
                            ) : (
                              <Play className="h-3 w-3 fill-current" />
                            )}
                            <span className="text-xs font-bold">
                              {playingId === task.id ? "Playing..." : "Play"}
                            </span>
                        </button>
                    ) : (
                        <span className="text-xs text-slate-400">No Audio</span>
                    )}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                    {task.duration || "--:--"}
                </td>

                <td className="px-6 py-4 text-right">
                  <TaskActions 
                    id={task.id} 
                    type="recording" 
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}