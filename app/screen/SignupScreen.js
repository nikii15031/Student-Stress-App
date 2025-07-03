import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../lib/supabase';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secureEntery, setSecureEntery] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert('Signup failed: ' + error.message);
    } else {
      // You can handle email verification flow if needed
      alert('Signup successful! Please check your email to verify.');
      navigation.navigate('LOGIN');
    }
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
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
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
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.mutedLavender}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.mutedLavender}
            secureTextEntry={secureEntery}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignup}>
          <Text style={styles.loginText}>Sign up</Text>
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
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

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
