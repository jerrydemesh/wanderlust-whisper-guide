
import React, { useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  className?: string;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onRecordingComplete, className }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcesing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  
  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingDuration(0);
      
      // In a real app, we would implement the actual recording logic here
      
      // Start duration counter
      const startTime = Date.now();
      const updateDuration = () => {
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
        const frameId = requestAnimationFrame(updateDuration);
        setAnimationFrame(frameId);
      };
      updateDuration();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };
  
  const stopRecording = async () => {
    // In a real app, we would stop the recording and get the audio blob here
    
    // Cancel animation frame
    cancelAnimationFrame(animationFrame);
    
    setIsRecording(false);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create mock audio blob
      const mockAudioBlob = new Blob([], { type: 'audio/webm' });
      onRecordingComplete(mockAudioBlob);
      setIsProcessing(false);
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isRecording ? (
        <>
          <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-1 px-3 rounded-full animate-pulse-soft">
            <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400"></div>
            <span className="text-sm font-medium">{formatDuration(recordingDuration)}</span>
          </div>
          <Button 
            variant="destructive" 
            size="icon" 
            className="rounded-full" 
            onClick={stopRecording}
          >
            <Square className="h-4 w-4" />
          </Button>
        </>
      ) : isProcesing ? (
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full" 
          disabled
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-sunset-DEFAULT hover:bg-sunset-dark"
          onClick={startRecording}
        >
          <Mic className="h-4 w-4 text-white" />
        </Button>
      )}
    </div>
  );
};

export default VoiceInput;
