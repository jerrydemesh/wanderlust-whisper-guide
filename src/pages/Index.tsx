
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import QuestionCard from '@/components/QuestionCard';
import QuestionForm from '@/components/QuestionForm';
import { getQuestionsWithUsers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Filter, ArrowDown, ArrowUp, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Question } from '@/data/mockData';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load initial questions
    setQuestions(getQuestionsWithUsers());
  }, []);
  
  useEffect(() => {
    // Apply filters and sorting
    let filtered = [...questions];
    
    // Apply category filter if set
    if (categoryFilter) {
      filtered = filtered.filter(q => q.category === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredQuestions(filtered);
  }, [questions, categoryFilter, sortOrder]);

  const handleAskQuestion = (question: string, audioBlob?: Blob) => {
    // In a real app, we would send the question to the backend
    console.log('New question:', question, audioBlob);
    
    toast({
      title: "Question posted!",
      description: "Locals will see your question and respond soon.",
    });
    
    setShowQuestionForm(false);
  };

  const toggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
    
    // Scroll to the form if it's being shown
    if (!showQuestionForm) {
      setTimeout(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
      }, 100);
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };
  
  const handleFilter = (category: string | null) => {
    setCategoryFilter(category);
    
    if (category) {
      toast({
        title: "Filter Applied",
        description: `Showing ${category} questions only`,
      });
    } else {
      toast({
        title: "Filter Cleared",
        description: "Showing all questions",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onAskQuestion={toggleQuestionForm} />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* More prominent Ask Question button */}
        <div className="mb-6">
          <Button 
            onClick={toggleQuestionForm}
            className="w-full bg-sunset-DEFAULT hover:bg-sunset-dark text-white font-medium py-3 flex items-center justify-center gap-2"
            size="lg"
          >
            <Mic className="h-5 w-5" />
            {showQuestionForm ? "Close Question Form" : "Ask a Question"}
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-ocean-dark dark:text-ocean-light">Recent Questions</h2>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => toggleSortOrder()}>
                  {sortOrder === 'newest' ? (
                    <>
                      <ArrowDown className="h-4 w-4 mr-2" />
                      <span>Newest First</span>
                    </>
                  ) : (
                    <>
                      <ArrowUp className="h-4 w-4 mr-2" />
                      <span>Oldest First</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={categoryFilter === null}
                  onCheckedChange={() => handleFilter(null)}
                >
                  All Categories
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={categoryFilter === 'food'}
                  onCheckedChange={() => handleFilter('food')}
                >
                  Food
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={categoryFilter === 'attractions'}
                  onCheckedChange={() => handleFilter('attractions')}
                >
                  Attractions
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={categoryFilter === 'transport'}
                  onCheckedChange={() => handleFilter('transport')}
                >
                  Transportation
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={categoryFilter === 'accommodation'}
                  onCheckedChange={() => handleFilter('accommodation')}
                >
                  Accommodation
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={categoryFilter === 'emergency'}
                  onCheckedChange={() => handleFilter('emergency')}
                >
                  Emergency
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {showQuestionForm && (
          <QuestionForm onSubmit={handleAskQuestion} />
        )}
        
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="text-center p-8 border rounded-lg bg-white dark:bg-gray-800">
              <p className="text-muted-foreground">No questions found matching your filters</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
