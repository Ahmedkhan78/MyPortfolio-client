import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading...
      </div>
    );
  if (!project)
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        Project not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">
        {project.title}
      </h2>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
        />
      )}

      <article className="prose prose-lg max-w-none dark:prose-invert mb-10">
        <ReactMarkdown>{project.description}</ReactMarkdown>
      </article>

      {project.link && (
        <div className="flex justify-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition"
          >
            Visit Live Project →
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectPost;
