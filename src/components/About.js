import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  useColorModeValue,
  Stack,
  Wrap,
  WrapItem,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGithub,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";

const MotionBox = motion(Box);

const techStack = [
  { label: "HTML5", icon: SiHtml5 },
  { label: "CSS3", icon: SiCss3 },
  { label: "JavaScript", icon: SiJavascript },
  { label: "MongoDB", icon: SiMongodb },
  { label: "Express", icon: SiExpress },
  { label: "React", icon: SiReact },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Firebase", icon: SiFirebase },
  { label: "Supabase", icon: SiSupabase },
  { label: "GitHub", icon: SiGithub },
];

const About = () => {
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  // const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
      py={{ base: 10, md: 20 }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        maxW="7xl"
        w="full"
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

          <Stack
            spacing={5}
            flex="2"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading as="h2" size="xl" color={headingColor}>
              About Me
            </Heading>
            <Text fontSize="lg" color={textColor}>
              I'm a passionate full stack web developer with a love for building
              clean, responsive, and performant web apps. With solid experience
              in React, Node.js, and modern design systems like Chakra UI, I
              focus on crafting excellent user experiences.
            </Text>
            <Text fontSize="md" color={subTextColor}>
              Outside coding, I enjoy photography, learning new tech, and
              contributing to open-source projects.
            </Text>
          </Stack>
        </Flex>

        {/* Tech Stack Section */}
        <Box mt={16}>
          <Heading
            as="h3"
            size="lg"
            textAlign="center"
            mb={6}
            color={headingColor}
          >
            Tech Stack
          </Heading>
          <Wrap justify="center" spacing={8}>
            {techStack.map((tech) => (
              <WrapItem key={tech.label}>
                <Flex direction="column" align="center">
                  <Icon as={tech.icon} boxSize={10} color={headingColor} />
                  <Text mt={2} fontSize="sm" color={subTextColor}>
                    {tech.label}
                  </Text>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default About;
