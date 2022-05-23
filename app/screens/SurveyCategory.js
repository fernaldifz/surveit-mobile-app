import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import SurveyCard from "@components/Survey/SurveyCard";
import { getSurvey } from "@services/SurveyServices";
import { useEffect, useState } from "react";
import { auth } from "@config";

const SurveyCategory = ({ route, navigation }) => {
  const { itemName } = route.params;

  const [survey, setSurvey] = useState([]);

  const fetchSurvey = async (type) => {
    let data = await getSurvey(auth.currentUser.uid, type);
    setSurvey(data);
  };

  useEffect(() => {
    fetchSurvey(true);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: "Survei " + itemName,
    });
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20 }}>
          {survey &&
            survey.map((item, index) =>
              item["category"] == itemName ? (
                <SurveyCard
                  key={index}
                  {...item}
                  navigation={navigation}
                  data={item}
                  page="home"
                />
              ) : (
                <View key={index}></View>
              )
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
  cheveronLeft: {
    width: 24,
    height: 24,
  },
});

export default SurveyCategory;
