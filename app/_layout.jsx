import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit: require("../assets/fonts/Outfit.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Category",
        }}
      />
      <Stack.Screen
        name="add-new-category-item"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Item",
        }}
      />
    </Stack>
  );
}
