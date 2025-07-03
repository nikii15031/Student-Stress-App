// LoginScreen.js
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../lib/supabase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // const handleLogin = () => {
  //   // Default credentials
  //   const defaultUsername = "nikitakishor0112@gmail.com";
  //   const defaultPassword = "niki2000";

  //   // Check if the entered credentials match the default ones
  //   if (email === defaultUsername && password === defaultPassword) {
  //     // Navigate to LandingScreen on successful login
  //     navigation.navigate("LANDING");
  //   } else {
  //     // Optionally handle incorrect login (show an alert, etc.)
  //     alert("Invalid credentials, please try again.");
  //   }
  // };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      // Navigate to the landing page or home screen if login is successful
      navigation.navigate('LANDING');
    }
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.darkPurple}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name={"mail-outline"}
            size={30}
            color={colors.mutedLavender}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.mutedLavender}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"lock"}
            size={30}
            color={colors.mutedLavender}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.mutedLavender}
            secureTextEntry={secureEntery}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setSecureEntery((prev) => !prev)}>
            <SimpleLineIcons
              name={"eye"}
              size={20}
              color={colors.mutedLavender}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.lightLavender,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.vibrantPurple,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.mutedLavender,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.vibrantPurple,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.vibrantPurple,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.vibrantPurple,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.vibrantPurple,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.vibrantPurple,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.vibrantPurple,
    fontFamily: fonts.Bold,
  },
});
