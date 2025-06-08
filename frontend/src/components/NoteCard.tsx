import { useState } from "react";
import API from "../services/apis";
import type { Note } from "../types";
import { BiTrash } from "react-icons/bi";

const NoteCard = ({ note }: { note: Note }) => {
  const [currentTheme, setCurrentTheme] = useState(note.theme || "#fef3c7");

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
    className="flex flex-row justify-between items-center relative p-4 rounded-2xl shadow-md transition-all"
      style={{ backgroundColor: currentTheme }}
    >
      {/* Theme Color Picker */}
      <div className="flex flex-col justify-between items-center mb-2">

      <h4 className="text-lg font-semibold mb-1">{note.title}</h4>
      <p className="text-gray-800 break-words">{note.content}</p>
      </div>
     <div className="flex flex-row justify-between items-center mb-2">
        <input
          type="color"
          value={currentTheme}
          onChange={handleThemeChange}
          title={`Theme: ${currentTheme}`}
          className="w-8 h-8 border rounded-full shadow cursor-pointer"
        />
        <button
          onClick={handleDelete}
          className="flex flex-row space-x-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <BiTrash />
        </button>
      </div>
     


    </div>
  );
};

export default NoteCard;
