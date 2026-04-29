import { View, Text, StyleSheet } from "react-native";
import { T } from "../constants/theme";

export function ScreenHeader({ title, pill }: { title: string; pill?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {pill && (
        <View style={styles.pill}>
          <Text style={styles.pillText}>{pill}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 10,
  },
  title: { fontSize: 26, fontWeight: "700", color: T.text, letterSpacing: -0.4 },
  pill: {
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: T.border,
  },
  pillText: { fontSize: 11, color: T.muted },
});
