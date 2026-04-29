import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../../constants/theme";
import { ARCHIVE } from "../../data/bars";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LinearGradient
            colors={["#5DCAA5", "#0F6E56"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>DK</Text>
          </LinearGradient>
          <Text style={styles.name}>Devin King</Text>
          <Text style={styles.handle}>@devin · joined April 2026</Text>
        </View>

        <View style={styles.statsRow}>
          <StatTile num="23" label="Check-ins" />
          <StatTile num="11" label="Bars" />
          <StatTile num="4" label="Streak" />
        </View>

        <Text style={styles.sectionLabel}>YOUR NIGHT, ARCHIVED</Text>
        <View style={styles.list}>
          {ARCHIVE.map((a, i) => (
            <View key={i} style={styles.archiveRow}>
              <Text style={styles.date}>{a.date.toUpperCase()}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.bar}>{a.bar}</Text>
                <Text style={styles.meta}>With {a.with} · {a.photos} photo{a.photos > 1 ? "s" : ""}</Text>
              </View>
              <Text style={styles.vibe}>{a.vibe}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatTile({ num, label }: { num: string; label: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileNum}>{num}</Text>
      <Text style={styles.tileLabel}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  header: { paddingTop: 26, paddingBottom: 16, alignItems: "center" },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: T.green,
    shadowOpacity: 0.55,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  avatarText: { fontSize: 28, fontFamily: "Inter_700Bold", color: "#fff", letterSpacing: -0.4 },
  name: { fontSize: 22, fontFamily: "Inter_700Bold", color: T.text, letterSpacing: -0.3 },
  handle: { fontSize: 13, color: T.muted, marginTop: 3, fontFamily: "Inter_400Regular" },
  statsRow: { flexDirection: "row", gap: 8, paddingHorizontal: 18, paddingBottom: 22 },
  tile: {
    flex: 1,
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    padding: 14,
    alignItems: "center",
  },
  tileNum: { fontSize: 24, fontFamily: "Inter_700Bold", color: T.greenMid },
  tileLabel: { fontSize: 10, color: T.faint, letterSpacing: 0.6, marginTop: 4, fontFamily: "Inter_600SemiBold" },
  sectionLabel: { fontSize: 10, color: T.faint, letterSpacing: 0.9, paddingHorizontal: 18, marginBottom: 12, fontFamily: "Inter_600SemiBold" },
  list: { paddingHorizontal: 18, gap: 8 },
  archiveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    padding: 13,
  },
  date: { fontSize: 10, color: T.faint, letterSpacing: 0.6, width: 56, fontFamily: "Inter_600SemiBold" },
  bar: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: T.text },
  meta: { fontSize: 11, color: T.muted, marginTop: 3, fontFamily: "Inter_400Regular" },
  vibe: { fontSize: 20 },
});
