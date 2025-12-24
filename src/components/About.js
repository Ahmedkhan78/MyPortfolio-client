import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  useColorModeValue,
  Stack,
  Icon,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
const MotionModalContent = motion(ModalContent);
const MotionFlex = motion(Flex);

const techStack = [
  { label: "HTML5", icon: SiHtml5, percentage: 90 },
  { label: "CSS3", icon: SiCss3, percentage: 85 },
  { label: "JavaScript", icon: SiJavascript, percentage: 80 },
  { label: "MongoDB", icon: SiMongodb, percentage: 75 },
  { label: "Express", icon: SiExpress, percentage: 70 },
  { label: "React", icon: SiReact, percentage: 95 },
  { label: "Node.js", icon: SiNodedotjs, percentage: 85 },
  { label: "Firebase", icon: SiFirebase, percentage: 80 },
  { label: "Supabase", icon: SiSupabase, percentage: 70 },
  { label: "GitHub", icon: SiGithub, percentage: 90 },
];

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clickedPosition, setClickedPosition] = useState(null);

  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const handleClick = (tech, event) => {
    setSelectedSkill(tech);
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedPosition(rect);
    onOpen();
  };

  return (
    <Box minH="100vh" px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        maxW="7xl"
        mx="auto"
      >
        {/* About Section */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={10}>
          <Image
            borderRadius="full"
            boxSize={{ base: "150px", md: "250px" }}
            src="https://i.pravatar.cc/300"
            alt="Profile"
          />

          <Stack spacing={5} textAlign={{ base: "center", md: "left" }}>
            <Heading color={headingColor}>About Me</Heading>
            <Text color={textColor}>
              I'm a passionate full stack web developer focused on building
              clean, responsive and high performance web apps using modern
              technologies.
            </Text>
            <Text color={subTextColor}>
              I enjoy learning new tech, building projects and contributing to
              open-source.
            </Text>
          </Stack>
        </Flex>

        {/* ================= TECH STACK MARQUEE ================= */}
        <Box mt={20} overflow="hidden">
          <Heading textAlign="center" mb={8} color={headingColor}>
            Tech Stack
          </Heading>

          <MotionFlex
            gap={10}
            align="center"
            width="max-content"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <Flex
                key={index}
                direction="column"
                align="center"
                minW="120px"
                cursor="pointer"
                onClick={(e) => handleClick(tech, e)}
              >
                <Box position="relative">
                  <CircularProgress
                    value={tech.percentage}
                    size="90px"
                    thickness="8px"
                    color="teal.500"
                  />
                  <Icon
                    as={tech.icon}
                    boxSize="10"
                    color={headingColor}
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                  />
                </Box>
                <Text mt={2} fontSize="sm" color={subTextColor}>
                  {tech.label}
                </Text>
              </Flex>
            ))}
          </MotionFlex>
        </Box>

        {/* ================= MODAL ================= */}
        {selectedSkill && (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <MotionModalContent
              initial={{
                opacity: 0,
                scale: 0.8,
                x: clickedPosition
                  ? clickedPosition.left +
                    clickedPosition.width / 2 -
                    window.innerWidth / 2
                  : 0,
                y: clickedPosition
                  ? clickedPosition.top +
                    clickedPosition.height / 2 -
                    window.innerHeight / 2
                  : 0,
              }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ModalHeader>{selectedSkill.label}</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text color={textColor}>
                  Proficiency level:{" "}
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
