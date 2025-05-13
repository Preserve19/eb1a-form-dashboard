
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./contexts/FormContext";
import { AuthProvider } from "./contexts/AuthContext";

import LandingPage from "./pages/Index";
import WelcomePage from "./pages/Welcome";
import FormPage from "./pages/Form";
import SuccessPage from "./pages/Success";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/admin/ForgotPassword";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FormProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/success" element={<SuccessPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FormProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
