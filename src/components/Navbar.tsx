
import React from 'react';
import { MapPin, Search, Globe, Mic, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';

interface NavbarProps {
  onAskQuestion: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAskQuestion }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MobileSidebar onAskQuestion={onAskQuestion} />
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-ocean-dark dark:text-ocean-light">
                Wanderlust
              </h1>
              <span className="text-xl font-light text-sunset-dark dark:text-sunset-light">
                Whisper
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>Tokyo, Japan</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="bg-sunset-DEFAULT hover:bg-sunset-dark rounded-full"
              onClick={onAskQuestion}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
