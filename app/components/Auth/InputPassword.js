import React from "react";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const InputPassword = ({ password, onChangePassword }) => {
  const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  const [eyeIcon, setEyeIcon] = React.useState("eye");

  const handlePasswordVisibility = () => {
    if (eyeIcon === "eye") {
      setEyeIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === "eye-off") {
      setEyeIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={[styles.input, styles.inputPassword]}>
      <TextInput
        value={password}
        onChangeText={onChangePassword}
        placeholder="Password"
        secureTextEntry={passwordVisibility}
        style={{
          fontSize: 16,
          lineHeight: 20,
          fontFamily: "Urbanist_500Medium",
          color: "#475569",
        }}
        placeholderTextColor="#94A3B8"
      />
      <Pressable style={styles.passwordIcon} onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons name={eyeIcon} size={20} color="#475569" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "88.89%",
    height: 48,
    paddingLeft: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
  },
  inputPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordIcon: {
    paddingTop: 13,
    paddingRight: 20,
  },
});

export default InputPassword;
