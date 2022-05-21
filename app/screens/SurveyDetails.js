import React from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import surveyCover from "../assets/survey-cover.png";
import cheveronLeft from "../assets/cheveron-left.png";

const SurveyDetails = ({ route, navigation }) => {
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
    </View>
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
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SurveyDetails;
