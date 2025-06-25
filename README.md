# Meeting Calendar Frontend

A modern web application for managing meetings, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It integrates with the [Meeting Calendar API backend](https://github.com/danielwennstrom/MeetingCalendarAPI-workshop) to provide a complete meeting scheduling and user management experience. Intended as a student project.

---

## Features

-  **User Authentication**
  - JWT-based login and registration
  - Role-based access (user vs admin)

-  **User Management**
  - Admins can edit user details
  - Password rules enforced during registration

-  **Calendar View**
  - Monthly view with meeting markers
  - Highlights today, selected day, and meetings

-  **Meeting Management**
  - Create and view meetings
  - Meetings must be in the present or future

-  **Tailwind CSS UI**
  - Clean, responsive interface
  - Reusable components and forms

---

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [date-fns](https://date-fns.org/)
- [Axios](https://axios-http.com/)

---

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/danielwennstrom/MeetingCalendar-workshop.git
cd MeetingCalendar-workshop

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Frontend will run at:  
`http://localhost:5173`

Make sure the backend is running at `http://localhost:8080`.

---

## Default Admin Credentials (for local testing)

```
Username: admin  
Password: L!Bcu4:EHXY;i#2
```

> These credentials are available via the backend seed data.

---

## Project Structure

```
src/
├── components/         # Shared and reusable components
├── enums/              # Enum definitions (e.g. MeetingLevel)
├── hooks/              # Custom React hooks
├── pages/              # Route views (e.g. Calendar, Login)
├── routes/             # Route config and layout
├── types/              # Shared types/interfaces
├── utils/              # Utility functions
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── ...
```

---

## Validation Rules

- Passwords must include:
  - 1 digit
  - 1 lowercase + 1 uppercase letter
  - 1 special character
  - No spaces
  - 8–16 characters

Handled by `react-hook-form` + RegEx.

---

## API Integration

The frontend is designed to integrate with the [MeetingCalendarAPI-workshop](https://github.com/danielwennstrom/MeetingCalendarAPI-workshop):

- Uses JWTs for secure requests
- Includes token in `Authorization` headers
- Fetches meetings per month via API

---