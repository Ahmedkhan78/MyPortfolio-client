import React, { useContext, useEffect, useState, useRef } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const secretCode = process.env.REACT_APP_SECRET_CODE;
export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to control login button visibility for secret code
  const [showLogin, setShowLogin] = useState(false);

  // To keep track of typed keys
  const typedKeysRef = useRef("");

  useEffect(() => {
    // If user is logged in, no need for secret code
    if (user) {
      setShowLogin(false);
      return;
    }

    // Handler for keydown event
    const handleKeyDown = (e) => {
      if (!e.key) return; // skip if key is undefined
      typedKeysRef.current += e.key.toLowerCase();

      if (typedKeysRef.current.length > secretCode.length) {
        typedKeysRef.current = typedKeysRef.current.slice(
          typedKeysRef.current.length - secretCode.length
        );
      }

      if (typedKeysRef.current === secretCode) {
        setShowLogin(true);
        typedKeysRef.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user]);

  const handleLogout = () => {
    logout();
    setShowLogin(false); // hide login button after logout
    navigate("/");
  };

  const NavLink = ({ children, to, onClick }) => (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: hoverBg,
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <Box bg={bgColor} px={4} shadow="md" zIndex="999" position="relative">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Logo */}
        <Box fontWeight="bold" fontSize="xl">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            Ahmed.Dev
          </Link>
        </Box>

        {/* Desktop Nav */}
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {user?.role === "admin" && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                  size="sm"
                >
                  Admin
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate("/admin/projects")}>
                    Projects
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/admin/contacts")}>
                    Contacts
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            {/* Show login ONLY if user NOT logged in AND secret code was typed */}
            {!user && showLogin && <NavLink to="/login">Login</NavLink>}

            {user && (
              <Button size="sm" colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </HStack>

          {/* Color mode toggle */}
          <IconButton
            size="md"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />
        </HStack>

        {/* Mobile Hamburger */}
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <NavLink to="/" onClick={onClose}>
              Home
            </NavLink>
            <NavLink to="/projects" onClick={onClose}>
              Projects
            </NavLink>
            <NavLink to="/about" onClick={onClose}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={onClose}>
              Contact
            </NavLink>

            {user?.role === "admin" && (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                  size="sm"
                  width="100%"
                  textAlign="left"
                >
                  Admin
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/projects");
                      onClose();
                    }}
                  >
                    Projects
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/admin/contacts");
                      onClose();
                    }}
                  >
                    Contacts
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            {/* Mobile Login: same secret code logic */}
            {!user && showLogin && (
              <NavLink to="/login" onClick={onClose}>
                Login
              </NavLink>
            )}

            {user && (
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  handleLogout();
                  onClose();
                }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
