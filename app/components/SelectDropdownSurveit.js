import React from "react";
import { StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SelectDropdownSurveit = ({
  data,
  defaultButtonText,
  setSelectedOption,
  defaultValue,
  reset,
}) => {
  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={(selectedOption) => {
          setSelectedOption(selectedOption);
          if (reset) {
            reset();
          }
        }}
        defaultButtonText={defaultButtonText}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={{ ...styles.dropdownButtonText, ...styles.p1 }}
        defaultValue={defaultValue}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        rowStyle={styles.dropdownRow}
        rowTextStyle={{ ...styles.dropdownRowText, ...styles.p1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  p1: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 20,
    fontWeight: "500",
  },
  dropdownButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    marginTop: 10,
  },
  dropdownButtonText: {
    textAlign: "left",
    fontFamily: "Urbanist_500Medium",
  },
  dropdownRow: {
    borderBottomColor: "#E2E8F0",
  },
  dropdownRowText: { textAlign: "left", fontFamily: "Urbanist_500Medium" },
});

export default SelectDropdownSurveit;
