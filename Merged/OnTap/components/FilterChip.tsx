import { Pressable, Text, StyleSheet } from "react-native";
import { T } from "../constants/theme";

export function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: T.border,
    backgroundColor: "transparent",
  },
  chipActive: {
    backgroundColor: T.greenGlow,
    borderColor: T.borderGreen,
  },
  label: { fontSize: 12, color: T.muted },
  labelActive: { color: T.greenMid, fontWeight: "600" },
});
