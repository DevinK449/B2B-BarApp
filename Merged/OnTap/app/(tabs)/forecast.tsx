import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { T, radius } from "../../constants/theme";
import { ScreenHeader } from "../../components/ScreenHeader";
import { ForecastBars } from "../../components/ForecastBars";
import { BARS } from "../../data/bars";

export default function Forecast() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader title="Forecast" pill="Tonight · Fri" />
      <Text style={styles.intro}>
        Predicted busyness, cover &amp; line for nearby bars. Updated live as users check in.
      </Text>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {BARS.map((bar) => {
          const peak = bar.forecast.reduce((a, b) => (a.busy > b.busy ? a : b));
          return (
            <Pressable
              key={bar.id}
              onPress={() => router.push(`/bar/${bar.id}`)}
              style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
            >
              <View style={styles.top}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{bar.name}</Text>
                  <Text style={styles.type}>{bar.type} · {bar.distance}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.scoreNum}>{bar.score}</Text>
                  <Text style={styles.scoreLabel}>VIBE</Text>
                </View>
              </View>
              <ForecastBars data={bar.forecast} />
              <Text style={styles.summary}>
                Peaks at <Text style={styles.bold}>{peak.hour} ({peak.busy}%)</Text> · best time:{" "}
                <Text style={[styles.bold, { color: T.greenMid }]}>{bar.bestTime}</Text>
              </Text>
            </Pressable>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  intro: { paddingHorizontal: 18, paddingBottom: 14, fontSize: 13, color: T.muted, lineHeight: 18 },
  list: { paddingHorizontal: 18, gap: 10 },
  card: {
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600", color: T.text },
  type: { fontSize: 12, color: T.faint, marginTop: 2 },
  scoreNum: { fontSize: 22, fontWeight: "700", color: T.greenMid, lineHeight: 24 },
  scoreLabel: { fontSize: 9, color: T.faint, letterSpacing: 0.5, marginTop: 2 },
  summary: { fontSize: 11, color: T.muted, marginTop: 10, lineHeight: 16 },
  bold: { fontWeight: "700", color: T.text },
});
