# TaskFlow — Backend (Server)

The backend API for TaskFlow, built with Node.js, Express, and MongoDB.

## Features
- RESTful API for CRUD operations on TODO items.
- MongoDB persistence using Mongoose.
- CORS enabled for frontend communication.
- Environment variable support via `dotenv`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO item |
| PUT | `/api/todos/:id` | Update a TODO item |
| PATCH | `/api/todos/:id/done` | Toggle the done status |
| DELETE | `/api/todos/:id` | Delete a TODO item |

## Getting Started

### Prerequisites
- Node.js
- MongoDB (MongoDB Atlas)

### Installation
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env` file in the `server` directory (one is provided by default) and set your environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### MongoDB Atlas Connection Notes
- **MongoDB Atlas**: Use your cluster's connection string (e.g., `mongodb+srv://<user>:<pass>@cluster.xxx.mongodb.net/todos`). Ensure you have whitelisted your IP address in the Atlas dashboard.

### Running the Server
Start the server in development mode (with nodemon):
```bash
npm run dev
```
Start in production mode:
```bash
npm start
```
The server will run at [http://localhost:5000/](http://localhost:5000/).

## Assumptions & Limitations
- **Authentication**: No authentication or authorization is implemented.
- **Data Validation**: Basic validation for required fields (title) is implemented.
- **Concurrency**: Basic error handling is provided, but no advanced locking mechanisms are in place for concurrent edits.
