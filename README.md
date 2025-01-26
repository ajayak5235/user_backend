# User Management System

A full-stack application featuring a CRUD API backend with MongoDB and a React frontend with interactive user visualization using react-flow.

## Features

### Authentication
- JWT-based authentication system
- Secure password hashing with bcrypt
- Refresh token mechanism for improved security
- Protected routes requiring authentication
- User registration and login functionality

### Backend Features
- RESTful API with CRUD operations
- Node.js with TypeScript implementation
- MongoDB database integration
- Asynchronous API design
- Environment configuration using .env
- Error handling (404, 500)
- Horizontal scaling using Node.js Cluster API

### Frontend Features
- React v18+ with TypeScript
- Interactive user visualization using react-flow
- Drag-and-drop hobby management
- User management forms with validation
- Success/error notifications
- Loading states and error handling
- Responsive design

## Technical Stack

### Backend
- Node.js
- TypeScript
- MongoDB
- Express.js
- JWT for authentication
- bcrypt for password hashing
- Node.js Cluster API for scaling

### Frontend
- React 18+
- TypeScript
- react-flow
- Axios for API calls
- React Context for state management

## API Endpoints
router.post("/register", registerUser)
router.post("/login", loginUser)
### Authentication Endpoints

GET    /api/users     - Get all users (Protected)
POST   /api/users     - Create new user (Protected)
PUT    /api/users/:id - Update user (Protected)
DELETE /api/users/:id - Delete user (Protected)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system
2. Install Backend Dependencies


```shellscript
cd backend
npm install
```

Backend:

```shellscript
cd backend
npm run dev
npm start
```

### Authentication Features

- Secure password hashing using bcrypt
- JWT token generation and validation
- Refresh token mechanism for extended sessions
- Protected routes middleware
- User session management


### Visualization Features

- Interactive node-based user visualization
- Draggable hobby categories
- Real-time updates
- Search and filter functionality
- Responsive layout


## Error Handling

- Proper error handling for API requests
- Input validation
- Authentication error handling
- Loading states for async operations
- User-friendly error messages


## Scaling

- Horizontal scaling using Node.js Cluster API
- Load balancing across multiple CPU cores
- Consistent state management across workers


## Development Features

- TypeScript for type safety
- Development mode with hot reloading
- Production build optimization
- Code organization following best practices
- Comprehensive error handling
