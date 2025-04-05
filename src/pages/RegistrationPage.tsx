
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => navigate('/')}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <h1 className="text-2xl font-bold mb-6 text-center text-ocean-dark dark:text-ocean-light">
          Create Your Account
        </h1>
        
        {/* Registration form content */}
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            Registration form will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
