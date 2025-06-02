import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronUp } from "react-icons/fi";

import {
  Box,
  Heading,
  SimpleGrid,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import api from "../utils/api";

const MotionBox = motion(Box);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("#3182ce", "#63b3ed");

  const [showMore, setShowMore] = useState({});
  // Track current image index for each project by id
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/project");

        // Normalize images for each project
        const normalized = res.data.map((project) => {
          let imagesArray = [];
          if (Array.isArray(project.images) && project.images.length > 0) {
            imagesArray = project.images;
          } else if (
            typeof project.image === "string" &&
            project.image.trim() !== ""
          ) {
            imagesArray = [{ url: project.image }];
          } else if (project.images && typeof project.images === "object") {
            imagesArray = [project.images];
          }
          return { ...project, images: imagesArray };
        });

        setProjects(normalized);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  // Setup interval to cycle images for projects with multiple images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };

        projects.forEach((project) => {
          const imgs = project.images || [];
          if (imgs.length > 1) {
            const currentIndex = prevIndexes[project.id] ?? 0;
            newIndexes[project.id] = (currentIndex + 1) % imgs.length;
          } else {
            newIndexes[project.id] = 0; // Single image, always index 0
          }
        });

        return newIndexes;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [projects]);

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <Heading
        mb={10}
        textAlign="center"
        color={useColorModeValue("teal.600", "teal.300")}
        position={"relative"}
      >
        Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {projects.map((project, index) => {
          const imgs = project.images || [];
          const currentIndex = currentImageIndexes[project.id] ?? 0;

          return (
            <MotionBox
              key={project.id}
              bg={cardBg}
              boxShadow="md"
              borderRadius="md"
              overflow="hidden"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              position={"relative"}
            >
              {/* Image slider container */}
              <Box
                position="relative"
                height="200px"
                overflow="hidden"
                w="100%"
              >
                <AnimatePresence initial={false}>
                  {imgs.length > 0 && (
                    <motion.img
                      key={imgs[currentIndex].url}
                      src={imgs[currentIndex].url}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8 }}
                      draggable={false}
                    />
                  )}
                </AnimatePresence>
              </Box>

              <Box p={5}>
                <Stack spacing={3}>
                  <Heading fontSize="xl">{project.title}</Heading>

                  {/* Markdown description with read more/less */}
                  <Box
                    maxH={
                      showMore[project.id]
                        ? "none"
                        : "4.5em" /* about 3 lines */
                    }
                    overflow="hidden"
                    cursor={!showMore[project.id] ? "pointer" : "default"}
                    color={textColor}
                    sx={{
                      "& p": {
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      },
                      "& a": {
                        color: linkColor,
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      if (!showMore[project.id]) {
                        setShowMore((prev) => ({
                          ...prev,
                          [project.id]: true,
                        }));
                      }
                    }}
                  >
                    <ReactMarkdown>{project.description}</ReactMarkdown>
                  </Box>

                  {/* Show collapse button */}
                  {showMore[project.id] && (
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mt={1}
                      cursor="pointer"
                      onClick={() =>
                        setShowMore((prev) => ({
                          ...prev,
                          [project.id]: false,
                        }))
                      }
                      color={linkColor}
                    >
                      <FiChevronUp size={20} />
                    </Box>
                  )}

                  <Link
                    as={RouterLink}
                    to={`/projects/${project.id}`}
                    color="teal.500"
                    fontWeight="bold"
                  >
                    View Project →
                  </Link>
                </Stack>
              </Box>
            </MotionBox>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Projects;
