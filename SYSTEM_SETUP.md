# Library Management System - Complete Setup Guide

This document provides a comprehensive guide to set up and run the entire Library Management System with both backend and frontend components.

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## Project Structure

\`\`\`
library-management-system/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── books/          # Books module
│   │   ├── authors/        # Authors module
│   │   ├── borrow/         # Borrow records module
│   │   ├── prisma/         # Database service
│   │   └── app.module.ts   # Main app module
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seeding script
│   ├── Dockerfile
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── types/          # TypeScript types
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml
└── README.md
\`\`\`

## Backend Setup

### 1. Navigate to Backend Directory

\`\`\`bash
cd backend
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory:

\`\`\`env
DATABASE_URL="postgresql://user:password@db:5432/library_db"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
PORT=3001
\`\`\`

### 4. Run Database Migrations

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

### 5. Seed the Database

\`\`\`bash
npx prisma db seed
\`\`\`

### 6. Start the Backend Server

\`\`\`bash
npm run start:dev
\`\`\`

The backend API will be available at `http://localhost:3001/api`

API Documentation (Swagger) available at `http://localhost:3001/api/docs`

## Frontend Setup

### 1. Navigate to Frontend Directory

\`\`\`bash
cd frontend
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env` file in the frontend directory:

\`\`\`env
VITE_API_URL=http://localhost:3001/api
\`\`\`

### 4. Start the Development Server

\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:5173`

## Docker Setup (Recommended)

### 1. Build and Start All Services

From the root directory, run:

\`\`\`bash
docker-compose up --build
\`\`\`

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3001
- Frontend application on port 5173

### 2. Verify Services

- Backend Health Check: `curl http://localhost:3001/api/health`
- Frontend: `http://localhost:5173`
- Database: Connected via environment variables

### 3. Stop Services

\`\`\`bash
docker-compose down
\`\`\`

## Using the Application

### Login Credentials

Demo credentials for testing:

- **Email**: admin@library.com
- **Password**: password123

### Features

#### Books Management
- View all books with details (ISBN, published year, availability)
- Add new books with author assignment
- Edit existing book information
- Delete books from the system
- Track available vs. total copies

#### Authors Management
- View all authors with their biographies
- Add new authors
- Edit author information
- Delete authors

#### Borrow History
- View complete borrow records
- Track book borrowing dates
- Monitor return dates
- User information for each transaction

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get current user profile

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PATCH /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Authors
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create new author
- `PATCH /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Borrow Records
- `GET /api/borrow-history` - Get all borrow records
- `POST /api/borrow` - Borrow a book
- `POST /api/borrow/:id/return` - Return borrowed book

## Development

### Backend Development
- Language: TypeScript
- Framework: NestJS
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT

### Frontend Development
- Framework: React + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- State Management: React Context + Custom Hooks
- HTTP Client: Fetch API with custom wrapper

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Verify database credentials

### Backend API Not Responding
- Check if backend server is running on port 3001
- Verify environment variables are correctly set
- Check backend logs for errors

### Frontend Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

## Production Deployment

### Backend
1. Build Docker image: `docker build -t library-api:latest ./backend`
2. Push to registry
3. Deploy to your hosting platform

### Frontend
1. Build: `npm run build`
2. Upload dist folder to CDN or hosting service
3. Update API URL in environment variables

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
