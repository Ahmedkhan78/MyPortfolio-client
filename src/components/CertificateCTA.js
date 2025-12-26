import { Box, Text, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const CertificatesCTA = ({ variant = "cta" }) => {
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const bg = useColorModeValue("teal.500", "teal.400");
  const hoverBgCTA = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("white", "gray.900");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/certificate"); // React route pe redirect
  };

  // Navbar link
  if (variant === "nav") {
    return (
      <Link
        px={2}
        py={1}
        rounded="md"
        _hover={{ bg: hoverBg, textDecoration: "none" }}
        cursor="pointer"
        onClick={handleClick}
      >
        Certificates
      </Link>
    );
  }

  // CTA button
  return (
    <MotionBox
      onClick={handleClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={3}
      mt={6}
      px={8}
      py={4}
      borderRadius="full"
      bg={bg}
      color={textColor}
      fontWeight="bold"
      width="fit-content"
      mx="auto"
      cursor="pointer"
      whileHover={{ scale: 1.08, backgroundColor: hoverBgCTA }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Text>View Certificates</Text>
      <Icon as={ExternalLinkIcon} />
    </MotionBox>
  );
};

export default CertificatesCTA;
