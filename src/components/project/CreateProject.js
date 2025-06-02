import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Your axios instance

const CreateProject = ({ setProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Preview logic
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !link || imageFiles.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);

      imageFiles.forEach((file) => {
        formData.append("images", file); // Same field name as used in backend multer.array("images")
      });

      const response = await api.post("/project", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setProjects((prev) => [...prev, response.data]);
        navigate("/admin/projects", { replace: true });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Error creating project: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Create Project</h2>

      <input
        className="border p-2 w-full"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Project Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Image previews */}
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {imagePreviews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Preview ${idx + 1}`}
              className="h-32 w-auto object-cover border"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProject;
