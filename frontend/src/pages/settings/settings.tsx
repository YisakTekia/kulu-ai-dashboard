import { useState } from "react";
import { 
  Settings, Globe, Shield, Bell, 
  Save, Lock, AlertTriangle, CheckCircle2, 
  Plus, Trash2, RefreshCw, Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch"; 
import { Label } from "@/components/ui/label"; 
import { toast } from "sonner";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// --- INITIAL STATE DATA ---
const INITIAL_LANGUAGES = [
  { id: 1, name: "Amharic", code: "AM", active: true },
  { id: 2, name: "Afan Oromo", code: "OM", active: true },
  { id: 3, name: "Tigrigna", code: "TI", active: true },
  { id: 4, name: "Somali", code: "SO", active: true },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  
  // 1. GENERAL SETTINGS STATE
  const [generalConfig, setGeneralConfig] = useState({
    platformName: "Kulu AI Platform",
    supportEmail: "support@kulu.ai",
    maintenanceMode: false,
    publicRegistration: true
  });

  // 2. LANGUAGES STATE
  const [languages, setLanguages] = useState(INITIAL_LANGUAGES);
  const [newLang, setNewLang] = useState("");

  // 3. SECURITY STATE
  const [securityConfig, setSecurityConfig] = useState({
    twoFactor: true,
    strictPassword: true,
    sessionTimeout: "30" // minutes
  });

  // 4. NOTIFICATIONS STATE
  const [notifConfig, setNotifConfig] = useState({
    newUserAlert: true,
    payoutAlert: true,
    systemErrors: false
  });

  // Dialog State for Dangerous Actions
  const [confirmDialog, setConfirmDialog] = useState<{open: boolean, type: 'FLUSH' | 'RESET' | null}>({ open: false, type: null });

  // --- HANDLERS ---

  // Global Save Handler
  const handleSave = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("System configuration saved successfully!", {
        description: "All changes have been applied to the live environment."
      });
    }, 1500);
  };

  // Language Handlers
  const toggleLanguage = (id: number) => {
    setLanguages(prev => prev.map(lang => lang.id === id ? { ...lang, active: !lang.active } : lang));
  };

  const handleAddLanguage = () => {
    if (!newLang.trim()) {
        toast.error("Please enter a language name.");
        return;
    }
    const newEntry = {
        id: Date.now(),
        name: newLang,
        code: newLang.slice(0, 2).toUpperCase(),
        active: true
    };
    setLanguages([...languages, newEntry]);
    setNewLang("");
    toast.success(`${newEntry.name} added to supported languages.`);
  };

  const handleDeleteLanguage = (id: number) => {
      setLanguages(prev => prev.filter(l => l.id !== id));
      toast.info("Language removed.");
  };

  // Danger Zone Handlers
  const executeDangerAction = () => {
      setConfirmDialog({ ...confirmDialog, open: false });
      setLoading(true);
      
      setTimeout(() => {
          setLoading(false);
          if (confirmDialog.type === 'FLUSH') {
              toast.success("All active user sessions have been flushed.");
          } else {
              toast.warning("System database reset initiated (Simulated).");
          }
      }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 p-6 min-h-screen bg-slate-50/50">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Global configuration for Kulu AI Platform.</p>
        </div>
        <Button onClick={handleSave} className="bg-slate-900 gap-2 shadow-lg hover:bg-slate-800 transition-all active:scale-95" disabled={loading}>
           {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
           {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        
        <div className="flex overflow-x-auto pb-2">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto">
                <TabsTrigger value="general" className="gap-2 px-4 py-2 font-bold text-xs sm:text-sm">
                    <Settings className="w-4 h-4" /> General
                </TabsTrigger>
                <TabsTrigger value="languages" className="gap-2 px-4 py-2 font-bold text-xs sm:text-sm">
                    <Globe className="w-4 h-4" /> Languages
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2 px-4 py-2 font-bold text-xs sm:text-sm">
                    <Shield className="w-4 h-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2 px-4 py-2 font-bold text-xs sm:text-sm">
                    <Bell className="w-4 h-4" /> Notifications
                </TabsTrigger>
            </TabsList>
        </div>

        {/* --- GENERAL SETTINGS --- */}
        <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="border-none shadow-sm bg-white rounded-xl">
                <CardHeader>
                    <CardTitle>Platform Information</CardTitle>
                    <CardDescription>Basic details about the Kulu AI instance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Platform Name</Label>
                            <Input 
                                value={generalConfig.platformName} 
                                onChange={(e) => setGeneralConfig({...generalConfig, platformName: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Support Email</Label>
                            <Input 
                                value={generalConfig.supportEmail}
                                onChange={(e) => setGeneralConfig({...generalConfig, supportEmail: e.target.value})} 
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-xl">
                <CardHeader>
                    <CardTitle>System Control</CardTitle>
                    <CardDescription>Manage global system availability.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold flex items-center gap-2">
                                Maintenance Mode
                                {generalConfig.maintenanceMode && <Badge className="bg-amber-500 text-white hover:bg-amber-600">Active</Badge>}
                            </Label>
                            <p className="text-sm text-slate-500">Disable access for all non-admin users instantly.</p>
                        </div>
                        <Switch 
                            checked={generalConfig.maintenanceMode}
                            onCheckedChange={(val) => setGeneralConfig({...generalConfig, maintenanceMode: val})}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">Allow New Registrations</Label>
                            <p className="text-sm text-slate-500">If disabled, only admins can create new accounts manually.</p>
                        </div>
                        <Switch 
                            checked={generalConfig.publicRegistration}
                            onCheckedChange={(val) => setGeneralConfig({...generalConfig, publicRegistration: val})}
                        />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        {/* --- LANGUAGES --- */}
        <TabsContent value="languages" className="mt-6">
             <Card className="border-none shadow-sm bg-white rounded-xl">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Supported Languages</CardTitle>
                            <CardDescription>Manage languages available for translation/transcription.</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
                            {languages.filter(l => l.active).length} Active
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Language List */}
                        {languages.map((lang) => (
                            <div key={lang.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${lang.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100 opacity-70'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${lang.active ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
                                        {lang.code}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{lang.name}</p>
                                        <p className="text-xs text-slate-400">{lang.active ? "Active & Visible" : "Disabled"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Switch 
                                        checked={lang.active}
                                        onCheckedChange={() => toggleLanguage(lang.id)}
                                    />
                                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteLanguage(lang.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* Add New Language Input */}
                        <div className="flex gap-3 pt-4 border-t border-slate-100 mt-4">
                            <Input 
                                placeholder="Enter new language name (e.g. French)" 
                                value={newLang}
                                onChange={(e) => setNewLang(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
                            />
                            <Button onClick={handleAddLanguage} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4 mr-2" /> Add
                            </Button>
                        </div>
                    </div>
                </CardContent>
             </Card>
        </TabsContent>

        {/* --- SECURITY --- */}
        <TabsContent value="security" className="mt-6 space-y-6">
             <Card className="border-none shadow-sm bg-white rounded-xl">
                <CardHeader>
                    <CardTitle>Access Policy</CardTitle>
                    <CardDescription>Configure authentication strictness.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">Require 2FA for Admins</Label>
                            <p className="text-sm text-slate-500">Force Two-Factor Authentication for all staff roles.</p>
                        </div>
                        <Switch 
                            checked={securityConfig.twoFactor}
                            onCheckedChange={(val) => setSecurityConfig({...securityConfig, twoFactor: val})}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">Strict Password Policy</Label>
                            <p className="text-sm text-slate-500">Require special characters, numbers, and uppercase.</p>
                        </div>
                        <Switch 
                            checked={securityConfig.strictPassword}
                            onCheckedChange={(val) => setSecurityConfig({...securityConfig, strictPassword: val})}
                        />
                    </div>
                     <div className="space-y-2 pt-2">
                        <Label>Session Timeout (Minutes)</Label>
                        <Input 
                            type="number" 
                            value={securityConfig.sessionTimeout}
                            onChange={(e) => setSecurityConfig({...securityConfig, sessionTimeout: e.target.value})}
                        />
                    </div>
                </CardContent>
             </Card>

             <Card className="border-red-100 shadow-sm bg-red-50/30 rounded-xl">
                <CardHeader>
                    <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-red-600/80 mb-4 font-medium">
                        These actions are irreversible. Please proceed with caution.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4">
                         <Button 
                             variant="destructive" 
                             className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                             onClick={() => setConfirmDialog({ open: true, type: 'FLUSH' })}
                         >
                             <RefreshCw className="w-4 h-4 mr-2" /> Flush All Sessions
                         </Button>
                         <Button 
                             variant="outline" 
                             className="text-red-600 border-red-200 hover:bg-red-50 w-full sm:w-auto"
                             onClick={() => setConfirmDialog({ open: true, type: 'RESET' })}
                         >
                             <Server className="w-4 h-4 mr-2" /> Reset Database
                         </Button>
                     </div>
                </CardContent>
             </Card>
        </TabsContent>

        {/* --- NOTIFICATIONS --- */}
        <TabsContent value="notifications" className="mt-6">
            <Card className="border-none shadow-sm bg-white rounded-xl">
                <CardHeader>
                    <CardTitle>Email Alerts</CardTitle>
                    <CardDescription>Configure when admins receive automated emails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">New User Registration</Label>
                            <p className="text-sm text-slate-500">Get notified when someone creates an account.</p>
                        </div>
                        <Switch 
                            checked={notifConfig.newUserAlert}
                            onCheckedChange={(val) => setNotifConfig({...notifConfig, newUserAlert: val})}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">High-Value Payouts</Label>
                            <p className="text-sm text-slate-500">Notify when a payout batch exceeds 10,000 ETB.</p>
                        </div>
                        <Switch 
                            checked={notifConfig.payoutAlert}
                            onCheckedChange={(val) => setNotifConfig({...notifConfig, payoutAlert: val})}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base font-bold">System Errors</Label>
                            <p className="text-sm text-slate-500">Receive technical logs via email.</p>
                        </div>
                        <Switch 
                            checked={notifConfig.systemErrors}
                            onCheckedChange={(val) => setNotifConfig({...notifConfig, systemErrors: val})}
                        />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>

      {/* --- CONFIRMATION DIALOG (DANGER ZONE) --- */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => !open && setConfirmDialog({ ...confirmDialog, open: false })}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle className="text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Confirm Critical Action
                  </DialogTitle>
                  <DialogDescription>
                      {confirmDialog.type === 'FLUSH' 
                        ? "Are you sure you want to log out all users? They will need to sign in again immediately." 
                        : "Are you sure you want to reset the database? This will verify system integrity but may cause temporary downtime."}
                  </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancel</Button>
                  <Button variant="destructive" onClick={executeDangerAction}>Yes, Proceed</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

    </div>
  );
}