# Page Pulse

Page Pulse is a modern, production-grade website auditing tool designed as a website performance, structure, and quality inspection system.

This repository holds the Phase 1 implementation, establishing a clean, professional, and standard split monorepo architecture for the frontend and backend.

## Project Structure

The project is structured into two main components:
- **`frontend`**: React client application built with Vite, Tailwind CSS, and Axios.
- **`backend`**: Node.js/Express server app built with Cheerio for HTML parsing and Axios/Native Fetch for HTTP operations.

```text
urlStatusHandler/
├── .gitignore
├── README.md
├── frontend/             # Frontend React app
│   ├── src/
│   │   ├── assets/       # Media assets and styles
│   │   ├── components/   # Shared UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── layouts/      # Page layout wrapper components
│   │   ├── pages/        # View/Page components
│   │   ├── services/     # API request services (Axios client)
│   │   └── utils/        # Generic frontend helper utilities
│   ├── eslint.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── backend/              # Backend Node/Express app
    ├── server.js         # Express server starter entry point
    └── src/
        ├── app.js        # Express app initializer / middleware setup
        ├── config/       # Environment configs & constants
        ├── controllers/  # Request routing logic/controllers
        ├── middleware/   # Custom Express middlewares (logging, errors)
        ├── routes/       # API router configurations
        ├── services/     # Audit & fetch logic services (Cheerio parsing)
        └── utils/        # Generic backend helper utilities
```

## Getting Started

Detailed startup instructions will be added as implementation progresses. For Phase 1:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (with hot-reload):
   ```bash
   npm run dev
   ```
# PagePulse
