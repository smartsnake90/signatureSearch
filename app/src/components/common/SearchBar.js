import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const SearchBar = ({ onChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    onChange(text);
  };

  const cancelSearch = () => {
    setSearchText("");
    onChange("");
  };

  return (
    <View style={styles.container}>
      <Icon name="search1" size={25} color="#000" style={styles.icon} />
      <TextInput
        placeholder="Search By Name"
        value={searchText}
        onChangeText={handleSearch}
        style={{ flex: 5, fontSize: 20 }}
      />
      {searchText ? (
        <Icon
          name="closecircle"
          color="grey"
          size={25}
          style={{ flex: 1 }}
          onPress={cancelSearch}
        />
      ) : null}

      <Pressable onPress={cancelSearch}>
        <Text style={{ fontSize: 20 }}>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    marginBottom: 10,
    flexDirection: "row",
    marginTop: 20,
  },
  icon: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
