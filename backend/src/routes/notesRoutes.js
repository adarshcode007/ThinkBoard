import express from "express";
import {
  createNote,
  deleteNode,
  getAllNotes,
  getNoteById,
  summarizeNote,
  updateNode,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNode);
router.delete("/:id", deleteNode);
router.get("/:id/summarize", summarizeNote);

export default router;
