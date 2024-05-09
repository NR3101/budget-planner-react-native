import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  const router = useRouter();

  //To navigate to the category details screen
  const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-details",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (category) => {
    let total = 0;
    category?.CategoryItems?.forEach((item) => {
      total = total + item.cost;
    });

    return total;
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Outfit-Bold",
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Latest Budgets
      </Text>

      <View>
        {categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => onCategoryClick(category)}
          >
            <View style={styles.iconContainer}>
              <Text
                style={[styles.iconText, { backgroundColor: category.color }]}
              >
                {category.icon}
              </Text>
            </View>

            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemCount}>
                  {category?.CategoryItems?.length} items
                </Text>
              </View>
              <Text style={styles.totalAmountText}>
                ${calculateTotalCost(category)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    padding: 16,
    borderRadius: 15,
    fontSize: 30,
  },
  categoryText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
  itemCount: {
    fontFamily: "Outfit",
    marginLeft: 3,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
  },
  totalAmountText: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
});
