
import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LocationSelectorProps {
  onSelect: (location: string) => void;
  onClose: () => void;
}

const POPULAR_LOCATIONS = [
  "Tokyo, Japan",
  "Kyoto, Japan",
  "Osaka, Japan",
  "Paris, France",
  "New York, USA",
  "London, UK",
  "Sydney, Australia",
  "Bangkok, Thailand",
  "Seoul, South Korea",
  "Singapore"
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLocations = searchQuery.trim() 
    ? POPULAR_LOCATIONS.filter(location => 
        location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_LOCATIONS;
    
  const handleSelectLocation = (location: string) => {
    onSelect(location);
  };
  
  const handleDetectLocation = () => {
    // In a real app, we would use the browser's geolocation API
    // For now, just simulate with a fixed value
    setTimeout(() => {
      onSelect("Current Location");
    }, 500);
  };

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Select Location</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mb-4"
        onClick={handleDetectLocation}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Use my current location
      </Button>
      
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        <div className="text-xs font-medium text-muted-foreground mb-2">POPULAR LOCATIONS</div>
        {filteredLocations.map((location) => (
          <Button
            key={location}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleSelectLocation(location)}
          >
            {location}
          </Button>
        ))}
        {filteredLocations.length === 0 && (
          <div className="text-center text-muted-foreground py-2">
            No locations match your search
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
