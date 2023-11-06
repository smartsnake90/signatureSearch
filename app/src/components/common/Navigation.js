import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const Navigation = ({ tabs }) => (
  <Pressable style={styles.container}>
    {tabs.map((tab, index) => (
      <Pressable key={index}>
        <Text>{tab}</Text>
      </Pressable>
    ))}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    background: "black",
    padding: 20,
  },
});

export default Navigation;
