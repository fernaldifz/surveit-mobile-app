import React from "react";
import { StyleSheet, Button, TextInput, View, Image, Text } from "react-native";

const SignUp = () => {
  const [nama, onChangeNama] = React.useState("Nama");
  const [email, onChangeEmail] = React.useState("Email");
  const [password, onChangePassword] = React.useState("Password");

  return (
    <View style={styles.view}>
      <Image style={styles.image} source={require("../assets/sign-up.png")} />
      <View>
        <Text style={styles.h1}>Buat akun Surveitmu</Text>
      </View>
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
        Sudah punya akun?<Text style={styles.link}> Masuk </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  h1: {
    fontSize: 24,
    lineHeight: 28,
  },
  input: {
    height: 48,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    marginTop: 48,
    alignItems: "center",
  },
  viewButton: {
    marginTop: 48,
    marginBottom: 48,
    width: 320,
  },
  link: {
    color: "#6E61E8",
  },
});

export default SignUp;
