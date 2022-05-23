import React, { useEffect } from "react";
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
import SelectDropdownSurveit from "@components/Survey/SelectDropdownSurveit";
import * as ImagePicker from "expo-image-picker";
import surveyCover from "@assets/survey-cover.png";
import { db, storage, auth } from "@config";
import { collection, Timestamp, addDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { SURVEY_TEMPLATE } from "@const/";

// Firebase sets some timers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const CreateSurvey = ({ navigation }) => {
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
  const [questionList, setQuestionList] = React.useState([]);
  const [cover, setCover] = React.useState(null);

  const toggleModal = () => {
    setSelectedQuestionType("");
    setModalVisible(!modalVisible);
  };

  const checkDisabled = () => {
    return (
      !title ||
      !selectedCategory ||
      !description ||
      !respondentCount ||
      questionList.length === 0
    );
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("@assets/close.png")}
            style={{ width: 12, height: 12, marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleAddQuestion = () => {
    navigation.navigate("CreateQuestion", {
      selectedQuestionType: selectedQuestionType,
      questionCountTemp: questionList.length,
      questionListTemp: questionList,
      handleNewQuestion: handleNewQuestion,
    });
    setSelectedQuestionType("");
  };

  const handleNewQuestion = (newQuestion) => {
    setQuestionList([...newQuestion]);
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
      Create(SURVEY_TEMPLATE);
    }
  };

  const Create = async (url) => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    var survey = {
      cover: url,
      title: title,
      category: selectedCategory,
      description: description,
      response_target: parseInt(respondentCount),
      question_list: questionList,
      user_id: userRef,
      timestamp: Timestamp.fromDate(new Date()),
      point: questionList.length * 10,
    };

    addDoc(collection(db, "surveys"), survey)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20, backgroundColor: "#F8FAFC" }}>
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
            {questionList.map((questionData) => (
              <View key={questionData.question} style={styles.questionDisplay}>
                {questionData.question.length <= 25 ? (
                  <Text style={styles.p1}>{questionData.question}</Text>
                ) : (
                  <Text style={styles.p1}>
                    {questionData.question.substr(0, 24)}...
                  </Text>
                )}
                {/* <Image style={styles.more} source={more} /> */}
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
                  type={true}
                />
                <TouchableOpacity
                  style={
                    !selectedQuestionType
                      ? [styles.disableButton, { marginTop: 32 }]
                      : styles.continueButton
                  }
                  onPress={handleAddQuestion}
                  disabled={!selectedQuestionType}
                >
                  <Text
                    style={
                      !selectedQuestionType
                        ? styles.disableButtonText
                        : styles.textButton
                    }
                  >
                    Lanjut
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        <TouchableOpacity
          style={checkDisabled() ? styles.disableButton : styles.createButton}
          onPress={handleCreateSurvey}
          disabled={checkDisabled()}
        >
          <Text
            style={
              checkDisabled() ? styles.disableButtonText : styles.textButton
            }
          >
            Buat survei
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  disableButton: {
    backgroundColor: "#F1F5F9",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20
  },
  disableButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#94A3B8",
  },
  title: {
    marginTop: 28,
    marginBottom: 20,
  },
  h2: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#334155",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    color: "#334155",
    fontFamily: "Urbanist_600SemiBold",
  },
  p1: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
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
    fontFamily: "Urbanist_600SemiBold",
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
