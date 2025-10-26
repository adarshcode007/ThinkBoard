import Note from "../models/Note.js";
import axios from "axios";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNode = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNode = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const summarizeNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // New API endpoint for Google Gemini
    const geminiApiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // Prepare the prompt for summarization
    const prompt = `Summarize the following text in a concise paragraphs:\n\n${note.content}`;

    // Make the API call to Gemini
    const response = await axios.post(
      `${geminiApiUrl}?key=${process.env.GEN_AI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    console.log(response);
    console.log(response.data);

    const summary = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error in summarizeNote controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
