import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SelectDropdownSurveit from "../components/SelectDropdownSurveit";
import SwitchSurveit from "../components/SwitchSurveit";
import cheveronLeft from "../assets/cheveron-left.png";

const CheckboxQuestion = ({ route, navigation }) => {
  const questionTypes = [
    "Jawaban singkat",
    "Paragraph",
    "Pilihan ganda",
    "Kotak centang",
    "Skala linear",
  ];
  const optionCount = [1, 2, 3, 4, 5];

  const { selectedQuestionType, questionCount } = route.params;
  const [currSelectedQuestionType, setCurrSelectedQuestionType] =
    useState(selectedQuestionType);
  const [question, onChangeQuestion] = useState("");
  const [option_1, onChangeOption_1] = useState("");
  const [option_2, onChangeOption_2] = useState("");
  const [option_3, onChangeOption_3] = useState("");
  const [option_4, onChangeOption_4] = useState("");
  const [option_5, onChangeOption_5] = useState("");
  const [selectedOptionCount, setSelectedOptionCount] = useState(0);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleSaveQuestion = () => {
    console.log(currSelectedQuestionType);
    console.log(question);
    console.log(questionCount);
    console.log(option_1);
    console.log(option_2);
    console.log(option_3);
    console.log(option_4);
    console.log(option_5);
    console.log(isEnabled);
  };

  useEffect(() => {
    if (currSelectedQuestionType == "Jawaban singkat") {
      navigation.navigate("ShortAnswerQuestion", {
        selectedQuestionType: currSelectedQuestionType,
        questionCount: questionCount,
      });
    } else if (currSelectedQuestionType == "Paragraph") {
      navigation.navigate("ParagraphQuestion", {
        selectedQuestionType: currSelectedQuestionType,
        questionCount: questionCount,
      });
    } else if (currSelectedQuestionType == "Pilihan ganda") {
      navigation.navigate("MultipleChoiceQuestion", {
        selectedQuestionType: currSelectedQuestionType,
        questionCount: questionCount,
      });
    } else if (currSelectedQuestionType == "Skala linear") {
      navigation.navigate("LinearScaleQuestion", {
        selectedQuestionType: currSelectedQuestionType,
        questionCount: questionCount,
      });
    }
  }, [currSelectedQuestionType]);

  return (
    <ScrollView>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 32,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("CreateSurvey")}>
          <Image
            style={{ width: 24, height: 24, alignSelf: "flex-start" }}
            source={cheveronLeft}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={styles.h3}>Pertanyaan {questionCount}</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <SelectDropdownSurveit
            data={questionTypes}
            defaultButtonText="Pilih jenis pertanyaan"
            defaultValue={currSelectedQuestionType}
            setSelectedOption={setCurrSelectedQuestionType}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ ...styles.h3 }}>Pertanyaan</Text>
          <TextInput
            multiline
            numberOfLines={4}
            maxHeight={96}
            style={{ ...styles.multilineTextInput, ...styles.p1 }}
            onChangeText={onChangeQuestion}
            value={question}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ ...styles.h3 }}>Jumlah opsi</Text>
          <SelectDropdownSurveit
            data={optionCount}
            defaultButtonText="Pilih jumlah opsi"
            setSelectedOption={setSelectedOptionCount}
            defaultValue={1}
          />
        </View>
        <View style={{ marginBottom: 4 }}>
          <Text style={{ ...styles.h3 }}>Pilihan</Text>
          {selectedOptionCount >= 1 && (
            <TextInput
              style={{ ...styles.textInput, ...styles.p1 }}
              onChangeText={onChangeOption_1}
              value={option_1}
            />
          )}
          {selectedOptionCount >= 2 && (
            <TextInput
              style={{ ...styles.textInput, ...styles.p1 }}
              onChangeText={onChangeOption_2}
              value={option_2}
            />
          )}
          {selectedOptionCount >= 3 && (
            <TextInput
              style={{ ...styles.textInput, ...styles.p1 }}
              onChangeText={onChangeOption_3}
              value={option_3}
            />
          )}
          {selectedOptionCount >= 4 && (
            <TextInput
              style={{ ...styles.textInput, ...styles.p1 }}
              onChangeText={onChangeOption_4}
              value={option_4}
            />
          )}
          {selectedOptionCount >= 5 && (
            <TextInput
              style={{ ...styles.textInput, ...styles.p1 }}
              onChangeText={onChangeOption_5}
              value={option_5}
            />
          )}
        </View>
        <View>
          <SwitchSurveit onValueChange={toggleSwitch} value={isEnabled} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.saveQuestionButton}
            onPress={handleSaveQuestion}
          >
            <Text style={styles.textButton}>Simpan pertanyaan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
  saveQuestionButton: {
    marginTop: 20,
    marginBottom: 20,
    height: 56,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#6E61E8",
    alignItems: "center",
    justifyContent: "center",
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
});

export default CheckboxQuestion;
