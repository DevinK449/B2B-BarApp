import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { T } from "../../constants/theme";
import { ScreenHeader } from "../../components/ScreenHeader";
import { FilterChip } from "../../components/FilterChip";
import { BarCard } from "../../components/BarCard";
import { BARS } from "../../data/bars";

const FILTERS = ["All", "Busy now", "Deals", "No cover", "Friends here", "Sports", "Cocktails"];

export default function Discover() {
  const [active, setActive] = useState("All");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader title="Tonight" pill="📍 Fort Mill, SC" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((f) => (
          <FilterChip key={f} label={f} active={active === f} onPress={() => setActive(f)} />
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {BARS.map((bar) => (
          <BarCard key={bar.id} bar={bar} />
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: T.bg },
  filterRow: { paddingHorizontal: 18, paddingBottom: 14, gap: 8 },
  list: { paddingHorizontal: 18, gap: 10 },
});
