# Wizz Project Structure

## Overview

Wizz is structured as a monorepo with separate backend and frontend directories:

```
Wizz/
├── backend/          # Node.js/Fastify server
├── frontend/         # React/Vite client
├── database/         # Database schema and migrations
├── docs/             # Documentation
├── package.json      # Root configuration
└── README.md         # Project overview
```

## Backend

The backend is built with Node.js and Fastify. It provides REST APIs for all Wizz functionality.

### Structure

```
backend/
├── src/              # Source code
│   ├── server.js     # Fastify server setup
│   └── index.js      # Entry point
├── tests/            # Test files
└── package.json      # Backend dependencies
```

## Frontend

The frontend is built with React and Vite. It provides the user interface for Wizz.

### Structure

```
frontend/
├── src/              # Source code
│   ├── App.jsx       # Main App component
│   ├── App.css       # App styles
│   └── main.jsx      # Entry point
├── index.html        # HTML template
└── package.json      # Frontend dependencies
```

## Database

Database schema and migrations are stored in the database directory.

## Development

To start both the backend and frontend in development mode:

```bash
npm run dev
```

This will start the backend on port 3001 and the frontend on port 3000.