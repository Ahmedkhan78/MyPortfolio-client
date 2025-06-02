import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";

import {
  Box,
  Heading,
  SimpleGrid,
  Link,
  Stack,
  Button,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";

const ProjectList = ({ projects, setProjects }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/project");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [setProjects]);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      fetchProjects();
    }
  }, [projects, fetchProjects]);

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
      await api.delete(`/project/${id}`);
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project.");
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={10}
      >
        <Heading color={useColorModeValue("teal.600", "teal.300")}>
          Projects
        </Heading>
        {user?.role === "admin" && (
          <Button
            as={RouterLink}
            to="/admin/projects/create"
            colorScheme="blue"
          >
            + Create Project
          </Button>
        )}
      </Box>

      {loading ? (
        <Text textAlign="center" color="gray.500">
          Loading projects...
        </Text>
      ) : projects.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No projects found.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {projects.map((project) => {
            const image =
              Array.isArray(project.images) && project.images.length
                ? project.images[0]?.url
                : project.image;

            return (
              <Box
                key={project.id}
                bg={cardBg}
                boxShadow="md"
                borderRadius="md"
                overflow="hidden"
              >
                {image && (
                  <Image
                    src={image}
                    alt={project.title}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                )}
                <Box p={5}>
                  <Stack spacing={3}>
                    <Heading fontSize="xl">{project.title}</Heading>
                    <Text color={textColor} noOfLines={3}>
                      {project.description}
                    </Text>

                    <Stack direction="row" justify="space-between" pt={2}>
                      <Link
                        href={project.link}
                        isExternal
                        color="teal.500"
                        fontWeight="bold"
                      >
                        Visit →
                      </Link>

                      {user?.role === "admin" && (
                        <Stack direction="row" spacing={3}>
                          <Link
                            as={RouterLink}
                            to={`/admin/projects/edit/${project.id}`}
                            color="blue.500"
                          >
                            Edit
                          </Link>
                          <Button
                            variant="link"
                            color="red.500"
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProjectList;
