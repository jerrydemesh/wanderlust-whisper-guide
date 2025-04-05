
import React, { useState } from 'react';
import { MapPin, Search, Globe, MessageCircle, Mic, Menu, Send, X, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import VoiceInput from './VoiceInput';
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
  const [showMessages, setShowMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Tokyo, Japan");
  
  const [conversations, setConversations] = useState<Record<string, Conversation>>({
    'user1': {
      userId: 'user1',
      username: 'Mika',
      avatar: '/placeholder.svg',
      location: 'Tokyo',
      messages: [
        {
          id: '1',
          sender: 'Mika',
          senderId: 'user1',
          location: 'Tokyo',
          text: 'I can help with your question about the best sushi places!',
          isIncoming: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        }
      ]
    },
    'user2': {
      userId: 'user2',
      username: 'Haruto',
      avatar: '/placeholder.svg',
      location: 'Kyoto',
      messages: [
        {
          id: '2',
          sender: 'Haruto',
          senderId: 'user2',
          location: 'Kyoto',
          text: "Here's information about the temple you asked about...",
          isIncoming: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        }
      ]
    },
    'user3': {
      userId: 'user3',
      username: 'Yuki',
      avatar: '/placeholder.svg',
      location: 'Osaka',
      messages: [
        {
          id: '3',
          sender: 'Yuki',
          senderId: 'user3',
          location: 'Osaka',
          text: 'Let me know if you need more food recommendations!',
          isIncoming: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
        }
      ]
    }
  });

  // All messages for the messaging overview
  const allMessages = Object.values(conversations).flatMap(conv => 
    conv.messages.map(msg => ({
      ...msg,
      username: conv.username,
      userId: conv.userId,
      avatar: conv.avatar
    }))
  ).sort((a, b) => {
    const timeA = a.timestamp?.getTime() || 0;
    const timeB = b.timestamp?.getTime() || 0;
    return timeB - timeA; // Sort by most recent
  });

  const toggleMessages = () => {
    console.log('Toggling messages, current state:', showMessages);
    setShowMessages(!showMessages);
    setActiveConversation(null); // Reset active conversation when closing
  };

  const handleLanguageChange = () => {
    toast({
      title: "Language Selection",
      description: "Language selection feature coming soon!",
    });
  };

  const handleVoiceRecording = (blob: Blob) => {
    toast({
      title: "Voice Message",
      description: "Your voice message will be transcribed and sent.",
    });
    
    // In a real app, we would process the voice blob here
    // and convert to text before sending
    
    // Simulate a message from the voice recording
    if (activeConversation) {
      const voiceMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        location: 'Current Location',
        text: "[Voice message transcribed automatically]",
        isIncoming: false,
        timestamp: new Date()
      };
      
      setConversations(prev => ({
        ...prev,
        [activeConversation]: {
          ...prev[activeConversation],
          messages: [...prev[activeConversation].messages, voiceMessage]
        }
      }));
      
      // Simulate response
      simulateResponse(activeConversation);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        location: 'Current Location',
        text: newMessage,
        isIncoming: false,
        timestamp: new Date()
      };
      
      if (activeConversation) {
        // Add to specific conversation
        setConversations(prev => ({
          ...prev,
          [activeConversation]: {
            ...prev[activeConversation],
            messages: [...prev[activeConversation].messages, userMessage]
          }
        }));
        
        // Simulate response
        simulateResponse(activeConversation);
      }
      
      setNewMessage('');
      
      toast({
        title: "Message Sent",
        description: "Your message has been transcribed and will be translated automatically.",
      });
    }
  };
  
  const simulateResponse = (userId: string) => {
    setTimeout(() => {
      const conversation = conversations[userId];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: conversation.username,
        senderId: conversation.userId,
        location: conversation.location,
        text: "Thanks for your message! I'll translate and respond to your query shortly.",
        isIncoming: true,
        timestamp: new Date()
      };
      
      setConversations(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          messages: [...prev[userId].messages, responseMessage]
        }
      }));
    }, 1000);
  };

  const handleOpenConversation = (userId: string) => {
    setActiveConversation(userId);
  };

  const handleOpenUserProfile = (userId: string) => {
    setShowMessages(false);
    navigate(`/user/${userId}`);
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
                <h1 className="text-xl font-bold text-ocean-dark dark:text-ocean-light">
                  Wanderlust
                </h1>
                <span className="text-xl font-light text-sunset-dark dark:text-sunset-light">
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
          <div className="flex items-center space-x-1 sm:space-x-2">
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMessages}
              title="Messages"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              size="sm" 
              className="bg-sunset-DEFAULT hover:bg-sunset-dark rounded-md"
              onClick={onAskQuestion}
              title="Ask a question"
            >
              <Mic className="h-4 w-4 mr-1" /> Ask
            </Button>
          </div>
        </div>
      </div>
      
      {showMessages && !activeConversation && (
        <div className="absolute right-4 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Messages</h3>
            <Button variant="ghost" size="sm" onClick={toggleMessages}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
            {allMessages.map((message) => (
              <div 
                key={message.id} 
                className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 flex items-start cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <div 
                  onClick={() => handleOpenUserProfile(message.userId || '')}
                  className="h-8 w-8 mr-2 cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div 
                      onClick={() => handleOpenUserProfile(message.userId || '')}
                      className="text-sm font-medium hover:underline cursor-pointer"
                    >
                      {message.sender}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        message.userId && handleOpenConversation(message.userId);
                      }}
                    >
                      DM
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {message.text}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{message.location}</span>
                    <span className="mx-1">•</span>
                    <span>{message.timestamp?.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showMessages && activeConversation && (
        <div className="absolute right-0 top-0 w-full h-full md:w-96 md:h-auto md:right-4 md:mt-2 md:top-16 bg-white dark:bg-gray-800 md:rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className="mr-2"
                onClick={() => setActiveConversation(null)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div 
                onClick={() => handleOpenUserProfile(activeConversation)}
                className="flex items-center cursor-pointer hover:underline"
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={conversations[activeConversation].avatar} alt={conversations[activeConversation].username} />
                  <AvatarFallback>{conversations[activeConversation].username.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{conversations[activeConversation].username}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={toggleMessages}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-3">
            {conversations[activeConversation].messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-md ${
                  message.isIncoming 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-ocean-light dark:bg-ocean-dark text-white ml-8'
                }`}
              >
                <p className="text-sm font-medium">
                  {message.isIncoming ? `${message.sender} from ${message.location}` : message.sender}
                </p>
                <p className={`text-xs ${message.isIncoming ? 'text-gray-500 dark:text-gray-400' : 'text-white/90'}`}>
                  {message.text}
                </p>
                {message.timestamp && (
                  <p className="text-xs mt-1 text-gray-400">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex flex-col space-y-2">
            <Textarea
              placeholder="Type a message..."
              className="w-full resize-none text-sm min-h-[60px]"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground mr-2">Auto-translation enabled</p>
                <VoiceInput 
                  onRecordingComplete={handleVoiceRecording} 
                  className="h-6"
                />
              </div>
              <Button 
                type="submit" 
                size="sm" 
                className="bg-ocean-DEFAULT hover:bg-ocean-dark"
                disabled={!newMessage.trim()}
              >
                <Send className="h-3 w-3 mr-1" />
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
      
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
