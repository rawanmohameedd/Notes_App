import API from "../services/apis";
import type { Note } from "../types";

const NoteCard = ({ note }: { note: Note }) => {
  const handleDelete = async () => {
    await API.delete(`/notes/${note._id}`);
    window.location.reload();
  };

  return (
    <div style={{ background: note.theme || "#f0f0f0", padding: "1rem", borderRadius: "8px", width: "200px" }}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteCard;
