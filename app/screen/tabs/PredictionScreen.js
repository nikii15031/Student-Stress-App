import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { useTheme } from "../../lib/ThemeContext";

// Define factor groups with their respective features
const factorGroups = {
  Psychological: ["anxiety_level", "self_esteem", "mental_health_history", "depression"],
  Physiological: ["headache", "blood_pressure", "sleep_quality", "breathing_problem"],
  Environmental: ["noise_level", "living_conditions", "safety", "basic_needs"],
  Academic: ["academic_performance", "study_load", "teacher_student_relationship", "future_career_concerns"],
  Social: ["social_support", "peer_pressure", "extracurricular_activities", "bullying"],
};

const factorLimits = {
  anxiety_level: { min: 0, max: 20 },
  self_esteem: { min: 0, max: 30 },
  mental_health_history: { min: 0, max: 1 },
  depression: { min: 0, max: 20 },
  headache: { min: 0, max: 5 },
  blood_pressure: { min: 0, max: 5 },
  sleep_quality: { min: 0, max: 5 },
  breathing_problem: { min: 0, max: 5 },
  noise_level: { min: 0, max: 5 },
  living_conditions: { min: 0, max: 5 },
  safety: { min: 0, max: 5 },
  basic_needs: { min: 0, max: 5 },
  academic_performance: { min: 0, max: 5 },
  study_load: { min: 0, max: 5 },
  teacher_student_relationship: { min: 0, max: 5 },
  future_career_concerns: { min: 0, max: 5 },
  social_support: { min: 0, max: 5 },
  peer_pressure: { min: 0, max: 5 },
  extracurricular_activities: { min: 0, max: 5 },
  bullying: { min: 0, max: 5 },
};

const PredictionScreen = () => {
  const { theme } = useTheme();
  const [selectedGroup, setSelectedGroup] = useState("Physiological");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const groupKeys = Object.keys(factorGroups);

  const [formData, setFormData] = useState(() => {
    const initial = {};
    for (const group of groupKeys) {
      initial[group] = {};
      for (const field of factorGroups[group]) {
        initial[group][field] = "";
      }
    }
    return initial;
  });

  const generateOptions = (field) => {
    const { min, max } = factorLimits[field];
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i.toString());
    }
    return options;
  };

  const handleInputChange = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

const handlePredict = async () => {
  const currentData = formData[selectedGroup];  // Get the selected group data

  // Check if any required field is empty
  for (const [field, value] of Object.entries(currentData)) {
    if (value === "") {
      Alert.alert("Incomplete Data", `Please select a value for ${field.replace(/_/g, " ")}`);
      return;
    }
  }

  try {
    // Send a POST request to the Flask API
    const response = await axios.post("http://192.168.0.102:5000/predict", {
      group: selectedGroup,  // The group name (e.g., Psychological)
      inputs: currentData,   // Data values for that group
    });

    // Handle the prediction result
    if (response.data.prediction !== undefined) {
      const label = response.data.stress_level;
      Alert.alert("Prediction Result", `Predicted Stress Level: ${label}`);
      // const prediction = response.data.prediction;
      // Alert.alert("Prediction Result", `Predicted Stress Level: ${prediction}`);
    } else {
      // In case there's no 'prediction' in the response
      Alert.alert("Error", "Prediction result is missing.");
    }

  } catch (error) {
    console.error("Prediction Error:", error);
    Alert.alert("Error", "Something went wrong during prediction.");
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.primary }]}>Stress Prediction</Text>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Sidebar */}
        <View style={[
          styles.sidebar, 
          { 
            width: sidebarCollapsed ? 50 : "40%",
            backgroundColor: theme.secondary 
          }
        ]}>
          <TouchableOpacity 
            style={[
              styles.collapseButton, 
              { backgroundColor: theme.primary }
            ]} 
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Text style={[styles.collapseButtonText, { color: theme.text }]}>
              {sidebarCollapsed ? "Expand" : "Collapse"}
            </Text>
          </TouchableOpacity>
          {!sidebarCollapsed &&
            groupKeys.map((group) => (
              <TouchableOpacity
                key={group}
                style={[
                  styles.sidebarItem, 
                  { 
                    borderColor: theme.secondary,
                    ...(selectedGroup === group && { 
                      borderColor: theme.primary 
                    })
                  }
                ]}
                onPress={() => {
                  setSelectedGroup(group);
                  setSidebarCollapsed(true);
                }}
              >
                <Text style={[
                  styles.sidebarText, 
                  { color: theme.text },
                  selectedGroup === group && { 
                    color: theme.primary 
                  }
                ]}>
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Form Area */}
        <View style={styles.formArea}>
          <Text style={[styles.header, { color: theme.text }]}>{selectedGroup} Factors</Text>
          <ScrollView contentContainerStyle={styles.formContainer}>
            {factorGroups[selectedGroup].map((field) => {
              const options = generateOptions(field);
              const { min, max } = factorLimits[field];
              return (
                <View key={field} style={styles.inputContainer}>
                  <Text style={[styles.label, { color: theme.text }]}>
                    {field.replace(/_/g, " ")}
                  </Text>
                  <View style={[
                    styles.pickerContainer, 
                    { 
                      borderColor: theme.secondary,
                      backgroundColor: theme.background 
                    }
                  ]}>
                  <Picker
                    selectedValue={formData[selectedGroup][field]}
                    onValueChange={(value) => handleInputChange(selectedGroup, field, value)}
                    style={[styles.picker, { color: theme.text }]}
                    dropdownIconColor={theme.text}
                    mode="dropdown"
                  >
                    <Picker.Item 
                      label={`Select (${min}-${max})`} 
                      value="" 
                      color={theme.text}
                      style={{ backgroundColor: theme.background }}
                    />
                    {options.map((option) => (
                      <Picker.Item 
                        key={option} 
                        label={option} 
                        value={option} 
                        color={theme.text}
                        style={{ backgroundColor: theme.background }}
                      />
                    ))}
                  </Picker>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity 
              style={[
                styles.predictButton, 
                { backgroundColor: theme.primary }
              ]} 
              onPress={handlePredict}
            >
              <Text style={styles.predictButtonText}>Predict Stress Level</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

// Update styles to use theme colors where needed
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.Bold,
    textAlign: "center",
    marginVertical: 20,
  },
  sidebar: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  collapseButton: {
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  collapseButtonText: {
    fontFamily: fonts.Medium,
    fontSize: 14,
    textAlign: "center",
  },
  sidebarItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
  sidebarText: {
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  formArea: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 26,
    fontFamily: fonts.Bold,
    marginBottom: 25,
  },
  formContainer: {
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.Regular,
    fontSize: 14,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
    height: 50,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  predictButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  predictButtonText: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    color: colors.white, // Keep white text for buttons
  },
});

export default PredictionScreen;