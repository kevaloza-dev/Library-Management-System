export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

export interface Author {
  id: string
  name: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface Book {
  id: string
  title: string
  isbn: string
  description?: string
  authorId: string
  author: Author
  publishYear: number
  copies: number
  availableCopies: number
  createdAt: string
  updatedAt: string
}

export interface BorrowRecord {
  id: string
  userId: string
  user: User
  bookId: string
  book: Book
  borrowDate: string
  dueDate: string
  returnDate?: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  access_token: string
  user: User
}
