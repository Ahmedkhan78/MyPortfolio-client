import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";

import ProjectList from "../adminProjectComponents/ProjectList";
import CreateProject from "../adminProjectComponents/CreateProject";
import EditProject from "../adminProjectComponents/EditProject";
import RequireAdmin from "./RequireAdmin";

const AdminProjectsPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await api.get("/project");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  return (
    <Box p={4}>
      {/* Dashboard Navigation */}

      {/* Admin Routes */}
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
