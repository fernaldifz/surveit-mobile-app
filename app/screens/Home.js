import React from "react";
import surveitLogo from "../assets/surveit-home.png";
import guideBG from "../assets/guide-bg.png";
import educationCategory from "../assets/education-category.png";
import lifestyleCategory from "../assets/lifestyle-category.png";
import businessCategory from "../assets/business-category.png";
import otherCategory from "../assets/other-category.png";
import cheveronRight from "../assets/cheveron-right.png";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

//Changes
import SurveyCard from "@components/Survey/SurveyCard";
import { getSurvey } from "@services/SurveyServices";
import { useEffect, useState } from "react";
import { dummyAcc } from "@const";

const Home = ({ navigation }) => {
  const category = [
    {
      name: "Pendidikan",
      img: educationCategory,
    },
    {
      name: "Gaya Hidup",
      img: lifestyleCategory,
    },
    {
      name: "Bisnis",
      img: businessCategory,
    },
    {
      name: "Lainnya",
      img: otherCategory,
    },
  ];

  //changes
  const [survey, setSurvey] = useState([]);

  const fetchSurvey = async () => {
    let data = await getSurvey(dummyAcc);
    setSurvey(data);
  };

  useEffect(() => {
    fetchSurvey();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchSurvey();
    });

    return willFocusSubscription;
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} source={surveitLogo} />
        <View
          style={{
            alignItems: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 20,
            width: 320,
            height: 160,
          }}
        >
          <ImageBackground style={styles.cardImage} source={guideBG}>
            <View style={styles.guideText}>
              <Text style={styles.h3}>Isi survei dengan kaidah</Text>
              <Text style={styles.h3}>yang benar</Text>
            </View>
            <View
              style={{
                width: 140,
                position: "absolute",
                top: 88,
                left: 20,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={styles.seeGuideButton}
                onPress={() => navigation.navigate("Guide")}
              >
                <Text style={styles.button1}>Lihat panduan</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{ width: 320, marginTop: 20 }}>
          <Text style={styles.h2}>Kategori survei</Text>
          <View
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {category.map((category, index) => {
              return (
                <TouchableOpacity
                  style={{
                    width: 74,
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 8,
                    alignItems: "center",
                  }}
                  key={index}
                  onPress={() =>
                    navigation.navigate("SurveyCategory", {
                      itemName: category.name,
                    })
                  }
                >
                  <Image style={styles.categoryImage} source={category.img} />
                  <Text style={styles.p2}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* changes */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              maxWidth: 360,
              justifyContent: "space-around",
            }}
          >
            <Text style={[styles.h2, { flex: 1 }]}>Survei untukmu</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => navigation.navigate("SurveyRecommendation")}
            >
              <Text style={styles.button2}>Lihat semua</Text>
              <Image style={{ width: 12, height: 12 }} source={cheveronRight} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 16 }}>
            {survey &&
              (survey.length > 5
                ? survey
                    .slice(0, 5)
                    .map((item, index) => (
                      <SurveyCard
                        key={index}
                        {...item}
                        navigation={navigation}
                        data={item}
                        page="home"
                      />
                    ))
                : survey.map((item, index) => (
                    <SurveyCard
                      key={index}
                      {...item}
                      navigation={navigation}
                      data={item}
                      page="home"
                    />
                  )))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h2: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#ffffff",
  },
  p2: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  button1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  button2: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  image: {
    marginTop: 44,
    alignItems: "center",
    width: 89,
    height: 32,
    resizeMode: "contain",
  },
  guideText: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  seeGuideButton: {
    width: 140,
    height: 40,
    color: "#6E61E8",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 320,
    height: 160,
    resizeMode: "cover",
    justifyContent: "center",
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  seeAllButton: {
    width: 108,
    height: 32,
    backgroundColor: "#6E61E81A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default Home;
