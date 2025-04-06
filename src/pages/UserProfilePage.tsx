
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';
import { getQuestionsWithUsers, users } from '@/data/mockData';
import { Question } from '@/data/mockData';

// Mock user data using the same IDs as in our mockData.ts
const mockUsers = {
  user1: {
    userId: 'user1',
    username: 'Sophie Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    location: 'Tokyo, Japan',
    messages: []
  },
  user2: {
    userId: 'user2',
    username: 'Takashi Yamamoto',
    avatar: 'https://i.pravatar.cc/150?img=2',
    location: 'Tokyo, Japan',
    messages: []
  },
  user3: {
    userId: 'user3',
    username: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: 'Paris, France',
    messages: []
  },
  user4: {
    userId: 'user4',
    username: 'Pierre Dubois',
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: 'Paris, France',
    messages: []
  }
};

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    // Get all questions from mock data
    const allQuestions = getQuestionsWithUsers();
    
    // Filter for questions related to this user
    // In a real app, this would be an API call
    const filtered = allQuestions.filter(q => 
      // Check if user has answered this question
      q.answers.some(a => a.user?.id === userId) ||
      // Or if user created this question
      (q.user?.id === userId)
    );
    
    setUserQuestions(filtered);
  }, [userId]);
  
  // If user not found, show error
  if (!userId || !mockUsers[userId as keyof typeof mockUsers]) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar onAskQuestion={() => {}} />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
          <p>The user profile you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
  
  const userData = mockUsers[userId as keyof typeof mockUsers];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onAskQuestion={() => {}} />
      <UserProfile 
        userId={userId} 
        userData={userData} 
        userQuestions={userQuestions} 
      />
    </div>
  );
};

export default UserProfilePage;
