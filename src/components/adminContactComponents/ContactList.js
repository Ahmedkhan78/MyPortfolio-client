import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  Badge,
  Link,
} from "@chakra-ui/react";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const ContactList = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

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

    fetchContacts();
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
                {contact.timestamp && contact.timestamp._seconds
                  ? new Date(contact.timestamp._seconds * 1000).toLocaleString()
                  : "Date not available"}
              </Badge>

              {/* View Details Link */}
              <Link
                as={RouterLink}
                to={`/admin/projects/contacts/${contact.id}`}
                color="teal.500"
                fontWeight="bold"
                mt={2}
                display="inline-block"
              >
                View Details
              </Link>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ContactList;
