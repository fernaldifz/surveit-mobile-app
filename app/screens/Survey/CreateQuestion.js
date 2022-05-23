import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import SelectDropdownSurveit from "@components/Survey/SelectDropdownSurveit";
import SwitchSurveit from "@components/Survey/SwitchSurveit";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const CreateQuestion = ({ route, navigation }) => {
  const questionTypes = [
    "Jawaban singkat",
    "Paragraph",
    "Pilihan ganda",
    "Kotak centang",
    "Skala linier",
  ];
  const optionCount = [1, 2, 3, 4, 5];
  const scaleCount = [2, 3, 4, 5];

  const { selectedQuestionType, questionListTemp, handleNewQuestion } =
    route.params;
  const [currSelectedQuestionType, setCurrSelectedQuestionType] =
    useState(selectedQuestionType);
  const [question, onChangeQuestion] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [option_1, onChangeOption_1] = useState("");
  const [option_2, onChangeOption_2] = useState("");
  const [option_3, onChangeOption_3] = useState("");
  const [option_4, onChangeOption_4] = useState("");
  const [option_5, onChangeOption_5] = useState("");
  const [selectedOptionCount, setSelectedOptionCount] = useState(1);
  const [leftDescription, onChangeLeftDescription] = useState("");
  const [rightDescription, onChangeRightDescription] = useState("");
  const [selectedScaleCount, setSelectedScaleCount] = useState(2);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleDisabled = () => {
    var res = true;
    switch (currSelectedQuestionType) {
      case "Pilihan ganda":
      case "Kotak centang":
        res = res && option_1;

        if (selectedOptionCount >= 2) {
          res = res && option_2;
        }
        if (selectedOptionCount >= 3) {
          res = res && option_3;
        }
        if (selectedOptionCount >= 4) {
          res = res && option_4;
        }
        if (selectedOptionCount >= 5) {
          res = res && option_5;
        }
        break;
      case "Skala linier":
        res = res && leftDescription;
        if (selectedScaleCount >= 2) {
          res = res && rightDescription;
        }
        break;
      default:
        break;
    }

    return !question || !res;
  };

  const handleSaveQuestion = () => {
    if (
      currSelectedQuestionType == "Jawaban singkat" ||
      currSelectedQuestionType == "Paragraph"
    ) {
      var questionData = {
        no: questionListTemp.length + 1,
        type: currSelectedQuestionType,
        question: question,
        required: isEnabled,
      };
    } else if (
      currSelectedQuestionType == "Pilihan ganda" ||
      currSelectedQuestionType == "Kotak centang"
    ) {
      var option = [];
      option.push(option_1);
      if (selectedOptionCount >= 2) {
        option.push(option_2);
      }
      if (selectedOptionCount >= 3) {
        option.push(option_3);
      }
      if (selectedOptionCount >= 4) {
        option.push(option_4);
      }
      if (selectedOptionCount >= 5) {
        option.push(option_5);
      }

      var questionData = {
        no: questionListTemp.length + 1,
        type: currSelectedQuestionType,
        question: question,
        option: option,
        required: isEnabled,
      };
    } else if (currSelectedQuestionType == "Skala linier") {
      var questionData = {
        no: questionListTemp.length + 1,
        type: currSelectedQuestionType,
        question: question,
        number_of_scales: selectedScaleCount,
        option: [leftDescription, rightDescription],
        required: isEnabled,
      };
    }

    questionListTemp.push(questionData);

    handleNewQuestion(questionListTemp);
    navigation.goBack();
  };

  const reset = () => {
    clearOption();
    onChangeLeftDescription("");
    onChangeRightDescription("");
    setSelectedScaleCount(2);
    setSelectedOptionCount(1);
  };

  const clearOption = () => {
    onChangeOption_1("");
    onChangeOption_2("");
    onChangeOption_3("");
    onChangeOption_4("");
    onChangeOption_5("");
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Pertanyaan ${questionListTemp.length + 1}`,
    });
  }, [questionListTemp]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#F8FAFC", padding: 20 }}>
        <View>
          <View style={{ marginBottom: 20 }}>
            <SelectDropdownSurveit
              data={questionTypes}
              defaultButtonText="Pilih jenis pertanyaan"
              defaultValue={currSelectedQuestionType}
              setSelectedOption={setCurrSelectedQuestionType}
              reset={reset}
            />
          </View>
          <View style={{ marginBottom: 4 }}>
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

          {(currSelectedQuestionType == "Pilihan ganda" ||
            currSelectedQuestionType == "Kotak centang") && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...styles.h3 }}>Jumlah opsi</Text>
              <SelectDropdownSurveit
                data={optionCount}
                defaultButtonText="Pilih jumlah opsi"
                setSelectedOption={setSelectedOptionCount}
                defaultValue={1}
                reset={clearOption}
              />
            </View>
          )}
          {(currSelectedQuestionType == "Pilihan ganda" ||
            currSelectedQuestionType == "Kotak centang") && (
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
          )}

          {currSelectedQuestionType == "Skala linier" && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...styles.h3 }}>Jumlah skala</Text>
              <SelectDropdownSurveit
                data={scaleCount}
                defaultButtonText="Pilih jumlah skala"
                setSelectedOption={setSelectedScaleCount}
                defaultValue={2}
              />
            </View>
          )}
          {currSelectedQuestionType == "Skala linier" && (
            <View style={{ marginBottom: 4 }}>
              <Text style={{ ...styles.h3 }}>Keterangan</Text>
              <TextInput
                style={{ ...styles.textInput, ...styles.p1 }}
                onChangeText={onChangeLeftDescription}
                value={leftDescription}
              />
              <TextInput
                style={{ ...styles.textInput, ...styles.p1 }}
                onChangeText={onChangeRightDescription}
                value={rightDescription}
              />
            </View>
          )}

          <View>
            <SwitchSurveit onValueChange={toggleSwitch} value={isEnabled} />
          </View>
        </View>
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
      <View style={{ backgroundColor: "#fff", padding: 20 }}>
        <TouchableOpacity
          style={
            handleDisabled() ? styles.disableButton : styles.saveQuestionButton
          }
          onPress={handleSaveQuestion}
          disabled={handleDisabled()}
        >
          <Text
            style={
              handleDisabled() ? styles.disableButtonText : styles.textButton
            }
          >
            Simpan pertanyaan
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
    marginBottom: 20,
  },
  disableButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#94A3B8",
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
  title: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    fontFamily: "Urbanist_600SemiBold",
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

export default CreateQuestion;
