import { useState } from "react";
import API from "../services/apis";
import type { Note } from "../types";
import { BiTrash } from "react-icons/bi";
import { Draggable } from "react-beautiful-dnd";
import { BsGripVertical } from "react-icons/bs";

const NoteCard = ({ note, index, onDelete }: { note: Note; index: number; onDelete: (id: string) => void }) => {
  const [currentTheme, setCurrentTheme] = useState(note.theme || "#fef3c7");

  const handleDelete = async () => {
    await onDelete(note.id);
  };

  const handleThemeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    setCurrentTheme(newTheme);
    await API.put(`/notes/${note.id}`, { theme: newTheme });
  };

  return (
    <Draggable draggableId={note.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-row justify-between items-center relative p-4 rounded-2xl shadow-md transition-all ${
            snapshot.isDragging ? "shadow-lg scale-105" : ""
          }`}
          style={{
            backgroundColor: currentTheme,
            ...provided.draggableProps.style,
          }}
        >
          {/* Drag Handle */}
          <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
            <BsGripVertical className="text-gray-600 text-xl" />
          </div>

          {/* Note Content */}
          <div className="flex flex-col justify-between items-center mb-2 flex-grow">
            <h4 className="text-lg font-semibold mb-1">{note.title}</h4>
            <p className="text-gray-800 break-words">{note.content}</p>
          </div>

          {/* Controls */}
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
              className="flex flex-row space-x-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition ml-2"
            >
              <BiTrash />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default NoteCard;
