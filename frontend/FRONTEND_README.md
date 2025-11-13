# Library Management System - Frontend

## Setup

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Development Server
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:5173`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── pages/              # Page components (Login, Dashboard)
├── components/         # Reusable components (BookList, AuthorForm, etc.)
├── services/           # API services (api.ts, books.ts, authors.ts)
├── context/            # React Context (AuthContext)
├── hooks/              # Custom hooks (useAuth)
├── types/              # TypeScript type definitions
├── index.css           # Global styles
└── main.tsx            # Entry point
\`\`\`

## Environment Variables

Create a `.env` file in the frontend directory:

\`\`\`env
VITE_API_URL=http://localhost:3001/api
\`\`\`

## Key Features

### Authentication
- JWT-based authentication
- Protected routes
- User profile management
- Automatic token refresh

### Books Management
- View books with detailed information
- Create new books
- Edit book details
- Delete books
- Track book availability

### Authors Management
- Manage authors
- Add author biographies
- Edit author information

### Borrow History
- Track all book borrowing records
- View borrow and return dates
- User information for each transaction

## Styling

The application uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`.

### Color System
- Primary: Blue (for actions and highlights)
- Neutral: Slate (for backgrounds and text)
- Success: Green (for positive states)
- Error: Red (for errors and destructive actions)

## API Integration

All API calls are handled through the `api` service in `src/services/api.ts`:

\`\`\`typescript
import { api } from '../services/api';

// GET request
const books = await api.get('/books');

// POST request
const newBook = await api.post('/books', { title: '...' });

// PATCH request
const updated = await api.patch(`/books/1`, { title: '...' });

// DELETE request
await api.delete(`/books/1`);
\`\`\`

## State Management

The application uses React Context for authentication state and custom hooks for component-level state management.

### useAuth Hook
\`\`\`typescript
import { useAuth } from '../hooks/useAuth';

function Component() {
  const { user, login, logout, loading } = useAuth();
  
  // Use auth state and methods
}
\`\`\`

## Testing

To run tests:

\`\`\`bash
npm run test
\`\`\`

## Deployment

### Build
\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel
\`\`\`bash
vercel
\`\`\`

### Deploy to other platforms
Upload the `dist` folder to your hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Ensure backend is running on port 3001
- Check VITE_API_URL in .env file
- Verify CORS settings on backend

### Build Errors
- Clear node_modules: `rm -rf node_modules`
- Clear Vite cache: `rm -rf .vite`
- Reinstall: `npm install`

### State Issues
- Clear browser localStorage
- Check browser console for errors
