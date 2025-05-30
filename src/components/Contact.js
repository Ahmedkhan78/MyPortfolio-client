// src/components/Contact.js
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
} from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box
      id="contact"
      maxW="600px"
      mx="auto"
      py={16}
      px={4}
      position="relative"
      zIndex={1}
    >
      <Heading as="h2" mb={8} textAlign="center">
        Contact Me
      </Heading>

      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input placeholder="Enter your name" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea placeholder="Type your message..." rows={6} />
        </FormControl>

        <Button
          colorScheme="teal"
          width="full"
          mt={4}
          _hover={{ bg: "teal.600" }}
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
