import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import ColorPicker from "../components/ColorPicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { supabase } from "../utils/SupabaseConfig";
import { client } from "../utils/KindeCofig";
import { useRouter } from "expo-router";

export default function NewCategoryScreen() {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(colors.PRIMARY);
  const [categoryName, setCategoryName] = useState("");
  const [categoryBudget, setCategoryBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Disable button if category name or budget is empty
  const isDisabled = !categoryName || !categoryBudget || loading;

  // function to Create new category
  const onCreateCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          name: categoryName,
          assigned_budget: categoryBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();

    if (data) {
      router.replace({
        pathname: "/category-details",
        params: {
          categoryId: data[0].id,
        },
      });
      setLoading(false);
      ToastAndroid.show("Category Created Successfully", ToastAndroid.SHORT);
    }

    if (error) {
      setLoading(false);
    }

    //clear the input fields
    setCategoryBudget("");
    setCategoryName("");
  };

  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          value={selectedIcon}
          onChangeText={setSelectedIcon}
          maxLength={2}
        />

        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>

      {/* Add Category name and budget */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={colors.GRAY} />
        <TextInput
          placeholder="Category Name...."
          style={{ width: "100%", fontSize: 16 }}
          value={categoryName}
          onChangeText={setCategoryName}
        />
      </View>

      <View style={styles.inputView}>
        <Foundation name="dollar" size={34} color={colors.GRAY} />
        <TextInput
          placeholder="Total Budget...."
          keyboardType="numeric"
          style={{ width: "100%", fontSize: 16 }}
          value={categoryBudget}
          onChangeText={setCategoryBudget}
        />
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDisabled ? colors.GRAY : colors.PRIMARY },
        ]}
        disabled={isDisabled}
        onPress={onCreateCategory}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.WHITE} />
        ) : (
          <Text
            style={{
              fontSize: 17,
              color: colors.WHITE,
              fontFamily: "Outfit-Bold",
            }}
          >
            Create
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: 18,
    color: colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: colors.GRAY,
    backgroundColor: colors.WHITE,
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
});
