import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { Fragment, useState } from "react";
import colors from "../../utils/colors";
import { EvilIcons } from "@expo/vector-icons";
import { supabase } from "../../utils/SupabaseConfig";

export default function CategoryItemList({ categoryData, setUpdateRecord }) {
  const [expandItem, setExpandItem] = useState();

  const onDeleteItem = async (itemId) => {
    const { error } = await supabase
      .from("CategoryItems")
      .delete()
      .eq("id", itemId);

    ToastAndroid.show("Item Deleted Successfully", ToastAndroid.SHORT);
    setUpdateRecord(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>

      <View style={{ marginTop: 15 }}>
        {categoryData?.CategoryItems?.length > 0 ? (
          categoryData?.CategoryItems?.map((item, index) => (
            <Fragment key={index}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  setExpandItem(expandItem === index ? null : index)
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemNotes} numberOfLines={2}>
                    {item.note}
                  </Text>
                </View>

                <Text style={styles.cost}>${item.cost}</Text>
              </TouchableOpacity>

              {/* Add a delete icon to delete the item */}
              {expandItem === index && (
                <View style={styles.actionItemContainer}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              )}

              {/*  Add a border to separate items */}
              {index !== categoryData?.CategoryItems?.length - 1 && (
                <View
                  style={{
                    borderBottomColor: colors.GRAY,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />
              )}
            </Fragment>
          ))
        ) : (
          <Text style={styles.noItemText}>No Items Added Yet!!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Outfit-Bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  itemName: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
  itemNotes: {
    fontFamily: "Outfit",
    color: colors.GRAY,
  },
  cost: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
    marginLeft: 10,
  },
  noItemText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
    color: colors.GRAY,
  },
  actionItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
