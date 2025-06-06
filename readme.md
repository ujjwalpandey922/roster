# Roster Frontend Engineer Assignment

## Overview

This project is a technical assignment for a Frontend Engineer position at Roster. The goal is to build a feature that allows creative talent to add their personal portfolio site, extract structured data from it, and display it within their profile on Roster.

## Features

- Submit a link to an external portfolio site
- Mock API integration to extract and display portfolio data
- Display talent information in two sections:
  - Basic Info (name, summary)
  - Employers/Clients (with related videos and editable details)
- Edit profile functionality
- Add employment details (job title, duration, employment type, contribution summary)

## Tech Stack

- Next.js
- TypeScript
- Tailwind
- Shadcn

## Setup Instructions

1. Clone this repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm run dev` or `yarn dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

See [api-documentation.md](api-documentation.md) for detailed documentation of all required API endpoints including request/response formats.

## Project Structure

next-app/
├── app/
│ ├── [username]/ # Dynamic profile routes
│ ├── api/ # API routes
│ ├── api-documentation/ # API documentation pages
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout component
│ └── page.tsx # Profile page component
├── components/
│ ├── Home/ # Home page components
│ └── profile/ # Profile-related components
├── contexts/
│ ├── ProfileContext.tsx # Profile state management
│ └── ThemeProvider.tsx # Theme management context
├── docs/
│ └── api-documentation.md # API documentation
├── lib/
│ ├── mock-data.ts # Mock data for development
│ ├── types.ts # TypeScript type definitions
│ ├── utils.ts # Utility functions
│ └── uuid.ts # UUID generation utilities
├── node_modules/ # Project dependencies
├── public/ # Static assets
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore rules
├── components.json # Component registry configuration
├── next-env.d.ts # Next.js environment types
├── next.config.js # Next.js configuration
├── package-lock.json # Dependency lockfile
├── package.json # Project manifest
├── postcss.config.js # PostCSS configuration
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration

### Key Directories Explained:

1. **App Router** (`/app`):

   - Dynamic `[username]` route for individual profiles
   - Contains page layouts and API routes
   - Organized component structure

2. **State Management** (`/contexts`):

   - `ProfileContext.tsx`: Manages global profile state
   - `ThemeProvider.tsx`: Handles theming across application

3. **Supporting Files** (`/lib`):

   - Type definitions and mock data
   - Utility functions and helpers
   - UUID generation for unique IDs

4. **Configuration**:

   - Next.js, TypeScript, and Tailwind configs
   - ESLint for code quality
   - PostCSS for CSS processing

5. **Documentation**:
   - API documentation in Markdown format
   - Project README

## Bonus Thought Exercise

For handling 10,000+ portfolios with real-time job matching, I would consider:

1. Implementing virtualized lists for performance
2. Adding robust search/filter functionality
3. Using a more sophisticated state management solution
4. Implementing caching strategies
5. Adding lazy loading for media content

## Evaluation Criteria Addressed

- **Code clarity**: Components are modular and well-organized
- **Architecture**: Reusable components with clear separation of concerns
- **Scalability**: Considerations documented for larger scale
- **AI usage**: Transparent documentation of AI-assisted development
- **Documentation**: Comprehensive README and supporting docs
