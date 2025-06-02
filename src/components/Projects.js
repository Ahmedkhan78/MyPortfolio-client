// src/components/Projects.jsx
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronUp } from "react-icons/fi";

import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import api from "../utils/api";

const MotionBox = motion(Box);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("#3182ce", "#63b3ed"); // moved out of callback

  const [showMore, setShowMore] = useState({});

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
      <Heading
        mb={10}
        textAlign="center"
        color={useColorModeValue("teal.600", "teal.300")}
        position={"relative"}
      >
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

                {/* Markdown description with read more/less */}
                <Box
                  maxH={
                    showMore[project.id] ? "none" : "4.5em" /* about 3 lines */
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Projects;
