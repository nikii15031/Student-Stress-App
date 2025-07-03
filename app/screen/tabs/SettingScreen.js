import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
  Linking
} from "react-native";
import { Audio } from 'expo-av';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { useTheme } from "../../lib/ThemeContext";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

const SettingScreen = () => {
  // const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [sound, setSound] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  const userName = user?.email ? user.email.split("@")[0] : "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const loadSound = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/ui-bell.mp3')
        );
        setSound(sound);
      } catch (error) {
        console.log("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  async function playSound() {
    if (!isSoundEnabled) return;
    
    try {
      console.log("Sound is playing");
      await sound.replayAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  }

  const toggleSound = async () => {
    const newValue = !isSoundEnabled;

    if (newValue && sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    }

    setIsSoundEnabled(newValue);
  };

  const handleLogout = async () => {
    await playSound();
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "Failed to logout.");
    } else {
      navigation.replace("LOGIN");
    }
  };

  const handleChangePassword = async () => {
    if (!user?.email) {
      Alert.alert("Error", "No email associated with this account.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: "myapp://reset-password", // Replace with your app's deep link
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Password Reset",
        "A password reset link has been sent to your email address."
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to send password reset email.");
    }
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.primary }]}>Settings</Text>

      <View style={styles.userIconContainer}>
        <View style={[styles.userIcon, { backgroundColor: theme.primary }]}>
          <Text style={styles.userIconText}>{firstLetter}</Text>
        </View>
        <Text style={[styles.userName, { color: theme.text }]}>{userName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme.text }]}>Preferences</Text>
        <View style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>Dark Mode</Text>
          <Switch
            value={theme.background === "#121212"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.lightGray, true: theme.primary }}
            thumbColor={theme.text}
          />
        </View>
        {/* <View style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            trackColor={{ false: colors.lightGray, true: theme.primary }}
            thumbColor={theme.text}
          />
        </View> */}
        <View style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>Sound</Text>
          <Switch
            value={isSoundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: colors.lightGray, true: theme.primary }}
            thumbColor={theme.text}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme.text }]}>Account</Text>
          <TouchableOpacity 
            style={styles.item} 
            onPress={async () => {
              await playSound();
              navigation.navigate("Profile");
            }}
          >
          <Text style={[styles.itemText, { color: theme.text }]}>Profile</Text>
          <MaterialIcons name="person" size={20} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.item} 
          onPress={handleChangePassword}
        >
          <Text style={[styles.itemText, { color: theme.text }]}>Change Password</Text>
          <MaterialIcons name="key" size={20} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Text style={[styles.itemText, { color: theme.text }]}>Logout</Text>
          <MaterialIcons name="logout" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme.text }]}>About</Text>
        <TouchableOpacity     
          style={styles.item} 
          onPress={() => Linking.openURL('https://yourapp.com/terms')}
        >
          <Text style={[styles.itemText, { color: theme.text }]}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, { color: theme.text }]}>App Version</Text>
          <Text style={{ color: theme.text }}>1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => Linking.openURL('mailto:support@yourapp.com')}
        >
          <Text style={[styles.itemText, { color: theme.text }]}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.item}
          onPress={() => Linking.openURL('market://details?id=com.yourapp')}
        >
          <Text style={[styles.itemText, { color: theme.text }]}>Rate Us ★★★★★</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontFamily: fonts.Bold,
    textAlign: "center",
    marginBottom: 20,
  },
  userIconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userIcon: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  userIconText: {
    color: colors.white,
    fontSize: 36,
    fontFamily: fonts.Bold,
  },
  userName: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontFamily: fonts.Bold,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
});