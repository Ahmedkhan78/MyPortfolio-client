import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (!response.data?.token) {
        throw new Error("Authentication token was not returned.");
      }

      login(response.data.token);

      // Login successful.
      // Remove temporary TOTP gate.
      sessionStorage.removeItem("loginUnlockToken");
      sessionStorage.removeItem("loginUnlockExpiresAt");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      setError(err.response?.data?.error || err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      shadow="md"
    >
      <VStack as="form" spacing={4} onSubmit={handleLogin}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <Text color="red.500">{error}</Text>}

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
