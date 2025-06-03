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
import secrets from "../config/secrets";

const githubLink = secrets.github;
const linkedIn = secrets.linkedin;
const mail = `mailto:${secrets.email}`;
const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.600", "gray.300")}
      py={6}
      px={4}
      position={"relative"}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
      >
        <Text mb={{ base: 4, md: 0 }}>
          © {new Date().getFullYear()} Ahmed Hasan. All rights reserved.
        </Text>

        <Flex gap={4}>
          <Link href={githubLink} isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link href={linkedIn} isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              size="lg"
            />
          </Link>
          <Link href={mail} isExternal>
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
