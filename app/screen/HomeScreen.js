import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  return (
    <View style={styles.container}>
      {/* Wavy Corner Images */}
      <Image
        source={require("../assets/wave-corner.png")}
        style={[
          styles.waveCorner,
          styles.topLeftWave,
          {
            width: 230,
            height: 230,
          },
        ]}
      />
      <Image
        source={require("../assets/wave-corner.png")}
        style={[
          styles.waveCorner,
          styles.bottomRightWave,
          {
            transform: [{ rotate: "180deg" }],
            width: 230,
            height: 230,
          },
        ]}
      />

      <Image source={require("../assets/logo_bg.png")} style={[styles.logo]} />
      <Image source={require("../assets/man.png")} style={styles.bannerImage} />
      <Text style={styles.title}>StressLens</Text>
      <Text style={styles.subTitle}>
        StressLens provides a unique "lens" into your daily life, empowering you
        to see the causes of stress clearly and make informed decisions to
        reduce its impact.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.vibrantPurple },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.signupButtonWrapper,
            { backgroundColor: colors.lightLavender },
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingTop: 40,
    position: "relative",
  },
  logo: {
    height: 50,
    width: 200,
    marginVertical: 30,
  },
  bannerImage: {
    marginVertical: 20,
    height: 250,
    width: 231,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.vibrantPurple, // Updated to use vibrant purple
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.mutedLavender, // Soft lavender for text
    fontFamily: fonts.Medium,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 25,
  },
  signupButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 50,
    borderRadius: 25,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    color: colors.darkPurple, // Dark purple for contrast
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  // Wavy Corner Styles
  waveCorner: {
    position: "absolute",
    width: 100, // Adjust the size of the wave image as needed
    height: 100,
    resizeMode: "contain",
  },
  topLeftWave: {
    top: 0,
    left: 0,
  },
  topRightWave: {
    top: 0,
    right: 0,
  },
  bottomLeftWave: {
    bottom: 0,
    left: 0,
  },
  bottomRightWave: {
    bottom: 0,
    right: 0,
  },
});
