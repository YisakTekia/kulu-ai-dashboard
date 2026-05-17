import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardLayout from "./Layouts/dashboardLayout";
import DashboardHome from "./pages/dashboardHome";
import { Toaster } from "@/components/ui/sonner";
import Reports from "./pages/analytics/reports";
import TranslationTasks from "./pages/tasks/translationTasks";
import RecordingTasks from "./pages/tasks/recordingTask";
import TranscriptionTasks from "./pages/tasks/transcriptionTasks";
import BulkUpload from "./pages/tasks/bulkUpload"; 
import GlobalActivities from "./pages/activities/globalActivities"; //
import BillingPage from "./pages/finance/billing";
import UserList from "./pages/users/usersList";
import AdminsList from "./pages/users/adminsList";
import SupervisorsList from "./pages/users/supervisorsList";
import SettingsPage from "./pages/settings/settings";
import ReviewsPage from "./pages/reviews/reviews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<DashboardLayout />}>
           <Route index element={<Navigate to="/dashboard" replace />} />
           <Route path="dashboard" element={<DashboardHome />} />
           
           <Route path="tasks/translation" element={<TranslationTasks />} />
           <Route path="tasks/recording" element={<RecordingTasks />} />
           <Route path="tasks/transcription" element={<TranscriptionTasks />} />
           
           
           <Route path="tasks/bulk" element={<BulkUpload />} /> 
           <Route path="analytics/reports" element={<Reports />} />
           <Route path="activities/global" element={<GlobalActivities />} />
           <Route path="finance/billing" element={<BillingPage />} />


           <Route path="users" element={<UserList />} /> 
           <Route path="users/supervisors" element={<SupervisorsList />} /> 
           <Route path="users/admins" element={<AdminsList />} /> 
          
           <Route path="reviews" element={<ReviewsPage />} />
           
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;