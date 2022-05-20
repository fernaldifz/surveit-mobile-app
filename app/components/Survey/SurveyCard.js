import { View, Text, Image, StyleSheet } from "react-native";
import VoucherCover from "@assets/voucher-cover.png";

const SurveyCard = () => {
  return (
    <View style={style.container}>
      <Image style={style.image} source={VoucherCover} />
      <View style={{ padding: 12 }}>
        <Text style={style.h3}>Survei Hewan Peliharaan</Text>
        <Text style={[style.p2, { color: "#94A3B8" }]}>5 pertanyaan</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    shadowColor: "#7F5D70",
    elevation: 8,
  },

  image: {
    width: "100%",
    height: 320,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 100,
  },

  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
    marginBottom: 8,
  },

  p2: {
    color: "#F9AD5D",
    lineHeight: 14,
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 12,
  },
});

export default SurveyCard;
