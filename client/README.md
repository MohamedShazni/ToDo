# TaskFlow — Frontend (Client)

The frontend for TaskFlow, a clean and elegant TODO application built with React and Tailwind CSS.

## Features
- **View Tasks**: Display a list of all TODO items.
- **Create Task**: Add new tasks with a title and optional description.
- **Edit Task**: Update the title and/or description of existing tasks.
- **Toggle Done**: Mark tasks as completed or pending.
- **Delete Task**: Remove tasks from the list.
- **Progress Tracking**: Real-time progress bar and task counts.

## Tech Stack
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS v3
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- NPM or Yarn

### Installation
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:5173/](http://localhost:5173/).

## Assumptions & Limitations
- **Backend Connection**: Assumes the backend API is running at `http://localhost:5000`.
- **Authentication**: No user authentication is implemented as per the initial requirements. All tasks are shared/global.
- **State Management**: Uses React's built-in `useState` and `useEffect` hooks for simplicity.
- **Responsiveness**: Optimized for desktop and tablet views.
