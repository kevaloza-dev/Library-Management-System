# Library Management System - API Documentation

## Overview

The Library Management System API provides RESTful endpoints for managing books, authors, and borrow records with JWT-based authentication.

## Base URL

\`\`\`
http://localhost:3001/api
\`\`\`

## Authentication

All endpoints (except login/register) require a JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

## Response Format

All responses are in JSON format with the following structure:

### Success Response
\`\`\`json
{
  "data": {...},
  "status": "success"
}
\`\`\`

### Error Response
\`\`\`json
{
  "error": "Error message",
  "status": "error",
  "code": "ERROR_CODE"
}
\`\`\`

## Endpoints

### Authentication

#### Login
\`\`\`
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "data": {
    "access_token": "eyJhbGc...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  },
  "status": "success"
}
\`\`\`

#### Register
\`\`\`
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Doe"
}

Response:
{
  "data": {
    "access_token": "eyJhbGc...",
    "user": {
      "id": 2,
      "email": "newuser@example.com",
      "name": "Jane Doe"
    }
  },
  "status": "success"
}
\`\`\`

### Books

#### Get All Books
\`\`\`
GET /books
Authorization: Bearer <token>

Response:
{
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "isbn": "978-0743273565",
      "publishedYear": 1925,
      "totalCopies": 5,
      "availableCopies": 3,
      "authorId": 1,
      "author": {
        "id": 1,
        "name": "F. Scott Fitzgerald"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "status": "success"
}
\`\`\`

#### Get Book by ID
\`\`\`
GET /books/:id
Authorization: Bearer <token>

Response:
{
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "isbn": "978-0743273565",
    "publishedYear": 1925,
    "totalCopies": 5,
    "availableCopies": 3,
    "authorId": 1,
    "author": {
      "id": 1,
      "name": "F. Scott Fitzgerald"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "status": "success"
}
\`\`\`

#### Create Book
\`\`\`
POST /books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "1984",
  "isbn": "978-0451524935",
  "publishedYear": 1949,
  "totalCopies": 3,
  "authorId": 2
}

Response:
{
  "data": {
    "id": 2,
    "title": "1984",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "totalCopies": 3,
    "availableCopies": 3,
    "authorId": 2,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "status": "success"
}
\`\`\`

#### Update Book
\`\`\`
PATCH /books/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "1984 (Updated)",
  "totalCopies": 5
}

Response:
{
  "data": {
    "id": 2,
    "title": "1984 (Updated)",
    "isbn": "978-0451524935",
    "publishedYear": 1949,
    "totalCopies": 5,
    "availableCopies": 5,
    "authorId": 2,
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "status": "success"
}
\`\`\`

#### Delete Book
\`\`\`
DELETE /books/:id
Authorization: Bearer <token>

Response:
{
  "data": {
    "message": "Book deleted successfully"
  },
  "status": "success"
}
\`\`\`

### Authors

#### Get All Authors
\`\`\`
GET /authors
Authorization: Bearer <token>

Response:
{
  "data": [
    {
      "id": 1,
      "name": "F. Scott Fitzgerald",
      "biography": "An American writer of novels and short stories...",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "status": "success"
}
\`\`\`

#### Create Author
\`\`\`
POST /authors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "George Orwell",
  "biography": "British novelist, essayist, and journalist..."
}

Response:
{
  "data": {
    "id": 2,
    "name": "George Orwell",
    "biography": "British novelist, essayist, and journalist...",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "status": "success"
}
\`\`\`

#### Update Author
\`\`\`
PATCH /authors/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "biography": "Updated biography..."
}
\`\`\`

#### Delete Author
\`\`\`
DELETE /authors/:id
Authorization: Bearer <token>
\`\`\`

### Borrow Records

#### Get Borrow History
\`\`\`
GET /borrow-history
Authorization: Bearer <token>

Response:
{
  "data": [
    {
      "id": 1,
      "bookId": 1,
      "userId": 1,
      "borrowDate": "2024-01-10T14:00:00Z",
      "returnDate": "2024-01-17T14:00:00Z",
      "book": {
        "id": 1,
        "title": "The Great Gatsby"
      },
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
  ],
  "status": "success"
}
\`\`\`

#### Borrow Book
\`\`\`
POST /borrow
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": 1
}

Response:
{
  "data": {
    "id": 2,
    "bookId": 1,
    "userId": 1,
    "borrowDate": "2024-01-15T10:30:00Z",
    "returnDate": null
  },
  "status": "success"
}
\`\`\`

#### Return Book
\`\`\`
POST /borrow/:id/return
Authorization: Bearer <token>

Response:
{
  "data": {
    "id": 2,
    "bookId": 1,
    "userId": 1,
    "borrowDate": "2024-01-15T10:30:00Z",
    "returnDate": "2024-01-15T15:30:00Z"
  },
  "status": "success"
}
\`\`\`

## Error Codes

- `UNAUTHORIZED` - Invalid or missing authentication token
- `FORBIDDEN` - User doesn't have permission for this action
- `NOT_FOUND` - Requested resource not found
- `VALIDATION_ERROR` - Request data validation failed
- `INTERNAL_ERROR` - Server error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address.

## Pagination

For endpoints returning lists, use query parameters:

\`\`\`
GET /books?page=1&limit=10
\`\`\`

Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
