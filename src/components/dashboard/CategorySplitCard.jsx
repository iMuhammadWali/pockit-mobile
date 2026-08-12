import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import SvgCardBottomShadow from "../SvgCardBottomShadow";

const CategorySplitCard = ({ data }) => (
  <SvgCardBottomShadow
    color="rgba(202, 154, 164, 0.18)"
    style={styles.shadowWrapper}
    contentStyle={styles.shadowContent}
  >
    <View style={styles.card}>
      <Text style={styles.title}>Category Split</Text>
      <View style={styles.content}>
        <PieChart
          data={data}
          radius={38}
          innerRadius={24}
          innerCircleColor="#fffdfb"
        />
        <View style={styles.legend}>
          {data.map((category) => (
            <View key={category.label} style={styles.legendRow}>
              <View
                style={[styles.legendSwatch, { backgroundColor: category.color }]}
              />
              <Text style={styles.legendText}>
                {category.label} {category.value}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </SvgCardBottomShadow>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#fffdfb",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f6e7e9",
  },
  shadowWrapper: {
    flex: 3,
    minWidth: 0,
  },
  shadowContent: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  legend: {
    flexShrink: 1,
    gap: 4,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendSwatch: {
    width: 9,
    height: 9,
    borderRadius: 2,
  },
  legendText: {
    flexShrink: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#000",
  },
});

export default CategorySplitCard;
