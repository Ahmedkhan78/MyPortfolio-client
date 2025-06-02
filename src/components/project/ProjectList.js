// src/components/admin/ProjectList.jsx
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { FiChevronUp } from "react-icons/fi";

const ProjectList = ({ projects, setProjects }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState({});

  const isAdmin = user?.role === "admin";

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("#3182ce", "#63b3ed");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/project");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  useEffect(() => {
    if (!projects || projects.length === 0) fetchProjects();
  }, [projects, fetchProjects]);

  const handleDelete = async (id) => {
    if (!isAdmin) return alert("Unauthorized");

    const confirm = window.confirm("Delete this project?");
    if (!confirm) return;

    try {
      await api.delete(`/project/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project.");
    }
  };

  const renderActions = (projectId) => (
    <Stack direction="row" spacing={4}>
      <Link
        as={RouterLink}
        to={`/admin/projects/edit/${projectId}`}
        color="blue.500"
        fontWeight="semibold"
      >
        Edit
      </Link>
      <Button
        size="sm"
        colorScheme="red"
        variant="link"
        onClick={() => handleDelete(projectId)}
      >
        Delete
      </Button>
    </Stack>
  );

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        mb={10}
      >
        <Heading color={useColorModeValue("teal.600", "teal.300")} size="xl">
          Projects
        </Heading>
        {isAdmin && (
          <Button
            as={RouterLink}
            to="/admin/projects/create"
            colorScheme="blue"
            size="md"
          >
            + Create Project
          </Button>
        )}
      </Stack>

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="gray.500" />
          <Text mt={2} color="gray.500">
            Loading projects...
          </Text>
        </Box>
      ) : projects.length === 0 ? (
        <Text textAlign="center" color="gray.500" py={10}>
          No projects found.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {projects.map((project) => (
            <Box
              key={project.id}
              bg={cardBg}
              boxShadow="md"
              borderRadius="md"
              overflow="hidden"
              position="relative"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  objectFit="cover"
                  maxH="200px"
                  w="100%"
                />
              )}

              <Box p={5}>
                <Stack spacing={3}>
                  <Heading fontSize="xl">{project.title}</Heading>

                  <Box
                    maxH={showMore[project.id] ? "none" : "4.5em"}
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

                  <Stack direction="row" justify="space-between" align="center">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="teal.500"
                      fontWeight="bold"
                      fontSize="sm"
                    >
                      Visit
                    </Link>

                    {isAdmin && renderActions(project.id)}
                  </Stack>
                </Stack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProjectList;
