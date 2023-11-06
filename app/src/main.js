import { NavigationContainer } from "@react-navigation/native";
import Router from "./Routes";
import { Text, View, StyleSheet } from "react-native";
import Navigation from "./components/common/Navigation";

export default function Main() {
  return (
    // <View style={styles.container}>
    //   <Navigation tabs={["Home", "Search", "Profile"]} />
    // </View>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
  },
});
