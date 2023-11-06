import React, { useState } from "react";
import { Modal, Button, View, Text } from "react-native";

import React from "react";
import { Text, View } from "react-native";

const CModal = ({ params }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      <Button title="Open Modal" onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          // You can also add additional functionality when the modal is closed.
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>Hello, I am a modal!</Text>
            <Button title="Close Modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CModal;
