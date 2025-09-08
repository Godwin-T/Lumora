# Lumora Frontend

This directory contains the client-side code for the Lumora project. The client is responsible for the user interface and interacts with the backend API to provide a seamless user experience.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Overview

The Lumora client is a modern web application built to provide an interactive and responsive interface for users. It communicates with the backend to fetch and display data, handle authentication, and manage user interactions.

## Project Structure

```
client/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, fonts, etc.
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── lib/          # API calls and business logic
│   ├── App.jsx       # Main app component
│   ├── index.jsx     # Entry point
│   └── ...           # Other folders/files
├── package.json      # Project metadata and scripts
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Godwin-T/Lumora
   cd Lumora
   ```
2. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
3. Running the Development Server
   ```bash
   cd client
   npm run dev
   ```
The app will run locally at `http://localhost:5173`.

## Available Scripts

- `dev`: Runs the app in development mode.
- `build`: Builds the app for production.

## Environment Variables

Create a `.env` file in the root of the client directory to configure environment variables (e.g., API endpoints):

```
VITE_API_URL=<api_url>
```

## License

This project is licensed under the MIT License.

---

For any questions or issues, please contact the project maintainers.
