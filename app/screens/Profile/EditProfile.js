import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  LogBox,
  ActivityIndicator,
} from "react-native";

import { storage, auth } from "@config/";
import { updateProfile, updateEmail } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { Overlay } from "react-native-elements";
import { getUser } from "@services/ProfileServices";

// Firebase sets some timeers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const EditProfile = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Storing User Data
  const [userDoc, setUserDoc] = useState(null);

  const fetchUser = async () => {
    const data = await getUser(auth.currentUser.uid);
    setUserDoc(data);
    setNama(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
  };

  useEffect(() => {
    fetchUser();
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          navigation.navigate("Profile");
          alert("Maaf, Anda harus memberikan aplikasi izin akses galeri!");
        }
      }
    })();
  }, []);

  const Update = async (url) => {
    let params = {
      displayName: nama,
      photoURL: url,
    };

    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    updateProfile(auth.currentUser, params)
      .then(() => {
        if (email) {
          updateEmail(auth.currentUser, email)
            .then(() => {
              alert("Profil berhasil diperbarui!");
              navigation.navigate("Profile");
            })
            .catch((_) => {
              alert("Session Habis, Silahkan Login Kembali!");
              auth.signOut();
            });
        } else {
          alert("Profil berhasil diperbarui!");
          navigation.navigate("Profile");
        }
      })
      .catch((_) => {
        alert("Session Habis, Silahkan Login Kembali!");
        auth.signOut();
      });
    setUploading(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setFoto(result.uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);

    if (foto) {
      let id = new Date().toISOString();
      const refer = ref(storage, id);

      const img = await fetch(foto);
      const bytes = await img.blob();

      try {
        await uploadBytes(refer, bytes);
        await getDownloadURL(refer).then((url) => {
          Update(url);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      Update();
    }
  };

  return (
    userDoc && (
      <View style={style.container}>
        <Overlay
          isVisible={uploading}
          overlayStyle={{
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
          }}
        >
          <ActivityIndicator size="large" color="#6E61E8" />
        </Overlay>

        <View style={{ flex: 1 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={{ uri: foto ? foto : auth.currentUser.photoURL }}
              style={style.profpic}
            />
            <TouchableOpacity
              style={[style.uploadButton, style.button]}
              onPress={() => pickImage()}
            >
              <Text style={[style.button1, { color: "#fff" }]}>
                Upload Gambar
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[style.textInput, style.p1]}
            placeholder={auth.currentUser.displayName}
            onChangeText={(newText) => setNama(newText)}
            value={nama}
          />

          <TextInput
            style={[style.textInput, style.p1]}
            placeholder={auth.currentUser.email}
            onChangeText={(newText) => setEmail(newText)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={[style.editProfileButton, style.button, {backgroundColor: (!nama || !email) ? "#F1F5F9" : "#6E61E8"}]}
          onPress={() => uploadImage()}
          disabled={!nama || !email}
        >
          <Text style={[style.button1, { color: (!nama || !email) ? "#94A3B8" : "#fff" }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  uploadButton: {
    width: 160,
    height: 48,
    alignSelf: "baseline",
    marginLeft: 20,
    alignSelf: "center",
  },
  editProfileButton: {
    height: 56,
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  profpic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
  },

  textInput: {
    height: 48,
    borderStyle: "solid",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 20,
    paddingLeft: 20,
  },

  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
});

export default EditProfile;
