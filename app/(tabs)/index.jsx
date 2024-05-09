import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import services from "../../utils/services";
import { Link, useRouter } from "expo-router";
import { client } from "../../utils/KindeCofig";
import { supabase } from "../../utils/SupabaseConfig";
import Header from "../../components/Header";
import colors from "../../utils/colors";
import CircularChart from "../../components/CircularChart";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "../../components/CategoryList";

export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  // This function will check if the user is authenticated
  const checkUserAuth = async () => {
    const result = await services.getData("login");

    if (result !== "true") {
      router.replace("/login");
    }
  };



  // This function will get the list of categories
  const getCategoryList = async () => {
    setLoading(true);
    const user = await client.getUserDetails();

    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", user.email);

    setCategoryList(data);
    data && setLoading(false);
  };

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight || 25,
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getCategoryList} />
        }
      >
        <View
          style={{
            padding: 20,
            backgroundColor: colors.PRIMARY,
            height: 150,
          }}
        >
          <Header />
        </View>

        <View
          style={{
            padding: 20,
            marginTop: -90,
          }}
        >
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>

      <Link href={"/add-new-category"} style={styles.addBtnContainer}>
        <Ionicons name="add-circle" size={64} color={colors.BLUE} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtnContainer: {
    position: "absolute",
    bottom: 18,
    right: 18,
  },
});
