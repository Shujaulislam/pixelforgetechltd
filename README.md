# TaskMate - Task Management Application

A full-stack task management application built with React Native (Expo) for the frontend and Express.js for the backend. The application allows users to manage their personal tasks with features like user authentication, task creation, and status updates.

## Architecture Overview

The application follows a client-server architecture:

- **Frontend**: React Native mobile app built with Expo
- **Backend**: RESTful API built with Express.js
- **Database**: PostgreSQL for data persistence

## Tech Stack

### Frontend
- React Native with Expo
- TailwindCSS/NativeWind for styling
- Expo Router for navigation
- Context API for state management

### Backend
- Node.js & Express.js
- PostgreSQL with Prisma ORM
- JWT for authentication
- Input validation

### DevOps
- Docker & Docker Compose
- Git for version control

## Features

- User authentication (signup/login)
- Create, read, update, and delete tasks
- Toggle task completion status
- Responsive mobile UI
- Secure API endpoints
- Containerized deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd taskmate
```

2. **Start the application stack**

The entire application can be started with a single command using Docker Compose:

```bash
docker-compose up
```

This will start:
- PostgreSQL database
- Backend API server (port 3000)
- Frontend Expo development server (ports 19000, 19001)

3. **Access the application**

- Backend API will be available at: http://localhost:3000
- Use Expo Go app to run the mobile application

For detailed setup instructions for individual services:
- See [frontend/README.md](./front-end/README.md) for mobile app setup
- See [backend/README.md](./backend/README.md) for API server setup

## Project Structure

```
├── frontend/          # React Native mobile app
├── backend/           # Express.js API server
├── docker-compose.yml # Container orchestration
└── README.md         # This file
```

## License

This project is licensed under the MIT License.