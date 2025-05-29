import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Link,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my work and skills.",
    image: "https://via.placeholder.com/600x400",
    link: "https://yourportfolio.com",
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "An online store built using React and Chakra UI.",
    image: "https://via.placeholder.com/600x400",
    link: "https://myecommerce.com",
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "A full-stack blog app with a CMS-like dashboard.",
    image: "https://via.placeholder.com/600x400",
    link: "https://myblog.com",
  },
];

const Projects = () => {
  // ✅ Call hooks at the top level
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
          >
            <Image src={project.image} alt={project.title} />

            <Box p={5}>
              <Stack spacing={3}>
                <Heading fontSize="xl">{project.title}</Heading>
                <Text color={textColor}>{project.description}</Text>
                <Link
                  href={project.link}
                  color="teal.500"
                  fontWeight="bold"
                  isExternal
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
