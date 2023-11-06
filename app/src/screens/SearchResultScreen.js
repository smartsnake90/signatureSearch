import Icon from "react-native-vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import SignatureMatch from "./SignatureMatch";
import { axiosRequest } from "../utils/axios";
import { baseUrl } from "../config/config";

const InfoItem = ({ title, value, style }) => {
  return (
    <View
      style={
        style
          ? {
              borderRightStyle: "solid",
              borderRightWidth: 2,
              borderRightColor: "#e6e6e6",
              borderLeftStyle: "solid",
              borderLeftWidth: 2,
              borderLeftColor: "#e6e6e6",
              padding: 15,
              paddingBottom: 40,
            }
          : {
              padding: 20,
            }
      }
    >
      <Text style={styles.infoText}>{title}</Text>
      <Text style={styles.infoText}>{value}</Text>
    </View>
  );
};

const SearchResultScreen = ({ route, navigation }) => {
  const user = route?.params?.user;
  const no = route?.params?.user?.no;
  console.log("user: ", user);
  const [sign, setSigns] = useState([]);
  useEffect(() => {
    const func = async () => {
      const user = await axiosRequest(
        `${baseUrl}/loadSignature?no=${no}`,
        "get"
      );
      console.log("userResult: ", user);
      setSigns(user);
    };
    func();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={30}></Icon>
        </Pressable>
        <Text style={{ fontSize: 32, marginLeft: 20 }}>
          {user.name}&nbsp;{user.lastName}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>
          {user.name}&nbsp;{user.lastName}({user.birthYear}-
          {user.deathYear ? user.deathYear : "current"})
        </Text>
        <View style={styles.info}>
          <InfoItem title="Records" value="11" />
          <InfoItem title="Passed" value="8" style={true} />
          <InfoItem title="Average" value="30,000" />
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>Signatures:</Text>
        <View>
          {sign.map((sign, index) => (
            <View key={index}>
              <Text>IMAGE OF SIGNAURE {index + 1}</Text>
              {/* <Image source={`${baseUrl}/images/${sign.filepath}`} /> */}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 0 },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    height: 80,
    paddingLeft: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 15,
  },
  info: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    paddingBottom: 10,
  },
  infoText: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default SearchResultScreen;
