import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarChartSummary = ({ data, question }) => {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(110, 97, 232, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={[style.p1, { marginBottom: 8 }]}>{question}</Text>
        <Text style={style.p2}>
          {data.datasets[0].data.reduce((x, y) => x + y)} respon
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        {data && (
          <View style={style.answer}>
            <BarChart
              data={data}
              width={320}
              height={180}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default BarChartSummary;

const style = StyleSheet.create({
  answer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    borderRadius: 12,
    maxHeight: 200,
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(110, 97, 232, 0.1)",
    height: 32,
    borderRadius: 20,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  image: {
    width: 10,
    height: 10,
    marginLeft: 6,
  },
  button2: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  p2: {
    color: "#94A3B8",
    lineHeight: 14,
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 12,
  },
});
