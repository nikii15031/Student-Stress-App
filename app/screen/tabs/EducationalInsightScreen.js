// EducationalInsightScreen.js
import React, { useState, useEffect } from "react";
import LinkPreview from "react-native-link-preview"; // Updated import
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { useTheme } from "../../lib/ThemeContext";

const sections = [
  {
    id: 1,
    title: "Stress Management Articles",
    type: "articles",
    data: [
      {
        title: "Practical Strategies to Reduce Daily Stress (Real-Life Tips)",
        url: "https://www.verywellmind.com/ways-to-reduce-stress-3145197",
      },
      {
        title: "Stress Relief Tips for Busy People (Mayo Clinic Advice)",
        url: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relief/art-20044456",
      },
      {
        title: "11 Tips to Manage Stress in Everyday Life (Mindful Approach)",
        url: "https://www.mindful.org/11-tips-to-manage-stress/",
      },
      {
        title: "Managing Academic Stress: 10 Tips for Students",
        url: "https://www.topuniversities.com/student-info/advice/managing-academic-stress",
      },
    ],
  },
  {
    id: 2,
    title: "Coping Strategies",
    type: "text",
    data: [
      "Practice deep breathing exercises to lower anxiety and improve sleep quality (Psychological & Physiological).",
      "Maintain a gratitude journal to boost self-esteem and counter depressive thoughts (Psychological).",
      "Use progressive muscle relaxation to ease muscle tension and headaches (Physiological).",
      "Try mindfulness meditation to stay centered amidst academic pressures (Psychological & Academic).",
      "Connect with supportive friends and engage in extracurricular activities to counter peer pressure (Social).",
      "Engage in outdoor activities like walking or cycling to refresh your mind (Physiological & Environmental).",
      "Consider professional counseling or digital apps like Headspace for guided relaxation (Psychological & Social).",
    ],
  },
  {
    id: 3,
    title: "Relaxing Videos & Motivation",
    type: "videos",
    data: [
      {
        title:
          "5-Minute Guided Meditation for Instant Stress Relief (Mind & Body)",
        url: "https://youtu.be/inpok4MKVLM",
      },
      {
        title: "Kelly McGonigal: How to Make Stress Your Friend (TED Talk)",
        url: "https://youtu.be/RcGyVTAoXEU",
      },
      {
        title:
          "Morning Motivation for a Positive Start (Real-Life Inspiration)",
        url: "https://youtu.be/LqXZ628YNj4",
      },
      {
        title: "Relaxing Piano Music for Deep Focus and Stress Relief",
        url: "https://youtu.be/2OEL4P1Rz04",
      },
    ],
  },
  {
    id: 4,
    title: "Healthy Habits",
    type: "text",
    data: [
      "Maintain a balanced diet to support mental and physical health (Physiological & Psychological).",
      "Get 7-9 hours of sleep nightly to enhance sleep quality and reduce stress (Physiological).",
      "Stay hydrated to boost energy levels and concentration (Physiological).",
      "Limit caffeine and alcohol intake to manage anxiety and blood pressure (Physiological & Psychological).",
      "Take regular screen breaks to reduce eye strain and improve focus (Academic & Physiological).",
      "Schedule regular breaks during work or study to prevent burnout (Academic & Physiological).",
      "Incorporate mindfulness and relaxation techniques into your daily routine (Psychological & Environmental).",
    ],
  },
  {
    id: 5,
    title: "Yoga & Exercise",
    type: "videos",
    data: [
      {
        title: "Morning Yoga Routine for Holistic Wellness (Mind & Body)",
        url: "https://youtu.be/VaoV1PrYFV4",
      },
      {
        title:
          "Office Stretches to Relieve Tension and Boost Focus (Quick Fix)",
        url: "https://youtu.be/tAUf7aajBWE",
      },
      {
        title:
          "Full Body Workout to Energize and Reduce Stress (Real-Life Routine)",
        url: "https://youtu.be/MLSSn6y0e-M",
      },
      {
        title: "Yoga for Stress Relief and Relaxation (Yoga With Adriene)",
        url: "https://youtu.be/v7AYKMP6rOE",
      },
    ],
  },
];

// Reusable PreviewBox for both videos and articles
const PreviewBox = ({ title, url, type, theme }) => { // Add theme prop
  const [articleThumbnail, setArticleThumbnail] = useState(null);

  useEffect(() => {
    if (type === "articles") {
      LinkPreview.getPreview(url)
        .then((data) => {
          const thumb =
            data?.images && data.images.length > 0 ? data.images[0] : null;
          if (thumb) {
            setArticleThumbnail(thumb);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [url, type]);

  // For videos, extract a thumbnail from the YouTube URL
  const getYoutubeThumbnail = (url) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("watch?v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // Updated article thumbnail handling
  const getArticleThumbnail = () => {
    return (
      articleThumbnail ||
      "https://via.placeholder.com/400x200.png?text=Loading+Preview..."
    );
  };

  const thumbnailUrl =
    type === "video"
      ? getYoutubeThumbnail(url)
      : type === "articles"
      ? getArticleThumbnail()
      : null;

  return (
    <Pressable 
      style={[styles.previewBox, { backgroundColor: theme.secondary }]} 
      onPress={() => Linking.openURL(url)}
    >
      <View style={styles.previewImageContainer}>
        {thumbnailUrl ? (
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.fallbackIconContainer, { backgroundColor: theme.primary }]}>
            <Text style={[styles.fallbackIcon, { color: theme.text }]}>📄</Text>
          </View>
        )}
        {type === "video" && (
          <View style={[styles.playIconContainer, { backgroundColor: theme.primary }]}>
            <Text style={[styles.playIcon, { color: theme.background }]}>▶</Text>
          </View>
        )}
      </View>
      <Text style={[styles.previewTitle, { color: theme.text, backgroundColor: theme.background }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const EducationalInsightScreen = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const { theme } = useTheme(); // Get the current theme

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text
        style={{
          fontSize: 26,
          fontFamily: fonts.Bold,
          color: theme.primary, // Use theme primary color
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Educational Insights
      </Text>

      {sections.map((section) => (
        <View 
          key={section.id} 
          style={[
            styles.sectionContainer, 
            { 
              backgroundColor: theme.background,
              shadowColor: theme.text,
            }
          ]}
        >
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: theme.background }]}
            onPress={() =>
              setSelectedSection(
                selectedSection === section.id ? null : section.id
              )
            }
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
            <Text style={[styles.arrow, { color: theme.primary }]}>
              {selectedSection === section.id ? "▼" : "▶"}
            </Text>
          </TouchableOpacity>

          {selectedSection === section.id && (
            <View style={styles.sectionContent}>
              {section.type === "articles" &&
                section.data.map((item, index) => (
                  <PreviewBox
                    key={index}
                    title={item.title}
                    url={item.url}
                    type="articles"
                    theme={theme} // Pass theme to PreviewBox
                  />
                ))}

              {section.type === "text" &&
                section.data.map((item, index) => (
                  <Text 
                    key={index} 
                    style={[
                      styles.textItem, 
                      { 
                        color: theme.text,
                        borderLeftColor: theme.primary,
                      }
                    ]}
                  >
                    • {item}
                  </Text>
                ))}

              {section.type === "videos" &&
                section.data.map((item, index) => (
                  <PreviewBox
                    key={index}
                    title={item.title}
                    url={item.url}
                    type="video"
                    theme={theme} // Pass theme to PreviewBox
                  />
                ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

// Update styles to use theme colors dynamically
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    letterSpacing: 0.3,
  },
  arrow: {
    fontSize: 16,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textItem: {
    fontFamily: fonts.Regular,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 8,
    borderLeftWidth: 2,
    marginVertical: 4,
  },
  previewBox: {
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  previewImageContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: 150,
  },
  fallbackIconContainer: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackIcon: {
    fontSize: 40,
  },
  playIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  playIcon: {
    fontSize: 14,
    marginLeft: 2,
  },
  previewTitle: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    padding: 12,
  },
});

export default EducationalInsightScreen;