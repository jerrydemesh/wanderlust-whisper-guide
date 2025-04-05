
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Send } from 'lucide-react';
import { Conversation } from './Navbar';
import { Question } from '@/data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from '@/components/ui/textarea';
import VoiceInput from './VoiceInput';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  userId: string;
  userData: Conversation;
  userQuestions?: Question[];
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, userData, userQuestions = [] }) => {
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'category'>('date');
  const { toast } = useToast();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      toast({
        title: "Message Sent",
        description: `Your message to ${userData.username} has been sent and will be translated.`,
      });
      setNewMessage('');
      
      // Optionally close the message form
      // setShowMessageForm(false);
    }
  };
  
  const handleVoiceRecording = (blob: Blob) => {
    // In a real app, we would process the voice blob here
    toast({
      title: "Voice Message",
      description: "Your voice message will be transcribed and sent.",
    });
    
    // Simulate sending a message
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: `Your voice message to ${userData.username} has been sent.`,
      });
    }, 1000);
  };
  
  const sortedQuestions = [...userQuestions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return a.category.localeCompare(b.category);
    }
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar} alt={userData.username} />
              <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userData.username}</h1>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{userData.location}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Joined April 2024</span>
            </div>
            <Button 
              size="sm" 
              variant="default"
              onClick={() => setShowMessageForm(!showMessageForm)}
            >
              {showMessageForm ? "Hide Message Form" : "Message"}
            </Button>
          </div>
          <p className="text-sm">
            Local guide from {userData.location}. I can help with recommendations on restaurants, transportation, and historical sites.
          </p>
          
          {showMessageForm && (
            <div className="mt-4 border-t pt-4">
              <form onSubmit={handleSendMessage} className="space-y-3">
                <h3 className="text-sm font-medium">Send Message to {userData.username}</h3>
                <Textarea
                  placeholder={`Ask ${userData.username} a question about ${userData.location}...`}
                  className="w-full resize-none text-sm min-h-[80px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">Auto-translation enabled</span>
                    <VoiceInput onRecordingComplete={handleVoiceRecording} />
                  </div>
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Contributions</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {userQuestions.length} Answers
          </Badge>
          <Badge variant="secondary">
            5 Recommendations
          </Badge>
          <Badge variant="secondary">
            Local Expert
          </Badge>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Question History</h2>
          <div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortBy(sortBy === 'date' ? 'category' : 'date')}
            >
              Sort by {sortBy === 'date' ? 'Category' : 'Date'}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((question) => (
              <Card key={question.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(question.timestamp).toLocaleDateString()}
                    </span>
                    <Badge className="text-xs">
                      {question.category}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{question.translatedText || question.originalText}</p>
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    View full question
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No question history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
