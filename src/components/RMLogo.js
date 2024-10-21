import { Image } from "react-native";
import React from "react";

export default function RMLogo({ customStyle, ...rest }) {
  return (
    <Image
      style={customStyle}
      source={require("../assets/images/logo.png")}
      {...rest}
    />
  );
}
