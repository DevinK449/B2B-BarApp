import { useRef } from "react";
import { Pressable, Text, StyleSheet, ViewStyle, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { T, radius } from "../constants/theme";

export function PrimaryButton({
  label,
  onPress,
  disabled,
  style,
  size = "md",
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  size?: "md" | "lg";
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, friction: 7 }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={disabled}
        style={({ pressed }) => [
          styles.shadowWrap,
          disabled && { shadowOpacity: 0 },
          pressed && { opacity: 0.95 },
        ]}
      >
        <LinearGradient
          colors={disabled ? ["#1f3a30", "#1a3329"] : ["#2DBF8C", "#1D9E75"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, size === "lg" && { paddingVertical: 18 }]}
        >
          <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", borderRadius: radius.lg },
  shadowWrap: {
    borderRadius: radius.lg,
    shadowColor: T.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 8,
  },
  btn: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { color: "#fff", fontSize: 15, fontFamily: "Inter_700Bold", letterSpacing: 0.4 },
  labelDisabled: { color: T.faint },
});
