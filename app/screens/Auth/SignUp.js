import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  LogBox,
  TouchableOpacity,
} from "react-native";
import InputPassword from "@components/Auth/InputPassword";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@config";
import { register } from "@services/ProfileServices";
import signup from "@assets/sign-up.png";

import { USER_TEMPLATE } from "@const/"

// Expo still imports AsyncStorage from react-native which cause warning
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

const SignUp = ({ navigation }) => {
  const [nama, onChangeNama] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        updateProfile(user, {
          displayName: nama,
          photoURL: USER_TEMPLATE
        })
          .then(async () => {
            let res = await register(user.uid);
            if (res) {
              alert("Registration Successful");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .then(() => {
        reset();
        auth.signOut();
        navigation.navigate("LogIn");
      })
      .catch((error) => alert(error.message));
  };

  const reset = () => {
    onChangeNama("");
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.image} source={signup} />

      <Text style={styles.h1}>Buat akun Surveitmu</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNama}
        placeholder="Nama"
        value={nama}
        placeholderTextColor="#94A3B8"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
        value={email}
        placeholderTextColor="#94A3B8"
      />
      <InputPassword
        password={password}
        onChangePassword={onChangePassword}
        value={password}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.createButton}>
        <Text style={styles.button1}>Buat akun</Text>
      </TouchableOpacity>
      <Text style={styles.p1}>
        Sudah punya akun?
        <Text
          style={{
            color: "#6E61E8",
            fontSize: 16,
            lineHeight: 20,
            fontFamily: "Urbanist_600SemiBold",
          }}
          onPress={() => {
            reset();
            navigation.navigate("LogIn");
          }}
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
    fontFamily: "Urbanist_700Bold",
    color: "#475569",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#94A3B8",
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
    marginTop: 48,
    alignItems: "center",
    height: 220,
    width: 308,
  },
  createButton: {
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

export default SignUp;
