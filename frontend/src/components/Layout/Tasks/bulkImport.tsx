import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void; 
}

export default function BulkImportDialog({ open, onOpenChange, onSuccess }: BulkImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file first.");
      return;
    }

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

      toast.success(`Successfully imported ${res.data.count} tasks!`);
      setFile(null);
      onSuccess(); 
      onOpenChange(false); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Import failed.");
    } finally {
      setLoading(false);
    }
  };

 
  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,title,instruction,type,content\nSample Task,Translate this to Amharic,TRANSLATION,Hello World";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "task_import_template.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Task Import</DialogTitle>
          <DialogDescription>
            Upload a CSV file to create multiple tasks at once.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          
         
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-3">
             <FileSpreadsheet className="w-5 h-5 text-blue-600 mt-0.5" />
             <div className="text-sm text-blue-800">
                <p className="font-semibold">Format Required:</p>
                <p>Headers: <code className="bg-blue-100 px-1 rounded">title, instruction, type, content</code></p>
                <button onClick={downloadTemplate} className="text-blue-600 underline mt-1 flex items-center gap-1 hover:text-blue-800">
                   <Download className="w-3 h-3" /> Download Template
                </button>
             </div>
          </div>

          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input 
              type="file" 
              accept=".csv"
              onChange={handleFileChange} 
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleUpload} disabled={loading || !file} className="bg-blue-600 hover:bg-blue-700">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Import Tasks
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}