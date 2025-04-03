
import React, { useState } from 'react';
import { MapPin, Search, Globe, MessageCircle, Mic, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';

interface NavbarProps {
  onAskQuestion: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAskQuestion }) => {
  const [showMessages, setShowMessages] = useState(false);

  const toggleMessages = () => {
    console.log('Toggling messages, current state:', showMessages);
    setShowMessages(!showMessages);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <MobileSidebar onAskQuestion={onAskQuestion} />
            </div>
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMessages}
            >
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
      
      {showMessages && (
        <div className="absolute right-4 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Messages</h3>
            <Button variant="ghost" size="sm" onClick={toggleMessages}>
              Close
            </Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-sm font-medium">Mika from Tokyo</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                I can help with your question about the best sushi places!
              </p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-sm font-medium">Haruto from Kyoto</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Here's information about the temple you asked about...
              </p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="text-sm font-medium">Yuki from Osaka</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Let me know if you need more food recommendations!
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
