
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import QuestionForm from '@/components/QuestionForm';
import { getQuestionsWithUsers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [questions, setQuestions] = useState(getQuestionsWithUsers());
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const { toast } = useToast();

  const handleAskQuestion = (question: string, audioBlob?: Blob) => {
    // In a real app, we would send the question to the backend
    console.log('New question:', question, audioBlob);
    
    toast({
      title: "Question posted!",
      description: "Locals will see your question and respond soon.",
    });
    
    setShowQuestionForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-ocean-dark dark:text-ocean-light">Recent Questions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button 
              size="sm" 
              className="bg-ocean-DEFAULT hover:bg-ocean-dark"
              onClick={() => setShowQuestionForm(!showQuestionForm)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ask
            </Button>
          </div>
        </div>
        
        {showQuestionForm && (
          <QuestionForm onSubmit={handleAskQuestion} />
        )}
        
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
