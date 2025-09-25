# Do-It App - A NextJS Todo App with Authentication & TanStack Query
The Do-It App is a comprehensive task management application that allows authenticated users to create, read, update, and delete tasks. The application provides a seamless user experience with features like OAuth authentication, search functionality, status filtering, and a beautiful custom loading experience with animated engines.
Built with Next.js App Router, TypeScript best practices, and demonstrates proficiency in server-side rendering, authentication flows, API routes, and responsive design.

## Features
Authentication

- OAuth Integration: GitHub and Google authentication via NextAuth.js
- Custom Sign-in Page: Beautiful, branded sign-in experience
- Protected Routes: Authentication guards preventing unauthorized access
- Session Management: Persistent user sessions with automatic refresh
- Custom Loading States: Animated engine loading screen during auth checks

## Core Functionality

- Task Management: Create, edit, delete, and view tasks
- Task Status Management: Toggle between completed and pending states
- Search Functionality: Real-time search tasks by title
- Status Filtering: Filter tasks by completion status (All, Completed, Pending)
- Responsive Design: Works seamlessly across desktop and mobile devices

## User Experience

- Dynamic Greetings: Time-based personalized greetings
- Interactive UI: Hover effects, smooth transitions, and visual feedback
- Loading States: Custom animated engine during authentication
- Error Handling: Comprehensive error boundaries and user feedback
- Modern Design: Dark theme with teal accent colors

### Built With
Frontend Framework

- Next.js 14: React framework with App Router for server-side rendering
- React 18: Modern React with hooks and functional components
- TypeScript: Full type safety and enhanced developer experience
- TanStack Query: Server state management, caching, and data fetching

### Authentication

- NextAuth.js: Complete authentication solution for Next.js
- GitHub Provider: OAuth integration with GitHub
- Google Provider: OAuth integration with Google
- Custom Pages: Branded sign-in experience

### Styling

- Tailwind CSS: Utility-first CSS framework for responsive design
- Custom Animations: CSS keyframes for engine loading animation
- Responsive Design: Mobile-first approach with breakpoint utilities

### Icons and UI

- Lucide React: Modern icon library for consistent iconography


### API & Data

- Next.js API Routes: Built-in API endpoints using the app/api directory structure
- Server Actions: Modern data mutation patterns
- Environment Variables: Secure credential management

## Getting Started
Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or pnpm package manager
- GitHub OAuth App credentials
- Google OAuth App credentials
- Modern web browser

## Challenges Faced & Next.js Learning Journey
1. Custom Authentication Flow
Initially struggled with implementing a custom sign-in page while using NextAuth.js. The key learning was understanding the pages configuration in NextAuth:
```javascript
pages: {
  signIn: '/signin', // Custom sign-in page path
}
```
Solution: Proper configuration in the NextAuth handler and understanding the authentication flow.

2. Next.js API Routes Structure
Coming from traditional REST API setups, adapting to Next.js App Router's API structure was initially confusing. Had to learn:

File-based routing with route.ts files
The app/api/ directory structure
HTTP method handlers (GET, POST, etc.) in the same file
How to call these APIs from client components

- Example API Route Structure:
app/api/auth/[...nextauth]/route.ts  # Authentication endpoints
app/api/todos/route.ts               # Todo CRUD operations

3. Server vs Client Components
The biggest paradigm shift was understanding when to use 'use client' directive:

- Authentication providers needed client-side rendering
- Interactive components required the client directive
- Static content could leverage server components

Common Mistake: Adding 'use client' everywhere instead of strategically using it.

4. Hydration Errors
Encountered hydration mismatches when trying to access window.location during server-side rendering:
Example:
```javascript
const pathname = window.location.pathname; // ❌ Causes hydration errors
Solution:
typescriptconst pathname = usePathname(); // ✅ SSR-safe Next.js hook
```

5. Authentication Route Protection
Initially struggled with protecting routes while allowing access to the sign-in page. The solution was implementing a guard system that bypasses protection for specific routes:
```javascript
if (pathname === '/signin') {
  return <>{children}</>; // Bypass protection
}
```

6. Missing index.html File
Coming from traditional React apps, it was weird not seeing an index.html file in the project root. Next.js generates this automatically and handles all the HTML boilerplate through its App Router system and layout components.

## API Reference
Authentication Endpoints

- POST /api/auth/signin - Initiate OAuth sign-in
- POST /api/auth/signout - Sign out user
- GET /api/auth/session - Get current session

Todo Endpoints (if implementing custom API)

- GET /api/todos - Fetch all todos
- POST /api/todos - Create new todo
- PUT /api/todos/[id] - Update todo
- DELETE /api/todos/[id] - Delete todo

### Resources 

- Next.js Documentation
- NextAuth.js
- TanStack Query
- Tailwind CSS
- TypeScript Documentation
- Lucide Icons