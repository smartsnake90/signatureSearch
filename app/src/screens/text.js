import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { ImageEditor } from "expo-crop-image";

const CropPhotoPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [croppedPhotoUri, setCroppedPhotoUri] = useState(null);
  const cameraRef = useRef(null);

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

  const cancelCrop = () => {
    setPhotoUri(null);
    setCroppedPhotoUri(null);
  };

  const confirmCrop = () => {
    if (croppedPhotoUri) {
      // Implement your logic to save or process the cropped photo
      console.log("Crop confirmed:", croppedPhotoUri);
      setPhotoUri(null);
      setCroppedPhotoUri(null);
    }
  };

  const resetCrop = () => {
    setCroppedPhotoUri(null); // Clear the cropped photo URI to reset cropping
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (croppedPhotoUri) {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={{ uri: croppedPhotoUri }} />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={cancelCrop}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmCrop}>
            <Text>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetCrop}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (photoUri) {
    return (
      <View style={{ flex: 1 }}>
        <ImageEditor
          imageUri={photoUri}
          fixedAspectRatio={2 / 3}
          minimumCropDimensions={{
            width: 50,
            height: 50,
          }}
          onEditingCancel={() => {
            console.log("onEditingCancel");
          }}
          onEditingComplete={(image) => {
            setCroppedPhotoUri(image);
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
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
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity onPress={takePhoto}>
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
          {" "}
          Take photo{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CropPhotoPage;
