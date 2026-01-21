import { 
  Sheet, SheetContent, SheetDescription, 
  SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea"; 
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select"; 
import { UploadCloud, Calendar as  Plus } from "lucide-react";

export default function CreateTaskSheet() {
  return (
    <Sheet>
    
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95">
           <Plus className="h-4 w-4" /> New Task
        </Button>
      </SheetTrigger>

      
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold text-slate-900">Create Translation Task</SheetTitle>
          <SheetDescription>
            Add a new translation project. Assign languages and deadlines.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
            
            
            <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-600 font-semibold">Project Title / Reference</Label>
                <Input id="title" placeholder="e.g. Medical Document Translation #204" className="bg-slate-50 border-slate-200" />
            </div>

            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Source Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">🇺🇸 English</SelectItem>
                            <SelectItem value="fr">🇫🇷 French</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Target Language</Label>
                    <Select>
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="am">🇪🇹 Amharic</SelectItem>
                            <SelectItem value="ti">🇪🇹 Tigrigna</SelectItem>
                            <SelectItem value="or">🇪🇹 Oromiffa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            
            <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">Content to Translate</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <UploadCloud className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Click to upload file</p>
                    <p className="text-xs text-slate-400">.docx, .pdf, .txt (Max 10MB)</p>
                </div>
                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium">OR TYPE TEXT</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                </div>
                <Textarea placeholder="Paste text here to translate directly..." className="min-h-[120px] bg-slate-50 border-slate-200" />
            </div>

            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Deadline</Label>
                    <div className="relative">
                        <Input type="date" className="bg-slate-50 border-slate-200 block" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Priority</Label>
                    <Select defaultValue="medium">
                        <SelectTrigger className="bg-slate-50 border-slate-200">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">🔥 High Priority</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>

       
        <SheetFooter className="mt-8 gap-2 sm:gap-0">
            <SheetClose asChild>
                <Button variant="outline" className="border-slate-200">Cancel</Button>
            </SheetClose>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Task</Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}