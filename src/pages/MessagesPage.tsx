
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VoiceInput from '@/components/VoiceInput';
import { Conversation, Message } from '@/components/Navbar';

interface MessagesPageProps {
  conversations?: Record<string, Conversation>;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ conversations: initialConversations }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Record<string, Conversation>>({});
  const [allMessages, setAllMessages] = useState<(Message & { username?: string; userId?: string; avatar?: string })[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  // Initialize with default conversations if not provided
  useEffect(() => {
    if (initialConversations) {
      setConversations(initialConversations);
    } else {
      // Default conversations
      const defaultConversations: Record<string, Conversation> = {
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
      };
      setConversations(defaultConversations);
    }
  }, [initialConversations]);

  // Process messages for the overview
  useEffect(() => {
    const processedMessages = Object.values(conversations).flatMap(conv => 
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
    
    setAllMessages(processedMessages);
    
    // If conversationId is provided in URL, activate that conversation
    if (conversationId && conversations[conversationId]) {
      setActiveConversation(conversationId);
    }
  }, [conversations, conversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeConversation) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        location: 'Current Location',
        text: newMessage,
        isIncoming: false,
        timestamp: new Date()
      };
      
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
      setNewMessage('');
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent and will be translated automatically.",
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
    navigate(`/messages/${userId}`);
  };

  const handleOpenUserProfile = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleVoiceRecording = (blob: Blob) => {
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
      
      simulateResponse(activeConversation);
      
      toast({
        title: "Voice Message",
        description: "Your voice message will be transcribed and sent.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-fade-in">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="container mx-auto flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-xl font-bold flex-1">
            {activeConversation ? conversations[activeConversation]?.username : 'Messages'}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!activeConversation ? (
          // Messages overview
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-medium text-lg mb-4">Recent Messages</h2>
            {allMessages.length > 0 ? (
              allMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => message.userId && handleOpenConversation(message.userId)}
                >
                  <Avatar 
                    className="h-10 w-10 mr-3" 
                    onClick={(e) => {
                      e.stopPropagation();
                      message.userId && handleOpenUserProfile(message.userId);
                    }}
                  >
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{message.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{message.text}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{message.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            )}
          </div>
        ) : (
          // Active conversation view
          <div className="max-w-2xl mx-auto">
            {/* Conversation header */}
            <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center">
              <Avatar 
                className="h-10 w-10 mr-3 cursor-pointer" 
                onClick={() => handleOpenUserProfile(activeConversation)}
              >
                <AvatarImage src={conversations[activeConversation].avatar} alt={conversations[activeConversation].username} />
                <AvatarFallback>{conversations[activeConversation].username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{conversations[activeConversation].username}</div>
                <div className="text-xs flex items-center text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{conversations[activeConversation].location}</span>
                </div>
              </div>
            </div>
            
            {/* Message thread */}
            <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto p-2">
              {conversations[activeConversation].messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg ${
                    message.isIncoming 
                      ? 'bg-white dark:bg-gray-800 mr-12' 
                      : 'bg-ocean-light dark:bg-ocean-dark text-white ml-12'
                  } shadow-sm animate-fade-in`}
                >
                  <p className="text-sm">
                    {message.text}
                  </p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.isIncoming ? message.sender : 'You'}
                    </span>
                    {message.timestamp && (
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
              <Textarea
                placeholder="Type a message..."
                className="w-full resize-none text-sm min-h-[60px] mb-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground mr-2">Auto-translation enabled</p>
                  <VoiceInput onRecordingComplete={handleVoiceRecording} />
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
      </div>
    </div>
  );
};

export default MessagesPage;
