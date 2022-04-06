import React from "react";
import { ThemeProvider } from "@rneui/themed";
import { Text, View } from "react-native";
import surveitTheme from "./Theme";

const HelloWorldApp = () => {
  return (
    <ThemeProvider theme={surveitTheme}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Hello, world!</Text>
      </View>
    </ThemeProvider>
  );
};
export default HelloWorldApp;
