import { useEffect, useState } from "react";
import type { Note } from "../types";
import NoteCard from "../components/NoteCard";
import Navbar from "../components/Navbar";
import API from "../services/apis";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async () => {
    const res = await API.post("/notes", { ...newNote });
    setNewNote({ title: "", content: "" });
    setNotes((prev) => [...prev, res.data]);
  };

  return (
    <div>
      <Navbar />
      <h2>Your Notes</h2>
      <input placeholder="Title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
      <input placeholder="Content" value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
      <button onClick={handleCreate}>Add Note</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
