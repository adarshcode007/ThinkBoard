import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summarisedNote, setSummarisedNote] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you eant to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in deleting the note ", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a Title and Content");
      return;
    }
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in updating the note ", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  const handleSummarize = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a Title and Content");
      return;
    }
    try {
      const res = await api.get(`/notes/${id}/summarize`);
      toast.success("Note is Summarised");
      console.log(res);
      setSummarisedNote(res.data.summary);
    } catch (error) {
      console.log("Error in updating the note ", error);
      toast.error("Failed to update the note");
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log({ note });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary btn-outline"
                  onClick={handleSummarize}
                >
                  Summarize
                </button>
                <button
                  className="btn btn-primary "
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>

              <div className="mt-5 transition-all duration-500 ease-in-out">
                <div
                  className={`overflow-y-auto transition-all duration-500 ease-in-out ${
                    summarisedNote
                      ? "max-h-96 opacity-50 hover:opacity-100 "
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4">
                    <h1 className="text-xl font-bold mb-2">Summary</h1>
                    <h3 className="text-lg py-2 px-3 bg-gray-900 rounded-lg">
                      {summarisedNote}
                    </h3>
                  </div>
                </div>
              </div>

              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
