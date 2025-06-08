import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { storage } from "../storage";

export const getNotes = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const notes = await storage.getNotesByUserId(req.user.id);
  res.json(notes);
};

export const createNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const { title, content, theme, status } = req.body;
  
  const notes = await storage.getNotesByUserId(req.user.id);
  const order = notes.length > 0 ? Math.max(...notes.map(n => n.order)) + 1 : 0;
  
  const note = await storage.createNote({
    title,
    content,
    theme,
    status,
    userId: req.user.id,
    order
  });
  res.json(note);
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const updated = await storage.updateNote(req.params.id, req.user.id, req.body);
  if (!updated) {
    res.status(404).json({ msg: "Note not found" });
    return;
  }
  res.json(updated);
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const success = await storage.deleteNote(req.params.id, req.user.id);
  if (!success) {
    res.status(404).json({ msg: "Note not found" });
    return;
  }
  res.json({ msg: "Deleted" });
}; 