import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Modal,
  StatusBar,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Checkbox } from "react-native-paper";

import success from "@assets/success.png";
import { saveAnswer } from "@services/SurveyServices";
import { reducePoint } from "@services/ProfileServices";
import { auth } from "@config";

const FillSurvey = ({ route, navigation }) => {
  const { survey_data } = route.params;
  const [answers, setAnswersState] = useState([]);
  const [answer, onChangeAnswer] = useState("");
  const [index, setIndexState] = useState(0);
  const questions = survey_data.question_list;

  const [checked, setChecked] = useState(null);
  const [option, setOption] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleFill = () => {
    let tempAnswers = answers;

    if (
      survey_data.question_list[index].type == "Pilihan ganda" ||
      survey_data.question_list[index].type == "Skala linier"
    ) {
      tempAnswers[index] = checked;
      setChecked(null);
    } else if (
      survey_data.question_list[index].type == "Jawaban singkat" ||
      survey_data.question_list[index].type == "Paragraph"
    ) {
      tempAnswers[index] = answer;
      onChangeAnswer("");
    } else if (survey_data.question_list[index].type == "Kotak centang") {
      tempAnswers[index] = option;
      setOption([]);
    }
    setAnswersState(tempAnswers);
  };

  const handleBack = () => {
    if (answers[index - 1] || answers[index - 1] == 0) {
      if (
        survey_data.question_list[index - 1].type == "Pilihan ganda" ||
        survey_data.question_list[index - 1].type == "Skala linier"
      ) {
        setChecked(answers[index - 1]);
      } else if (
        survey_data.question_list[index - 1].type == "Jawaban singkat" ||
        survey_data.question_list[index - 1].type == "Paragraph"
      ) {
        onChangeAnswer(answers[index - 1]);
      } else if (survey_data.question_list[index - 1].type == "Kotak centang") {
        setOption(answers[index - 1]);
      }
    }
  };

  const handleNext = () => {
    if (answers[index + 1] || answers[index + 1] === 0) {
      if (
        survey_data.question_list[index + 1].type == "Pilihan ganda" ||
        survey_data.question_list[index + 1].type == "Skala linier"
      ) {
        setChecked(answers[index + 1]);
      } else if (
        survey_data.question_list[index + 1].type == "Paragraph" ||
        survey_data.question_list[index + 1].type == "Jawaban singkat"
      ) {
        onChangeAnswer(answers[index + 1]);
      } else if (survey_data.question_list[index + 1].type == "Kotak centang") {
        setOption(answers[index + 1]);
      }
    }
  };

  const handleDisabled = () => {
    let res;
    switch (survey_data.question_list[index].type) {
      case "Pilihan ganda":
      case "Skala linier":
        res = checked === null;
        break;
      case "Kotak centang":
        res = !option.length > 0;
        break;
      default:
        res = !answer;
        break;
    }
    return res && survey_data.question_list[index].required;
  };

  const handleSubmit = async () => {
    let mapAns = answers.map((ans, index) => {
      return {
        no: survey_data.question_list[index].no,
        result: ans ? (Array.isArray(ans) ? ans : String(ans)) : ans,
      };
    });
    mapAns = mapAns.filter((ans) => (ans.result === 0 ? 0 : ans.result));
    mapAns = mapAns.filter((ans) => ans.result.length > 0);

    let res = await saveAnswer(auth.currentUser.uid, survey_data.id, mapAns);
    let newPoint = await reducePoint(
      auth.currentUser.uid,
      -1 * survey_data.point
    );
    if (res && newPoint) {
      setVisible(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Pertanyaan " + (index + 1),
    });
  }, [index]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <View style={{ marginHorizontal: 20, marginTop: 20, gap: 16, flex: 1 }}>
        {survey_data.question_list[index].type == "Jawaban singkat" ? (
          <>
            <Text style={styles.p1}>
              {questions[index].question}
              {questions[index].required ? " *" : ""}
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
              {questions[index].required ? " *" : ""}
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
              {questions[index].required ? " *" : ""}
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
                      marginTop: 12,
                    }}
                  >
                    <RadioButton
                      key={idx}
                      value="test"
                      status={checked === idx ? "checked" : "unchecked"}
                      onPress={() => setChecked(idx)}
                      color="#6E61E8"
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
              {questions[index].required ? " *" : ""}
            </Text>
            {survey_data.question_list[index].option.map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 16,
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
              {questions[index].required ? " *" : ""}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 16,
              }}
            >
              {[
                ...Array(survey_data.question_list[index].number_of_scales),
              ].map((_, idx) => (
                <View key={idx} style={{ alignItems: "center", padding: 10 }}>
                  <Text key={`scale${idx}`}>{idx + 1}</Text>
                  <RadioButton
                    value="test"
                    status={checked === idx ? "checked" : "unchecked"}
                    onPress={() => setChecked(idx)}
                    color="#6E61E8"
                  />
                </View>
              ))}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 16,
                paddingHorizontal:
                  20 +
                  (5 - survey_data.question_list[index].number_of_scales) *
                    (survey_data.question_list[index].number_of_scales === 2
                      ? 23
                      : 15),
              }}
            >
              <Text style={[styles.p1, { flex: 1 }]}>
                {survey_data.question_list[index].option[0]}
              </Text>

              <Text style={[styles.p1]}>
                {survey_data.question_list[index].option[1]}
              </Text>
            </View>
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
            style={handleDisabled() ? styles.disabledButton : styles.nextButton}
            onPress={() => {
              setIndexState(index + 1);
              handleFill();
              handleNext();
            }}
            disabled={handleDisabled()}
          >
            <Text
              style={
                handleDisabled()
                  ? styles.disabledButtonText
                  : styles.nextButtonText
              }
            >
              Lanjut
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={handleDisabled() ? styles.disabledButton : styles.nextButton}
            onPress={() => {
              handleFill();
              handleNext();
              handleSubmit();
            }}
            disabled={handleDisabled()}
          >
            <Text
              style={
                handleDisabled()
                  ? styles.disabledButtonText
                  : styles.nextButtonText
              }
            >
              Selesai
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        style={styles.modal}
      >
        <StatusBar translucent backgroundColor="#6E61E8" />
        <View style={styles.modal}>
          <Image source={success} style={styles.image} />
          <Text style={[styles.h3, { color: "#fff", marginTop: 20.5 }]}>
            Kamu mendapatkan +{survey_data.point} poin!
          </Text>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.button1}>Balik ke home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  finishButton: {
    backgroundColor: "#fff",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 64,
  },
  image: {
    width: 205,
    height: 205,
  },
  modal: {
    backgroundColor: "#6E61E8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
    marginBottom: 8,
  },
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
    marginRight: 16,
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
    width: "100%",
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
    marginTop: 16,
  },
  paragraph: {
    marginTop: 16,
    width: "100%",
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
