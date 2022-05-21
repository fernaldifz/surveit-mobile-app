import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import Modal from "react-native-modal";
import SelectDropdownSurveit from "../components/SelectDropdownSurveit";
import close from "../assets/close.png";
import more from "../assets/more.png";
import * as ImagePicker from "expo-image-picker";
import surveyCover from "../assets/survey-cover.png";
import { db, storage } from "../config/index";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

// Firebase sets some timers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const user_id_dummy = "user_id_dummy";

const CreateSurvey = ({ route, navigation }) => {
  const categories = ["Edukasi", "Bisnis", "Gaya Hidup", "Hobi"];
  const questionTypes = [
    "Jawaban singkat",
    "Paragraph",
    "Pilihan ganda",
    "Kotak centang",
    "Skala linier",
  ];

  const [title, onChangeTitle] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [respondentCount, onChangeRespondentCount] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = React.useState("");
  const [questionList, setQuestionList] = React.useState(
    route.params?.questionListTemp || []
  );
  const [cover, setCover] = React.useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 5],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setCover(result.uri);
    }
  };

  const handleAddQuestion = () => {
    navigation.navigate("CreateQuestion", {
      selectedQuestionType: selectedQuestionType,
      questionCountTemp: questionList.length,
      questionListTemp: questionList,
    });
  };

  const handleCreateSurvey = async () => {
    if (cover !== null) {
      let id = new Date().toISOString();
      const refer = ref(storage, id);

      const img = await fetch(cover);
      const bytes = await img.blob();

      try {
        await uploadBytes(refer, bytes);
        await getDownloadURL(refer).then((url) => {
          Create(url);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      Create(null);
    }
  };

  const Create = async (url) => {
    const myDoc = doc(db, "surveys", "document_dummy_test");
    const { Timestamp } = require("firebase/firestore");

    var survey = {
      cover: url,
      title: title,
      category: selectedCategory,
      description: description,
      response_target: parseInt(respondentCount),
      question_list: questionList,
      user_id: user_id_dummy,
      timestamp: Timestamp.fromDate(new Date()),
      point: questionList.length * 10,
    };

    setDoc(myDoc, survey)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ScrollView>
      <View style={styles.title}>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 32,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => console.log("pindah ke home")}>
            <Image style={styles.close} source={close} />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={styles.h3}>Buat survei</Text>
          </View>
        </View>
      </View>
      <View style={styles.contents}>
        <View style={styles.content}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.h3}>Cover</Text>
            {cover ? (
              <Image source={{ uri: cover }} style={styles.cover} />
            ) : (
              <Image source={surveyCover} style={styles.cover} />
            )}

            <TouchableOpacity
              style={styles.uploadPictureButton}
              onPress={() => pickImage()}
            >
              <Text style={styles.textButton}>Upload Gambar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.h3}>Judul survei</Text>
          <TextInput
            style={{ ...styles.textInput, ...styles.p1 }}
            onChangeText={onChangeTitle}
            value={title}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.h3}>Kategori survei</Text>
          <SelectDropdownSurveit
            data={categories}
            defaultButtonText="Pilih kategori survei"
            setSelectedOption={setSelectedCategory}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.h3}>Deskripsi survei</Text>
          <TextInput
            multiline
            numberOfLines={4}
            maxHeight={96}
            style={{ ...styles.multilineTextInput, ...styles.p1 }}
            onChangeText={onChangeDescription}
            value={description}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.h3}>Target Jumlah Responden</Text>
          <TextInput
            style={{ ...styles.respondentInput, ...styles.p1 }}
            onChangeText={onChangeRespondentCount}
            keyboardType="numeric"
            maxLength={4}
            value={respondentCount}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.h3}>Pertanyaan ({questionList.length})</Text>
          {questionList.map((questionData, index) => (
            <View key={index} style={styles.questionDisplay}>
              {questionData.question.length <= 25 ? (
                <Text style={styles.p1}>{questionData.question}</Text>
              ) : (
                <Text style={styles.p1}>
                  {questionData.question.substr(0, 24)}...
                </Text>
              )}
              <Image style={styles.more} source={more} />
            </View>
          ))}
          <TouchableOpacity
            style={styles.addQuestionButton}
            onPress={toggleModal}
          >
            <Text style={styles.textButton}>Tambah Pertanyaan</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={modalVisible} onBackdropPress={toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.h3, ...styles.modalText }}>
                Pilih jenis pertanyaan
              </Text>
              <SelectDropdownSurveit
                data={questionTypes}
                defaultButtonText="Pilih jenis pertanyaan"
                setSelectedOption={setSelectedQuestionType}
              />
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleAddQuestion}
              >
                <Text style={styles.textButton}>Lanjut</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateSurvey}
          >
            <Text style={styles.textButton}>Buat survei</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 28,
    marginBottom: 20,
  },
  h2: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "600",
    color: "#334155",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: "#334155",
  },
  p1: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 20,
    fontWeight: "500",
  },
  contents: {
    marginHorizontal: 20,
  },
  content: {
    marginBottom: 16,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  questionDisplay: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  multilineTextInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlignVertical: "top",
  },
  createButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 56,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  addQuestionButton: {
    marginTop: 10,
    marginBottom: 32,
    height: 48,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: 258,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  continueButton: {
    marginTop: 32,
    marginBottom: 20,
    height: 56,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    width: 12,
    height: 12,
    alignSelf: "flex-start",
  },
  more: {
    width: 16,
    height: 16,
  },
  respondentInput: {
    height: 48,
    width: "25%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  cover: {
    height: 100,
    width: "100%",
    borderRadius: 12,
    marginTop: 16,
  },
  uploadPictureButton: {
    width: 160,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 16,
  },
});

export default CreateSurvey;
