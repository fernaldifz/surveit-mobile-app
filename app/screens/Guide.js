import React from "react";
import cheveronLeft from "../assets/cheveron-left.png";
import guide1Correct from "../assets/guide01-correct.png";
import guide1Wrong from "../assets/guide01-wrong.png";
import guide2Correct from "../assets/guide02-correct.png";
import guide2Wrong from "../assets/guide02-wrong.png";
import guide3Correct from "../assets/guide03-correct.png";
import guide3Wrong from "../assets/guide03-wrong.png";
import guide4Correct from "../assets/guide04-correct.png";
import guide4Wrong from "../assets/guide04-wrong.png";
import guide5Correct from "../assets/guide05-correct.png";
import guide5Wrong from "../assets/guide05-wrong.png";
import wrongEmoji from "../assets/frown-emoji.png";
import correctEmoji from "../assets/smile-emoji.png";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

const Guide = ({ navigation }) => {
  const images = [
    { correct: guide1Correct, wrong: guide1Wrong },
    { correct: guide2Correct, wrong: guide2Wrong },
    { correct: guide3Correct, wrong: guide3Wrong },
    { correct: guide4Correct, wrong: guide4Wrong },
    { correct: guide5Correct, wrong: guide5Wrong },
    { correct: guide5Correct, wrong: guide5Wrong },
  ];

  const desc = [
    "Kamu harus mengisi semua jawaban yang ada tanda *required dengan baik",
    "Gunakan bahasa yang sopan dan nyaman untuk dibaca",
    "Gunakan bahasa Indonesia/Inggris yang mudah dipahami oleh semua orang",
    "Baca pertanyaan dengan teliti sebelum menjawab",
    "Jawablah pertanyaan dengan jujur :D",
  ];

  const [index, setIndex] = React.useState(0);
  const [guideState, setGuideState] = React.useState(1);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#6E61E8",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: 80,
          position: "absolute",
          top: 0,
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
            <Image style={styles.cheveronLeft} source={cheveronLeft} />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={styles.h3}>Pilih yang benar</Text>
          </View>
        </View>
      </View>
      {guideState == 1 ? (
        <View style={{ marginTop: 100 }}>
          {index == 0 || index == 1 || index == 3 ? (
            <View>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  if (index < 4) {
                    setIndex(index + 1);
                    setGuideState(3);
                  } else {
                    setGuideState(5);
                  }
                }}
              >
                <Image style={styles.image} source={images[index].wrong} />
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.p1}>atau</Text>
              </View>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  if (index < 4) {
                    setIndex(index + 1);
                    setGuideState(2);
                  } else {
                    setIndex(index + 1);
                    setGuideState(4);
                  }
                }}
              >
                <Image style={styles.image} source={images[index].correct} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  setIndex(index + 1);
                  if (index < 4) {
                    setGuideState(2);
                  } else {
                    setGuideState(4);
                  }
                }}
              >
                <Image style={styles.image} source={images[index].correct} />
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.p1}>atau</Text>
              </View>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => {
                  setIndex(index + 1);
                  if (index < 4) {
                    setGuideState(3);
                  } else {
                    setGuideState(5);
                  }
                }}
              >
                <Image style={styles.image} source={images[index].wrong} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : guideState == 2 ? (
        <View style={{ alignItems: "center", marginTop: 254 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: 152,
              marginBottom: 32,
            }}
          >
            <Image style={styles.emoji} source={correctEmoji} />
            <Text style={styles.h1}>Betul sekali!</Text>
          </View>
          <Text style={styles.p1}>{desc[index - 1]}</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              setGuideState(1);
            }}
          >
            <Text style={styles.button1}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      ) : guideState == 3 ? (
        <View style={{ alignItems: "center", marginTop: 254 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: 152,
              marginBottom: 32,
            }}
          >
            <Image style={styles.emoji} source={wrongEmoji} />
            <Text style={styles.h1}>Yah salah!</Text>
          </View>
          <Text style={styles.p1}>{desc[index - 1]}</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              setGuideState(1);
            }}
          >
            <Text style={styles.button1}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      ) : guideState == 4 ? (
        <View style={{ alignItems: "center", marginTop: 254 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: 152,
              marginBottom: 32,
            }}
          >
            <Image style={styles.emoji} source={correctEmoji} />
            <Text style={styles.h1}>Betul sekali!</Text>
          </View>
          <Text style={styles.p1}>{desc[index - 1]}</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.button1}>Selesai</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center", marginTop: 254 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: 152,
              marginBottom: 32,
            }}
          >
            <Image style={styles.emoji} source={wrongEmoji} />
            <Text style={styles.h1}>Yah salah!</Text>
          </View>
          <Text style={styles.p1}>{desc[index - 1]}</Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.button1}>Selesai</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Urbanist_600SemiBold",
    color: "#fff",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#ffffff",
    textAlign: "center",
    width: 320,
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  cheveronLeft: {
    width: 24,
    height: 24,
  },
  image: {
    width: 320,
    height: 200,
    borderRadius: 12,
  },
  imageButton: {
    shadowColor: "#CBD5E180",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 6,
  },
  nextButton: {
    width: 320,
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  emoji: {
    width: 100,
    height: 100,
  },
});

export default Guide;
