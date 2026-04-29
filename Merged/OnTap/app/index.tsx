import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../constants/theme";
import { PrimaryButton } from "../components/PrimaryButton";
import { TwinkleBg } from "../components/TwinkleBg";

const FEATURES = [
  "🗺  Live bar conditions near you",
  "⭐  One-tap check-ins, real-time vibes",
  "👥  See where friends are tonight",
  "📊  Forecast tonight's busy hours",
];

export default function Onboarding() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
    featureAnims.forEach((a, i) => {
      Animated.timing(a, {
        toValue: 1,
        duration: 500,
        delay: 240 + i * 110,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <TwinkleBg />
      <SafeAreaView style={styles.safe}>
        <Animated.View
          style={[
            styles.container,
            { opacity: fade, transform: [{ translateY: slide }] },
          ]}
        >
          <LinearGradient
            colors={["#2DBF8C", "#0F6E56"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoEmoji}>🍻</Text>
          </LinearGradient>

          <Text style={styles.title}>OnTap</Text>
          <Text style={styles.subtitle}>The live pulse of your night out</Text>

          <View style={styles.features}>
            {FEATURES.map((f, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.feature,
                  {
                    opacity: featureAnims[i],
                    transform: [{
                      translateX: featureAnims[i].interpolate({
                        inputRange: [0, 1],
                        outputRange: [-12, 0],
                      }),
                    }],
                  },
                ]}
              >
                <Text style={styles.featureText}>{f}</Text>
              </Animated.View>
            ))}
          </View>

          <PrimaryButton label="Get started →" onPress={() => router.replace("/(tabs)/discover")} />
          <Text style={styles.footnote}>Must be 21+ to use OnTap</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 84,
    height: 84,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    shadowColor: T.green,
    shadowOpacity: 0.6,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  logoEmoji: { fontSize: 36 },
  title: {
    fontSize: 42,
    fontFamily: "Inter_800ExtraBold",
    color: T.text,
    letterSpacing: -1.2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: T.muted,
    marginTop: 8,
    marginBottom: 36,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  features: { width: "100%", gap: 10, marginBottom: 32 },
  feature: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 0.5,
    borderColor: T.border,
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  featureText: { fontSize: 13, color: T.muted, fontFamily: "Inter_500Medium" },
  footnote: { fontSize: 11, color: T.faint, marginTop: 14, fontFamily: "Inter_400Regular" },
});
