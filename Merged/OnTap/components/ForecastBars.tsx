import { View, Text, StyleSheet, ScrollView } from "react-native";
import { T, radius } from "../constants/theme";

export function ForecastBars({ data }: { data: { hour: string; busy: number }[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {data.map((f, i) => {
        const color = f.busy > 80 ? T.red : f.busy > 60 ? T.amber : T.green;
        return (
          <View key={i} style={styles.cell}>
            <Text style={styles.hour}>{f.hour}</Text>
            <View style={styles.barWrap}>
              <View style={[styles.bar, { height: `${f.busy}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.pct}>{f.busy}%</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 6, paddingVertical: 4 },
  cell: {
    width: 52,
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  hour: { fontSize: 10, color: T.faint, marginBottom: 6 },
  barWrap: { height: 40, justifyContent: "flex-end", marginBottom: 4 },
  bar: { width: 18, borderTopLeftRadius: 3, borderTopRightRadius: 3, minHeight: 4 },
  pct: { fontSize: 10, fontWeight: "600", color: T.text },
});
