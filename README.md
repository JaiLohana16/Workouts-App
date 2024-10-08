# Workouts App

This is a **Workouts App** built using the MERN stack (MongoDB, Express, React, Node.js). The app includes a signup and login functionality, allowing users to manage their own workouts. Users can add, edit, delete, and view their workouts. All user data is protected and secured using JWT (JSON Web Tokens), and each user's workouts are private and accessible only to them.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Protected Routes**: Only authenticated users can access their workout information.
- **Workout Management**: Users can add, edit, delete, and view their workouts.
- **JWT-based Authentication**: Secure routes and user data using JSON Web Tokens.
- **Personalized Workouts**: Each user can only see and manage their own workouts.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)

## How It Works

1. **Sign Up & Login**:
   - Users can create an account or log in if they already have one.
   - Upon successful login, a JWT token is issued, which is used to authenticate the user for protected routes.

2. **Workouts**:
   - After logging in, users can manage their workouts. They can:
     - **Add** a new workout.
     - **Edit** an existing workout.
     - **Delete** workouts they no longer need.
     - **View** all their workouts in a personalized section.

3. **Logout**:
   - Users can log out, invalidating their session.

