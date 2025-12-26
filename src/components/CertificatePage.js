// src/pages/CertificatePage.jsx
import { useEffect, useState } from "react";
import { Box, Spinner, Center, Text } from "@chakra-ui/react";
import api from "../utils/api";

const CertificatePage = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await api.get("/certificate"); // backend se JSON fetch
        setLink(res.data.link); // assume backend: { link: "https://..." }
      } catch (err) {
        console.error("Failed to fetch certificate link", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, []);

  if (loading) {
    return (
      <Center minH="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!link) {
    return (
      <Center minH="80vh">
        <Text>Unable to load certificates.</Text>
      </Center>
    );
  }

  return (
    <Box w="100%" minH="80vh">
      <iframe
        src={link}
        title="Certificates"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </Box>
  );
};

export default CertificatePage;
