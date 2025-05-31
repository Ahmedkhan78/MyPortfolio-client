import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Spinner, Center } from "@chakra-ui/react";

const RequireAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") navigate("/");
  }, [user, navigate]);

  if (!user) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return user.role === "admin" ? children : null;
};

export default RequireAdmin;
