import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const ProjectPost = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get("/project");
        const found = res.data.find((p) => String(p.id) === id);
        setProject(found);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div className="text-red-500">Project not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">{project.title}</h2>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <p className="text-lg leading-relaxed mb-6 text-justify">
        {project.description}
      </p>

      {project.link && (
        <div className="flex justify-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Visit Live Project →
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectPost;
