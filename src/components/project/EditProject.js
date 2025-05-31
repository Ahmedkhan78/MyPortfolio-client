import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const EditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Project ko dhundho id se, id ko number me convert karo
  const project = projects.find((p) => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project) {
      // Agar project nahi mil raha toh projects load hone tak wait karo
      if (projects.length === 0) {
        setLoading(true);
      } else {
        // Projects loaded hain par project nahi mila, redirect karo
        navigate("/admin/projects");
      }
      return;
    }
    // Project mil gaya, form fields set karo
    setTitle(project.title || "");
    setDescription(project.description || "");
    setImage(project.image || "");
    setLink(project.link || "");
    setLoading(false);
  }, [project, projects, navigate]);

  if (loading) return <div>Loading project details...</div>;

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
      const updatedProject = { title, description, image, link };

      const response = await api.put(`/project/${id}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add this line explicitly
        },
      });

      const updatedList = projects.map((p) =>
        p.id === Number(id) ? response.data : p
      );
      setProjects(updatedList);
      navigate("/admin/projects");
    } catch (error) {
      if (error.response) {
        // Server responded with status code outside 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        alert(
          `Update failed: ${
            error.response.data.message || error.response.status
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert("No response from server. Check your connection.");
      } else {
        // Something else happened setting up the request
        console.error("Axios error:", error.message);
        alert("Error updating project: " + error.message);
      }
    }
  };

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

      <input type="file" onChange={handleImageChange} accept="image/*" />

      {image && (
        <img
          src={image}
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
