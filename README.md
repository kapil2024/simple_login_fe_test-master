# Project Setup and Assignment Guide

Welcome! This guide will help you set up the project on your local machine and walk you through a simple assignment. This is designed for new hires to get familiar with the codebase, development workflow, and basic functionality of the application.

## Prerequisites

Make sure you have the following tools installed on your machine:

- **Node.js** (v14 or above)
- **Yarn** (latest version)
- **Docker** (with Docker Compose)

## Project Setup

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/[some_test_repository].git
cd some_test_repository
```

### 2. Install Dependencies

Navigate to the api and ui directories and install the necessary dependencies using Yarn:

```bash
# For the API
cd api
yarn install

# For the UI
cd ui
yarn install
```

### 3. Run PostgreSQL in Docker

We use Docker to run a PostgreSQL instance for the project. You can start it by running:

```bash
docker-compose up -d
```

This command will pull the PostgreSQL Docker image (if not already available) and start a container in detached mode.

### 4. Run the Application

With the database up and running, you can now start both the API and UI:

```bash
# Start the API
cd api
yarn dev

# Start the UI
cd ui
yarn dev
```

The API should be accessible at http://localhost:3000 and the UI at http://localhost:8080. Ports may vary based on your local configuration.


## Assignment

### Task Overview

Your task is to extend the application by creating a simple login and signup page with the following requirements:

1. **Sign-Up Page**:
    - Users should be able to create a new account.
    - After a successful sign-up, redirect the user to an empty dashboard.

2. **Login Page**:
    - Users should be able to log in with their credentials.
    - After a successful login, redirect the user to an empty dashboard.

### Instructions

1. **Create Sign-Up and Login Pages**:
    - Implement these pages in the UI.
    - Add form validation for email and password fields.

2. **Set Up API Endpoints**:
    - Create necessary API endpoints in the `api` project for user registration and authentication.
    - Ensure that passwords are securely hashed before saving to the database.

3. **Connect the UI to the API**:
    - Use Axios or Fetch API to send HTTP requests from the UI to the API for login and sign-up.
    - Handle responses and errors appropriately.

4. **Redirection to Dashboard**:
    - After successful login or sign-up, redirect users to the `/dashboard` route.
    - The dashboard can be a placeholder page with a simple welcome message.

### Submission

Once you’ve completed the assignment:

1. **Commit your changes** to your repository.
2. **Push the branch** to the remote repository.
3. Ping us to schedule an interview where we will review your work.

We look forward to seeing your implementation!
