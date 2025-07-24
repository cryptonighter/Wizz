#!/bin/bash

# Wizz Stage One MVP Launch Script

echo "🚀 Launching Wizz Stage One MVP..."

# Check if required directories exist
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
  echo "❌ Error: backend or frontend directory not found"
  exit 1
fi

# Function to check if a port is in use
port_in_use() {
  lsof -i :$1 >/dev/null 2>&1
}

# Check if ports are already in use
if port_in_use 3001; then
  echo "⚠️  Warning: Port 3001 (backend) is already in use"
  echo "   Please stop the process using that port or change the PORT in backend/.env"
fi

if port_in_use 3000; then
  echo "⚠️  Warning: Port 3000 (frontend) is already in use"
  echo "   Please stop the process using that port or change the port in frontend/vite.config.js"
fi

# Start backend server
echo "🔧 Starting backend server..."
cd backend
npm start > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start frontend server
echo "🎨 Starting frontend server..."
cd frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a moment for servers to start
echo "⏳ Waiting for servers to start..."
sleep 10

# Check if servers are running
if kill -0 $BACKEND_PID 2>/dev/null && kill -0 $FRONTEND_PID 2>/dev/null; then
  echo "✅ Wizz Stage One MVP is running!"
  echo "🌐 Frontend: http://localhost:3000"
  echo "🔧 Backend API: http://localhost:3001"
  echo ""
  echo "📖 To stop the servers, run: pkill -f \"npm start\" && pkill -f \"npm run dev\""
  echo "📄 Backend logs: tail -f backend/backend.log"
  echo "🎨 Frontend logs: tail -f frontend/frontend.log"
  echo ""
  echo "💡 Tip: If you're having trouble accessing the frontend, check the frontend logs:"
  echo "   tail -f frontend/frontend.log"
else
  echo "❌ Error: Failed to start one or both servers"
  echo "Check the log files for details:"
  echo "  - backend/backend.log"
  echo "  - frontend/frontend.log"
  echo ""
  echo "To stop any potentially running processes:"
  echo "  pkill -f \"npm start\" && pkill -f \"npm run dev\""
fi