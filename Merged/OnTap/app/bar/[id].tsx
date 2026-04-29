import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../../constants/theme";
import { BARS } from "../../data/bars";
import { ForecastBars } from "../../components/ForecastBars";

export default function BarDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const bar = BARS.find((b) => b.id === Number(id));
  const [confirmed, setConfirmed] = useState<string | null>(null);

  if (!bar) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ color: T.text, padding: 18 }}>Bar not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#1a3329", "#0a1612"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <View style={styles.heroBottom}>
            <Text style={styles.heroName}>{bar.name}</Text>
            <Text style={styles.heroSub}>{bar.type} · {bar.distance} · Open till 2am</Text>
          </View>
        </LinearGradient>

        <Section label="Live vibe — confirmed by 23 tonight">
          <View style={styles.vibeGrid}>
            <VibeItem label="Crowd" value={`🔥 ${bar.crowd}`} />
            <VibeItem label="Music" value={bar.music} />
            <VibeItem label="Cover" value={bar.cover} valueColor={bar.coverClass === "good" ? T.greenMid : bar.coverClass === "mid" ? T.amber : T.red} />
            <VibeItem label="Line" value={bar.line} />
          </View>
          <View style={styles.confirmRow}>
            <ConfirmBtn label="👍 Looks right" onPress={() => setConfirmed("right")} active={confirmed === "right"} />
            <ConfirmBtn label="✏️ Correct it" onPress={() => setConfirmed("wrong")} active={confirmed === "wrong"} />
          </View>
        </Section>

        <Section label="Tonight's deals">
          {bar.deals.map((d, i) => (
            <LinearGradient
              key={i}
              colors={["rgba(29,158,117,0.18)", "rgba(15,110,86,0.05)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.deal}
            >
              <Text style={styles.dealTitle}>{d.title}</Text>
              <Text style={styles.dealDesc}>{d.desc}</Text>
            </LinearGradient>
          ))}
        </Section>

        <Section label="Forecast — tonight">
          <ForecastBars data={bar.forecast} />
          <Text style={styles.insight}>
            💡 Best time: <Text style={{ color: T.greenMid, fontFamily: "Inter_700Bold" }}>{bar.bestTime}</Text> — {bar.insight}
          </Text>
        </Section>

        {bar.friends.length > 0 && (
          <Section label="Friends here tonight" last>
            <Text style={styles.friendsLine}>
              {bar.friends.length} friend{bar.friends.length > 1 ? "s" : ""} checked in recently
            </Text>
          </Section>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <View style={[styles.section, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.sectionLabel}>{label.toUpperCase()}</Text>
      {children}
    </View>
  );
}

function VibeItem({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.vibeItem}>
      <Text style={styles.vibeItemLabel}>{label.toUpperCase()}</Text>
      <Text style={[styles.vibeItemVal, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  );
}

function ConfirmBtn({ label, onPress, active }: { label: string; onPress: () => void; active: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.confirmBtn,
        active && { borderColor: T.borderGreen, backgroundColor: T.greenGlow },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.confirmText, active && { color: T.greenMid }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  hero: {
    height: 200,
    justifyContent: "flex-end",
    padding: 18,
    position: "relative",
  },
  back: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 0.5,
    borderColor: T.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 20, color: T.text, lineHeight: 22 },
  heroBottom: {},
  heroName: { fontSize: 26, fontFamily: "Inter_700Bold", color: T.text, letterSpacing: -0.5 },
  heroSub: { fontSize: 13, color: T.muted, marginTop: 4, fontFamily: "Inter_400Regular" },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: T.border,
  },
  sectionLabel: {
    fontSize: 10,
    color: T.faint,
    letterSpacing: 0.9,
    marginBottom: 12,
    fontFamily: "Inter_600SemiBold",
  },
  vibeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  vibeItem: {
    width: "48%",
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    padding: 11,
  },
  vibeItemLabel: { fontSize: 10, color: T.faint, letterSpacing: 0.5, marginBottom: 4, fontFamily: "Inter_600SemiBold" },
  vibeItemVal: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: T.text },
  confirmRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  confirmBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: T.border,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
  },
  confirmText: { fontSize: 12, color: T.muted, fontFamily: "Inter_500Medium" },
  deal: {
    borderWidth: 0.5,
    borderColor: T.borderGreen,
    borderRadius: radius.md,
    padding: 13,
    marginBottom: 8,
  },
  dealTitle: { fontSize: 14, fontFamily: "Inter_700Bold", color: T.greenMid, marginBottom: 3 },
  dealDesc: { fontSize: 12, color: T.muted, fontFamily: "Inter_400Regular" },
  insight: { fontSize: 12, color: T.muted, marginTop: 12, lineHeight: 18, fontFamily: "Inter_400Regular" },
  friendsLine: { fontSize: 13, color: T.muted, fontFamily: "Inter_500Medium" },
});
