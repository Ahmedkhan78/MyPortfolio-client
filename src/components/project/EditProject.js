import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => String(p.id) === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project) {
      if (projects.length === 0) {
        setLoading(true);
      } else {
        navigate("/admin/projects");
      }
      return;
    }

    setTitle(project.title || "");
    setDescription(project.description || "");
    setLink(project.link || "");
    setImagePreview(project.image || ""); // old image preview
    setLoading(false);
  }, [project, projects, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

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
      if (imageFile) {
        formData.append("image", imageFile); // only append if new image chosen
      }

      const response = await api.put(`/project/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type' automatically set to multipart/form-data
        },
      });

      const updatedList = projects.map((p) =>
        String(p.id) === id ? response.data : p
      );
      setProjects(updatedList);
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project: " + error.message);
    }
  };

  if (loading) return <div>Loading project details...</div>;

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

      <input
        type="text"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />

      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <input
        type="text"
        className="border p-2 w-full"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Project Link"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Project preview"
          className="w-full h-40 object-cover mt-2 rounded"
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
};

export default EditProject;
