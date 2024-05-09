import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/SupabaseConfig";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";

const placeholderImage =
  "https://imgs.search.brave.com/F2q10zmDZFDW6dHMgYk_tnm1IswwRJNbe0c-6o6pVUA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzY4LzU1LzYw/LzM2MF9GXzI2ODU1/NjAxMV9QbGJoS3Nz/MGFsZkZtek51cVhk/RTNMME9ma0hRMXJI/SC5qcGc";
export default function AddNewCategoryItem() {
  const [image, setImage] = useState(placeholderImage);
  const [previewImage, setPreviewImage] = useState(placeholderImage);
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { categoryId } = useLocalSearchParams();

  const router = useRouter();

  const isDisabled = !itemName || !cost || loading;

  const clearFields = () => {
    setItemName("");
    setCost("");
    setNotes("");
    setPreviewImage(placeholderImage);
  };

  //function to pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  //function to upload image to supabase storage
  const onClickAddItem = async () => {
    setLoading(true);
    const fileName = Date.now() + ".png";
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, decode(image), {
        contentType: "image/png",
      });

    if (data) {
      const fileUrl =
        "https://visqpdjjzawbpmesbdfl.supabase.co/storage/v1/object/public/images/" +
        fileName;

      const { data, error } = await supabase
        .from("CategoryItems")
        .insert([
          {
            name: itemName,
            cost: cost,
            image: fileUrl,
            note: notes,
            category_id: categoryId,
          },
        ])
        .select();

      ToastAndroid.show("Item Added Successfully", ToastAndroid.SHORT);
      setLoading(false);

      //navigate to category details screen
      router.replace({
        pathname: "/category-details",
        params: {
          categoryId: categoryId,
        },
      });

    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={{
          padding: 20,
          backgroundColor: colors.WHITE,
          height: "100%",
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <Ionicons name="pricetag" size={24} color={colors.GRAY} />
          <TextInput
            placeholder="Item Name...."
            style={styles.input}
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Feather name="dollar-sign" size={24} color={colors.GRAY} />
          <TextInput
            placeholder="Cost...."
            keyboardType="numeric"
            style={styles.input}
            value={cost}
            onChangeText={(val) => setCost(val)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Ionicons name="pencil" size={24} color={colors.GRAY} />
          <TextInput
            placeholder="Notes...."
            style={styles.input}
            numberOfLines={3}
            multiline={true}
            value={notes}
            onChangeText={(val) => setNotes(val)}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isDisabled ? colors.GRAY : colors.PRIMARY,
            },
          ]}
          disabled={isDisabled}
          onPress={onClickAddItem}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.WHITE} />
          ) : (
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 20,
                fontFamily: "Outfit-Bold",
              }}
            >
              Add Item
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: 15,
    alignSelf: "center",
  },
  textInputContainer: {
    padding: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
    borderColor: colors.GRAY,
    marginTop: 15,
  },
  input: {
    fontSize: 18,
    width: "100%",
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 25,
  },
});
