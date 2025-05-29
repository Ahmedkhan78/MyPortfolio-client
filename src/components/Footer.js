// src/components/Footer.js
import React from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.600", "gray.300")}
      py={6}
      px={4}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Text mb={{ base: 4, md: 0 }}>
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </Text>

        <Flex gap={4}>
          <Link href="https://github.com/yourusername" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link href="https://linkedin.com/in/yourusername" isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link href="mailto:youremail@example.com" isExternal>
            <IconButton
              aria-label="Email"
              icon={<FaEnvelope />}
              variant="ghost"
              size="lg"
            />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
