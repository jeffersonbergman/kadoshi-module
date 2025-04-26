
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Financeiro from "./pages/Financeiro";
import Administrativo from "./pages/Administrativo";
import Musica from "./pages/Musica";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AdminCalendar from "./pages/AdminCalendar";
import MemberDetails from "./pages/MemberDetails";
import NewMember from "./pages/NewMember";
import Communications from "./pages/Communications";
import './i18n';

const queryClient = new QueryClient();

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/financeiro" 
          element={
            <ProtectedRoute>
              <Financeiro />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/administrativo" 
          element={
            <ProtectedRoute>
              <Administrativo />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/administrativo/calendario" 
          element={
            <ProtectedRoute>
              <AdminCalendar />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/administrativo/membros/novo" 
          element={
            <ProtectedRoute>
              <NewMember />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/administrativo/membros/:id" 
          element={
            <ProtectedRoute>
              <MemberDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/administrativo/comunicados" 
          element={
            <ProtectedRoute>
              <Communications />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/musica" 
          element={
            <ProtectedRoute>
              <Musica />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/configuracoes" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
