import { View, Text, Switch } from "react-native";

const SwitchSurveit = ({ onValueChange, value }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Switch
        trackColor="#6E61E8"
        thumbColor="#FFFFFF"
        ios_backgroundColor="#6E61E8"
        onValueChange={onValueChange}
        value={value}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#64748B",
          lineHeight: 20,
          fontWeight: "500",
        }}
      >
        Wajib diisi
      </Text>
    </View>
  );
};

export default SwitchSurveit;
