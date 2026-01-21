import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Star, TrendingUp, Calendar, MapPin } from "lucide-react";

interface UserProfileProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  user: any;
}

export default function UserProfileDialog({ isOpen, onClose, user }: UserProfileProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        
        {/* HEADER BACKGROUND */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-6 border-4 border-white rounded-full">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-slate-200">{user.name[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>

        {/* BODY CONTENT */}
        <div className="pt-14 px-6 pb-6">
            
            {/* Name & Role */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                    <p className="text-slate-500 text-sm font-medium">{user.role}</p>
                </div>
                <Badge className={user.role === "Reviewer" ? "bg-purple-100 text-purple-700 hover:bg-purple-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                    Active
                </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mt-6 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                    <span className="block font-bold text-slate-800">4.8</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Rating</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <span className="block font-bold text-slate-800">98%</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                    <span className="block font-bold text-slate-800">240</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Tasks</span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{user.name.toLowerCase().replace(" ", ".")}@kulu.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>+251 911 23 45 67</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Addis Ababa, Ethiopia</span>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex gap-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">View Full Profile</Button>
                <Button variant="outline" className="w-full">Message</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}