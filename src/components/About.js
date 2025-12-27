import React, { useState } from "react";
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
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
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
  SiCplusplus,
  SiC,
  SiPython,
  SiNotion,
} from "react-icons/si";
import { FaJava, FaSlack, FaTrello, FaDocker, FaLinux } from "react-icons/fa";
import CertificatesCTA from "../components/CertificatesCTA";
import image from "../assets/images/profile.jpg";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionModalContent = motion(ModalContent);

/* ================= DATA ================= */
const techStack = [
  { label: "C", icon: SiC, percentage: 85 },
  { label: "C++", icon: SiCplusplus, percentage: 80 },
  { label: "Python", icon: SiPython, percentage: 90 },
  { label: "JavaScript", icon: SiJavascript, percentage: 85 },
  { label: "Java", icon: FaJava, percentage: 75 },
  { label: "Linux", icon: FaLinux, percentage: 90 },
  { label: "Docker", icon: FaDocker, percentage: 80 },
  { label: "HTML5", icon: SiHtml5, percentage: 90 },
  { label: "CSS3", icon: SiCss3, percentage: 85 },
  { label: "MongoDB", icon: SiMongodb, percentage: 75 },
  { label: "Express", icon: SiExpress, percentage: 70 },
  { label: "React", icon: SiReact, percentage: 95 },
  { label: "Node.js", icon: SiNodedotjs, percentage: 85 },
  { label: "Firebase", icon: SiFirebase, percentage: 80 },
  { label: "Supabase", icon: SiSupabase, percentage: 70 },
  { label: "GitHub", icon: SiGithub, percentage: 90 },
  { label: "Slack", icon: FaSlack, percentage: 90 },
  { label: "Trello", icon: FaTrello, percentage: 90 },
  { label: "Notion", icon: SiNotion, percentage: 95 },
];

const About = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [selectedSkill, setSelectedSkill] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const handleClick = (tech) => {
    if (isHome) return; // ❌ Home pe modal nahi
    setSelectedSkill(tech);
    onOpen();
  };

  return (
    <Box minH="100vh" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <MotionBox
        maxW="7xl"
        mx="auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ================= ABOUT INFO ================= */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={10}>
          <Image
            borderRadius="full"
            boxSize={{ base: "150px", md: "250px" }}
            src={image}
            alt="Profile"
          />

          <Stack spacing={5} textAlign={{ base: "center", md: "left" }}>
            <Heading color={headingColor} textAlign="center">
              About Me
            </Heading>
            <Text color={textColor}>
              I am a Full Stack Developer and Cybersecurity Specialist with a
              solid foundation in Computer Science. I build high-performance,
              scalable web applications and have hands-on experience in
              networking, penetration testing, and IT security. Proficient in C,
              C++, JavaScript, Python, and modern web frameworks.
            </Text>
            <Text color={subTextColor}>
              I enjoy solving complex problems, learning new technologies, and
              contributing to impactful projects.
            </Text>
            <CertificatesCTA />
          </Stack>
        </Flex>

        {/* ================= TECH STACK ================= */}
        <Box mt={20} overflow="hidden" p={8} borderRadius="md">
          <Heading textAlign="center" mb="8" z-Index={5} color={headingColor}>
            Tech Stack
          </Heading>
          {/* ========= HOME → MARQUEE ========= */}
          {isHome && (
            <MotionFlex
              gap={10}
              align="center"
              width="max-content"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <Flex
                  key={index}
                  direction="column"
                  align="center"
                  minW="120px"
                >
                  <Box position="relative">
                    <CircularProgress
                      value={tech.percentage}
                      size="110px"
                      thickness="8px"
                      color="teal.500"
                    />
                    {tech.icon && (
                      <Icon
                        as={tech.icon}
                        boxSize={10}
                        color={headingColor}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    )}
                    {!tech.icon && tech.image && (
                      <Image
                        src={tech.image}
                        boxSize="40px"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      />
                    )}
                  </Box>

                  <Text mt={2} fontSize="sm" color={subTextColor}>
                    {tech.label}
                  </Text>
                </Flex>
              ))}
            </MotionFlex>
          )}

          {/* ========= ABOUT → GRID ========= */}
          {!isHome && (
            <Wrap justify="center" spacing={8}>
              {techStack.map((tech) => (
                <WrapItem key={tech.label}>
                  <Flex
                    direction="column"
                    align="center"
                    cursor="pointer"
                    onClick={() => handleClick(tech)}
                  >
                    <Tooltip label={`${tech.percentage}%`} hasArrow>
                      <Box position="relative">
                        <CircularProgress
                          value={tech.percentage}
                          size="110px"
                          thickness="8px"
                          color="teal.500"
                        />
                        <Icon
                          as={tech.icon}
                          boxSize={10}
                          color={headingColor}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                        />
                      </Box>
                    </Tooltip>
                    <Text mt={2} fontSize="sm" color={subTextColor}>
                      {tech.label}
                    </Text>
                  </Flex>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>

        {/* ================= MODAL (ABOUT ONLY) ================= */}
        {!isHome && selectedSkill && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <MotionModalContent
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ModalHeader>{selectedSkill.label}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text color={textColor}>
                  Proficiency Level:{" "}
                  <strong>{selectedSkill.percentage}%</strong>
                </Text>
              </ModalBody>
            </MotionModalContent>
          </Modal>
        )}
      </MotionBox>
    </Box>
  );
};

export default About;
