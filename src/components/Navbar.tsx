
import React, { useState } from 'react';
import { MapPin, Search, Globe, MessageCircle, Mic, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import LocationSelector from './LocationSelector';

export interface Message {
  id: string;
  sender: string;
  senderId?: string;
  avatar?: string;
  location: string;
  text: string;
  isIncoming: boolean;
  timestamp?: Date;
}

export interface Conversation {
  userId: string;
  username: string;
  avatar?: string;
  location: string;
  messages: Message[];
}

interface NavbarProps {
  onAskQuestion: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAskQuestion }) => {
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Tokyo, Japan");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLanguageChange = () => {
    toast({
      title: "Language Selection",
      description: "Language selection feature coming soon!",
    });
  };

  const handleUpdateLocation = (location: string) => {
    setCurrentLocation(location);
    setShowLocationSelector(false);
    
    toast({
      title: "Location Updated",
      description: `Location set to ${location}`,
    });
  };
  
  // Detect user's location and language on first load - in a real app
  React.useEffect(() => {
    // This would be replaced with actual geolocation API usage
    const detectLocation = async () => {
      try {
        // Simulate getting user location
        console.log("Getting user location");
        
        // In a real app, we would use the browser's geolocation API
        // and then reverse geocode to get the city/country
        
        // This would be replaced with real location detection
        // For now, just show a toast that we would ask for location
        toast({
          title: "Location",
          description: "The app would ask for your location permission to better assist you.",
        });
      } catch (error) {
        console.error("Error detecting location:", error);
      }
    };
    
    // Call once on first load
    detectLocation();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <MobileSidebar onAskQuestion={onAskQuestion} />
            </div>
            <Link to="/">
              <div className="flex items-center">
                <h1 className="text-lg md:text-xl font-bold text-ocean-dark dark:text-ocean-light">
                  Wanderlust
                </h1>
                <span className="text-lg md:text-xl font-light text-sunset-dark dark:text-sunset-light">
                  Whisper
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground flex items-center"
              onClick={() => setShowLocationSelector(true)}
            >
              <MapPin className="mr-1 h-4 w-4" />
              <span>{currentLocation}</span>
            </Button>
          </div>
          
          {/* Make the icons container more responsive on small screens */}
          <div className="flex items-center space-x-0 sm:space-x-1 md:space-x-2">
            {!isMobile && (
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLanguageChange}
              title="Change language"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Link to="/register">
              <Button 
                variant="ghost" 
                size="icon"
                title="Register"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/messages">
              <Button 
                variant="ghost" 
                size="icon"
                title="Messages"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="bg-red-500 hover:bg-red-600 text-white rounded-md"
              onClick={onAskQuestion}
              title="Ask a question"
            >
              <Mic className="h-4 w-4 mr-1" /> Ask
            </Button>
          </div>
        </div>
      </div>
      
      {showLocationSelector && (
        <LocationSelector 
          onSelect={handleUpdateLocation} 
          onClose={() => setShowLocationSelector(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
