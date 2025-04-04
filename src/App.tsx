
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfilePage from "./pages/UserProfilePage";

const queryClient = new QueryClient();

// Prompt component for first-time visitors
const InitialPrompts = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if this is the first visit (in a real app, use localStorage)
    const isFirstVisit = !localStorage.getItem("hasVisitedBefore");
    
    if (isFirstVisit) {
      // Mark as visited
      localStorage.setItem("hasVisitedBefore", "true");
      
      // Show location permission toast
      setTimeout(() => {
        toast({
          title: "Location Access",
          description: "Allow location access to connect with local guides in your area.",
        });
      }, 1000);
      
      // Show language selection toast
      setTimeout(() => {
        toast({
          title: "Select Your Language",
          description: "Choose your preferred language for better communication.",
        });
      }, 3000);
    }
  }, [toast]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <InitialPrompts />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
