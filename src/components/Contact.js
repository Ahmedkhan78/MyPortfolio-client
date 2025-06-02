// src/components/Contact.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import api from "../utils/api";

const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/contact", formData);
      toast({
        title: res.data.message || "Message sent!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box id="contact" maxW="600px" mx="auto" py={16} px={4}>
      <Heading as="h2" mb={8} textAlign="center">
        Contact Me
      </Heading>
      <VStack spacing={5}>
        <FormControl isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message..."
            rows={6}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          width="full"
          mt={4}
          isLoading={loading}
          onClick={handleSubmit}
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
