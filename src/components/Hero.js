import React, { useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import { fetchResume } from "../utils/fetchResume";

const roles = ["FULLSTACK DEVELOPER", "INDIE HACKER", "SOLOPRENEUR"];

const Hero = () => {
  const ellipseRef = useRef(null);

  // Rotating ellipse animation
  useEffect(() => {
    let angle = 0;
    let frameId;

    const rotate = () => {
      if (ellipseRef.current) {
        angle += 0.3;
        ellipseRef.current.style.transform = `rotate(${angle}deg)`;
      }
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const headingColor = useColorModeValue("gray.800", "white");
  const typewriterColor = useColorModeValue("teal.500", "#18F2E5");
  const subtitleColor = useColorModeValue("gray.600", "gray.300");

  const sectionBg = useColorModeValue("gray.50", "#011627");

  const handleResumeClick = async () => {
    try {
      const pdfBlob = await fetchResume();

      // Create URL for blob and open in new tab
      const pdfUrl = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );
      window.open(pdfUrl, "_blank");

      // Optional: release object URL after some time
      setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 10000);
    } catch (error) {
      alert("Failed to load resume. Please try again later.");
    }
  };

  return (
    <Box
      as="section"
      bg={sectionBg}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={12}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        maxW="1200px"
        mx="auto"
        w="full"
        gap={16}
        textAlign={{ base: "center", md: "left" }}
      >
        <Stack spacing={6} flex="1">
          <Heading color={headingColor} fontSize={{ base: "3xl", md: "5xl" }}>
            Hi - I'm Ahmed Hasan
          </Heading>
          <Text color={typewriterColor} fontSize="2xl" fontWeight="bold">
            <Typewriter
              options={{
                strings: roles,
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 30,
              }}
            />
          </Text>
          <Text fontSize="lg" color={subtitleColor}>
            Crafting innovative solutions to solve real-world problems
          </Text>
          <Flex
            gap={4}
            justify={{ base: "center", md: "flex-start" }}
            flexWrap="wrap"
          >
            <Button colorScheme="teal" size="md" as="a" href="/contact">
              Hire Me
            </Button>
            <Button
              onClick={handleResumeClick}
              colorScheme="teal"
              variant="outline"
              size="md"
              aria-label="Download or view resume PDF"
            >
              Resume
            </Button>
          </Flex>
        </Stack>

        <Box
          position="relative"
          w={{ base: "250px", md: "350px" }}
          maxW={{ base: "80vw", md: "350px" }}
          flexShrink={0}
        >
          <Image
            src="https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/Components/hero-placeholder.png?updatedAt=1739628240660"
            alt="Ahmed Hasan"
            zIndex={2}
            position="relative"
            p={4}
          />
          <Box
            ref={ellipseRef}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={1}
          >
            <svg
              viewBox="0 0 412 413"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <circle
                cx="206"
                cy="206.401"
                r="204.5"
                stroke="#18F2E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="18 36 54 72"
              />
            </svg>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
