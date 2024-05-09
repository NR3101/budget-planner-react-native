import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CategoryInfo from "../components/CategoryDetail/CategoryInfo";
import CategoryItemList from "../components/CategoryDetail/CategoryItemList";
import colors from "../utils/colors";

const categoryDetailsScreen = () => {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    categoryId && getCategoryDetails();
  }, [categoryId]);

  const getCategoryDetails = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId);

    setCategoryData(data[0]);
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        flex: 1,
        backgroundColor: colors.WHITE,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Ionicons name="arrow-back-circle" size={44} color="black" />
        </TouchableOpacity>

        <CategoryInfo categoryData={categoryData} />

        <CategoryItemList
          categoryData={categoryData}
          setUpdateRecord={() => getCategoryDetails()}
        />
      </ScrollView>

      <Link
        href={{
          pathname: "/add-new-category-item",
          params: {
            categoryId: categoryData.id,
          },
        }}
        style={styles.addIcon}
      >
        <Ionicons name="add-circle" size={64} color={colors.BLUE} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    position: "absolute",
    bottom: 25,
    right: 18,
  },
});

export default categoryDetailsScreen;
