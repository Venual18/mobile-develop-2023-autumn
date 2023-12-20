import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../http/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const nav = useNavigation();

  const signIn = async () => {
    await login(username, password)
      .then(async (data) => {
        await AsyncStorage.setItem("token", data.token);
        console.log(data);
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        if (AsyncStorage.getItem("token")) {
          nav.replace("Tab");
        } else {
          console.log("Неверный логин или пароль");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        padding: 14,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Логин</Text>
      <TextInput
        style={{ backgroundColor: "white", width: "100%", padding: 6 }}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Пароль</Text>
      <TextInput
        style={{ backgroundColor: "white", width: "100%", padding: 6 }}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title={"Войти"} onPress={() => signIn()} />
      <Text>Нет аккаунта?</Text>
      <TouchableOpacity onPress={() => nav.replace("Registration")}>
        <Text style={{ color: "blue" }}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
