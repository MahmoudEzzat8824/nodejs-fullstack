# Task Manager App

A full-stack task management application with user authentication, built with React, Node.js, Express, and MongoDB.

## Features

- User signup/login
- Create, edit, and delete tasks
- Set priority levels and due dates
- Filter tasks by status
- View task statistics

## Run Locally

### Prerequisites

- Docker and Docker Compose installed on your machine

### Steps

1. Clone the repository:
```bash
git clone https://github.com/mahmoudezzat8824/nodejs-fullstack.git
cd nodejs-fullstack
```

2. Start the application:
```bash
docker compose up --build -d
```

3. Open your browser and go to:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000

4. To stop the application:
```bash
docker compose down
```

That's it! The app is now running on your machine.