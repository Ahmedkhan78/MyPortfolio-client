import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  const project = projects.find((p) => String(p.id) === id);

  useEffect(() => {
    if (!project) {
      if (projects.length === 0) {
        setLoading(true);
      } else {
        navigate("/admin/projects");
      }
      return;
    }

    setFormData({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "",
    });

    setImagePreview(project.image || "");
    setLoading(false);
  }, [project, projects, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        alert("Unauthorized. Please log in.");
        return;
      }

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("link", formData.link);
      if (imageFile) payload.append("image", imageFile);

      const res = await api.put(`/project/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = projects.map((p) => (String(p.id) === id ? res.data : p));
      setProjects(updated);
      navigate("/admin/projects");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update project.");
    }
  };

  if (loading) return <div>Loading project details...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

      <input
        type="text"
        name="title"
        className="border p-2 w-full"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Project Title"
        required
      />

      <textarea
        name="description"
        className="border p-2 w-full"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />

      <input
        type="text"
        name="link"
        className="border p-2 w-full"
        value={formData.link}
        onChange={handleInputChange}
        placeholder="Project Link"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
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
