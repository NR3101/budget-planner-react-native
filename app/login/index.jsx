import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import loginBg from "../../assets/images/loginbg.png";
import colors from "../../utils/colors";
import { client } from "../../utils/KindeCofig";
import services from "../../utils/services";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  //function to login user
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image source={loginBg} style={styles.bgImg} />
      <View
        style={{
          backgroundColor: colors.PRIMARY,
          width: "100%",
          height: "100%",
          padding: 20,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.WHITE,
          }}
        >
          Personal Budget Planner
        </Text>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: colors.WHITE,
            marginTop: 15,
            lineHeight: 25,
          }}
        >
          Stay on top of your finances with your Personal Budget Planner App!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text
            style={{
              textAlign: "center",
              color: colors.PRIMARY,
              fontWeight: "600",
            }}
          >
            Login/Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    width: 200,
    height: 400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: colors.BLACK,
  },
  button: {
    backgroundColor: colors.WHITE,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 99,
    marginTop: 20,
  },
});
