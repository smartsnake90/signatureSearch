import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RoundButton = ({ label, onPress, icon }) => (
  <View style={styles.container}>
    <Pressable style={styles.button} onPress={onPress}>
      {icon && <Icon name={icon} size={20} color="#000" style={styles.icon} />}
      <Text onPress={onPress} style={styles.text}>
        {label}
      </Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  button: {
    width: 200,
    height: 68,
    backgroundColor: "black",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    cursor: "pointer",
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
  text: {
    color: "white",
  },
});

export default RoundButton;
