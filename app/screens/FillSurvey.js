import React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Checkbox } from "react-native-paper";

const FillSurvey = ({ route, navigation }) => {
  const { survey_data } = route.params;
  const [answers, setAnswersState] = useState([]);
  const [answer, onChangeAnswer] = useState("");
  const [index, setIndexState] = useState(0);
  const questions = survey_data.question_list;

  const [checked, setChecked] = useState(0);
  const [option, setOption] = useState([]);

  const handleFill = () => {
    let tempAnswers = answers;

    if (survey_data.question_list[index].type == "Pilihan ganda") {
      tempAnswers[index] = String(checked);
      setChecked(0);
    } else if (survey_data.question_list[index].type == "Jawaban singkat") {
      tempAnswers[index] = answer;
      onChangeAnswer("");
    } else if (survey_data.question_list[index].type == "Kotak centang") {
      tempAnswers[index] = option;
      setOption([]);
    }
    setAnswersState(tempAnswers);
    console.log(answers);
  };

  const handleBack = () => {
    if (answers[index - 1]) {
      if (survey_data.question_list[index - 1].type == "Pilihan ganda") {
        setChecked(parseInt(answers[index - 1]));
        console.log("here" + index);
      } else if (
        survey_data.question_list[index - 1].type == "Jawaban singkat"
      ) {
        onChangeAnswer(answers[index - 1]);
      } else if (survey_data.question_list[index - 1].type == "Kotak centang") {
        setOption(answers[index - 1]);
      }
    }
  };

  const handleNext = () => {
    if (answers[index + 1]) {
      if (survey_data.question_list[index + 1].type == "Pilihan ganda") {
        setChecked(parseInt(answers[index + 1]));
        console.log("here" + index);
      } else if (survey_data.question_list[index + 1].type == "Paragraph") {
        onChangeAnswer(answers[index + 1]);
      } else if (survey_data.question_list[index + 1].type == "Kotak centang") {
        setOption(answers[index + 1]);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Pertanyaan " + (index + 1),
    });
  }, [index]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, marginTop: 20, gap: 16, flex: 1 }}>
        {survey_data.question_list[index].type == "Jawaban singkat" ? (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? "*" : ""}
            </Text>
            <TextInput
              style={styles.shortAnswer}
              onChangeText={onChangeAnswer}
              keyboardType="default"
              value={answer}
            />
          </>
        ) : survey_data.question_list[index].type == "Paragraph" ? (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? "*" : ""}
            </Text>
            <TextInput
              style={styles.paragraph}
              onChangeText={onChangeAnswer}
              keyboardType="default"
              value={answer}
              multiline
            />
          </>
        ) : survey_data.question_list[index].type == "Pilihan ganda" ? (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? "*" : ""}
            </Text>
            <View>
              {survey_data.question_list[index].option.map((item, idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <RadioButton
                      key={idx}
                      value="test"
                      status={checked === idx ? "checked" : "unchecked"}
                      onPress={() => setChecked(idx)}
                    />
                    <Text style={styles.p1}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </>
        ) : survey_data.question_list[index].type == "Kotak centang" ? (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? "*" : ""}
            </Text>
            {survey_data.question_list[index].option.map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    status={option.includes(idx) ? "checked" : "unchecked"}
                    style={{ width: 20, height: 20 }}
                    color="#6E61E8"
                    onPress={() => {
                      if (option.includes(idx)) {
                        setOption(option.filter((item) => item !== idx));
                      } else {
                        setOption([...option, idx]);
                      }
                    }}
                  />
                  <Text style={styles.p1}>{item}</Text>
                </View>
              );
            })}
          </>
        ) : (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? "*" : ""}
            </Text>
            <TextInput
              style={styles.respondentInput}
              onChangeText={onChangeAnswer}
              keyboardType="default"
              value={answer}
              multiline={true}
            />
          </>
        )}
      </View>
      <View style={styles.bottomNav}>
        {index == 0 ? (
          <TouchableOpacity disabled={true} style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>Balik</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              handleFill();
              setIndexState(index - 1);
              handleBack();
            }}
          >
            <Text style={styles.backButtonText}>Balik</Text>
          </TouchableOpacity>
        )}

        {index != survey_data.question_list.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              setIndexState(index + 1);
              handleFill();
              handleNext();
            }}
          >
            <Text style={styles.nextButtonText}>Lanjut</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              console.log("balik ke home");
              handleFill();
              handleNext();
            }}
          >
            <Text style={styles.nextButtonText}>Selesai</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  backButton: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    backgroundColor: "rgba(110, 97, 232, 0.1)",
    width: 152,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 16,
  },
  disabledButton: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    backgroundColor: "#F1F5F9",
    width: 152,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 16,
  },
  nextButton: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    backgroundColor: "#6E61E8",
    width: 152,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  disabledButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#94A3B8",
  },
  nextButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#FFFFFF",
  },
  shortAnswer: {
    height: 48,
    width: 320,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  paragraph: {
    width: 320,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
});

export default FillSurvey;
