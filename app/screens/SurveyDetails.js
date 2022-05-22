import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  LogBox,
  StatusBar,
} from "react-native";

import point from "../assets/point.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/index";

import cheveronLeft from "@assets/cheveron-white-left.png";

// Firebase sets some timers for a long period, which will trigger some warnings.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const SurveyDetails = ({ route, navigation }) => {
  const { id, cover } = route.params;

  const [userDoc, setUserDoc] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleStartFill = () => {
    navigation.navigate("FillSurvey", {
      survey_data: userDoc,
    });
  };

  useEffect(() => {
    const myDoc = doc(db, "surveys", id);
    console.log(id)
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

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cheveronLeft} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, []);

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
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ flex: 1 }}>
          <Image source={{uri: cover}} style={styles.image} />
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <View
              style={{
                marginTop: 20,
                marginBottom: 32,
              }}
            >
              <Text style={[styles.h3, styles.surveyTitle]}>
                {userDoc.title}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image style={styles.point} source={point} />
                <Text
                  style={{
                    ...styles.p2,
                    color: "#F9AD5D",
                    fontFamily: "Urbanist_500Medium",
                  }}
                >
                  {" "}
                  {userDoc.point} poin {"  "}
                </Text>
                <Text
                  style={{
                    ...styles.p2,
                    color: "#94A3B8",
                    fontFamily: "Urbanist_500Medium",
                  }}
                >
                  {"•  "}
                  {userDoc.question_list.length} pertanyaan
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.p1}>{userDoc.description}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartFill}
          >
            <Text style={styles.textButton}>Mulai kerjakan</Text>
          </TouchableOpacity>
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
    color: "#475569",
    fontFamily: "Urbanist_600SemiBold",
  },
  p1: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
  },
  p2: {
    fontSize: 12,
    color: "#94A3B8",
    lineHeight: 14,
    fontFamily: "Urbanist_500Medium",
  },
  cheveronLeft: {
    width: 24,
    height: 24,
  },
  point: {
    width: 16,
    height: 16,
  },
  image: {
    justifyContent: "center",
    height: 180,
  },
  surveyTitle: {
    marginBottom: 8,
  },
  startButton: {
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
});

export default SurveyDetails;
