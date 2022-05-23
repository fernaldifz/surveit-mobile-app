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

const SurveyRecommendation = ({ navigation }) => {
  const [survey, setSurvey] = useState([]);

  const fetchSurvey = async (type) => {
    let data = await getSurvey(auth.currentUser.uid, type);
    setSurvey(data);
  };

  useEffect(() => {
    fetchSurvey(true);
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
            survey.map((item, index) => (
              <SurveyCard
                key={index}
                {...item}
                navigation={navigation}
                data={item}
                page="home"
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SurveyRecommendation;
