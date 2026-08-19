import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useEffect, useState, useContext } from "react";

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
import AdminContactPage from "./components/adminInterface/AdminContactPage";

import Login from "./components/Login";
import ProjectPost from "./components/adminProjectComponents/ProjectPost";
import HeroContact from "./components/HeroContact";
import CertificatePage from "./components/CertificatePage";

import { AuthContext } from "./context/AuthContext";

// ======================================================
// LOGIN GUARD
// ======================================================
//
// /login direct access blocked.
// Login button TOTP verification ke baad hi available hai.
//

const LoginGuard = ({ children }) => {
  const token = sessionStorage.getItem("loginUnlockToken");

  const expiresAt = Number(sessionStorage.getItem("loginUnlockExpiresAt"));

  const valid = token && expiresAt && Date.now() < expiresAt;

  if (!valid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ======================================================
// ADMIN GUARD
// ======================================================
//
// Actual admin pages sirf authenticated admin user
// ko milengi.
//

const AdminGuard = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ======================================================
// APP CONTENT
// ======================================================

function AppContent() {
  const location = useLocation();

  const [showParticles, setShowParticles] = useState(false);

  const [loading, setLoading] = useState(false);

  // ====================================================
  // TITLE + FAVICON
  // ====================================================

  useEffect(() => {
    document.title = "Loading Ahmed.dev...";

    changeFavicon("/favicon-loading.ico");

    const timeout = setTimeout(() => {
      document.title = "Ahmed.dev";

      changeFavicon("/favicon.ico");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  function changeFavicon(src) {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = src;

    document.getElementsByTagName("head")[0].appendChild(link);
  }

  // ====================================================
  // PARTICLES
  // ====================================================

  useEffect(() => {
    const currentPath = location.pathname;

    setShowParticles(currentPath === "/" || currentPath === "/contact");
  }, [location]);

  // ====================================================
  // LOADER
  // ====================================================

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Flex direction="column" minH="100vh">
      <Navbar />

      {showParticles && <Particle />}

      <Box flex="1">
        <Routes>
          {/* ================= HOME ================= */}

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

          {/* ================= CONTACT ================= */}

          <Route
            path="/contact"
            element={
              <>
                <HeroContact />
                <Contact />
              </>
            }
          />

          {/* ================= PUBLIC ================= */}

          <Route path="/about" element={<About />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/projects/:id" element={<ProjectPost />} />

          <Route path="/certificate" element={<CertificatePage />} />

          {/* ================= ADMIN ================= */}

          <Route
            path="/admin/projects/*"
            element={
              <AdminGuard>
                <AdminProjectsPage />
              </AdminGuard>
            }
          />

          <Route
            path="/admin/contacts/*"
            element={
              <AdminGuard>
                <AdminContactPage />
              </AdminGuard>
            }
          />

          {/* ================= LOGIN ================= */}

          <Route
            path="/login"
            element={
              <LoginGuard>
                <Login />
              </LoginGuard>
            }
          />

          {/* ================= FALLBACK ================= */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <Footer />
    </Flex>
  );
}

// ======================================================
// APP
// ======================================================

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
