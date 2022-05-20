import { TouchableOpacity } from "react-native";

export const AddSurveyButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -16,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: 64,
      backgroundColor: "#6E61E8",
      borderRadius: 20,
      shadowColor: "#7F5D70",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 20,
      shadowOpacity: 0.5,
      elevation: 5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
