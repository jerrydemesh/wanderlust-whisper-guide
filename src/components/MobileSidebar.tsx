
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Plus, MessageCircle, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileSidebarProps {
  onAskQuestion: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onAskQuestion }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-ocean-dark dark:text-ocean-light" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-ocean-dark dark:text-ocean-light flex items-center">
              Wanderlust
              <span className="text-xl font-light text-sunset-dark dark:text-sunset-light">
                Whisper
              </span>
            </h2>
          </div>
          
          <div className="p-4 flex-1">
            <div className="flex items-center mb-6 text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Tokyo, Japan</span>
            </div>
            
            <nav className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onAskQuestion}
              >
                <Plus className="mr-2 h-4 w-4" />
                Ask Question
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                My Questions
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Change Location
              </Button>
            </nav>
          </div>
          
          <div className="p-4 border-t mt-auto">
            <p className="text-xs text-muted-foreground">
              Connecting travelers with locals worldwide
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
