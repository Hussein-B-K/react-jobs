# React Jobs

A full CRUD website for finding React developer jobs.

<img src="public/screen.png" />

The **general layout and most naming convention of the project** draw inspiration from the design presented in Traversy Media's React jobs tutorial. However, the underlying implementation, application logic (including the `services` folder and `custom fetch hook`...etc), dark mode functionality and other enhancements/ additions (planned), and other unique features are my original work.

## Project Milestones


This project is a work in progress with the following milestones completed or planned.


- [x] **Unit Testing:** The project now includes unit testing, written with **Vitest && React Testing Library (RTL)**.

- [ ] **TypeScript Migration:** Planned upgrade to TypeScript

- [ ] **Tech Upgrades:** Planned upgrade to React Router v7 and implementation of Tailwind CSS v4.

- [ ] **UI/UX Enhancements:** Planned addition of a dark mode feature.


## Usage

This project uses JSON-Server for a mock backend.

### Install Dependencies

```bash
npm install
```

### Run JSON Server

**Note/** The server is set on port: http://localhost:8000

```bash
npm run server
```

### Run the dev server

**Note/** the dev  server is set on port: http://localhost:3000

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```
