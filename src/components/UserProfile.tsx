
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { Conversation } from './Navbar';
import { Question } from '@/data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface UserProfileProps {
  userId: string;
  userData: Conversation;
  userQuestions?: Question[];
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, userData, userQuestions = [] }) => {
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
            <Button size="sm" variant="default">
              Message
            </Button>
          </div>
          <p className="text-sm">
            Local guide from {userData.location}. I can help with recommendations on restaurants, transportation, and historical sites.
          </p>
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
            <Button variant="outline" size="sm">
              Sort by Date
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {userQuestions.length > 0 ? (
            userQuestions.map((question) => (
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
