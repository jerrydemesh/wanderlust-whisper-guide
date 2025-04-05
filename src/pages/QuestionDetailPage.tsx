
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { getQuestionsWithUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, ArrowLeft, Headphones, Send } from 'lucide-react';
import { Question } from '@/data/mockData';
import AnswerCard from '@/components/AnswerCard';
import { cn } from '@/lib/utils';
import VoiceInput from '@/components/VoiceInput';
import { useToast } from '@/hooks/use-toast';

const QuestionDetailPage = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [showTranslation, setShowTranslation] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the question from mock data
    const allQuestions = getQuestionsWithUsers();
    const foundQuestion = allQuestions.find(q => q.id === questionId);
    
    if (foundQuestion) {
      setQuestion(foundQuestion);
    } else {
      // Question not found, navigate back
      toast({
        title: "Question not found",
        description: "The question you're looking for doesn't exist.",
      });
      navigate('/');
    }
  }, [questionId, navigate, toast]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    
    // In a real app, we would save the answer to the database
    toast({
      title: "Answer submitted",
      description: "Your answer has been posted.",
    });
    
    // Reset form
    setNewAnswer('');
  };

  const handleVoiceRecording = (blob: Blob) => {
    // In a real app, we would process the voice blob here
    toast({
      title: "Voice message recorded",
      description: "Your voice answer will be transcribed and posted.",
    });
  };

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

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar onAskQuestion={() => {}} />
        <main className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Loading question...</h1>
          </div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(question.timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onAskQuestion={() => {}} />
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={handleGoBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Question Details</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div 
                  onClick={() => question.user?.id && navigate(`/user/${question.user.id}`)}
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
                    onClick={() => question.user?.id && navigate(`/user/${question.user.id}`)}
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
            </div>
          </CardFooter>
        </Card>
        
        <h2 className="text-xl font-semibold mb-4">
          {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>
        
        <div className="space-y-4 mb-6">
          {question.answers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-3">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <div className="mb-4">
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer..."
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <VoiceInput onRecordingComplete={handleVoiceRecording} />
              </div>
              <Button 
                type="submit" 
                disabled={!newAnswer.trim()}
                className="bg-ocean-DEFAULT hover:bg-ocean-dark"
              >
                <Send className="h-4 w-4 mr-1" />
                Post Answer
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetailPage;
