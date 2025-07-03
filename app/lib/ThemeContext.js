// context/ThemeContext.js
import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

// Define light and dark theme colors
const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#4B0082", // Violet
  secondary: "#D3D3D3", // Light gray
};

const darkTheme = {
  background: "#121212", // Dark background
  text: "#ffffff", // White text
  primary: "#7B68EE", // Medium Slate Blue
  secondary: "#4B4B4B", // Dark gray
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Get system-wide theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
