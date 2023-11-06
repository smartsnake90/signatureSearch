import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, StyleSheet, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import MaskedView from "@react-native-masked-view/masked-view";
import Icon from "react-native-vector-icons/AntDesign";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setCapturedImage(uri);
    }
  };

  const handleCancelCrop = () => {
    setCapturedImage(null);
    setCroppedImage(null);
  };

  const handleDoneCrop = async () => {
    if (capturedImage) {
      const manipResult = await ImageManipulator.manipulateAsync(
        capturedImage,
        [{ crop: getCropDimensions() }],
        { compress: 1, format: "png" }
      );
      setCroppedImage(manipResult.uri);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setCroppedImage(null);
  };

  const getCropDimensions = () => {
    // Return your desired crop dimensions here
    return {
      originX: 0,
      originY: 0,
      width: 200,
      height: 200,
    };
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {capturedImage && !croppedImage ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: capturedImage }}
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
          />
          <Button title="Cancel" onPress={handleCancelCrop} />
          <Button title="Done" onPress={handleDoneCrop} />
        </View>
      ) : croppedImage ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: croppedImage }}
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
          />
          <Button title="Reset" onPress={handleReset} />
        </View>
      ) : (
        <MaskedView
          style={{ height: "100%", position: "relative" }}
          maskElement={
            <View style={styles.mask}>
              <View
                style={{
                  width: 300,
                  height: 400,
                  borderRadius: 15,
                  position: "absolute",
                  top: 100,
                  left: 55,
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          }
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icon name="left" size={25}></Icon>
              </Pressable>
              <Text style={{ fontSize: 25 }}>Sinature Search</Text>
            </View>
            <View style={styles.cameraContainer}>
              <Camera
                ref={(ref) => {
                  cameraRef = ref;
                }}
                style={{ flex: 1 }}
                type={type}
              />
            </View>
            <View style={{ position: "absolute", bottom: 0 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  textAlign: "center",
                  padding: 5,
                }}
              >
                Positinon Signature inside frame and take a photo. Avoid taking
                photo of date of crop it later
              </Text>
              <Pressable
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "grey",
                  borderRadius: 50,
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderColor: "white",
                  borderWidth: 8,
                }}
                onPress={handleTakePhoto}
              ></Pressable>
              {/* <Pressable onPress={pickImage}>
                <Text style={{ fontSize: 20, color: "white" }}>Picker</Text>
              </Pressable> */}
            </View>
          </View>
        </MaskedView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 2,
    aspectRatio: 0.5,
  },
  mask: {
    width: 500,
    height: 1000,
    backgroundColor: "#00000078",
    position: "absolute",
  },
  button: { width: 50, backgroundColor: "grey" },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 30,
    height: 80,
  },
});
