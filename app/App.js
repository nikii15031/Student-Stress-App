// App.js
import React from "react";
import { ThemeProvider } from "./lib/ThemeContext"; // Import the ThemeProvider
import Index from "./index"; // Assuming your app's entry point is Index
import LandingScreen from "./screen/LandingScreen";

const App = () => {
  return (
    <ThemeProvider>
      <Index />
      <LandingScreen />
    </ThemeProvider>
  );
};

export default App;
  