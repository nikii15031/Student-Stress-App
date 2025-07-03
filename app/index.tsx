import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import LandingScreen from "./screen/LandingScreen";
import { ThemeProvider } from "./lib/ThemeContext";
import ProfileScreen from "./screen/tabs/ProfileScreen"

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="LANDING" component={LandingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default Index;
