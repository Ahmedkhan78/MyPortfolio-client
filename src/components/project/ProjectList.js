import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";

const ProjectList = ({ projects, setProjects }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Unauthorized");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-6 gap-20">
        <h2 className="text-2xl font-bold hover:text-blue-500 cursor-pointer">
          Projects
        </h2>
        {user?.role === "admin" && (
          <Link
            to="/admin/projects/create"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create Project
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border rounded shadow overflow-hidden"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center mt-3 text-sm text-blue-600 space-x-2">
                <a href={project.link} target="_blank" rel="noreferrer">
                  Visit
                </a>
                {user?.role === "admin" && (
                  <>
                    <Link to={`/projects/edit/${project.id}`}>Edit</Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
