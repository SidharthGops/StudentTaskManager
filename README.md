# Student Task Manager

A full-stack web application to manage student tasks efficiently.

---

## Features

- Add, update, and delete tasks
- Filter tasks by status (Pending, In Progress, Completed)
- Search tasks by title
- MongoDB backend with Node.js + Express
- React frontend with live updates

---

## Project Structure

student-task-manager/
│
├── backend/
│ ├── server.js
│ ├── models/Task.js
│ ├── package.json
│ └── .env # MongoDB connection string (do NOT commit)
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── TaskForm.js
│ │ │ └── TaskList.js
│ │ └── App.js
│ ├── package.json
│ └── public/
│
├── screenshots/ # Include task list, add task, update/delete screenshots
├── README.md
└── .gitignore

yaml
Copy code

---

## Setup Instructions

### 1. Backend

1. Navigate to the backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file with:

ini
Copy code
MONGO_URI=mongodb://127.0.0.1:27017/studentTaskDB
PORT=5000
Replace MONGO_URI with your MongoDB Atlas connection string if not using local MongoDB.

Start the server:

bash
Copy code
npm run dev
Server should run at: http://localhost:5000

2. Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm start
Open the app in your browser at: http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/api/tasks	List all tasks
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id	Update task by ID
DELETE	/api/tasks/:id	Delete task by ID

Screenshots
Task List: screenshots/task-list.png

Add Task: screenshots/add-task.png

Mark Completed: screenshots/task-completed.png

Backend Logs / MongoDB: screenshots/backend-logs.png

Notes
Ensure MongoDB is running locally or via Atlas.

.env files are not committed for security reasons.

This project can be extended with charts, authentication, and inline editing.