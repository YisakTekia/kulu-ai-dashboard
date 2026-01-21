import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TaskActions from "./taskactions";

interface TranscriptionTableProps {
  tasks: any[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUserClick: (user: any) => void;
}

export default function TranscriptionTable({ tasks, onView, onEdit, onDelete, onUserClick }: TranscriptionTableProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleAudio = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-50 text-green-700 border-green-100";
      case "Submitted": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Correction": return "bg-orange-50 text-orange-700 border-orange-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Audio Source</th>
              <th className="px-6 py-4 font-semibold w-1/4">Transcribed Text</th>
              <th className="px-6 py-4 font-semibold">Transcriber</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Accuracy</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tasks.map((task) => (
              <tr key={task.id} className="group hover:bg-orange-50/10 transition-colors">
                
                <td className="px-6 py-4 font-mono font-medium text-slate-700">{task.id}</td>

                {/* AUDIO PLAYER */}
                <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleAudio(task.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors border ${
                        playingId === task.id 
                          ? "bg-orange-100 text-orange-700 border-orange-200" 
                          : "bg-white border-slate-200 hover:border-orange-300 hover:text-orange-600"
                      }`}
                    >
                        {playingId === task.id ? <Pause className="h-3 w-3 fill-current"/> : <Play className="h-3 w-3 fill-current"/>}
                        <span className="text-xs font-bold">{task.duration}</span>
                    </button>
                </td>

                {/* TEXT PREVIEW */}
                <td className="px-6 py-4">
                  <p className="text-slate-800 font-medium truncate max-w-[240px] italic">"{task.text}"</p>
                </td>

                {/* ASSIGNEE */}
                <td className="px-6 py-4">
                    {task.assignee ? (
                      <div 
                        onClick={() => onUserClick(task.assignee)}
                        className="flex items-center gap-3 cursor-pointer p-1.5 -ml-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100 group/user"
                      >
                        <Avatar className="h-8 w-8 border border-white shadow-sm">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="bg-orange-100 text-orange-600 text-xs font-bold">{task.assignee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-700 group-hover/user:text-orange-600 transition-colors">{task.assignee.name}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Unassigned</span>
                    )}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </td>

                {/* ACCURACY SCORE */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${task.accuracy >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${task.accuracy}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">{task.accuracy}%</span>
                    </div>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right">
                  <TaskActions 
                    id={task.id} 
                    type="recording" // Reuse recording type or create new 'transcription'
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