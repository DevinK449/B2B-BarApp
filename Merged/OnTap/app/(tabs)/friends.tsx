import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { T, radius } from "../../constants/theme";
import { ScreenHeader } from "../../components/ScreenHeader";
import { FRIENDS_OUT } from "../../data/bars";

const AVATAR_COLORS = [
  { bg: "#B5D4F4", fg: "#0C447C" },
  { bg: "#F4C0D1", fg: "#72243E" },
  { bg: "#C0DD97", fg: "#3B6D11" },
  { bg: "#FAC775", fg: "#633806" },
];

const ALL = [
  ...FRIENDS_OUT.map((f) => ({ ...f, out: true })),
  { initials: "AS", name: "Ava Santos", bar: "—", when: "Not out", color: 4, out: false },
  { initials: "MK", name: "Maya Khan", bar: "—", when: "Not out", color: 1, out: false },
  { initials: "BR", name: "Ben Russo", bar: "—", when: "Not out", color: 3, out: false },
];

export default function Friends() {
  const out = ALL.filter((f) => f.out);
  const notOut = ALL.filter((f) => !f.out);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader title="Friends" pill={`${out.length} out tonight`} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>OUT RIGHT NOW</Text>
        <View style={styles.list}>
          {out.map((f, i) => {
            const c = AVATAR_COLORS[(f.color - 1) % AVATAR_COLORS.length];
            return (
              <View key={i} style={styles.row}>
                <View style={[styles.avatar, { backgroundColor: c.bg }]}>
                  <Text style={[styles.avatarText, { color: c.fg }]}>{f.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{f.name}</Text>
                  <Text style={styles.location}>📍 {f.bar} · {f.when}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 22 }]}>OTHER FRIENDS</Text>
        <View style={styles.list}>
          {notOut.map((f, i) => {
            const c = AVATAR_COLORS[(f.color - 1) % AVATAR_COLORS.length];
            return (
              <View key={i} style={styles.row}>
                <View style={[styles.avatar, { backgroundColor: c.bg, opacity: 0.7 }]}>
                  <Text style={[styles.avatarText, { color: c.fg }]}>{f.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{f.name}</Text>
                  <Text style={[styles.location, { color: T.faint }]}>{f.when}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  body: { paddingHorizontal: 18, paddingTop: 4 },
  sectionLabel: { fontSize: 10, color: T.faint, letterSpacing: 0.8, marginBottom: 12 },
  list: { gap: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 13, fontWeight: "600" },
  name: { fontSize: 14, fontWeight: "600", color: T.text },
  location: { fontSize: 12, color: T.greenMid, marginTop: 2 },
});
