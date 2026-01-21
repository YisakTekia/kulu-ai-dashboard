import { MoreHorizontal, Eye, Pencil, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskActionsProps {
  id: string;
  type: "translation" | "recording";
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskActions({ id, onView, onEdit, onDelete }: TaskActionsProps) {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success(`ID ${id} copied to clipboard`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-[160px] bg-white border-slate-100 shadow-md">
        <DropdownMenuLabel className="text-xs text-slate-400 uppercase tracking-wider">Actions</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => onView(id)} className="cursor-pointer text-slate-600 focus:text-blue-600 focus:bg-blue-50">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer text-slate-600 focus:text-blue-600 focus:bg-blue-50">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Task
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer text-slate-600 focus:text-blue-600 focus:bg-blue-50">
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100" />
        
        <DropdownMenuItem onClick={() => onDelete(id)} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}