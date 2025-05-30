import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  useColorMode,
  Spinner,
  Box,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";

const ParticleLoader = ({ children, loadingTime = 2500 }) => {
  const { colorMode } = useColorMode();
  const [engineLoaded, setEngineLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load particles engine
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      setEngineLoaded(true);
    });

    // Timer to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  const particleColor = colorMode === "light" ? "#000000" : "#ffffff";
  const textColor = useColorModeValue("gray.600", "gray.300");

  const particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: { value: particleColor },
      links: {
        color: particleColor,
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: { default: "bounce" },
      },
      number: { value: 50, density: { enable: true, area: 800 } },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false },
        resize: true,
      },
      modes: {
        grab: { distance: 250, links: { opacity: 0.5 } },
      },
    },
    detectRetina: true,
  };

  if (isLoading) {
    return (
      <Box
        position="relative"
        width="100%"
        height="100vh"
        bg={colorMode === "light" ? "white" : "black"}
      >
        {engineLoaded && (
          <Particles
            id="tsparticles"
            options={particlesOptions}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        )}

        <Flex
          justify="center"
          align="center"
          height="100vh"
          position="relative"
          zIndex={2}
        >
          <Text fontSize={{ base: "2xl", md: "6xl" }} color={textColor}>
            <Typewriter
              options={{
                strings: ["Loading..."],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </Text>
          <Spinner
            size="xl"
            color={colorMode === "light" ? "black" : "teal.300"}
            thickness="5px"
          />
        </Flex>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ParticleLoader;
