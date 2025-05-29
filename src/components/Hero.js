// src/components/Hero.jsx
import { Box, Heading, Text, Button, Stack, Image } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, gray.900, gray.800)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Stack spacing={6} textAlign="center" maxW="2xl">
        <Heading fontSize={{ base: "3xl", md: "5xl" }}>
          Hi, I'm Ahmed Hasan
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }}>
          A Full Stack Developer passionate about building fast, responsive, and
          modern web applications using React, Node.js, and Chakra UI.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          View My Work
        </Button>
      </Stack>
    </Box>
  );
};

export default Hero;
