// src/pages/Contact.js
import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import secrets from "../config/secrets";

const MotionBox = motion(Box);

const emailLink = `mailto:${secrets.email}`;

const HeroContact = () => {
  return (
    <MotionBox
      as="section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      maxW="4xl"
      mx="auto"
      px={{ base: 4, md: 8 }}
      py={{ base: 16, md: 24 }}
      textAlign="center"
      minH="100vh" // 👈 ADD THIS LINE
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading
        as="h1"
        size="2xl"
        mb={4}
        color={useColorModeValue("teal.600", "teal.300")}
      >
        Let's Connect
      </Heading>
      <Text
        fontSize="lg"
        color={useColorModeValue("gray.700", "gray.300")}
        mb={6}
      >
        Whether you have a question, want to work together, or just want to say
        hi — my inbox is always open!
      </Text>
      <Stack direction="column" spacing={3} align="center">
        <Button
          as="a"
          href={emailLink}
          colorScheme="teal"
          size="lg"
          variant="outline"
        >
          Say Hello
        </Button>
        <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
          Or DM me on LinkedIn, Twitter, or GitHub
        </Text>
      </Stack>
    </MotionBox>
  );
};

export default HeroContact;
