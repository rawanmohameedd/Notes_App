import { Router } from "express";
import { auth } from "../middleware/auth";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/notes";

const router = Router();

router.use(auth);

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
