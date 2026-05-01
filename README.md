# TaskFlow — Full-Stack TODO App

A clean, responsive, and functional TODO application featuring a React frontend and a Node.js/Express backend.

## Directory Structure
```
hiring-fullstack-todo/
├── client/          # React frontend (Vite + Tailwind CSS)
│   ├── README.md    # Frontend instructions
│   └── ...
├── server/          # Node.js backend (Express + Mongoose)
│   ├── README.md    # Backend instructions
│   └── ...
└── README.md        # This file
```

## Quick Start

### 1. Set up the Backend
```bash
cd server
npm install
# Update .env with your MONGO_URI
npm run dev
```

### 2. Set up the Frontend
```bash
cd client
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to use the app.

## Project Overview
This project was built to demonstrate full-stack development capabilities, covering:
- **Frontend**: Component-based architecture, state management, and modern styling with Tailwind CSS.
- **Backend**: RESTful API design, database integration with MongoDB, and error handling.
- **Full-Stack**: End-to-end integration between the client and server via HTTP.
