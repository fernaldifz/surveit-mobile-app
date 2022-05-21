import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  LogBox,
} from "react-native";
import surveyCover from "../assets/survey-cover.png";
import cheveronLeft from "../assets/cheveron-left.png";
import point from "../assets/point.png";
import dot from "../assets/dot.png";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/index";

// Firebase sets some timers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const SurveyDetails = ({ route, navigation }) => {
  const [userDoc, setUserDoc] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleStartFill = () => {
    navigation.navigate("FillSurvey", {
      survey_data: userDoc,
    });
  };

  const myDoc = doc(db, "surveys", "document_dummy");
  getDoc(myDoc)
    .then((snapshot) => {
      if (snapshot.exists) {
        setUserDoc(snapshot.data());
        setisLoaded(true);
      } else {
        alert("No doc found!");
      }
    })
    .catch((error) => {
      setisLoaded(true);
      setError(error);
    });

  if (error) {
    return (
      <Text
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Error: {error.message}
      </Text>
    );
  } else if (!isLoaded) {
    return (
      <Text
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Loading...
      </Text>
    );
  } else {
    return (
      <View>
        <View style={{ width: "100%", height: 180 }}>
          <ImageBackground source={surveyCover} style={styles.image}>
            <View
              style={{
                width: "100%",
                height: 80,
                position: "absolute",
                top: 0,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 32,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "left",
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("pindah ke pilih survey")}
                >
                  <Image
                    style={styles.cheveronLeft}
                    source={cheveronLeft}
                    tintColor="white"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <View style={{ marginTop: 20, marginBottom: 32 }}>
            <Text style={[styles.h3, styles.surveyTitle]}>{userDoc.title}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image style={styles.point} source={point} />
              <Text style={{ ...styles.p2, color: "#F9AD5D" }}>
                {" "}
                {userDoc.point} poin{"  "}
              </Text>
              <Image style={styles.dot} source={dot} tintColor="#64748B" />
              <Text style={{ ...styles.p2, color: "#64748B" }}>
                {"  "}
                {userDoc.question_list.length} Pertanyaan
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 32 }}>
            <Text style={styles.p1}>{userDoc.description}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartFill}
            >
              <Text style={styles.textButton}>Mulai kerjakan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
  p2: {
    fontSize: 12,
    color: "#334155",
    lineHeight: 14,
    fontWeight: "500",
  },
  cheveronLeft: {
    width: 24,
    height: 24,
  },
  point: {
    width: 16,
    height: 16,
  },
  dot: {
    width: 4,
    height: 4,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  surveyTitle: {
    marginBottom: 8,
  },
  startButton: {
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
});

export default SurveyDetails;
