
import React, { useState } from 'react';
import { MapPin, Search, Globe, MessageCircle, Mic, Menu, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from './MobileSidebar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  onAskQuestion: () => void;
}

interface Message {
  id: string;
  sender: string;
  location: string;
  text: string;
  isIncoming: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onAskQuestion }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Mika',
      location: 'Tokyo',
      text: 'I can help with your question about the best sushi places!',
      isIncoming: true
    },
    {
      id: '2',
      sender: 'Haruto',
      location: 'Kyoto',
      text: 'Here\'s information about the temple you asked about...',
      isIncoming: true
    },
    {
      id: '3',
      sender: 'Yuki',
      location: 'Osaka',
      text: 'Let me know if you need more food recommendations!',
      isIncoming: true
    }
  ]);

  const toggleMessages = () => {
    console.log('Toggling messages, current state:', showMessages);
    setShowMessages(!showMessages);
  };

  const handleLanguageChange = () => {
    toast({
      title: "Language Selection",
      description: "Language selection feature coming soon!",
    });
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
        isIncoming: false
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate response (in a real app, this would be an API call)
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'Local Guide',
          location: 'Tokyo',
          text: 'Thanks for your message! I'll translate and respond to your query shortly.',
          isIncoming: true
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent and will be translated automatically.",
      });
    }
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
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLanguageChange}
              title="Change language"
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMessages}
              title="Messages"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="bg-sunset-DEFAULT hover:bg-sunset-dark rounded-full"
              onClick={onAskQuestion}
              title="Ask a question"
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
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto mb-3">
            {messages.map((message) => (
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
              <p className="text-xs text-muted-foreground">Auto-translation enabled</p>
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
    </nav>
  );
};

export default Navbar;
