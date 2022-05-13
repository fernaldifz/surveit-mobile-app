import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

const ShortAnswerQuestion = ({ route, navigation }) => {
  const { selectedQuestionType, questionCount } = route.params;
  console.log(selectedQuestionType);
  console.log(questionCount);

  return <Text>Ini short answer</Text>;
};

export default ShortAnswerQuestion;
