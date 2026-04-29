import { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Animated } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../../constants/theme";
import { PrimaryButton } from "../../components/PrimaryButton";

const VIBE_EMOJIS = ["😴", "😊", "🔥", "💃"];

export default function Post() {
  const [vibe, setVibe] = useState<string | null>(null);
  const [showDeep, setShowDeep] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [ratings, setRatings] = useState({ vibe: 7, crowd: 8, price: 5, music: 8 });
  const tapScale = useRef(new Animated.Value(1)).current;

  const onCheckIn = () => {
    Animated.sequence([
      Animated.spring(tapScale, { toValue: 0.95, useNativeDriver: true, friction: 8 }),
      Animated.spring(tapScale, { toValue: 1, useNativeDriver: true, friction: 5 }),
    ]).start();
    setCheckedIn(true);
    setTimeout(() => setCheckedIn(false), 2200);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Check in</Text>
        <Text style={styles.subtitle}>One tap. That's it.</Text>

        <LinearGradient
          colors={["rgba(29,158,117,0.12)", "rgba(15,110,86,0.04)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.barPick}
        >
          <Text style={styles.barName}>The Rusty Anchor</Text>
          <Text style={styles.barMeta}>Sports bar · 0.3 mi away</Text>
          <Text style={styles.barDetected}>📍 Detected from your location</Text>
        </LinearGradient>

        <Animated.View style={{ transform: [{ scale: tapScale }], width: "100%", marginBottom: 16 }}>
          <PrimaryButton
            label={checkedIn ? "Checked in 🍻" : "I'm here 🍻"}
            onPress={onCheckIn}
            size="lg"
          />
        </Animated.View>

        <Text style={styles.optional}>Optional — how's the vibe?</Text>
        <View style={styles.vibeRow}>
          {VIBE_EMOJIS.map((e) => (
            <VibeBtn key={e} emoji={e} active={vibe === e} onPress={() => setVibe(e)} />
          ))}
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>FOR THE DEDICATED</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable
          onPress={() => setShowDeep(!showDeep)}
          style={({ pressed }) => [styles.deeperToggle, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.deeperText}>
            {showDeep ? "− Hide deeper rating" : "+ Add a deeper rating (optional)"}
          </Text>
        </Pressable>

        {showDeep && (
          <View style={styles.sliderSection}>
            {(["vibe", "crowd", "price", "music"] as const).map((key) => (
              <View key={key} style={styles.sliderRow}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderLabel}>{key[0].toUpperCase() + key.slice(1)}</Text>
                  <Text style={styles.sliderValue}>{ratings[key]}</Text>
                </View>
                <Slider
                  style={{ width: "100%", height: 30 }}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={ratings[key]}
                  onValueChange={(v) => setRatings((r) => ({ ...r, [key]: Math.round(v) }))}
                  minimumTrackTintColor={T.greenMid}
                  maximumTrackTintColor={T.border}
                  thumbTintColor={T.green}
                />
              </View>
            ))}
            <PrimaryButton label="Submit deep rating" onPress={() => setShowDeep(false)} />
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function VibeBtn({ emoji, active, onPress }: { emoji: string; active: boolean; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, friction: 7 }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  return (
    <Animated.View style={{ transform: [{ scale: active ? 1.1 : 1 }, { scale }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={[styles.vibeBtn, active && styles.vibeBtnActive]}
      >
        <Text style={styles.vibeEmoji}>{emoji}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  body: { padding: 18, paddingBottom: 40 },
  title: { fontSize: 28, fontFamily: "Inter_700Bold", color: T.text, textAlign: "center", letterSpacing: -0.4 },
  subtitle: { fontSize: 13, color: T.muted, textAlign: "center", marginTop: 4, marginBottom: 24, fontFamily: "Inter_400Regular" },
  barPick: {
    borderWidth: 1,
    borderColor: T.borderGreen,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 18,
  },
  barName: { fontSize: 17, fontFamily: "Inter_700Bold", color: T.text },
  barMeta: { fontSize: 12, color: T.muted, marginTop: 3, fontFamily: "Inter_400Regular" },
  barDetected: { fontSize: 11, color: T.greenMid, marginTop: 9, fontFamily: "Inter_600SemiBold" },
  optional: { fontSize: 12, color: T.faint, marginBottom: 12, textAlign: "center", fontFamily: "Inter_500Medium" },
  vibeRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 24 },
  vibeBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: T.card,
    borderWidth: 0.5,
    borderColor: T.border,
    alignItems: "center",
    justifyContent: "center",
  },
  vibeBtnActive: {
    backgroundColor: T.greenGlow,
    borderColor: T.borderGreen,
  },
  vibeEmoji: { fontSize: 26 },
  divider: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 18 },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: T.border },
  dividerText: { fontSize: 11, color: T.faint, letterSpacing: 1.2, fontFamily: "Inter_600SemiBold" },
  deeperToggle: {
    paddingVertical: 13,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: T.border,
    alignItems: "center",
  },
  deeperText: { fontSize: 13, color: T.muted, fontFamily: "Inter_500Medium" },
  sliderSection: { marginTop: 16, gap: 14 },
  sliderRow: {},
  sliderLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  sliderLabel: { fontSize: 13, fontFamily: "Inter_500Medium", color: T.text },
  sliderValue: { fontSize: 13, fontFamily: "Inter_700Bold", color: T.greenMid },
});
