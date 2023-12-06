import React from "react";
import { Text, StyleSheet } from "react-native";

export const ThinText = ({ texto }) => {
  return <Text style={styles.thinText}>{texto}</Text>;
};

export const RegularText = ({ texto }) => {
  return <Text style={styles.regularText}>{texto}</Text>;
};

export const MediumText = ({ texto }) => {
  return <Text style={styles.mediumText}>{texto}</Text>;
};

export const LightText = ({ texto }) => {
  return <Text style={styles.lightText}>{texto}</Text>;
};

export const BoldText = ({ texto }) => {
  return <Text style={styles.boldText}>{texto}</Text>;
};

const styles = StyleSheet.create({
  thinText: { fontFamily: "thin" },
  regularText: { fontFamily: "regular" },
  mediumText: { fontFamily: "medium" },
  lightText: { fontFamily: "light" },
  boldText: { fontFamily: "bold" },
});
