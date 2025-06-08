import { Response } from "express";
import Note from "../models/notes";
import { AuthRequest } from "../middleware/auth";

export const getNotes = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const notes = await Note.find({ userId: req.user.id }).sort({ order: 1 });
  res.json(notes);
};

export const createNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const { title, content, theme, status } = req.body;
  
  // Get the highest order value
  const lastNote = await Note.findOne({ userId: req.user.id }).sort({ order: -1 });
  const order = lastNote ? lastNote.order + 1 : 0;
  
  const note = new Note({ title, content, theme, status, userId: req.user.id, order });
  await note.save();
  res.json(note);
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    res.status(404).json({ msg: "Note not found" });
    return;
  }
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    res.status(404).json({ msg: "Note not found" });
    return;
  }
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
}; 