import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../lib/ThemeContext"; // Import useTheme hook
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

// Import your pre-built tab pages
import PredictionScreen from "./tabs/PredictionScreen";
import ChartsScreen from "./tabs/ChartsVisualizationScreen";
import EducationalInsightScreen from "./tabs/EducationalInsightScreen";
import SettingScreen from "./tabs/SettingScreen";

const Tab = createBottomTabNavigator();

const LandingScreen = () => {
  const { theme } = useTheme(); // Get current theme from context
  const [backgroundColor, setBackgroundColor] = useState(theme.background);
  const [tabBarStyle, setTabBarStyle] = useState({ backgroundColor: theme.background });

  useEffect(() => {
    setBackgroundColor(theme.background);
    setTabBarStyle({ backgroundColor: theme.background });
  }, [theme]); // Update styles whenever theme changes

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Bottom Tab Navigator */}
      <View style={styles.tabNavigatorContainer}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.vibrantPurple,
            tabBarInactiveTintColor: colors.mutedLavender,
            tabBarStyle, // Dynamically set the tab bar background color based on theme
          }}
        >
          {/* Prediction Tab */}
          <Tab.Screen
            name="Prediction"
            component={PredictionScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="query-stats" size={size} color={color} />
              ),
            }}
          />

          {/* Charts Tab */}
          <Tab.Screen
            name="Charts"
            component={ChartsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="stacked-bar-chart" size={size} color={color} />
              ),
            }}
          />

          {/* Educational Insight Tab */}
          <Tab.Screen
            name="Educational Insight"
            component={EducationalInsightScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="school" size={size} color={color} />
              ),
            }}
          />

          {/* Settings Tab */}
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabNavigatorContainer: {
    flex: 1,
  },
});
