import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { FiTrash } from "react-icons/fi"; // Importing the trash icon

const EditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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

    if (Array.isArray(project.images) && project.images.length > 0) {
      setImageFiles(project.images);
      setImagePreviews(project.images.map((img) => img.url || img));
    } else if (project.image) {
      setImageFiles([project.image]);
      setImagePreviews([project.image]);
    }

    setLoading(false);
  }, [project, projects, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleImageDelete = (index) => {
    // Remove the image at the specified index from both imageFiles and imagePreviews
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
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

      // Append all images to form data
      imageFiles.forEach((file) => {
        if (file instanceof File) {
          payload.append("images", file);
        } else if (typeof file === "string") {
          payload.append("imageUrls", file); // Existing image URL
        }
      });

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
        className="border p-2 w-full h-60"
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

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <div className="mt-4">
        {imagePreviews.length > 0 ? (
          imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block mr-2">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-40 h-40 object-cover mt-2 rounded"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-600 hover:text-red-800"
              >
                <FiTrash size={20} />
              </button>
            </div>
          ))
        ) : (
          <p>No images available for this project.</p>
        )}
      </div>

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
