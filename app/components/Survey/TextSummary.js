import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import cheveronRight from "@assets/cheveron-right.png";

const TextSummary = ({ data, question, navigation }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={[style.p1, { marginBottom: 8 }]}>{question}</Text>
        <Text style={style.p2}>{data.length} respon</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        {data &&
          data
            .slice(0, data.length > 3 ? 3 : data.length)
            .map((item, index) => {
              return (
                <View style={style.answer} key={index}>
                  <Text numberOfLines={1} style={style.p1}>
                    {item.answer}
                  </Text>
                </View>
              );
            })}
        {data && data.length > 3 && (
          <TouchableOpacity
            style={style.button}
            onPress={() =>
              navigation.navigate("DetailSummary", {
                data: data,
                question: question,
              })
            }
          >
            <Text numberOfLines={1} style={style.button2}>
              Lihat semua
            </Text>
            <Image source={cheveronRight} style={style.image} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextSummary;

const style = StyleSheet.create({
  answer: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    borderRadius: 12,
    maxHeight: 48,
  },
  p1: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
    color: "#475569",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(110, 97, 232, 0.1)",
    height: 32,
    borderRadius: 20,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  image: {
    width: 10,
    height: 10,
    marginLeft: 6,
  },
  button2: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: "Urbanist_600SemiBold",
    color: "#6E61E8",
  },
  p2: {
    color: "#94A3B8",
    lineHeight: 14,
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 12,
  },
});
