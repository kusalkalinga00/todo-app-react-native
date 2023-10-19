import { Stack } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import TodoScreen from "../components/TodoScreen";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
      <Stack.Screen
        options={{
          headerTitle: "Todo List",
          headerStyle: { backgroundColor: "#FAFAFC" },
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <TodoScreen />
    </SafeAreaView>
  );
};

export default Home;
