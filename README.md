# PagePulse — Modern Website Auditor

PagePulse is a modern, production-grade web application that audits any public HTML webpage to extract critical SEO, structural, and performance metrics. Designed as a training task for the Digital Heroes Internship, PagePulse delivers high-quality SEO analytics through an elegant, interactive dashboard.

---

## Features

- **Automated Web Page Auditing**: Enter any valid `http:` or `https:` URL to fetch and audit page content dynamically.
- **Critical SEO Metric Extraction**:
  - Extracts the page title and meta description (with OpenGraph fallbacks).
  - Counts H1 headers to evaluate semantic outline.
  - Counts total images and identifies those missing `alt` attributes.
  - Calculates approximate body word count, ignoring layout nodes and code blocks.
- **Latency & HTTP Status Metrics**: Measures exact server response latency (`performance.now()`) and captures target website status.
- **Interactive dashboard**:
  - Live animated number counters and professional loading skeletons.
  - Contextual tooltip definitions explaining the purpose of each metric.
  - Export capabilities: download reports as JSON files or copy them directly to the clipboard.
- **Advanced Theme Switcher**: Full Dark/Light mode support syncing automatically with local storage and system user preferences.
- **Graceful Error Resilience**: Maps DNS, connection refused/reset, redirect loops, timeouts, and non-HTML contents into user-friendly notifications.

---

## Tech Stack

- **Frontend**: React (v18), Vite, Tailwind CSS (for styling and dark mode), Axios (for client requests).
- **Backend**: Node.js, Express, Cheerio (for high-speed DOM parsing), Jest (for automated testing).

---

## Folder Structure

The project follows a modular, decoupled monorepo architecture:

```text
urlStatusHandler/
├── frontend/                     # React Client Application
│   ├── public/                   # Static assets (Favicon, etc.)
│   ├── src/
│   │   ├── components/           # UI Elements (Button, Card, Form, etc.)
│   │   ├── context/              # Context Providers (ThemeContext)
│   │   ├── hooks/                # Custom React Hooks (useAudit, useToast)
│   │   ├── services/             # Axios API client setup (api.js, auditService.js)
│   │   └── utils/                # Utility modules (exportUtils.js)
│   ├── tailwind.config.js        # Tailwind CSS styling tokens
│   └── vite.config.js            # Vite configuration
│
└── backend/                      # Express API Application
    ├── server.js                 # HTTP Server entry point
    ├── src/
    │   ├── app.js                # Express app setup and middleware routing
    │   ├── controllers/          # Request handler functions
    │   ├── routes/               # API Router configuration
    │   ├── services/             # Business Logic (Fetch & response handling)
    │   └── utils/                # Helper utilities (isValidUrl, htmlParser)
    └── package.json              # Backend dependencies and test scripts
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Step 1: Clone and install backend dependencies
Navigate to the `backend` folder and install packages:
```bash
cd backend
npm install
```

### Step 2: Install frontend dependencies
Navigate to the `frontend` folder and install packages:
```bash
cd ../frontend
npm install
```

---

## Running the Application

### Running Backend (Development)
From the `backend` directory, run:
```bash
npm run dev
```
By default, the backend server will launch at `http://localhost:5050`.

### Running Backend Unit Tests
To execute Jest automated tests for the HTML parsing logic, run:
```bash
npm run test
```

### Running Frontend (Development)
From the `frontend` directory, run:
```bash
npm run dev
```
The React development server will start at `http://localhost:3000`.

---

## Environment Variables

### Development Environment

**Backend (`backend/.env`):**
```env
PORT=5050
NODE_ENV=development
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5050/api
```

### Production Environment

**Frontend (`frontend/.env.production`):**
```env
VITE_API_URL=https://pagepulse-xutb.onrender.com/api
```
*(Point the client to your deployed backend API URL).*

---

## API Contract

All requests to the backend server are grouped under the `/api` prefix.

### POST /api/audit
Initiates a new audit scan on a user-submitted URL.

#### Request Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "url": "https://example.com"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "status": 200,
  "responseTime": 142,
  "title": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples in documents.",
  "h1Count": 1,
  "totalImages": 0,
  "imagesMissingAlt": 0,
  "wordCount": 125
}
```

#### Field Schema Explanation
- **`success`** (`boolean`): Indicates whether the server successfully parsed the target URL without breaking errors.
- **`status`** (`number`): The HTTP status code returned by the target host (e.g., `200`, `404`, `500`).
- **`responseTime`** (`number`): The elapsed time in milliseconds taken to perform the fetch.
- **`title`** (`string`): Text content parsed from the page's HTML `<title>` tag.
- **`metaDescription`** (`string`): The description parsed from `<meta name="description">` or fallback OpenGraph tags.
- **`h1Count`** (`number`): The count of primary semantic headers (`<h1>` tags) detected.
- **`totalImages`** (`number`): The total number of `<img>` tags found inside the document structure.
- **`imagesMissingAlt`** (`number`): The number of `<img>` tags missing an `alt` attribute or containing an empty `alt=""` value.
- **`wordCount`** (`number`): Approximate count of body text words, excluding script tag content, inline styles, vectors, and canvases.

#### Error Responses
- **`400 Bad Request`**: Returned when the requested URL is empty, missing, or syntactically invalid (e.g., protocols other than `http:` or `https:`).
  ```json
  {
    "success": false,
    "message": "Invalid URL provided. Please supply a complete address (e.g., https://example.com)"
  }
  ```
- **`400 Bad Request` (Non-HTML content)**: Returned when the target URL resolves to an unsupported MIME type (e.g., a PDF document, video, or raw image file).
  ```json
  {
    "success": false,
    "message": "Rejection: Non-HTML content type returned by target URL"
  }
  ```
- **`502 Bad Gateway`**: Returned for remote server network issues, such as invalid SSL configurations, DNS lookup failures (`ENOTFOUND`), connection rejection (`ECONNREFUSED`), or redirect loops.
  ```json
  {
    "success": false,
    "message": "DNS failure: Hostname could not be resolved"
  }
  ```
- **`504 Gateway Timeout`**: Returned if the target website takes longer than 10 seconds to respond.
  ```json
  {
    "success": false,
    "message": "Request timeout: Target website took too long to respond (limit: 10s)"
  }
  ```

---

## Deployment

### Frontend: Vercel
1. Upload code to a connected GitHub repository.
2. Link the repository to your Vercel Dashboard.
3. In **Settings -> Environment Variables**, configure `VITE_API_URL` with your production API URL (e.g., `https://pagepulse-xutb.onrender.com/api`).
4. Trigger the deployment.

### Backend: Render
1. Create a Web Service on Render pointing to your backend subfolder.
2. Set the build command to `npm install` and start command to `npm start`.
3. In **Environment Settings**, specify `PORT` (e.g. `5000` or `5050`) and set `NODE_ENV` to `production`.
4. Render automatically configures SSL/TLS certificates and exposes your public URL.

---

## Design Decisions

### 1. Why Express?
Express is a lightweight, unopinionated routing framework for Node.js. It allows us to set up API routes quickly with minimal overhead, while making it easy to wire up global custom middleware for structured JSON error handling and CORS setups.

### 2. Why Cheerio for HTML Parsing?
Unlike headless browser tools (such as Puppeteer) which require downloading and running a heavy chromium browser binary (often introducing 10-30s execution overhead and massive memory consumption), Cheerio is a fast jQuery-style parsing engine. It operates directly on raw HTML strings in-memory, resolving scraping audits under 200 milliseconds.

### 3. Why Client-Side Axios Request Deduplication?
To ensure the best user experience and protect server bandwidth, our custom `runAudit` hook integrates an `AbortController`. If a user clicks the "Analyze" button multiple times, any previous pending requests are automatically canceled on the client, preventing redundant concurrent database/server calls.

### 4. Why Environment-Driven Configuration?
Keeping backend endpoints decoupled using `import.meta.env.VITE_API_URL` ensures that the same code artifact compiles dynamically for local debugging and cloud deployment without manual hardcoding, eliminating the risk of leaking localhost references to production.
