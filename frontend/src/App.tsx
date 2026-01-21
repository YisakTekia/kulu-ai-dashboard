import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login"; 
import DashboardLayout from "./Layouts/dashboardLayout";
import DashboardHome from "./pages/dashboardHome";
import { Toaster } from "@/components/ui/sonner";

import TranslationTasks from "./pages/tasks/translationTasks"; 
import RecordingTasks from "./pages/tasks/recordingTask";
import TranscriptionTasks from "./pages/tasks/transcriptionTasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
           <Route index element={<Navigate to="/dashboard" replace />} />
           <Route path="dashboard" element={<DashboardHome />} />
           <Route path="tasks/translation" element={<TranslationTasks />} />
           <Route path="tasks/recording" element={<RecordingTasks />} />
           <Route path="tasks/transcription" element={<TranscriptionTasks />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;