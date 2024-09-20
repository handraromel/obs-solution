# OBS Solution

OBS User Management is a React-based web application for managing and editing users. It provides a simple interface for adding, editing, and deleting user information.

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI) v6
- Redux Toolkit
- Express.js (for backend server)

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14 or later)
- pnpm (v6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/handraromel/obs-solution.git
   cd obs-solution
   ```

2. Install the dependencies:
   ```
   pnpm install
   ```

## Running the Application Locally

To run the application in development mode, follow these steps:

1. Start the backend server:

   ```
   pnpm run server
   ```

   This will start the Express.js server on port 30002.

2. In a new terminal, start the React development server:

   ```
   pnpm run start
   ```

   This will start the React application on port 3000.

3. To run both the backend and frontend concurrently, you can use:

   ```
   pnpm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Available Scripts

In the project directory, you can also run these commands:

- `pnpm run start`: Runs the app in development mode.
- `pnpm run build`: Builds the app for production to the `build` folder.
- `pnpm run test`: Launches the test runner in interactive watch mode.
- `pnpm run lint`: Runs ESLint to check for code quality issues.
- `pnpm run lint:fix`: Runs ESLint and attempts to fix code quality issues automatically.
- `pnpm run format`: Runs Prettier to format all supported files.
