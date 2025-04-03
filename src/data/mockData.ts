
export interface User {
  id: string;
  name: string;
  avatar?: string;
  isLocal: boolean;
  preferredLanguage: string;
  location?: string;
}

export interface Question {
  id: string;
  userId: string;
  user?: User;
  originalText: string;
  translatedText?: string;
  originalLanguage: string;
  location: string;
  timestamp: string;
  hasVoiceRecording: boolean;
  answers: Answer[];
  category: 'food' | 'transport' | 'attractions' | 'emergency' | 'accommodation' | 'other';
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  user?: User;
  originalText: string;
  translatedText?: string;
  originalLanguage: string;
  timestamp: string;
  isAccepted: boolean;
  voteCount: number;
  hasVoiceRecording: boolean;
}

export const users: User[] = [
  {
    id: 'user1',
    name: 'Sophie Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isLocal: false,
    preferredLanguage: 'English',
    location: 'Tokyo, Japan'
  },
  {
    id: 'user2',
    name: 'Takashi Yamamoto',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isLocal: true,
    preferredLanguage: 'Japanese',
    location: 'Tokyo, Japan'
  },
  {
    id: 'user3',
    name: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isLocal: false,
    preferredLanguage: 'Spanish',
    location: 'Paris, France'
  },
  {
    id: 'user4',
    name: 'Pierre Dubois',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isLocal: true,
    preferredLanguage: 'French',
    location: 'Paris, France'
  }
];

export const questions: Question[] = [
  {
    id: 'q1',
    userId: 'user1',
    originalText: "Can anyone recommend a good ramen restaurant near Shinjuku station that's open late?",
    translatedText: '誰か新宿駅の近くで深夜営業している美味しいラーメン店を推薦できますか？',
    originalLanguage: 'English',
    location: 'Tokyo, Japan',
    timestamp: '2023-10-15T14:23:00Z',
    hasVoiceRecording: false,
    category: 'food',
    answers: [
      {
        id: 'a1',
        questionId: 'q1',
        userId: 'user2',
        originalText: '「一蘭」がおすすめです。24時間営業で、新宿駅から徒歩5分です。とんこつラーメンが人気です。',
        translatedText: 'I recommend "Ichiran". It\'s open 24 hours and is a 5-minute walk from Shinjuku Station. Their tonkotsu ramen is popular.',
        originalLanguage: 'Japanese',
        timestamp: '2023-10-15T14:45:00Z',
        isAccepted: true,
        voteCount: 5,
        hasVoiceRecording: false
      }
    ]
  },
  {
    id: 'q2',
    userId: 'user3',
    originalText: '¿Dónde puedo encontrar una farmacia abierta ahora mismo cerca de la Torre Eiffel? Necesito medicamentos para el dolor de cabeza.',
    translatedText: 'Where can I find an open pharmacy right now near the Eiffel Tower? I need medication for a headache.',
    originalLanguage: 'Spanish',
    location: 'Paris, France',
    timestamp: '2023-10-16T20:30:00Z',
    hasVoiceRecording: true,
    category: 'emergency',
    answers: [
      {
        id: 'a2',
        questionId: 'q2',
        userId: 'user4',
        originalText: 'La pharmacie du Trocadéro est ouverte jusqu\'à 22h et se trouve à 10 minutes à pied de la Tour Eiffel, à l\'adresse 6 Rue de Monttessuy.',
        translatedText: 'Trocadero Pharmacy is open until 10pm and is a 10-minute walk from the Eiffel Tower, at 6 Rue de Monttessuy.',
        originalLanguage: 'French',
        timestamp: '2023-10-16T20:40:00Z',
        isAccepted: false,
        voteCount: 3,
        hasVoiceRecording: false
      }
    ]
  },
  {
    id: 'q3',
    userId: 'user1',
    originalText: 'What\'s the best way to get from Narita Airport to Tokyo city center with luggage?',
    translatedText: '荷物を持って成田空港から東京の中心部に行くための最良の方法は何ですか？',
    originalLanguage: 'English',
    location: 'Tokyo, Japan',
    timestamp: '2023-10-17T08:15:00Z',
    hasVoiceRecording: false,
    category: 'transport',
    answers: []
  }
];

// Helper function to join questions with user data
export function getQuestionsWithUsers(): Question[] {
  return questions.map(question => {
    const questionWithUser = {
      ...question,
      user: users.find(user => user.id === question.userId)
    };
    
    // Also join users to answers
    const answersWithUsers = question.answers.map(answer => ({
      ...answer,
      user: users.find(user => user.id === answer.userId)
    }));
    
    return {
      ...questionWithUser,
      answers: answersWithUsers
    };
  });
}
