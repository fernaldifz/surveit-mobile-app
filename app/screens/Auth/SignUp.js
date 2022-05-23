import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  LogBox,
} from "react-native";
import InputPassword from "@components/Auth/InputPassword";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@config";
import { register } from "@services/ProfileServices";

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
        })
          .then(async () => {
            let res = await register(email, nama, user.uid);
            if (res) {
              alert("Registration Successful");
            }
          })
          .catch((error) => {
            alert(error.message);
          });
        console.log("Registered with : ", user.email);
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
      <Image style={styles.image} source={require("@assets/sign-up.png")} />

      <Text style={styles.h1}>Buat akun Surveitmu</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeNama}
        placeholder="Nama"
        value={nama}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Email"
        value={email}
      />
      <InputPassword
        password={password}
        onChangePassword={onChangePassword}
        value={password}
      />
      <View style={styles.viewButton}>
        <Button title="Buat akun" color="#6E61E8" onPress={handleSignUp} />
      </View>
      <Text>
        Sudah punya akun?
        <Text
          style={{ color: "#6E61E8" }}
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
    fontWeight: "bold",
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
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default SignUp;
