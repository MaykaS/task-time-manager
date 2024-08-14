# task-time-manager
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Description
Task-Time-Manager is a full-featured task management application built with the MERN stack. It allows users to create, manage, and track tasks efficiently with features like task categorization, priority setting, and deadline reminders.

### Key Features
- **Task Creation**: Users can create new tasks by providing a title, selecting a category, adding a description, setting a due date, and choosing a priority level. This feature ensures tasks are well-organized and prioritized according to user needs.
- **Task Editing**: Modify existing tasks, including the title, category, description, due date, and priority. This feature allows users to adjust tasks as requirements evolve.
- **Task Deletion**: Permanently delete tasks from your list to maintain a clean and relevant task overview.
- **Mark Task as Completed**: Mark tasks as completed, visually distinguishing them from incomplete tasks. This helps in tracking progress and managing workload effectively.
- **Task Categorization**: Organize tasks into predefined categories, each represented by an icon. This helps users easily identify and manage tasks based on their type or urgency.
- **Deadline Reminder**: Receive reminders 1 hour before the deadline of an uncompleted task. This feature helps users stay on top of their tasks and meet deadlines.
- **User Authentication**: Secure access to the application with user registration and login via email and password. This ensures that all tasks are private and only accessible to the respective user.
- **Task Views**:
  - **List View**: View all tasks in a standard list format, with options to sort or filter tasks based on criteria such as due date, priority, or completion status.
  - **Calendar View**: View tasks on a calendar, with tasks displayed on their respective due dates. Tasks are color-coded based on priority, providing a clear visual overview of upcoming tasks.
- **Database Storage**: All tasks and user information are securely stored in a MongoDB database, ensuring data persistence and accessibility across sessions and devices.

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
- `POST /api/auth/register`: Registers a new user.
- `POST /api/auth/login`: Logs in a user and returns a JWT token.
- `GET /api/tasks`: Retrieves all tasks for the logged-in user.
- `POST /api/tasks`: Creates a new task.
- `PUT /api/tasks/:taskId` : Modify an existing task.
- `DELETE /api/tasks/:taskId`: Delete an existing task.
- `PATCH /api/tasks/:taskId/complete`: Mark an existing task as complete.

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
