import { useEffect, useState } from "react";
import type { Note } from "../types";
import NoteCard from "../components/NoteCard";
import Navbar from "../components/Navbar";
import API from "../services/apis";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { DropResult } from "react-beautiful-dnd";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "", theme: "#fef3c7" }); // default to soft yellow

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    if (!newNote.title || !newNote.content) {
      alert("Title and Content are required");
      return;
    }
    const res = await API.post("/notes", newNote);
    setNewNote({ title: "", content: "", theme: "#fef3c7" });
    setNotes((prev) => [...prev, res.data]);
  };

  const handleDelete = async (id: string) => {
    await API.delete(`/notes/${id}`);
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);

    // Update the order of all notes
    const updatedNotes = items.map((note, index) => ({
      ...note,
      order: index
    }));

    // Save the new order to the backend
    try {
      await Promise.all(
        updatedNotes.map(note => 
          API.put(`/notes/${note.id}`, { order: note.order })
        )
      );
    } catch (error) {
      console.error('Failed to update note order:', error);
      // Optionally revert the order in the UI if the save fails
      fetchNotes();
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-1 text-black">Your Notes</h2>
        <p className="text-gray-600 mb-6">Organize your thoughts and ideas</p>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4 text-black">Create New Note</h3>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-black">Title</label>
              <input
                className="w-full text-black border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="Enter note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-black">Content</label>
              <input
                className="w-full text-black border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="Enter note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="font-medium text-black">Theme Color:</label>
              <input
                type="color"
                value={newNote.theme}
                onChange={(e) => setNewNote({ ...newNote, theme: e.target.value })}
                className="w-10 h-10 rounded-full border shadow-md"
              />
            </div>

            <button
              onClick={handleCreate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              + Add Note
            </button>
          </div>
        </div>

        <div className="notes-container">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="notes">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-6"
                >
                  {notes.map((note, index) => (
                    <NoteCard key={note.id} note={note} index={index} onDelete={handleDelete} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
