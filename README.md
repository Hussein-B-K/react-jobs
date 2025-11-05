# React Jobs

A full CRUD website for finding React developer jobs.

<img src="public/screen.png" />

The **general layout and most naming convention of the project** draw inspiration from the design presented in Traversy Media's React jobs tutorial. However, the underlying implementation, application logic (including the `services` folder and `custom fetch hook`...etc), dark mode functionality and other enhancements/ additions (planned), and other unique features are my original work.

## Project Milestones


This project is a work in progress with the following milestones completed or planned.

- [x] **Unit Testing:** The project now includes unit testing, written with **Vitest & React Testing Library (RTL)**, and is fully integrated with TypeScript.
- [x] **TypeScript Migration:** The entire codebase has been migrated from JavaScript to **TypeScript**, ensuring type safety and improved maintainability. *(Archived: The original Vanilla JS codebase is preserved on the `archive/vanilla-js-original` branch.)*
- [x] **Backend & Data Architecture:** Migrated data access from local `json-server` to a live **Supabase SDK** backend. The application now uses (`useContext`)** for state management for all CRUD operations, ensuring ** data synchronization** across the UI.
- [ ] **Authentication:** Planned implementation of user login and role-based security to protect CRUD operations.
- [ ] **Tech Upgrades:** Planned upgrade to React Router v7 and implementation of Tailwind CSS v4.
- [ ] **UI/UX Enhancements:** Planned addition of a dark mode feature.


## Usage

The project now connects to a live **Supabase** backend for all data access

### Prerequisites

The project now requires standard **Node.js** and **npm** ecosystem. You must configure **Supabase environment variables** (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in your local `.env` file for development.

### Install Dependencies

```bash
npm install
```

### Run the dev server

**Note/** the dev  server is set on port: http://localhost:3000

```bash
npm run dev
```

### Run the Unit test

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```
