import { useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../constants/theme";
import type { Bar } from "../data/bars";

const AVATAR_COLORS = [
  { bg: "#B5D4F4", fg: "#0C447C" },
  { bg: "#F4C0D1", fg: "#72243E" },
  { bg: "#C0DD97", fg: "#3B6D11" },
  { bg: "#FAC775", fg: "#633806" },
];

function LiveDot() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return <Animated.View style={[styles.liveDot, { opacity }]} />;
}

export function BarCard({ bar }: { bar: Bar }) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.985, useNativeDriver: true, friction: 7 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => router.push(`/bar/${bar.id}`)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={styles.card}
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

        <View style={styles.statsGrid}>
          <Stat label="Crowd" value={bar.crowd} cls={bar.crowdClass} />
          <Stat label="Cover" value={bar.cover} cls={bar.coverClass} />
          <Stat label="Line" value={bar.line} cls={bar.lineClass} />
        </View>

        <View style={styles.footer}>
          {bar.friends.length > 0 ? (
            <View style={styles.friendsRow}>
              <View style={styles.avatarStack}>
                {bar.friends.slice(0, 4).map((f, i) => {
                  const c = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <View key={i} style={[styles.avatar, { backgroundColor: c.bg, marginLeft: i === 0 ? 0 : -6 }]}>
                      <Text style={[styles.avatarText, { color: c.fg }]}>{f}</Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.friendsText}>
                {bar.friends.length} friend{bar.friends.length > 1 ? "s" : ""} here
              </Text>
            </View>
          ) : (
            <Text style={[styles.friendsText, { color: T.faint }]}>No friends here yet</Text>
          )}
          {bar.live && (
            <LinearGradient
              colors={["rgba(226,75,74,0.25)", "rgba(226,75,74,0.12)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.liveBadge}
            >
              <LiveDot />
              <Text style={styles.liveText}>LIVE</Text>
            </LinearGradient>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function Stat({ label, value, cls }: { label: string; value: string; cls: "good" | "mid" | "bad" }) {
  const color = cls === "good" ? T.good : cls === "mid" ? T.mid : T.bad;
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label.toUpperCase()}</Text>
      <Text style={[styles.statVal, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.lg,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontFamily: "Inter_600SemiBold", color: T.text },
  type: { fontSize: 12, color: T.faint, marginTop: 2, fontFamily: "Inter_400Regular" },
  scoreNum: { fontSize: 24, fontFamily: "Inter_700Bold", color: T.greenMid, lineHeight: 26 },
  scoreLabel: { fontSize: 9, color: T.faint, letterSpacing: 0.6, marginTop: 2, fontFamily: "Inter_600SemiBold" },
  statsGrid: { flexDirection: "row", gap: 6, marginBottom: 12 },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: radius.md,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: T.border,
  },
  statLabel: { fontSize: 9, color: T.faint, letterSpacing: 0.5, marginBottom: 3, fontFamily: "Inter_600SemiBold" },
  statVal: { fontSize: 12, fontFamily: "Inter_700Bold" },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  friendsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  avatarStack: { flexDirection: "row" },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: T.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 9, fontFamily: "Inter_700Bold" },
  friendsText: { fontSize: 12, color: T.muted, fontFamily: "Inter_500Medium" },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.red },
  liveText: { fontSize: 10, fontFamily: "Inter_700Bold", color: "#FF8585", letterSpacing: 0.5 },
});
