import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { useTheme } from "../../lib/ThemeContext"; // Import useTheme hook

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(72, 61, 139, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const chartData = {
  Psychological: {
    labels: ["Anxiety", "Self Esteem", "Mental Health", "Depression"],
    datasets: [{ data: [10, 15, 8, 12] }],
  },
  Physiological: {
    labels: ["Headache", "BP", "Sleep", "Breathing"],
    datasets: [{ data: [5, 10, 7, 6] }],
  },
  Social: {
    labels: ["Support", "Peer Pressure", "Activities", "Bullying"],
    datasets: [{ data: [12, 8, 10, 4] }],
  },
  Environmental: {
    labels: ["Noise", "Living", "Safety", "Needs"],
    datasets: [{ data: [6, 9, 14, 11] }],
  },
  Academic: {
    labels: ["Performance", "Load", "Teacher Relation", "Career"],
    datasets: [{ data: [11, 13, 9, 7] }],
    legend: ["Term 1"],
  },
};

const academicLineData = {
  labels: chartData.Academic.labels,
  datasets: [
    {
      data: chartData.Academic.datasets[0].data,
      color: (opacity = 1) => `rgba(255,105,180,${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: chartData.Academic.legend,
};

const ChartsVisualizationScreen = () => {
  const { theme } = useTheme(); // Get current theme from context
  const [backgroundColor, setBackgroundColor] = useState(theme.background);
  const [textColor, setTextColor] = useState(theme.text);
  
  useEffect(() => {
    setBackgroundColor(theme.background);
    setTextColor(theme.text);
  }, [theme]); // Update styles whenever theme changes

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: backgroundColor, padding: 20 }}
    >
      <Text
        style={{
          fontSize: 26,
          fontFamily: "Bold", // Replace with actual font family
          color: theme.text, // Use dynamic text color
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Charts & Visualization
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Bold", // Replace with actual font family
            color: textColor, // Use dynamic text color
            marginBottom: 10,
          }}
        >
          Psychological Factors
        </Text>
        <BarChart
          data={chartData.Psychological}
          width={screenWidth - 40}
          height={250}
          chartConfig={chartConfig}
          style={{ marginVertical: 10, borderRadius: 10 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Bold", // Replace with actual font family
            color: textColor, // Use dynamic text color
            marginBottom: 10,
          }}
        >
          Physiological Factors
        </Text>
        <LineChart
          data={chartData.Physiological}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          }}
          style={{ marginVertical: 10, borderRadius: 10 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Bold", // Replace with actual font family
            color: textColor, // Use dynamic text color
            marginBottom: 10,
          }}
        >
          Social Factors
        </Text>
        <PieChart
          data={chartData.Social.labels.map((label, index) => ({
            name: label,
            population: chartData.Social.datasets[0].data[index],
            color: `rgba(${index * 50}, 100, 200, 1)`,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }))}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Bold", // Replace with actual font family
            color: textColor, // Use dynamic text color
            marginBottom: 10,
          }}
        >
          Environmental Factors
        </Text>
        <ProgressChart
          data={{
            labels: chartData.Environmental.labels,
            data: chartData.Environmental.datasets[0].data.map((val) => val / 15),
          }}
          width={screenWidth - 40}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
          }}
          style={{ marginVertical: 10 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Bold", // Replace with actual font family
            color: textColor, // Use dynamic text color
            marginBottom: 10,
          }}
        >
          Academic Factors
        </Text>
        <LineChart
          data={academicLineData}
          width={screenWidth - 40}
          height={250}
          chartConfig={chartConfig}
          bezier // Enables curved lines
          style={{ marginVertical: 10, borderRadius: 10 }}
        />
      </View>
    </ScrollView>
  );
};

export default ChartsVisualizationScreen;
