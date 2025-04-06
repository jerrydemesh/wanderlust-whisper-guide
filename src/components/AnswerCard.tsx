
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, Headphones } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Answer } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const navigate = useNavigate();
  
  const formattedDate = new Date(answer.timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  const handleUserClick = () => {
    if (answer.user?.id) {
      navigate(`/user/${answer.user.id}`);
    }
  };

  return (
    <div className="pl-2 border-l-2 border-muted mb-4 last:mb-0">
      <div className="flex gap-3 items-start mb-2">
        <Avatar 
          className="h-7 w-7 cursor-pointer" 
          onClick={handleUserClick}
        >
          <AvatarImage src={answer.user?.avatar} alt={answer.user?.name} />
          <AvatarFallback>{answer.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <span 
                className="font-medium text-sm cursor-pointer hover:underline" 
                onClick={handleUserClick}
              >
                {answer.user?.name}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                <span className={`language-badge ${answer.user?.isLocal ? 'language-badge-local' : 'language-badge-traveler'}`}>
                  {answer.originalLanguage}
                </span>
              </span>
              <span className="text-xs text-muted-foreground ml-2">{formattedDate}</span>
            </div>
            
            {answer.isAccepted && (
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Accepted
              </span>
            )}
          </div>
          
          {answer.hasVoiceRecording && (
            <div className="mb-1 mt-1">
              <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 h-6 p-0">
                <Headphones className="h-3 w-3" />
                <span>Play Audio</span>
              </Button>
            </div>
          )}
          
          <div className="mt-1">
            <p className="text-sm text-foreground">
              {showTranslation && answer.translatedText ? answer.translatedText : answer.originalText}
            </p>
            
            {answer.translatedText && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground p-0 h-6 mt-1"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                Show in {showTranslation ? answer.originalLanguage : 'translation'}
              </Button>
            )}
          </div>
          
          <div className="flex gap-1 mt-2">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <ThumbsUp className="h-3 w-3 mr-1" />
              <span>{answer.voteCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
