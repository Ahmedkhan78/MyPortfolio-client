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
  CircularProgressLabel,
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
  const [clickedPosition, setClickedPosition] = useState(null); // Track the position of the clicked icon
  const headingColor = useColorModeValue("teal.700", "teal.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  const handleClick = (tech, event) => {
    setSelectedSkill(tech);
    const { top, left, width, height } = event.target.getBoundingClientRect(); // Get the position of the clicked icon
    setClickedPosition({ top, left, width, height });
    onOpen();
  };

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
          direction={{ base: "column", md: "row" }} // Stack items vertically on small screens
          align="center"
          justify="center"
          gap={{ base: 8, md: 10 }} // Adjust gap for different screen sizes
        >
          <Box flex="1">
            <Image
              borderRadius="full"
              boxSize={{ base: "150px", md: "250px" }} // Make the profile image smaller on mobile
              src="https://i.pravatar.cc/300"
              alt="Profile"
              mx="auto"
            />
          </Box>

          <Stack
            spacing={5}
            flex="2"
            textAlign={{ base: "center", md: "left" }} // Center text on small screens
          >
            <Heading as="h2" size="xl" color={headingColor}>
              About Me
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
              I'm a passionate full stack web developer with a love for building
              clean, responsive, and performant web apps. With solid experience
              in React, Node.js, and modern design systems like Chakra UI, I
              focus on crafting excellent user experiences.
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color={subTextColor}>
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
          <Wrap justify="center" spacing={{ base: 4, md: 8 }}>
            {" "}
            {/* Adjust spacing for different screen sizes */}
            {techStack.map((tech) => (
              <WrapItem key={tech.label}>
                <Flex
                  direction="column"
                  align="center"
                  position="relative"
                  onClick={(e) => handleClick(tech, e)} // Pass event to get the position
                  _hover={{
                    cursor: "pointer", // Make the icon clickable on hover
                  }}
                >
                  {/* Tooltip for hover */}
                  <Tooltip
                    label={`${tech.percentage}%`}
                    aria-label="Skill percentage"
                    hasArrow
                    placement="top"
                  >
                    <Box position="relative" display="inline-block" mb={2}>
                      <CircularProgress
                        value={tech.percentage}
                        color="teal.500"
                        size={{ base: "100px", md: "120px" }} // Adjust size for mobile
                        thickness="8px"
                        trackColor="gray.200"
                        _hover={{
                          transform: "scale(1.1)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {/* Percentage Label initially hidden, visible on hover */}
                        <CircularProgressLabel
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="lg"
                          fontWeight="bold"
                          color={headingColor}
                          opacity={0} // Initially hide percentage
                          _groupHover={{ opacity: 1 }} // Show percentage on hover
                          transition="opacity 0.3s ease"
                        >
                          {tech.percentage}%
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Icon
                        as={tech.icon}
                        boxSize={{ base: "8", md: "12" }} // Adjust icon size for mobile
                        color={headingColor}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex={2}
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
        </Box>

        {/* Modal for displaying skill info */}
        {selectedSkill && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <MotionModalContent
              initial={{
                opacity: 0,
                scale: 0.8,
                // Initial position of the modal (icon position)
                x: clickedPosition
                  ? clickedPosition.left +
                    clickedPosition.width / 2 -
                    window.innerWidth / 2
                  : 0, // Position from clicked icon (x axis)
                y: clickedPosition
                  ? clickedPosition.top +
                    clickedPosition.height / 2 -
                    window.innerHeight / 2
                  : 0, // Position from clicked icon (y axis)
              }}
              animate={{
                opacity: 1,
                scale: 1,
                // Move to the center of the screen
                x: 0,
                y: 0,
              }}
              exit={{
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
              transition={{ duration: 0.6 }}
            >
              <ModalHeader>{selectedSkill.label}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontSize="lg" color={textColor}>
                  This skill represents {selectedSkill.label}. I have a
                  proficiency of <strong>{selectedSkill.percentage}%</strong> in
                  this technology.
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
