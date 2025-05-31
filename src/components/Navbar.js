import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  useColorMode,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ import AuthContext

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useContext(AuthContext); // ✅ get user
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // ✅ Define Links inside component so user is accessible
  const Links = ["Home", "Projects", "About", "Contact"];
  if (user?.role === "admin") {
    Links.push("Admin");
  }

  const NavLink = ({ children }) => (
    <Link
      as={RouterLink}
      to={
        children === "Home"
          ? "/"
          : children === "Admin"
          ? "/admin/projects"
          : `/${children.toLowerCase()}`
      }
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Link>
  );

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      shadow="md"
      zIndex="999"
      position="relative"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontWeight="bold" fontSize="xl">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            Ahmed.Dev
          </Link>
        </Box>

        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
            {!user ? (
              <NavLink>Login</NavLink>
            ) : (
              <Button size="sm" colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </HStack>

          <IconButton
            size="md"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </HStack>

        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
            {!user ? (
              <NavLink>Login</NavLink>
            ) : (
              <Button size="sm" colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
