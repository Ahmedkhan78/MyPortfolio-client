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
import AdminContactPage from "./components/adminInterface/AdminContactPage"; // Import add karo
import Login from "./components/Login";
import ProjectPost from "./components/adminProjectComponents/ProjectPost";
import HeroContact from "./components/HeroContact";
import CertificatePage from "./components/CertificatePage";

function AppContent() {
  const location = useLocation();
  const [showParticles, setShowParticles] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set loading favicon and title on route change or load
    document.title = "Loading Ahmed.dev...";
    changeFavicon("/favicon-loading.ico");

    // Simulate loading done after 1s (like you already do)
    const timeout = setTimeout(() => {
      document.title = "Ahmed.dev";
      changeFavicon("/favicon.ico");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]); // runs on route changes

  // helper function to change favicon
  function changeFavicon(src) {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = src;
    document.getElementsByTagName("head")[0].appendChild(link);
  }

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
                <Projects limit={6} />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <HeroContact />
                <Contact />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectPost />} />
          <Route path="/certificate" element={<CertificatePage />} />

          {/* Admin routes: Projects and Contact separated */}
          <Route path="/admin/projects/*" element={<AdminProjectsPage />} />
          <Route path="/admin/contacts/*" element={<AdminContactPage />} />

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
