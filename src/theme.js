// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light", // Ya "dark" if you want default dark
  useSystemColorMode: false, // Don't follow OS theme, manual only
};

const theme = extendTheme({ config });

export default theme;
