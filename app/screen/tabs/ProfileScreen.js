import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useTheme } from "../../lib/ThemeContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "../../lib/supabase";
import { launchImageLibrary } from "react-native-image-picker";
import colors from "../../utils/colors";

const ProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [user, setUser] = React.useState(null);
  const [imageUri, setImageUri] = React.useState(null);
  const [editSocials, setEditSocials] = React.useState(false);
  const [socialLinks, setSocialLinks] = React.useState({
    instagram: "@guest123",
    twitter: "@guestTweet@092",
    linkedin: "linkedin.com/in/guest123",
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Image Picker Error", response.errorMessage);
        return;
      }
      if (response.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const userName = user?.email ? user.email.split("@")[0] : "User";
  const firstLetter = userName.charAt(0).toUpperCase();
  const creationDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePick}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={[styles.username, { color: theme.text }]}>{userName}</Text>
        <Text style={[styles.email, { color: theme.secondaryText }]}>
          {user?.email}
        </Text>
        <Text style={[styles.email, { color: theme.secondaryText }]}>
          Joined on: {creationDate}
        </Text>
      </View>

      {/* Social Media Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Social Media</Text>
          <TouchableOpacity onPress={() => setEditSocials(!editSocials)}>
            <MaterialIcons name={editSocials ? "check" : "edit"} size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {/* Instagram */}
        <View style={styles.socialRow}>
          <FontAwesome name="instagram" size={20} color="#E1306C" />
          {editSocials ? (
            <TextInput
              value={socialLinks.instagram}
              onChangeText={(text) => setSocialLinks({ ...socialLinks, instagram: text })}
              style={[styles.socialInput, { color: theme.text, borderColor: theme.border }]}
              placeholder="Instagram"
              placeholderTextColor={theme.secondaryText}
            />
          ) : (
            <Text style={[styles.socialText, { color: theme.secondaryText }]}>
              {socialLinks.instagram}
            </Text>
          )}
        </View>

        {/* Twitter */}
        <View style={styles.socialRow}>
          <FontAwesome name="twitter" size={20} color="#1DA1F2" />
          {editSocials ? (
            <TextInput
              value={socialLinks.twitter}
              onChangeText={(text) => setSocialLinks({ ...socialLinks, twitter: text })}
              style={[styles.socialInput, { color: theme.text, borderColor: theme.border }]}
              placeholder="Twitter"
              placeholderTextColor={theme.secondaryText}
            />
          ) : (
            <Text style={[styles.socialText, { color: theme.secondaryText }]}>
              {socialLinks.twitter}
            </Text>
          )}
        </View>

        {/* LinkedIn */}
        <View style={styles.socialRow}>
          <FontAwesome name="linkedin" size={20} color="#0077B5" />
          {editSocials ? (
            <TextInput
              value={socialLinks.linkedin}
              onChangeText={(text) => setSocialLinks({ ...socialLinks, linkedin: text })}
              style={[styles.socialInput, { color: theme.text, borderColor: theme.border }]}
              placeholder="LinkedIn"
              placeholderTextColor={theme.secondaryText}
            />
          ) : (
            <Text style={[styles.socialText, { color: theme.secondaryText }]}>
              {socialLinks.linkedin}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: "fonts.Bold",
    marginLeft: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: colors.white,
    fontSize: 40,
    fontFamily: "fonts.Bold",
  },
  username: {
    fontSize: 22,
    fontFamily: "fonts.Bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    fontFamily: "fonts.Regular",
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "fonts.Bold",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  socialText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "fonts.Regular",
  },
  socialInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: "fonts.Regular",
    paddingVertical: 2,
  },
});

export default ProfileScreen;
