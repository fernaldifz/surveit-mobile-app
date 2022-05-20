import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import voucherCover from "@assets/voucher-cover.png";

const Card = ({
  id,
  name,
  content,
  buttonText,
  handleUse,
  code,
  type,
  point,
}) => {
  return (
    <View style={style.container}>
      <Image source={voucherCover} style={style.image} />
      <View style={{ padding: 12, display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <Text style={style.h3}>{name}</Text>
          {content}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={style.button}
            onPress={() =>
              handleUse(type === "redeem" ? { id: id, point:point } : code)
            }
          >
            <Text style={style.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 320,
    borderRadius: 20,
    shadowColor: "#7F5D70",
    elevation: 8,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
  },
  image: {
    width: 320,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    width: 138,
    height: 40,
    backgroundColor: "rgba(110, 97, 232, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#6E61E8",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 16,
  },
  h3: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_600SemiBold",
    color: "#475569",
  },
});

export default Card;
