import { ScrollView } from "react-native";
import TextSummary from "@components/Survey/TextSummary";

const dummy = [
  {
    id: 1,
    answer: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa",
  },
  {
    id: 2,
    answer: "B",
  },
  {
    id: 3,
    answer: "C",
  },
  {
    id: 4,
    answer: "D",
  },
];

const SurveySummary = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "#F8FAFC", padding: 20 }}>
      <TextSummary
        data={dummy}
        question={"Siapa namamu?"}
        navigation={navigation}
      />
      <TextSummary
        data={dummy}
        question={"Siapa namamu?"}
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default SurveySummary;
