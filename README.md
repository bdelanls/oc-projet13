# P13 - Argent Bank

> Use an API for a banking user account with React
> Project 13 of the Openclassrooms Front-end Developer training

This codebase contains the code needed to run the backend and the frontend for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [Immer](https://immerjs.github.io/immer/)

Please make sure you have the right versions and download all required packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

## Instructions

### Backend

The backend repository can be found here: https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API

- Clone the backend repo onto your computer
- Open a terminal window in the cloned project directory
- Run the following commands:

```bash
# Go to the backend repository
cd Project-10-Bank-API

# Install dependencies
npm install

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db
```
Your backend server should now be running at http://localhost:3001 and you will have two users in your MongoDB database!
Populated Database Data

Once you run the populate-db script, you should have two users in your database:
### Tony Stark
- First Name: Tony
- Last Name: Stark
- Email: tony@stark.com
- Password: password123

### Steve Rogers
- First Name: Steve
- Last Name: Rogers
- Email: steve@rogers.com
- Password: password456

### API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Frontend

- Clone this frontend repo onto your computer
- Open a terminal window in the cloned project directory
- Run the following commands:
```bash
# Go to the frontend repository
cd front/

# Install dependencies
npm install

# Start local dev server
npm start
```
Your frontend server should now be running at http://localhost:3000/!

## Project Structure

### The project is divided into several main parts:
- Home Page: Displays promotional content and features.
- Authentication: Users can log in and log out.
- Profile Page: Users can view and edit their profile.
- Transactions: Users can view, add, edit, and delete transactions (Phase 2).

### Tools and Libraries Used
- React: For building the user interface.
- Redux Toolkit: For state management.
- Axios: For making HTTP requests to the backend API.
- Immer: For handling immutable state in Redux.
- React Router: For handling navigation and routing.

### Features
- Responsive Design: The application is fully responsive and works on all device sizes.
- User Authentication: Secure login and logout using JWT tokens.
- Profile Management: Users can view and update their profile information.
- Transactions Management: Users can manage their transactions (view, add, edit, delete).
