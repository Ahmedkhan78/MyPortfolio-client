import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import ProjectList from "../project/ProjectList";
import CreateProject from "../project/CreateProject";
import EditProject from "../project/EditProject";
import RequireAdmin from "./RequireAdmin";

const AdminProjectsPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/"); // Redirect if not admin
      return;
    }

    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/project", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Admin fetch error", err);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  return (
    <Box p={4}>
      <Routes>
        <Route
          index
          element={
            <ProjectList projects={projects} setProjects={setProjects} />
          }
        />
        <Route
          path="create"
          element={
            <RequireAdmin>
              <CreateProject setProjects={setProjects} />
            </RequireAdmin>
          }
        />
        <Route
          path="edit/:id"
          element={
            <RequireAdmin>
              <EditProject projects={projects} setProjects={setProjects} />
            </RequireAdmin>
          }
        />
      </Routes>
    </Box>
  );
};

export default AdminProjectsPage;
