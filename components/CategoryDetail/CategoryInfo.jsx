import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { supabase } from "../../utils/SupabaseConfig";
import { useRouter } from "expo-router";

export default function CategoryInfo({ categoryData }) {
  const [totalCost, setTotalCost] = useState();
  const [percTotal, setPercTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    calculateTotalPercentage();
  }, [categoryData]);

  //function to calculate total and percentage of all items in a category
  const calculateTotalPercentage = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach((item) => {
      total = total + item.cost;
    });

    setTotalCost(total);

    let perc = (total / categoryData?.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }

    setPercTotal(perc);
  };

  //function to delete a category
  const onDeleteCategory = async (categoryId) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("CategoryItems")
              .delete()
              .eq("category_id", categoryData.id);

            const { error: error2 } = await supabase
              .from("Category")
              .delete()
              .eq("id", categoryData.id);

            ToastAndroid.show(
              "Category Deleted Successfully",
              ToastAndroid.SHORT
            );
            router.replace("/(tabs)");
          },
        },
      ]
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryData.color }]}
          >
            {categoryData.icon}
          </Text>
        </View>

        <View style={{ flex: 1, marginLeft: 25 }}>
          <Text style={styles.categoryText}>{categoryData.name}</Text>
          <Text style={styles.itemCount}>
            {categoryData?.CategoryItems?.length} items
          </Text>
        </View>

        {/* Delete button  */}
        <TouchableOpacity onPress={() => onDeleteCategory(categoryData.id)}>
          <Ionicons name="trash" size={30} color={colors.RED} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: "Outfit-Bold" }}>${totalCost}</Text>
        <Text style={{ fontFamily: "Outfit" }}>
          Total Budget: ${categoryData.assigned_budget}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: percTotal + "%" }]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  textIcon: {
    fontSize: 35,
    padding: 20,
    borderRadius: 15,
  },
  categoryText: {
    fontFamily: "Outfit-Bold",
    fontSize: 24,
  },
  itemCount: {
    fontFamily: "Outfit",
    fontSize: 16,
    marginLeft: 3,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  progressBarContainer: {
    width: "100%",
    height: 15,
    backgroundColor: colors.GRAY,
    borderRadius: 40,
    marginTop: 8,
  },
  progressBar: {
    width: "50%",
    height: "100%",
    backgroundColor: colors.PRIMARY,
    borderRadius: 40,
  },
});
