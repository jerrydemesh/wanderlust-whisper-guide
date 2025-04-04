
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';
import { getQuestionsWithUsers } from '@/data/mockData';
import { Question } from '@/data/mockData';

// Mock user data
const mockUsers = {
  user1: {
    userId: 'user1',
    username: 'Mika',
    avatar: '/placeholder.svg',
    location: 'Tokyo',
    messages: []
  },
  user2: {
    userId: 'user2',
    username: 'Haruto',
    avatar: '/placeholder.svg',
    location: 'Kyoto',
    messages: []
  },
  user3: {
    userId: 'user3',
    username: 'Yuki',
    avatar: '/placeholder.svg',
    location: 'Osaka',
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
