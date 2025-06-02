import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  Badge,
  Link,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const ContactList = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast({
        title: "Deleted",
        description: "Contact deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Delete failed:", err);
      toast({
        title: "Error",
        description: "Failed to delete contact.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchContacts();
    }
  }, [user]);

  if (!user || user.role !== "admin") return null;

  return (
    <Box maxW="6xl" mx="auto" p={6}>
      <Heading mb={6}>Contact Messages</Heading>

      {loading ? (
        <Spinner />
      ) : contacts.length === 0 ? (
        <Text>No contacts found.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {contacts.map((contact) => (
            <Box
              key={contact.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
            >
              <Text fontWeight="bold">{contact.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {contact.email}
              </Text>
              <Text mt={2}>{contact.message}</Text>
              <Badge mt={2} colorScheme="green">
                {contact.timestamp?._seconds
                  ? new Date(contact.timestamp._seconds * 1000).toLocaleString()
                  : "Date not available"}
              </Badge>

              <Flex mt={4} gap={4}>
                <Link
                  as={RouterLink}
                  to={`/admin/contacts/${contact.id}`}
                  color="teal.500"
                  fontWeight="bold"
                >
                  View Details
                </Link>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ContactList;
