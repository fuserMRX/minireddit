# 🚀 MiniReddit

![MiniReddit Logo](public/assets/images/mini-reddit.png)

## A lightweight Reddit clone built with Next.js and Redux

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-9.2.0-purple?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-cyan?style=flat&logo=tailwindcss&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-14.2.1-green?style=flat&logo=cypress&logoColor=white)

## ✨ Features

- 📱 Fully responsive design for all devices
- 🌓 Light and dark mode support
- 📊 View Reddit posts from popular subreddits
- 💬 Browse and view threaded comments
- 🔍 Search functionality
- 🎬 Support for embedded videos
- ⚡ Server and client-side data fetching
- 🧪 Comprehensive test coverage with Cypress

## ⚠️ Deployment Notes

**Important:** Due to Reddit's API restrictions, server-side requests to public Reddit URLs (like `https://www.reddit.com/r/popular.json`) are blocked when deployed to platforms like Vercel or Netlify. This is because Reddit blocks requests from cloud provider IPs.

To work around this limitation, this application:
- Uses client-side fetching in the browser for Reddit data
- Implements Redux for state management
- Avoids server components making direct calls to Reddit's API

If you need to deploy with server-side Reddit API access, consider:
1. Implementing Reddit's OAuth API with authentication
2. Using a proxy service
3. Self-hosting the application

## 🏗️ Architecture

This project uses a **hybrid architecture** that combines the best of server-side rendering and client-side state management:

- **Server Components**: Next.js server components handle the initial page structure and SEO optimization
- **Client Components**: React client components with 'use client' directive manage interactive elements
- **Redux State Management**: Client-side data fetching and state management through Redux
- **API Isolation**: APIs that might be blocked on server-side (like Reddit) are only called from client components

This architecture provides significant benefits:
- ⚡ Better initial page load performance and SEO through server rendering
- 🔄 Improved user experience with client-side data fetching and state management
- 🛡️ Protection against API restrictions like Reddit's blocking of server requests
- 🧩 Clean separation of concerns between server and client code

This pattern can be useful for other projects that need to integrate with external APIs that have similar restrictions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun

### Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
minireddit/
├── app/                  # Next.js app folder
│   ├── (root)/           # Main page routes
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── reddit/           # Reddit-specific components
│   ├── search/           # Search components
│   ├── ui/               # UI components (buttons, etc.)
│
├── cypress/              # Cypress tests
│   ├── e2e/              # End-to-end tests
│   ├── component/        # Component tests
│   └── fixtures/         # Test data
├── lib/                  # Utility functions & libraries
│   └── redux/            # Redux store, slices, and API
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🧪 Testing

This project uses Cypress for both E2E and component testing.

```bash
# Run E2E tests
npm run test:e2e

# Run component tests
npm run test:component

# Run all tests
npm run test

# Open Cypress UI
npm run cypress:open
```

For more details about the test suite, see [cypress/README.md](cypress/README.md).

## 🔧 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) - React framework with server-side rendering
- **Frontend**: [React](https://reactjs.org/) - UI library
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Testing**: [Cypress](https://www.cypress.io/) - E2E and component testing
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) - Form validation
- **Schema Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation

## ✅ Features Implementation

### 🏠 Home Page

- Displays popular posts from Reddit
- Shows subreddit sidebar for navigation
- Supports light/dark mode toggle

### 📰 Reddit Posts

- Displays post title, author, score, and comments count
- Handles different types of content (text, images, videos)
- Shows relative timestamp for posts

### 💬 Comments

- Renders threaded comments with proper indentation
- Supports collapsing/expanding comment threads
- Shows comment author and score

### 📱 Responsive Design

- Mobile-first approach
- Adapts layout for different screen sizes
- Optimized navigation for touch devices
