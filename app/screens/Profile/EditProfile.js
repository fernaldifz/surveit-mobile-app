import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { db } from "../../config/Index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const EditProfile = ({ navigation }) => {
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [foto, setFoto] = React.useState(null);

  // Storing User Data
  const [userDoc, setUserDoc] = React.useState(null);

  const Read = () => {
    const myDoc = doc(db, "users", "naheedo");

    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          setUserDoc(data);
          setNama(data.nama);
          setEmail(data.email);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  React.useEffect(() => {
    Read();
    (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Maaf, Anda harus memberikan aplikasi izin akses galeri!')
            }
        }
    })();
  }, []);

  const Update = () => {
    const myDoc = doc(db, "users", "naheedo");

    setDoc(myDoc, {nama: nama, email: email}, { merge: true })
      .then(() => {
        alert("Profil berhasil diperbarui!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const pickImage = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.all,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
      });

      if (!result.cancelled) {
          const storage = getStorage();
          const refer = ref(storage, 'image.jpg');

          const img = await fetch(result.uri);
          const bytes = await img.blob();
          
          await uploadBytes(refer, bytes)
          .then(() => {
            alert("Foto berhasil diganti!")
          })
          .catch((error) => {
            alert(error.message);
          });
      }
  };

  return (
    userDoc && (
      <View>
        <Text>Nama:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder={userDoc.nama}
          onChangeText={(newText) => setNama(newText)}
          value={nama}
        />
        <Text>Email:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder={userDoc.email}
          onChangeText={(newText) => setEmail(newText)}
          value={email}
        />
        <TouchableOpacity onPress={() =>
            Update()
        }>
            <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
            <Text>select image</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default EditProfile;
