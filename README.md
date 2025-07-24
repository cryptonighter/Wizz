# Wizz - Stage One MVP

Wizz is an intelligent companion designed to transform professional development from a passive chore into a dynamic, proactive feedback loop.

## 🚀 Quick Start

To launch the Wizz Stage One MVP:

```bash
./launch.sh
```

This will start both the backend and frontend servers.

## 🌐 Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

```
Wizz/
├── backend/          # Node.js/Fastify server
├── frontend/         # React/Vite client
├── database/         # Database schema
├── docs/             # Documentation
└── launch.sh         # Launch script
```

## 🧪 Testing

Run backend tests:
```bash
cd backend && npm test
```

## 🛑 Stopping the Servers

To stop the servers:
```bash
pkill -f "npm start" && pkill -f "npm run dev"
```

Or check the process IDs and kill them manually:
```bash
ps aux | grep "npm start\|npm run dev"
kill -9 <backend_pid> <frontend_pid>
```

## 📖 Documentation

- [Project Structure](docs/project-structure.md)
- [Authentication Progress](docs/authentication-progress.md)
- [Compass Progress](docs/compass-progress.md)
- [Progress Summary](docs/progress-summary.md)

## 🛠️ Technologies

- **Backend**: Node.js, Fastify
- **Frontend**: React, Vite
- **Database**: PostgreSQL (schema defined)
- **Authentication**: Passphrase-based access

## ✨ Features Implemented

1. **Passphrase-based Access System**
2. **User Registration and Login**
3. **Compass Creation Wizard**
   - Superpower discovery with explore/commit flow
   - Multi-step compass creation
4. **Quest Management**
   - Create and manage quests
   - Check-in system for reflection
5. **Dashboard**
   - Visual representation of compass
   - Quest tracking
6. **Notification Service (V1)**
   - Scheduled check-in prompts

## � troubleshoot Troubleshooting

### Frontend Not Loading

If you're getting `ERR_CONNECTION_REFUSED` when trying to access http://localhost:3000:

1. Check the frontend logs:
   ```bash
   tail -f frontend/frontend.log
   ```

2. Make sure no other process is using port 3000:
   ```bash
   lsof -i :3000
   ```

3. If another process is using port 3000, either stop that process or change the port in `frontend/vite.config.js`

4. Try rebuilding the frontend:
   ```bash
   cd frontend && npm run build
   ```

### Backend Issues

1. Check the backend logs:
   ```bash
   tail -f backend/backend.log
   ```

2. Make sure no other process is using port 3001:
   ```bash
   lsof -i :3001
   ```

### General Issues

1. Make sure all dependencies are installed:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Restart both servers:
   ```bash
   pkill -f "npm start" && pkill -f "npm run dev"
   ./launch.sh
   ```

This MVP provides a complete foundation for Stage One: The Personal Alignment Engine.