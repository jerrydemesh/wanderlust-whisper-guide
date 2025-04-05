
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
import RegistrationPage from "./pages/RegistrationPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";

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

      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained:", position.coords.latitude, position.coords.longitude);
            // In a real app, here we would do reverse geocoding to get location name
            
            toast({
              title: "Location Detected",
              description: "Your location has been detected. Connecting you with local guides.",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location Access Denied",
              description: "To get the best experience, please enable location access.",
            });
          }
        );
      }
      
      // Try to detect browser language
      const userLanguage = navigator.language || "en-US";
      console.log("Detected language:", userLanguage);
      
      // In a real app, we would use this to set the default language
      localStorage.setItem("userLanguage", userLanguage);
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
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/question/:questionId" element={<QuestionDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
