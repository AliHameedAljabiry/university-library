interface Book {
  id: string;
  title: string; 
  author: string; 
  genre: string; 
  rating: number; 
  totalCopies: number; 
  availableCopies: number; 
  description: string; 
  coverUrl: string; 
  coverColor: string;
  videoUrl: string;
  summary: string;
  createdAt: Data | null
}

interface AuthCredentials {
  fullName: string
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
  
}
interface User {
  fullName?: string
  email?: string;
  password?: string;
  universityId?: number;
  universityCard?: string;
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  role: 'USER' | 'ADMIN';
  lastActivityDate: Date | null;
  createdAt: Date | null
  booksBorrowed: string

}

interface BookParams {
  id?: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl?: string;
  summary: string;
  createdAt?: Date;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
interface SafeUser {
  id: string;
  fullName: string;
}

interface SafeBook {
  id: string;
  title: string;
  availableCopies: number;
  coverUrl?: string;
}

interface EnrichedBorrowRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: SafeUser;
  book: SafeBook;
}