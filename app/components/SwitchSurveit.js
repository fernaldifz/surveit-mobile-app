import { View, Text, Switch } from "react-native";

const SwitchSurveit = ({ onValueChange, value }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Switch
        trackColor={{ false: "#767577", true: "#6E61E8" }}
        thumbColor="#fff"
        onValueChange={onValueChange}
        value={value}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#64748B",
          lineHeight: 20,
          fontFamily: "Urbanist_500Medium",
        }}
      >
        Wajib diisi
      </Text>
    </View>
  );
};

export default SwitchSurveit;
