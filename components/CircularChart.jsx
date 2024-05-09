import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import colors from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CircularChart({ categoryList }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([colors.GRAY]);
  const [totalCalculatedEstimate, setTotalCalculatestimate] = useState(0);

  useEffect(() => {
    categoryList && updateCircularChart();
  }, [categoryList]);

  const updateCircularChart = () => {
    let totalEsimates = 0;
    setSliceColor([1]);
    setValues([colors.GRAY]);
    let otherCost = 0;

    categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems?.forEach((item_) => {
          itemTotalCost = itemTotalCost + item_.cost;
          totalEsimates = totalEsimates + item_.cost;
        });

        setSliceColor((sliceColor) => [
          ...sliceColor,
          colors.COLOR_LIST[index],
        ]);

        setValues((values) => [...values, itemTotalCost]);
      } else {
        item.CategoryItems?.forEach((item_) => {
          otherCost = otherCost + item_.cost;
          totalEsimates = totalEsimates + item_.cost;
        });
      }
    });

    setTotalCalculatestimate(totalEsimates);
    setSliceColor((sliceColor) => [...sliceColor, colors.COLOR_LIST[4]]);
    setValues((values) => [...values, otherCost]);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: "Outfit" }}>
        Total Expenses:{" "}
        <Text style={{ color: colors.PRIMARY, fontFamily: "Outfit-Bold" }}>
          ${totalCalculatedEstimate}
        </Text>
      </Text>

      <View style={styles.subcontainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.7}
          coverFill={"#FFF"}
        />

        {categoryList?.length == 0 ? (
          <View style={styles.chartNameContainer}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colors.GRAY}
            />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList?.map(
              (category, index) =>
                index <= 4 && (
                  <View key={index} style={styles.chartNameContainer}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={colors.COLOR_LIST[index]}
                    />
                    <Text>{index < 4 ? category.name : "Other"}</Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subcontainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  chartNameContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: 7,
  },
});
