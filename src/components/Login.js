import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      login(response.data.token);
      setError("");
      navigate("/");
    } catch (err) {
      setError("Invalid credentials."); // This shows when API fails login
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
        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
