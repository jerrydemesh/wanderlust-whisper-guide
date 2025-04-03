
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Send } from 'lucide-react';
import VoiceInput from './VoiceInput';
import LanguageSelector from './LanguageSelector';

interface QuestionFormProps {
  onSubmit: (question: string, audioBlob?: Blob) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [language, setLanguage] = useState('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() || audioBlob) {
      onSubmit(question, audioBlob || undefined);
      setQuestion('');
      setAudioBlob(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Tokyo, Japan</span>
          </div>
          <LanguageSelector 
            selectedLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>
        
        <Textarea
          placeholder="Ask a question about your travel destination..."
          className="w-full resize-none mb-3"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
        <div className="flex justify-between items-center">
          <VoiceInput
            onRecordingComplete={(blob) => {
              setAudioBlob(blob);
              console.log('Recording completed', blob);
            }}
          />
          
          <Button 
            type="submit" 
            className="bg-ocean-DEFAULT hover:bg-ocean-dark"
            disabled={!question.trim() && !audioBlob}
          >
            <Send className="h-4 w-4 mr-2" />
            Post Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
