import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/common/SearchBar";
import RoundButton from "../components/common/RoundButton";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../redux/actions/action";
import { ScrollView } from "react-native";

const SearchContainer = ({ navigation }) => {
  const result = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSearch = (keyword) => {
    dispatch(searchByName(keyword));
  };

  return (
    <View>
      <SearchBar onChange={handleSearch} />
      <ScrollView style={styles.scroll}>
        {result &&
          result.map((user, index) => (
            <Pressable
              style={styles.button}
              key={index}
              onPress={() => navigation.navigate("SearchResult", { user })}
            >
              <Text style={{ fontSize: 30, textAlign: "center" }}>
                {user.name}&nbsp;{user.lastName}
              </Text>
            </Pressable>
          ))}
      </ScrollView>
      <View style={styles.buttonGrp}>
        <RoundButton
          label="Take Photo"
          icon="camera"
          // onPress={() => navigation.navigate("SignatureMatch")}
          onPress={() => navigation.navigate("CameraScreen")}
          // onPress={() => navigation.navigate("ImageEditScreen")}
          // onPress={() => navigation.navigate("cropPhoto")}
        />
        <RoundButton icon="book" label="Library" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrp: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
  },
  button: {},
  scroll: {
    marginTop: 30,
  },
});

export default SearchContainer;
