# 📝 Notes Management Website with Gen AI Integration

A **full-stack MERN application** designed to revolutionize the traditional note-taking experience.  
This project combines **React**, **Express.js**, **Node.js**, and **MongoDB** with the **Google Gemini Generative AI API** to create an intelligent notes management platform that not only stores your notes but also **summarizes them intelligently** using AI.

---

## 🚀 Features

### 🧠 Generative AI Integration

- Integrated **Google Gemini API** to automatically **summarize long notes** into concise and readable summaries.
- The AI-generated summaries are securely stored and displayed to the user.

### ✍️ Core CRUD Functionalities

- **Create**, **Read**, **Update**, and **Delete** notes using an intuitive UI and RESTful API.
- Fully asynchronous operations for a smooth user experience.

### 💻 Responsive UI

- Built with **React.js** using a **component-based architecture**.
- Fully responsive design that works seamlessly across desktop and mobile devices.

### ⚙️ Backend API

- Developed using **Express.js** and **Node.js** following RESTful design principles.
- Modular structure with separate **controllers**, **routes**, and **middleware** for maintainability.

### 🗃️ Database

- **MongoDB** with **Mongoose** ODM for data persistence.
- Stores note details (`title`, `content`, `timestamps`, and AI summaries).

### 🔐 Security & Environment Setup

- Secure API key management using environment variables (`.env` file).
- CORS and rate-limiting middleware for safe cross-origin requests.

---

## 🧩 Tech Stack

| Layer           | Technology          |
| --------------- | ------------------- |
| **Frontend**    | React.js, Axios     |
| **Backend**     | Node.js, Express.js |
| **Database**    | MongoDB, Mongoose   |
| **AI Service**  | Google Gemini API   |
| **Other Tools** | dotenv, cors        |

---

## 🧠 How the AI Summarization Works

1. User clicks on the **"Summarize"** button on a note.
2. The frontend sends a request to `PUT /api/notes/:id/summarize`.
3. The backend retrieves the note from MongoDB.
4. A custom prompt is sent to the **Gemini API**.
5. The AI response is parsed, summarized text is extracted, and saved back into MongoDB.
6. The updated note (with summary) is sent back to the frontend for display.

---
