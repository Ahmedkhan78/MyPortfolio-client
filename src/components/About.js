// src/pages/About.js
import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const About = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      maxW="7xl"
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={{ base: 10, md: 20 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={10}
      >
        <Box flex="1">
          <Image
            borderRadius="full"
            boxSize={{ base: "200px", md: "250px" }}
            src="https://i.pravatar.cc/300"
            alt="Profile"
            mx="auto"
          />
        </Box>

        <Stack spacing={5} flex="2" textAlign={{ base: "center", md: "left" }}>
          <Heading
            as="h2"
            size="xl"
            color={useColorModeValue("teal.600", "teal.300")}
          >
            About Me
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.700", "gray.300")}>
            I'm a passionate frontend developer with a love for crafting
            beautiful, responsive, and accessible websites. With strong
            foundations in React and design systems like Chakra UI, I strive to
            deliver polished and performant user experiences.
          </Text>
          <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")}>
            When I'm not coding, I enjoy photography, learning new frameworks,
            and sharing knowledge through blogs and tutorials.
          </Text>
        </Stack>
      </Flex>
    </MotionBox>
  );
};

export default About;
