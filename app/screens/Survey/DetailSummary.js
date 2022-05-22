import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

const DetailSummary = ({ navigation, route }) => {
  const { question, data } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: question,
    });
  }, [question]);

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      {data &&
        data.map((item, index) => {
          return (
            <View key={index} style={[style.answer]}>
              <Text style={style.p1}>{item.answer}</Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  answer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    borderRadius: 12,
    textAlignVertical: "top",
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
});

export default DetailSummary;
