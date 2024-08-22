# task-time-manager
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Description
Task-Time-Manager is a full-featured task management application built with the MERN stack. It allows users to create, manage, and track tasks efficiently with features like task categorization, priority setting, and deadline reminders.

### Key Features
<ol>
  <li><strong>Task Creation:</strong> Users can create new tasks by providing a title, selecting a category, adding a description, setting a due date, and choosing a priority level.</li>
  <li><strong>Tasks Retrieving:</strong> Users can view all the tasks he has.</li>
  <li><strong>Task Retrieving:</strong> Users can view a specific task from their list.</li>
  <li><strong>Task Editing:</strong> Users can modify the details of existing tasks, including title, category, description, due date, and priority.</li>
  <li><strong>Task Deletion:</strong> Users can permanently delete tasks from their list.</li>
<li><strong>Mark Task as Completed:</strong> Users can mark tasks as completed, which will visually distinguish them from incomplete tasks.</li>
  <li><strong>Task Categorization:</strong> Tasks can be organized into predefined categories, each represented by an icon, to help users easily identify them.</li>
<li><strong>Deadline Reminder:</strong> Reminder will show 1 hour prior to the uncompleted task deadline. - BONUS FEATURE </li>
  <li><strong>User Authentication:</strong> Users must register and log in using their email and password to access the application.</li>
  <li><strong>Task Views:</strong> 
    <ol>
      <li><strong>List View:</strong> Users can see all their tasks in a standard list format, with options to sort or filter tasks.</li>
      <li><strong>Calendar View:</strong> Users can view tasks on a calendar, with tasks displayed on their respective due dates.</li>
    </ol>
  </li>
  <li><strong>Database Storage:</strong> All tasks and user information are stored in a MongoDB database, ensuring data persistence across sessions.</li>
 <li><strong> Log Out:</strong> Users can log out of the application.</li>
</ol>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Requirements Document](#requirements-document)
- [Block Diagram](#block-diagram)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- Docker (optional for containerized setup)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/username/task-time-manager.git
    cd task-time-manager
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and configure it based on `.env.example`.

4. Start the development server:
    ```bash
    npm start
    ```

## Usage
After starting the server, open your browser and go to `http://localhost:3000`. You will be greeted with the login screen.

### Screenshots
~~![Login Screen](path/to/login-screenshot.png)~~
~~![Dashboard](path/to/dashboard-screenshot.png)~~

## Architecture
Task-Time-Manager follows a traditional MERN stack architecture. The frontend is built with React, which communicates with the backend API built on Node.js and Express. MongoDB is used as the database.

### Block Diagram
~~![Architecture Diagram](path/to/architecture-diagram.png)~~
You can view the detailed block diagram [here](https://github.com/MaykaS/task-time-manager/wiki/Block-Diagram).

## Requirements Document
A comprehensive requirements document outlining the features, user stories, and acceptance criteria for the Task-Time-Manager project can be found [here](https://github.com/MaykaS/task-time-manager/wiki/Requirement-Document).

## API Documentation
The API provides endpoints for user management and task operations.

### Authentication
All endpoints require a valid JWT token.

### Endpoints
- `POST /register`: Registers a new user. (No token needed)
- `POST /login`: Logs in a user and returns a JWT token. (No token needed)
- `POST /tasks`: Creates a new task. (Token required)
- `GET /tasks`: Retrieves all tasks for the logged-in user. (Token required)
- `GET /tasks/:taskId`: Retrieves a specific task for the logged-in user. (Token required)
- `PUT /tasks/:taskId` : Modify an existing task. (Token required)
- `DELETE /tasks/:taskId`: Delete an existing task. (Token required)
- `PATCH /tasks/:taskId/complete`: Mark an existing task as complete. (Token required)
- `POST /logout`: Logs out the user by invalidating the token or clearing the session. (Token required)

~~For detailed API documentation, please refer to the [API Docs](link-to-swagger-or-postman-collection).~~

## Testing
Unit and integration tests are written using Jest. To run the tests, use the following command:

```bash
npm test
```

### Test Coverage
~~After running `npm test -- --coverage`, open the `coverage/lcov-report/index.html` file in your browser to see the full coverage report.~~

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
**Maya Sagalin**  
[LinkedIn](https://www.linkedin.com/in/maya-sagalin-/) | [GitHub](https://github.com/MaykaS) | [Email](mailto:mayasag10@gmail.com)
