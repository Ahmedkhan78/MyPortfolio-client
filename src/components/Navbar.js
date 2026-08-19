import React, { useContext, useEffect, useRef, useState } from "react";

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
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
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
import secrets from "../config/secrets";
import CertificatesCTA from "../components/CertificatesCTA";

const secretCode = secrets.secretCode;

const UNLOCK_DURATION = 5 * 60 * 1000;

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isTotpOpen,
    onOpen: onTotpOpen,
    onClose: onTotpClose,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  // ======================================================
  // LOGIN VISIBILITY
  // ======================================================

  const [showLogin, setShowLogin] = useState(() => {
    const unlockToken = sessionStorage.getItem("loginUnlockToken");
    const expiresAt = Number(sessionStorage.getItem("loginUnlockExpiresAt"));

    if (!unlockToken || !expiresAt) {
      return false;
    }

    if (Date.now() >= expiresAt) {
      sessionStorage.removeItem("loginUnlockToken");
      sessionStorage.removeItem("loginUnlockExpiresAt");

      return false;
    }

    return true;
  });

  // ======================================================
  // SECRET CODE
  // ======================================================

  const typedKeysRef = useRef("");

  // ======================================================
  // TOTP STATE
  // ======================================================

  const [totpCode, setTotpCode] = useState("");
  const [totpError, setTotpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // ======================================================
  // SECRET CODE LISTENER
  // ======================================================

  useEffect(() => {
    if (user) {
      typedKeysRef.current = "";
      setShowLogin(false);
      return;
    }

    if (!secretCode) {
      console.error("Secret code is not configured.");
      return;
    }

    const handleKeyDown = (e) => {
      if (!e.key) return;

      // Ignore modifier/special keys
      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "Meta" ||
        e.key === "CapsLock" ||
        e.key === "Tab" ||
        e.key === "Escape"
      ) {
        return;
      }

      typedKeysRef.current += e.key.toLowerCase();

      if (typedKeysRef.current.length > secretCode.length) {
        typedKeysRef.current = typedKeysRef.current.slice(-secretCode.length);
      }

      // Secret entered -> open Authenticator modal
      if (typedKeysRef.current === secretCode.toLowerCase()) {
        typedKeysRef.current = "";

        setTotpCode("");
        setTotpError("");

        onTotpOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, onTotpOpen]);

  // ======================================================
  // UNLOCK EXPIRATION
  // ======================================================

  useEffect(() => {
    if (!showLogin) {
      return;
    }

    const expiresAt = Number(sessionStorage.getItem("loginUnlockExpiresAt"));

    if (!expiresAt) {
      setShowLogin(false);
      return;
    }

    const remaining = expiresAt - Date.now();

    if (remaining <= 0) {
      sessionStorage.removeItem("loginUnlockToken");
      sessionStorage.removeItem("loginUnlockExpiresAt");

      setShowLogin(false);

      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.removeItem("loginUnlockToken");
      sessionStorage.removeItem("loginUnlockExpiresAt");

      setShowLogin(false);
    }, remaining);

    return () => {
      clearTimeout(timer);
    };
  }, [showLogin]);

  // ======================================================
  // USER LOGGED IN
  // ======================================================

  useEffect(() => {
    if (user) {
      setShowLogin(false);

      sessionStorage.removeItem("loginUnlockToken");
      sessionStorage.removeItem("loginUnlockExpiresAt");
    }
  }, [user]);

  // ======================================================
  // TOTP VERIFY
  // ======================================================

  const handleTotpVerify = async () => {
    setTotpError("");

    if (!/^\d{6}$/.test(totpCode)) {
      setTotpError("Enter the 6-digit code from your Authenticator.");

      return;
    }

    setIsVerifying(true);

    try {
      /*
       * IMPORTANT:
       * TOTP verification happens on the BACKEND.
       *
       * Do NOT import otplib here.
       * Do NOT put ADMIN_TOTP_SECRET in React.
       */

      const response = await fetch(`${secrets.apiBase}/auth/confirm-mfa`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          code: totpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid authenticator code.");
      }

      if (!data.success) {
        throw new Error(data.error || "Authenticator verification failed.");
      }

      // ==================================================
      // MFA SUCCESS
      // ==================================================

      const expiresAt = Date.now() + UNLOCK_DURATION;

      /*
       * This is ONLY a temporary frontend marker
       * which allows /login to be displayed.
       *
       * Real authentication happens at:
       * POST /auth/login
       */

      sessionStorage.setItem("loginUnlockToken", "totp-verified");

      sessionStorage.setItem("loginUnlockExpiresAt", String(expiresAt));

      setShowLogin(true);

      setTotpCode("");
      setTotpError("");

      onTotpClose();
    } catch (error) {
      console.error("TOTP verification failed:", error);

      setTotpError(error.message || "Unable to verify authenticator code.");
    } finally {
      setIsVerifying(false);
    }
  };

  // ======================================================
  // CLOSE TOTP
  // ======================================================

  const handleTotpClose = () => {
    if (isVerifying) {
      return;
    }

    setTotpCode("");
    setTotpError("");

    onTotpClose();
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    logout();

    sessionStorage.removeItem("loginUnlockToken");
    sessionStorage.removeItem("loginUnlockExpiresAt");

    setShowLogin(false);

    typedKeysRef.current = "";

    navigate("/");
  };

  // ======================================================
  // NAV LINK
  // ======================================================

  const NavLink = ({ children, to, onClick }) => (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: hoverBg,
      }}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  // ======================================================
  // UI
  // ======================================================

  return (
    <>
      <Box bg={bgColor} px={4} shadow="md" zIndex="999" position="relative">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* ==================================================
              LOGO
          ================================================== */}

          <Box fontWeight="bold" fontSize="xl">
            <Link
              as={RouterLink}
              to="/"
              _hover={{
                textDecoration: "none",
              }}
            >
              Ahmed.Dev
            </Link>
          </Box>

          {/* ==================================================
              DESKTOP NAV
          ================================================== */}

          <HStack spacing={8} alignItems="center">
            <HStack
              as="nav"
              spacing={4}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              <NavLink to="/">Home</NavLink>

              <NavLink to="/projects">Projects</NavLink>

              <NavLink to="/about">About</NavLink>

              <NavLink to="/contact">Contact</NavLink>

              <CertificatesCTA variant="nav" />

              {/* ==================================================
                  ADMIN
              ================================================== */}

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

                    <MenuItem onClick={() => navigate("/admin/certificate")}>
                      Certificates
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}

              {/* ==================================================
                  LOGIN
                  ONLY VISIBLE AFTER TOTP
              ================================================== */}

              {!user && showLogin && <NavLink to="/login">Login</NavLink>}

              {/* ==================================================
                  LOGOUT
              ================================================== */}

              {user && (
                <Button size="sm" colorScheme="red" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </HStack>

            {/* ==================================================
                COLOR MODE
            ================================================== */}

            <IconButton
              size="md"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
            />
          </HStack>

          {/* ==================================================
              MOBILE HAMBURGER
          ================================================== */}

          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{
              md: "none",
            }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        {isOpen && (
          <Box
            pb={4}
            display={{
              md: "none",
            }}
          >
            <Stack as="nav" spacing={4}>
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

              <CertificatesCTA variant="nav" onClick={onClose} />

              {/* ==================================================
                  MOBILE ADMIN
              ================================================== */}

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

                    <MenuItem
                      onClick={() => {
                        navigate("/admin/certificate");
                        onClose();
                      }}
                    >
                      Certificates
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}

              {/* ==================================================
                  MOBILE LOGIN
              ================================================== */}

              {!user && showLogin && (
                <NavLink to="/login" onClick={onClose}>
                  Login
                </NavLink>
              )}

              {/* ==================================================
                  MOBILE LOGOUT
              ================================================== */}

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

      {/* ======================================================
          TOTP MODAL
      ====================================================== */}

      <Modal isOpen={isTotpOpen} onClose={handleTotpClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Authenticator Verification</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Text mb={3}>
              Enter the 6-digit code from your Authenticator app.
            </Text>

            <Input
              autoFocus
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              value={totpCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);

                setTotpCode(value);
                setTotpError("");
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  totpCode.length === 6 &&
                  !isVerifying
                ) {
                  handleTotpVerify();
                }
              }}
            />

            {totpError && (
              <Text color="red.500" fontSize="sm" mt={2}>
                {totpError}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              variant="ghost"
              onClick={handleTotpClose}
              isDisabled={isVerifying}
            >
              Cancel
            </Button>

            <Button
              colorScheme="blue"
              onClick={handleTotpVerify}
              isDisabled={totpCode.length !== 6 || isVerifying}
              isLoading={isVerifying}
            >
              Verify
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
