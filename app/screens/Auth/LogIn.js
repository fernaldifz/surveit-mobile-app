import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import InputPassword from "@components/Auth/InputPassword";
import { auth } from "@config/";

const LogIn = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with : ", user.email);
        navigation.navigate("Main");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={require("@assets/log-in.png")} />
        <Text style={styles.h1}>Selamat datang di Surveit!</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          placeholderTextColor="#94A3B8"
        />
        <InputPassword
          password={password}
          onChangePassword={onChangePassword}
        />
        <TouchableOpacity onPress={handleLogIn} style={styles.loginButton}>
          <Text style={styles.button1}>Masuk</Text>
        </TouchableOpacity>
        <Text style={styles.p1}>
          Belum punya akun?
          <Text
            style={{
              color: "#6E61E8",
              fontSize: 16,
              lineHeight: 20,
              fontFamily: "Urbanist_600SemiBold",
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Buat akun
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    marginTop: 54,
    marginBottom: 36,
    fontFamily: "Urbanist_700Bold",
    color: "#475569",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#94A3B8",
    marginBottom: 48,
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#fff",
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
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  image: {
    marginTop: 79,
    alignItems: "center",
    height: 220,
    width: 240,
  },
  viewButton: {
    marginTop: 36,
    marginBottom: 48,
    width: "88.89%",
    borderRadius: 12,
    overflow: "hidden",
  },
  loginButton: {
    marginTop: 36,
    marginBottom: 48,
    width: 320,
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#6E61E8",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LogIn;
