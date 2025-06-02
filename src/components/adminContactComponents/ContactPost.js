import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Text, Spinner, Button } from "@chakra-ui/react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

const ContactPost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchContact = async () => {
      try {
        const res = await api.get(`/contact/${id}`); // backend endpoint to get single contact by id
        setContact(res.data);
      } catch (err) {
        console.error("Failed to fetch contact:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, user, navigate]);

  if (!user || user.role !== "admin") return null;

  if (loading) return <Spinner />;

  if (!contact)
    return (
      <Box p={6}>
        <Text>No message found.</Text>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );

  return (
    <Box
      maxW="4xl"
      mx="auto"
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={4}>Contact Message Details</Heading>
      <Text>
        <strong>Name:</strong> {contact.name}
      </Text>
      <Text>
        <strong>Email:</strong> {contact.email}
      </Text>
      <Text mt={4}>
        <strong>Message:</strong>
      </Text>
      <Text whiteSpace="pre-wrap" mb={4}>
        {contact.message}
      </Text>
      <Text fontSize="sm" color="gray.600">
        <strong>Received:</strong>{" "}
        {contact.timestamp && contact.timestamp._seconds
          ? new Date(contact.timestamp._seconds * 1000).toLocaleString()
          : "Date not available"}
      </Text>
      <Button mt={6} onClick={() => navigate(-1)}>
        Back to Contact List
      </Button>
    </Box>
  );
};

export default ContactPost;
