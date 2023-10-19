import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const NoTodo = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/todo_image.png")}
        style={{
          width: "100%",
          height: 300,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default NoTodo;

const styles = StyleSheet.create({});
