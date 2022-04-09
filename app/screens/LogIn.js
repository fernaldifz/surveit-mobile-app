import React from "react";
import { StyleSheet, Button, TextInput, View, Image, Text } from "react-native";

const LogIn = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("Email");
  const [password, onChangePassword] = React.useState("Password");

  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.image} source={require("../assets/log-in.png")} />

      <Text style={styles.h1}>Selamat datang di Surveit!</Text>

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
          title="Masuk"
          color="#6E61E8"
          onPress={() => console.log({ email }, { password })}
        />
      </View>
      <Text>
        Belum punya akun?
        <Text
          style={{ color: "#6E61E8" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          {" "}
          Buat akun
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    marginTop: 54,
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
    marginTop: 79,
    alignItems: "center",
  },
  viewButton: {
    marginTop: 36,
    marginBottom: 48,
    width: "88.89%",
  },
});

export default LogIn;
