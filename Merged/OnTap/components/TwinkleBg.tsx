import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const STARS = Array.from({ length: 22 }).map((_, i) => ({
  id: i,
  size: i % 3 === 0 ? 2.5 : 1.5,
  top: 6 + (i * 47) % 88,
  left: 4 + (i * 61) % 92,
  delay: i * 280,
  duration: 1800 + (i % 3) * 600,
  opacity: 0.2 + (i % 4) * 0.18,
}));

export function TwinkleBg() {
  const anims = useRef(STARS.map(() => new Animated.Value(0.2))).current;

  useEffect(() => {
    const loops = anims.map((anim, i) => {
      const star = STARS[i];
      return Animated.loop(
        Animated.sequence([
          Animated.delay(star.delay),
          Animated.timing(anim, { toValue: star.opacity + 0.5, duration: star.duration, useNativeDriver: true }),
          Animated.timing(anim, { toValue: star.opacity, duration: star.duration, useNativeDriver: true }),
        ])
      );
    });
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims]);

  return (
    <View style={styles.container} pointerEvents="none">
      <LinearGradient
        colors={["rgba(29,158,117,0.12)", "transparent"]}
        style={[styles.glow, { top: -80, right: -60, width: 320, height: 320, borderRadius: 160 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={["rgba(93,202,165,0.08)", "transparent"]}
        style={[styles.glow, { bottom: -60, left: -40, width: 240, height: 240, borderRadius: 120 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {STARS.map((star, i) => (
        <Animated.View
          key={star.id}
          style={{
            position: "absolute",
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: "#5DCAA5",
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: anims[i],
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: "hidden",
  },
  glow: { position: "absolute" },
});
