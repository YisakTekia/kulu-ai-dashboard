import { useState } from "react";
import { 
  UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, 
  Download, FileText, History, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a valid CSV file.");
      }
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "https://kulu-ai-dashboard.onrender.com";

      const res = await axios.post(`${apiUrl}/tasks/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Success! Imported ${res.data.count} tasks.`);
      setFile(null); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,title,instruction,type,content\nSample Task,Translate to Amharic,TRANSLATION,Hello World";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kulu_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bulk Uploads</h1>
        <p className="text-slate-500 text-sm font-medium">Import large datasets (CSV) to create multiple tasks at once.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
       
        <div className="lg:col-span-2 space-y-6">
           
           
           <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                    <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-blue-900 text-sm">Use the correct format</h3>
                    <p className="text-xs text-blue-600/80 mt-1 leading-relaxed">
                        Your CSV must have these headers: <br/>
                        <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-800 font-mono">title, instruction, type, content</code>
                    </p>
                </div>
              </div>
              <Button onClick={downloadTemplate} variant="outline" className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50 h-9 text-xs font-bold">
                 <Download className="w-3.5 h-3.5 mr-2" /> Template
              </Button>
           </div>

           
           <div 
             className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-200 ${
               dragActive ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-slate-200 bg-white hover:border-slate-300"
             }`}
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}
             onDrop={handleDrop}
           >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                accept=".csv"
                onChange={handleChange}
              />
              
              {!file ? (
                <>
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <UploadCloud className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Click or Drag file to upload</h3>
                  <p className="text-sm text-slate-400 mt-2 max-w-xs">
                    Support for .CSV files only. Max file size 10MB.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                   <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-8 h-8 text-green-600" />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900">{file.name}</h3>
                   <p className="text-sm text-slate-400 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 z-20"
                     onClick={(e) => {
                        e.preventDefault(); // Stop file input click
                        setFile(null);
                     }}
                   >
                     <X className="w-4 h-4 mr-1" /> Remove File
                   </Button>
                </div>
              )}
           </div>

           
           <div className="flex justify-end">
              <Button 
                onClick={handleUpload} 
                disabled={!file || loading} 
                className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-base font-bold shadow-xl shadow-slate-200 disabled:opacity-50 disabled:shadow-none transition-all"
              >
                 {loading ? "Importing Data..." : "Start Bulk Import"}
              </Button>
           </div>
        </div>

        
        <div className="space-y-4">
           <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" /> Recent Imports
           </h3>
           
           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-4">
              
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-3 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                   <div className={`mt-0.5 w-2 h-2 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                   <div>
                      <p className="text-sm font-bold text-slate-800">Batch_Import_0{i + 1}.csv</p>
                      <p className="text-xs text-slate-400 mt-0.5">Oct {24 - i}, 2025 • 2:30 PM</p>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                            {i === 0 ? '1,204 Tasks' : '450 Tasks'}
                         </span>
                         {i === 0 && (
                           <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                           </span>
                         )}
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <Card className="bg-slate-900 text-white border-none rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
              <CardContent className="p-6 relative z-10">
                 <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                 <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    Make sure your CSV encoding is UTF-8 to support Amharic, Tigrigna, and Oromiffa characters correctly.
                 </p>
                 <Button variant="secondary" className="w-full font-bold text-xs h-8">Read Documentation</Button>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}