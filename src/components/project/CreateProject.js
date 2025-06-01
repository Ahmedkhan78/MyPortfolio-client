import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Axios instance with baseURL

const CreateProject = ({ setProjects }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      if (!imageFile) {
        alert("Please select an image file.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("image", imageFile);

      const response = await api.post("/project", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type' set automatically by axios when using FormData
        },
      });

      if (response.status === 201) {
        setProjects((prev) => [...prev, response.data]);
        navigate("/admin/projects", { replace: true });
      } else {
        throw new Error("Failed to create project: " + response.statusText);
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

      <input type="file" onChange={handleImageChange} accept="image/*" />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview"
          className="h-40 object-cover mt-2"
        />
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
