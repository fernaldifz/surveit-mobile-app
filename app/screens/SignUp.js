import React from "react";
import { StyleSheet, Button, TextInput, View, Image, Text } from "react-native";

const SignUp = ({ navigation }) => {
  const [nama, onChangeNama] = React.useState("Nama");
  const [email, onChangeEmail] = React.useState("Email");
  const [password, onChangePassword] = React.useState("Password");

  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.image} source={require("../assets/sign-up.png")} />

      <Text style={styles.h1}>Buat akun Surveitmu</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNama}
        placeholder="Nama"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.viewButton}>
        <Button
          title="Buat akun"
          color="#6E61E8"
          onPress={() => console.log({ nama }, { email }, { password })}
        />
      </View>
      <Text>
        Sudah punya akun?
        <Text
          style={{ color: "#6E61E8" }}
          onPress={() => navigation.navigate("LogIn")}
        >
          {" "}
          Masuk
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    marginTop: 24,
    marginBottom: 36,
  },
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
  image: {
    marginTop: 48,
    alignItems: "center",
  },
  viewButton: {
    marginTop: 36,
    marginBottom: 48,
    width: "88.89%",
  },
});

export default SignUp;
