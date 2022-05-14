import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import SelectDropdownSurveit from "../components/SelectDropdownSurveit";
import close from "../assets/close.png";

const CreateSurvey = ({ route, navigation }) => {
  const categories = ["Edukasi", "Bisnis", "Gaya Hidup", "Hobi"];
  const questionTypes = [
    "Jawaban singkat",
    "Paragraph",
    "Pilihan ganda",
    "Kotak centang",
    "Skala linear",
  ];

  const [title, onChangeTitle] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [respondentCount, onChangeRespondentCount] = React.useState("");
  const [questionCount, setQuestionCount] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = React.useState("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddQuestion = () => {
    if (selectedQuestionType == "Jawaban singkat") {
      navigation.navigate("ShortAnswerQuestion", {
        selectedQuestionType: selectedQuestionType,
        questionCount: questionCount + 1,
      });
    } else if (selectedQuestionType == "Paragraph") {
      navigation.navigate("ParagraphQuestion", {
        selectedQuestionType: selectedQuestionType,
        questionCount: questionCount + 1,
      });
    } else if (selectedQuestionType == "Pilihan ganda") {
      navigation.navigate("MultipleChoiceQuestion", {
        selectedQuestionType: selectedQuestionType,
        questionCount: questionCount + 1,
      });
    } else if (selectedQuestionType == "Kotak centang") {
      navigation.navigate("CheckboxQuestion", {
        selectedQuestionType: selectedQuestionType,
        questionCount: questionCount + 1,
      });
    } else if (selectedQuestionType == "Skala linear") {
      navigation.navigate("LinearScaleQuestion", {
        selectedQuestionType: selectedQuestionType,
        questionCount: questionCount + 1,
      });
    }
  };

  return (
    <View>
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
          <Text style={styles.h3}>Pertanyaan ({questionCount})</Text>
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
            onPress={() => {
              console.log(selectedQuestionType);
            }}
          >
            <Text style={styles.textButton}>Buat survei</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
});

export default CreateSurvey;
