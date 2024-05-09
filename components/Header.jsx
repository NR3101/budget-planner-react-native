import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../utils/KindeCofig";
import colors from "../utils/colors";
import male from "../assets/images/male.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import services from "../utils/services";
import { router } from "expo-router";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  // This function will get the user data
  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  // This function will handle the logout
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {user?.picture ? (
        <Image
          source={{
            uri: user?.picture,
          }}
          style={styles.imageStyle}
        />
      ) : (
        <Image source={male} style={styles.imageStyle} />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "85%",
        }}
      >
        <View>
          <Text
            style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Outfit" }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: colors.WHITE,
              fontSize: 20,
              fontFamily: "Outfit-Bold",
            }}
          >
            {user?.given_name}
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: { width: 50, height: 50, borderRadius: 99 },
});
