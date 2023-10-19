import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NoTodo from "./NoTodo";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoArrayToState, setTodoArrayToState] = useState([]);
  const [triggerEditing, setTriggerEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const renderTodo = ({ item, index }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoItemText}>{item.title}</Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(index)}
        />
        {!triggerEditing && (
          <IconButton
            icon="trash-can"
            iconColor="#fff"
            onPress={() => handleDeleteTodo(index)}
          />
        )}
      </View>
    );
  };

  //handle edit

  const handleEditTodo = (index) => {
    console.log(index);
    setEditingIndex(index);
    setTodo(todoArrayToState[index].title);
    setTriggerEditing(true);
  };

  //handle update
  const handleUpdateData = async () => {
    console.log(todo);
    const newTodoArray = [...todoArrayToState];
    newTodoArray[editingIndex].title = todo;

    console.log("new todo array", newTodoArray);
    // setTodoArrayToState(newTodoArray);
    // setTodo("");
    // setTriggerEditing(false);

    //store new todo array in async storage
    try {
      await AsyncStorage.setItem("todoArray", JSON.stringify(newTodoArray));
      setTodoArrayToState(newTodoArray);
      setTodo("");
      setTriggerEditing(false);
    } catch (error) {
      console.log("Failed to store data:", error);
    }
  };

  //handle store todo

  const handleStoreData = async () => {
    if (todo === "" || todo === null) {
      return;
    }
    //make object of todo
    const newTodo = {
      id: new Date().getTime(),
      title: todo,
    };

    //store todo object in todoArray array in async storage
    try {
      await AsyncStorage.setItem(
        "todoArray",
        JSON.stringify([...todoArrayToState, newTodo])
      );
      setTodoArrayToState([...todoArrayToState, newTodo]);

      setTodo("");
    } catch (error) {
      console.log("Failed to store data:", error);
    }
  };

  //handleDeleteTodo
  const handleDeleteTodo = async (index) => {
    const newTodoArray = [...todoArrayToState];
    newTodoArray.splice(index, 1);
    setTodoArrayToState(newTodoArray);

    //store new todo array in async storage
    try {
      await AsyncStorage.setItem("todoArray", JSON.stringify(newTodoArray));
    } catch (error) {
      console.log("Failed to store data:", error);
    }
  };

  //get data from async storage
  const getData = async () => {
    try {
      const todoArray = await AsyncStorage.getItem("todoArray");
      console.log(todoArray);

      if (todoArray === null) {
        const toDoArray = [];
        await AsyncStorage.setItem("todoArray", JSON.stringify(toDoArray));
      }
      setTodoArrayToState(JSON.parse(todoArray));
    } catch (error) {
      console.log("Failed to retrieve data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [todo]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a todo"
        style={styles.input}
        selectionColor={"#252B48"}
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {triggerEditing === true ? (
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdateData()}
        >
          <Text style={styles.addButtonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleStoreData()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}

      {/* Render to-do list */}
      {todoArrayToState?.length === 0 ? (
        <View>
          <NoTodo />
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={todoArrayToState}
          renderItem={renderTodo}
        />
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#252B48",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#5B9A8B",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 24,
    marginBottom: 6,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#D0D4CA",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 24,
    marginBottom: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  todoItem: {
    backgroundColor: "#445069",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  todoItemText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    textTransform: "capitalize",
  },
});
