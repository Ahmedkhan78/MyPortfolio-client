import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useColorMode } from "@chakra-ui/react";
import { loadFull } from "tsparticles";

const Particle = () => {
  const { colorMode } = useColorMode();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particleColor = colorMode === "light" ? "#38B2AC" : "#ffffff";
  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: false, mode: "push" },
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
              grab: { distance: 300 },
            },
          },
          particles: {
            color: { value: particleColor },
            links: {
              color: particleColor,
              distance: 300,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 5,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 90,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Particle;
