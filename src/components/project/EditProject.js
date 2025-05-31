import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setImage(project.image || "");
      setLink(project.link || "");
    } else {
      navigate("/projects"); // If not found, redirect
    }
  }, [project, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized");
        return;
      }

      const updatedProject = { title, description, image, link };

      const response = await api.put(`/projects/${id}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedList = projects.map((p) =>
        p.id === Number(id) ? response.data : p
      );
      setProjects(updatedList);
      navigate("/projects");
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Error updating project: " + error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Edit Project</h2>

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
        required
      />

      <input type="file" onChange={handleImageChange} accept="image/*" />
      {image && (
        <img src={image} alt="preview" className="h-40 object-cover mt-2" />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EditProject;
