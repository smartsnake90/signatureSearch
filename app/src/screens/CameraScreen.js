import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import MaskedView from "@react-native-masked-view/masked-view";
import Icon from "react-native-vector-icons/AntDesign";
import { ImageEditor } from "expo-crop-image";
import { axiosRequest } from "../utils/axios";
import { baseUrl } from "../config/config";
import { useDispatch } from "react-redux";
import { LOAD_USER } from "../redux/actions/ActionTypes";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [croppedPhotoUri, setCroppedPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1 };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(data.uri);
    }
  };

  const handleImageUpload = async (imageURI) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageURI,
        type: "image/jpeg",
        name: "myImage.jpg",
      });
      const response = await axiosRequest(
        `${baseUrl}/matchSign`,
        "post",
        formData
      );
      result = JSON.parse(response);

      if (!result.length) setPhotoUri(null);
      else {
        result = result.map((user) => user.fields);
        dispatch({ type: LOAD_USER, payload: result });
        navigation.navigate("Search");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const cancelCrop = () => {
    setPhotoUri(null);
    setCroppedPhotoUri(null);
  };

  if (photoUri) {
    return (
      <View style={{ flex: 1 }}>
        <ImageEditor
          imageUri={photoUri}
          fixedAspectRatio={4 / 2}
          minimumCropDimensions={{
            width: 50,
            height: 50,
          }}
          onEditingCancel={cancelCrop}
          onEditingComplete={(image) => {
            // setCroppedPhotoUri(image);
            handleImageUpload(image.uri);
          }}
        />
      </View>
    );
  }
  return (
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={25}></Icon>
          </TouchableOpacity>
          <Text style={{ fontSize: 25, marginLeft: 20 }}>Signature Search</Text>
        </View>
        <View style={styles.cameraContainer}>
          <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
            <View
              style={{
                width: "100%",
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
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
          <TouchableOpacity
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
            onPress={takePhoto}
          ></TouchableOpacity>
        </View>
      </View>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "none",
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
    backgroundColor: "#00000088",
    position: "absolute",
    marginLeft: 30,
    justifyContent: "center",
  },
  button: { width: 50, backgroundColor: "grey" },
  header: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingTop: 20,
    height: 80,
    alignItems: "center",
    paddingLeft: 30,
  },
});
