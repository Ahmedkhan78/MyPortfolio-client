// src/components/Projects.jsx
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import api from "../utils/api";

const MotionBox = motion(Box);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/project");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <Heading mb={10} textAlign="center">
        Projects
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {projects.map((project, index) => (
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
            <Image src={project.image} alt={project.title} />
            <Box p={5}>
              <Stack spacing={3}>
                <Heading fontSize="xl">{project.title}</Heading>
                <Text color={textColor}>{project.description}</Text>
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Projects;
