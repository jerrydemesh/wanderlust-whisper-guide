
import React, { useState } from 'react';
import { MapPin, MessageCircle, Heart, CornerDownRight, Mic, Headphones, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Question, Answer } from '@/data/mockData';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import AnswerCard from './AnswerCard';
import VoiceInput from './VoiceInput';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

interface QuestionCardProps {
  question: Question;
  expanded?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [showTranslation, setShowTranslation] = useState(true);
  const navigate = useNavigate();
  
  const formattedDate = new Date(question.timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  
  const getCategoryColor = (category: Question['category']) => {
    switch (category) {
      case 'food': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'transport': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'attractions': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'emergency': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'accommodation': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleViewAnswers = () => {
    if (question.answers.length > 0) {
      // If there are answers, navigate to a dedicated page to view them
      // For now just toggle the expanded view
      setIsExpanded(!isExpanded);
      
      // In a real implementation you would navigate to a dedicated answer page
      // navigate(`/question/${question.id}/answers`);
    } else {
      // If no answers, just toggle the expanded view to show the answer form
      setIsExpanded(!isExpanded);
    }
  };

  const handleGoToUserProfile = (userId: string | undefined) => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <Card className="gradient-card w-full mb-4 overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div 
              onClick={() => handleGoToUserProfile(question.user?.id)}
              className={question.user?.id ? "cursor-pointer" : ""}
            >
              <Avatar>
                <AvatarImage src={question.user?.avatar} alt={question.user?.name} />
                <AvatarFallback>{question.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 
                className={cn("font-medium", question.user?.id ? "cursor-pointer hover:underline" : "")}
                onClick={() => handleGoToUserProfile(question.user?.id)}
              >
                {question.user?.name}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className={`language-badge ${question.user?.isLocal ? 'language-badge-local' : 'language-badge-traveler'}`}>
                  {question.originalLanguage}
                </span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{question.location}</span>
                </div>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          <Badge className={cn("text-xs", getCategoryColor(question.category))}>
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {question.hasVoiceRecording && (
          <div className="mb-2 flex justify-end">
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6">
              <Headphones className="h-3 w-3" />
              <span>Play Audio</span>
            </Button>
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-foreground">
            {showTranslation && question.translatedText ? question.translatedText : question.originalText}
          </p>
          
          {question.translatedText && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground px-2 h-6"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              Show in {showTranslation ? question.originalLanguage : 'translation'}
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground h-8">
            <Heart className="h-4 w-4 mr-1" />
            <span>Like</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-8"
            onClick={handleViewAnswers}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{question.answers.length > 0 ? `${question.answers.length} Answers` : 'Answer'}</span>
          </Button>
        </div>
      </CardFooter>
      
      {isExpanded && (
        <div className="border-t border-border p-4">
          {question.answers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
          
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <textarea
                placeholder="Write your answer..."
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-2">
                <VoiceInput 
                  onRecordingComplete={(blob) => console.log('Recording completed', blob)} 
                />
                <Button 
                  size="sm" 
                  className="h-8 px-3 bg-ocean-DEFAULT hover:bg-ocean-dark"
                >
                  <Send className="h-3 w-3 mr-1" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;
