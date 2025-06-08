# Notes App

A simple and efficient Notes App built with React, TypeScript, Node.js, and Express. This project allows users to securely create, edit, delete, and organize notes with a modern, responsive UI.

---

## Features

- User authentication (JWT-based)
- Create, edit, delete notes
- Customizable card themes (color picker per note)
- Drag-and-drop note ordering
- Responsive design (mobile & desktop)
- State management with React Context & Hooks
- Error handling and basic validation

---

## UI Creativity Twist

**Chosen Twists:**  
- **Customizable Card Themes:** Users can pick a color for each note card using a color picker. The choice is persisted, so cards retain their look on reload.
- **Interactive Drag-and-Drop Ordering:** Users can reorder notes by dragging cards. The new order is saved and reflected on reload.

**Why these twists?**  
These features make the backend visually engaging and give users more control over how they organize and personalize their notes, which enhances usability and fun.

**Trade-offs & Challenges:**  
- Implementing drag-and-drop required careful state management and backend updates to persist order.
- Ensuring color changes are saved and reflected in real time required additional API logic.
- Balancing UI responsiveness and simplicity while supporting both features.

**Next Steps (with more time):**
- Add accessibility improvements (keyboard navigation, ARIA labels)
- Add note search and filtering
- Add note tags and status (e.g., completed, pending)
- Add a dashboard with note statistics/charts
- Add automated tests and CI/CD pipeline
- Optimize performance for large note collections

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rawanmohameedd/notes-app.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd notes-app
    ```
3. **Install dependencies for both frontend and backend:**
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```

### Running the App

Start both frontend and backend in development mode:
```bash
npm run dev
```
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## Design Notes

- **Frontend:** React + TypeScript + Vite, Tailwind CSS for styling, React Context for auth and notes state, `react-beautiful-dnd` for drag-and-drop.
- **Backend:** Node.js + Express, JWT authentication, file-based storage (JSON), modular controllers and middleware.
- **Error Handling:** User-friendly alerts for failed logins, invalid input, and API errors.
- **State Management:** React Context and hooks for managing authentication and notes.

---

## Folder Structure

```
/frontend   # React app
/backend    # Express API
```