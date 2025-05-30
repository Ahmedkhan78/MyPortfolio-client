import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const MotionBox = motion(Box);

const Hero = () => {
  return (
    <Box as="section" position="relative" minH="100vh" overflow="hidden">
      {/* Particles Background */}

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={6}
        bgGradient={useColorModeValue(
          // Light mode transparent background
          "linear(to-br, rgba(255,255,255,0.6), rgba(245,245,245,0.4))",
          // Dark mode transparent background
          "linear(to-br, rgba(26,32,44,0.6), rgba(1,1,1,0.4))"
        )}
        backdropFilter="blur(5px)"
      >
        <Stack spacing={6} textAlign="center" maxW="3xl">
          <Heading fontSize={{ base: "3xl", md: "5xl" }}>
            Hi, I’m Ahmed Hasan 👋
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.500">
            <Typewriter
              options={{
                strings: [
                  "I'm a Full Stack Developer 💻",
                  "I love building React apps 🚀",
                  "Let's create something amazing 🎨",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </Text>

          <MotionBox
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button colorScheme="teal" size="lg">
              View My Work
            </Button>
          </MotionBox>
        </Stack>
      </Box>
    </Box>
  );
};

export default Hero;
