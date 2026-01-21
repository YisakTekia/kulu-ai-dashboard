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
import { Mic, UploadCloud, } from "lucide-react";

export default function CreateRecordingSheet() {
  return (
    <Sheet>
      
      <SheetTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-200 transition-all active:scale-95">
           <Mic className="h-4 w-4" /> New Recording Task
        </Button>
      </SheetTrigger>

      
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="p-2 bg-red-50 rounded-lg">
                <Mic className="h-5 w-5 text-red-600" />
            </div>
            Create Audio Task
          </SheetTitle>
          <SheetDescription>
            Set up a voice collection project. Define script and speaker requirements.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
            
            
            <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">Project Title</Label>
                <Input placeholder="e.g. Banking AI Voice Collection" className="bg-slate-50 border-slate-200 focus-visible:ring-red-500" />
            </div>

           
            <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">Script to Read</Label>
                <Textarea 
                    placeholder="Type the exact text the user needs to record..." 
                    className="min-h-[100px] bg-slate-50 border-slate-200 focus-visible:ring-red-500" 
                />
            </div>

             
             <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">Reference Audio (Optional)</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer group">
                    <UploadCloud className="h-6 w-6 text-slate-400 group-hover:text-red-500 mb-2 transition-colors" />
                    <p className="text-xs text-slate-500">Upload a sample on how to read (MP3/WAV)</p>
                </div>
            </div>

           
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Target Language</Label>
                    <Select>
                        <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-red-500">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="am">🇪🇹 Amharic</SelectItem>
                            <SelectItem value="ti">🇪🇹 Tigrigna</SelectItem>
                            <SelectItem value="or">🇪🇹 Oromiffa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Gender Preference</Label>
                    <Select>
                        <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-red-500">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any Gender</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Age Group</Label>
                    <Select>
                        <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-red-500">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="18-25">Youth (18-25)</SelectItem>
                            <SelectItem value="26-40">Adult (26-40)</SelectItem>
                            <SelectItem value="40+">Senior (40+)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 font-semibold">Environment</Label>
                    <Select defaultValue="quiet">
                        <SelectTrigger className="bg-slate-50 border-slate-200 focus:ring-red-500">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="quiet">Quiet Studio</SelectItem>
                            <SelectItem value="home">Home Environment</SelectItem>
                            <SelectItem value="noisy">Street / Noisy</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>

       
        <SheetFooter className="mt-8 gap-2 sm:gap-0">
            <SheetClose asChild>
                <Button variant="outline" className="border-slate-200 hover:text-red-600 hover:bg-red-50">Cancel</Button>
            </SheetClose>
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-red-200 shadow-md">Publish Task</Button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}