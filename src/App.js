// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Particle from "./components/Particles";
import Loader from "./components/Loader";
import AdminProjectsPage from "./components/adminInterface/AdminProjectsPage";
import Login from "./components/Login";
import ProjectPost from "./components/project/ProjectPost";

function AppContent() {
  const location = useLocation();
  const [showParticles, setShowParticles] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    setShowParticles(currentPath === "/" || currentPath === "/contact");
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // show loading screen for 1 sec

    return () => clearTimeout(timeout);
  }, [location]);

  if (loading) return <Loader />;
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      {showParticles && <Particle />}

      <Box flex="1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Projects />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Hero />
                <Contact />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectPost />} />
          <Route path="/admin/projects/*" element={<AdminProjectsPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>

      <Footer />
    </Flex>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
