# TaskMate Backend

A simple RESTful API for task management built with Express.js and PostgreSQL.

## Features

- User authentication (signup/login)
- Task management (create, read, update, delete)
- Task status toggling
- JWT-based authorization
- Basic input validation
- PostgreSQL database
- Docker support

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- pnpm (recommended) or npm

## Getting Started

1. **Clone the repository and install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

```bash
cp .env.example .env
# Update the values in .env file
```

3. **Start the PostgreSQL database**

```bash
docker-compose up -d
```

4. **Run database migrations**

```bash
pnpm prisma:migrate
```

5. **Start the development server**

```bash
pnpm dev
```

## API Endpoints

### Authentication

```
POST /api/auth/signup
- Register a new user
- Body: { "email": string, "password": string, "name": string }

POST /api/auth/login
- Login with existing credentials
- Body: { "email": string, "password": string }

GET /api/auth/me
- Get current user profile
- Requires: Authorization header
```

### Tasks

```
GET /api/tasks
- Get all tasks for current user
- Requires: Authorization header

POST /api/tasks
- Create a new task
- Body: { "title": string }
- Requires: Authorization header

PATCH /api/tasks/:id
- Update a task
- Body: { "title": string, "completed": boolean }
- Requires: Authorization header

PATCH /api/tasks/:id/toggle
- Toggle task completion status
- Body: { "completed": boolean }
- Requires: Authorization header

DELETE /api/tasks/:id
- Delete a task
- Requires: Authorization header

GET /api/tasks/stats
- Get task statistics
- Requires: Authorization header
```

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio
- `pnpm test` - Run tests

### Project Structure

```
src/
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── routes/         # API routes
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── index.ts        # Application entry point
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Basic input validation
- Protected routes

## License

MIT