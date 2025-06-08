import { useState } from "react";
import API from "../services/apis";
import type { Note } from "../types";

const NoteCard = ({ note }: { note: Note }) => {
  const [currentTheme, setCurrentTheme] = useState(note.theme || "#f0f0f0");

  const handleDelete = async () => {
    await API.delete(`/notes/${note._id}`);
    window.location.reload();
  };

   const handleThemeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    setCurrentTheme(newTheme);
    await API.put(`/notes/${note._id}`, { theme: newTheme });
  };

   return (
    <div
      style={{
        background: currentTheme,
        padding: "1rem",
        borderRadius: "12px",
        width: "220px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#333",
        position: "relative",
      }}
    >
      <h4>{note.title}</h4>
      <p>{note.content}</p>

      {/* Color picker */}
      <input
        type="color"
        value={currentTheme}
        onChange={handleThemeChange}
        title={`Theme: ${currentTheme}`}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          border: "none",
          background: "transparent",
        }}
      />

      <button onClick={handleDelete} style={{ marginTop: "10px" }}>Delete</button>
    </div>
  );
};

export default NoteCard;